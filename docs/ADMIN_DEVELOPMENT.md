# Admin Development Guide

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Libraries](#core-libraries)
3. [Component Usage](#component-usage)
4. [Common Patterns](#common-patterns)
5. [Adding New Admin Pages](#adding-new-admin-pages)
6. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Tech Stack

- **Framework**: Astro.js with View Transitions (SPA mode)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Storage**: AWS S3 (for images)
- **State Management**: Client-side with localStorage for drafts
- **Validation**: Schema-based validation system

### Directory Structure

```
src/
├── pages/admin/           # Admin pages
│   ├── content/          # Content management pages
│   ├── animals/          # Animal catalog management
│   ├── gallery.astro     # Media gallery
│   └── settings.astro    # Site settings
├── components/admin/      # Admin-specific components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/admin/            # Admin utilities
│   ├── ContentFormManager.ts
│   ├── AutoSave.ts
│   ├── UnsavedChanges.ts
│   └── FormEnhancements.ts
├── lib/                  # Shared utilities
│   ├── firestore.ts
│   ├── validation.ts
│   ├── toast.ts
│   └── forms.ts
└── schemas/              # Validation schemas
    └── content.ts
```

---

## Core Libraries

### ContentFormManager

**Purpose**: Unified form handling for admin content pages.

**Usage**:
```typescript
import { createContentForm } from "../../../lib/admin/ContentFormManager";
import { myValidationSchema } from "../../../schemas/content";

const contentForm = await createContentForm({
    formId: "my-form",
    collectionName: "content",
    documentId: "my_document",
    validationSchema: myValidationSchema,
});
```

**Features**:
- Automatic data loading from Firestore
- Form validation
- Save handling with loading states
- Dirty state tracking

### AutoSave & UnsavedChanges

**Purpose**: Prevent data loss and warn users about unsaved changes.

**Quick Setup**:
```typescript
import { setupFormEnhancements } from "../../../lib/admin/FormEnhancements";

const contentForm = await createContentForm({ ... });
setupFormEnhancements("my-form", contentForm);
```

**Features**:
- Auto-save to localStorage every 3 seconds
- Draft restoration on page load
- Unsaved changes warning (browser + SPA)
- Automatic cleanup

### Validation

**Purpose**: Schema-based form validation.

**Usage**:
```typescript
import { required, email, min } from "../../../lib/validation";

export const mySchema: FieldValidation[] = [
    {
        field: 'email',
        rules: [required(), email()]
    },
    {
        field: 'description',
        rules: [required(), min(20, 'Minimal 20 karakter')]
    }
];
```

### Toast Notifications

**Purpose**: User feedback for actions.

**Usage**:
```typescript
import { showToast } from "../../../lib/toast";

showToast("Data berhasil disimpan!", "success");
showToast("Terjadi kesalahan", "error");
showToast("Perhatian!", "warning");
showToast("Informasi", "info");
```

---

## Component Usage

### Form Components

#### LocalizedInput

For bilingual input fields (ID/EN).

```astro
<LocalizedInput
    name="title"
    labelId="Judul (ID)"
    labelEn="Title (EN)"
    type="text"
    placeholderId="Masukkan judul..."
    placeholderEn="Enter title..."
    required
/>
```

#### DynamicList

For managing lists of items (social links, steps, features).

```astro
<DynamicList
    id="my-list-container"
    title="Daftar Item"
    addButtonText="Tambah Item"
/>
```

**JavaScript Integration**:
```typescript
const container = document.querySelector("#my-list-container .list-items");
const addButton = document.querySelector("#my-list-container .add-item-btn");

let items = [];

function renderItems() {
    container.innerHTML = items.map((item, index) => `
        <div class="list-item" data-index="${index}">
            <div class="list-item-content">
                <!-- Your item content -->
            </div>
            <button type="button" class="remove-item-btn">
                <!-- Remove icon -->
            </button>
        </div>
    `).join("");
}
```

#### SaveButton

Standard save button with loading state.

```astro
<SaveButton />
```

---

## Common Patterns

### Pattern 1: Simple Content Form

For pages with basic fields (contact, footer).

```astro
---
import AdminLayout from "../../../layouts/AdminLayout.astro";
import FormCard from "../../../components/admin/forms/FormCard.astro";
import LocalizedInput from "../../../components/admin/forms/LocalizedInput.astro";
import SaveButton from "../../../components/admin/forms/SaveButton.astro";
---

<AdminLayout title="Page Title">
    <form id="my-form">
        <FormCard title="Section Title">
            <LocalizedInput name="field1" ... />
            <LocalizedInput name="field2" ... />
        </FormCard>
        <SaveButton />
    </form>
</AdminLayout>

<script>
    import { createContentForm } from "../../../lib/admin/ContentFormManager";
    import { setupFormEnhancements } from "../../../lib/admin/FormEnhancements";
    import { mySchema } from "../../../schemas/content";

    document.addEventListener("astro:page-load", async () => {
        const contentForm = await createContentForm({
            formId: "my-form",
            collectionName: "content",
            documentId: "my_doc",
            validationSchema: mySchema,
        });

        setupFormEnhancements("my-form", contentForm);
    });
</script>
```

### Pattern 2: Dynamic List Form

For pages with repeatable items (social, how-to-buy).

```astro
<form id="my-form">
    <FormCard>
        <LocalizedInput name="title" ... />
    </FormCard>

    <DynamicList id="items-list" />

    <SaveButton />
</form>

<script>
    import { db } from "../../../lib/firebase";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import { AutoSaveManager } from "../../../lib/admin/AutoSave";
    import { UnsavedChangesManager } from "../../../lib/admin/UnsavedChanges";

    document.addEventListener("astro:page-load", async () => {
        const form = document.getElementById("my-form");
        
        // Form enhancements
        const autoSave = new AutoSaveManager("my-form", form);
        const unsavedChanges = new UnsavedChangesManager(form);
        autoSave.start();
        unsavedChanges.start();

        // Dynamic list setup
        let items = [];
        
        function renderItems() {
            // Render logic
        }

        // Load data
        const docSnap = await getDoc(doc(db, "content", "my_doc"));
        if (docSnap.exists()) {
            items = docSnap.data().items || [];
            renderItems();
        }

        // Save handler
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = { items };
            await setDoc(doc(db, "content", "my_doc"), data);
            autoSave.clearDraft();
            unsavedChanges.markAsSaved();
            showToast("Data berhasil disimpan!", "success");
        });

        // Cleanup
        document.addEventListener("astro:before-swap", () => {
            autoSave.stop();
            unsavedChanges.stop();
        });
    });
</script>
```

---

## Adding New Admin Pages

### Step 1: Create the Page File

```
src/pages/admin/content/my-new-page.astro
```

### Step 2: Define Validation Schema

```typescript
// src/schemas/content.ts
export const myNewPageSchema: FieldValidation[] = [
    {
        field: 'title',
        rules: [required(), min(5)]
    }
];
```

### Step 3: Build the UI

Use existing components:
- `AdminLayout` for page structure
- `PageHeader` for title/description
- `FormCard` for sections
- `LocalizedInput` for bilingual fields
- `SaveButton` for submit

### Step 4: Add Script Logic

Choose pattern based on complexity:
- **Simple form**: Use `ContentFormManager` + `setupFormEnhancements`
- **Dynamic list**: Manual setup with `AutoSave` + `UnsavedChanges`

### Step 5: Add to Navigation

Update `src/layouts/AdminLayout.astro` sidebar menu.

---

## Troubleshooting

### Issue: Data Not Loading After SPA Navigation

**Cause**: Script not re-running on page navigation.

**Solution**: Wrap initialization in `astro:page-load` event:
```typescript
document.addEventListener("astro:page-load", async () => {
    // Your initialization code
});
```

### Issue: Tailwind Classes Not Working in Dynamic HTML

**Cause**: Tailwind can't process classes in JavaScript strings.

**Solution**: Use global CSS classes defined in component `<style is:global>` tags.

### Issue: Form Not Saving

**Check**:
1. Form has correct `id` attribute
2. `formId` in `createContentForm` matches form `id`
3. Firestore collection/document names are correct
4. Validation schema is passing
5. Check browser console for errors

### Issue: Auto-Save Not Working

**Check**:
1. Form has correct `id`
2. `AutoSaveManager` is initialized with correct form ID
3. `.start()` is called
4. Check localStorage in DevTools

### Issue: Unsaved Changes Warning Not Showing

**Check**:
1. `UnsavedChangesManager` is initialized
2. `.start()` is called
3. Form data has actually changed
4. Warning wasn't disabled (check `.disable()` calls)

---

## Best Practices

### 1. Always Use SPA-Compatible Code

```typescript
// ✅ Good
document.addEventListener("astro:page-load", () => {
    // Code here
});

// ❌ Bad
// Code directly in <script> without event listener
```

### 2. Clean Up Event Listeners

```typescript
document.addEventListener("astro:before-swap", () => {
    autoSave.stop();
    unsavedChanges.stop();
    // Remove other listeners
});
```

### 3. Use Type-Safe Validation

```typescript
// ✅ Good
import { required, email } from "../../../lib/validation";

// ❌ Bad
// Manual validation without types
```

### 4. Provide User Feedback

```typescript
// Always show toast after actions
await saveData();
showToast("Data berhasil disimpan!", "success");
```

### 5. Handle Errors Gracefully

```typescript
try {
    await saveData();
    showToast("Berhasil!", "success");
} catch (error) {
    console.error("Save error:", error);
    showToast("Gagal menyimpan: " + error.message, "error");
}
```

---

## Quick Reference

### Common Imports

```typescript
// Form management
import { createContentForm } from "../../../lib/admin/ContentFormManager";
import { setupFormEnhancements } from "../../../lib/admin/FormEnhancements";

// Validation
import { required, email, min, max } from "../../../lib/validation";

// Firebase
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// UI
import { showToast } from "../../../lib/toast";
```

### localStorage Keys

- Drafts: `admin-draft-{form-id}`
- Draft timestamps: `admin-draft-{form-id}-timestamp`

### Firestore Collections

- `content` - All content pages
- `animals` - Animal catalog
- `media_library` - Gallery images
- `settings` - Site settings

---

## Getting Help

1. Check this guide first
2. Review similar existing pages
3. Check browser console for errors
4. Review Firestore data structure
5. Check network tab for API calls

---

**Last Updated**: Phase 5 Session 2
**Version**: 1.0
