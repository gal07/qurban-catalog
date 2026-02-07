# Content Form Manager - Usage Guide

## Overview

The Content Form Manager provides a unified, type-safe way to handle admin content forms. It eliminates code duplication and provides automatic validation, error handling, and state management.

## Quick Start

### 1. Basic Usage

```astro
---
import AdminLayout from "../../../layouts/AdminLayout.astro";
import PageHeader from "../../../components/admin/layout/PageHeader.astro";
import FormCard from "../../../components/admin/forms/FormCard.astro";
import LocalizedInput from "../../../components/admin/forms/LocalizedInput.astro";
import SaveButton from "../../../components/admin/forms/SaveButton.astro";
---

<AdminLayout title="My Content">
    <PageHeader title="Edit Content" />
    
    <form id="my-form">
        <FormCard title="Details">
            <LocalizedInput
                name="title"
                labelId="Judul (ID)"
                labelEn="Title (EN)"
                required
            />
        </FormCard>
        
        <SaveButton />
    </form>
</AdminLayout>

<script>
    import { createContentForm } from "../../../lib/admin/ContentFormManager";
    import { myContentSchema } from "../../../schemas/content";

    document.addEventListener("astro:page-load", async () => {
        await createContentForm({
            formId: "my-form",
            collectionName: "content",
            documentId: "my_content",
            validationSchema: myContentSchema
        });
    });
</script>
```

### 2. With Custom Callbacks

```typescript
await createContentForm({
    formId: "my-form",
    collectionName: "content",
    documentId: "my_content",
    validationSchema: myContentSchema,
    
    // Called after data is loaded
    onLoad: (data) => {
        console.log('Data loaded:', data);
        // Custom initialization logic
    },
    
    // Called before data is saved (for transformation)
    onSave: (values) => {
        // Transform data before saving
        return {
            ...values,
            processedAt: new Date()
        };
    }
});
```

### 3. Manual Control

```typescript
import { ContentFormManager } from "../../../lib/admin/ContentFormManager";

const manager = new ContentFormManager({
    formId: "my-form",
    collectionName: "content",
    documentId: "my_content"
});

await manager.init();

// Get current values
const values = manager.getValues();

// Set values programmatically
manager.setValues({ title: "New Title" });

// Check for unsaved changes
if (manager.hasUnsavedChanges()) {
    console.log('You have unsaved changes');
}

// Save manually
await manager.saveData();

// Reset to original values
manager.reset();
```

## Creating Validation Schemas

Define schemas in `src/schemas/content.ts`:

```typescript
import type { FieldValidation } from '../types';
import { required, min, email } from '../lib/validation';

export const myContentSchema: FieldValidation[] = [
    {
        field: 'title',
        rules: [
            required('Title wajib diisi'),
            min(5, 'Title minimal 5 karakter')
        ]
    },
    {
        field: 'email',
        rules: [
            required('Email wajib diisi'),
            email()
        ]
    }
];
```

## Available Validators

```typescript
import {
    required,
    email,
    url,
    min,
    max,
    pattern,
    phoneNumber,
    whatsappNumber
} from '../lib/validation';

// Usage
required('Field wajib diisi')
email('Email tidak valid')
url('URL tidak valid')
min(10, 'Minimal 10 karakter')
max(100, 'Maksimal 100 karakter')
pattern('^[A-Z]', 'Harus diawali huruf kapital')
phoneNumber()
whatsappNumber()
```

## Benefits

### Before (Old Approach)
```astro
<!-- 167 lines -->
<form id="form">
    <label>Address</label>
    <textarea id="address"></textarea>
    <!-- ... 50 lines of HTML ... -->
</form>

<script>
    // 80 lines of duplicated code
    import { db } from "../../../lib/firebase";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    
    const form = document.getElementById("form");
    const addressInput = document.getElementById("address");
    
    async function loadData() {
        const docRef = doc(db, "content", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            addressInput.value = docSnap.data().address;
        }
    }
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = { address: addressInput.value };
        await setDoc(doc(db, "content", "contact"), data);
        alert("Saved!");
    });
    
    loadData();
</script>
```

### After (New Approach)
```astro
<!-- 60 lines -->
<form id="form">
    <LocalizedInput name="address" labelId="Alamat" labelEn="Address" />
</form>

<script>
    // 5 lines
    import { createContentForm } from "../../../lib/admin/ContentFormManager";
    
    await createContentForm({
        formId: "form",
        collectionName: "content",
        documentId: "contact"
    });
</script>
```

**Result**: 64% code reduction, better maintainability, consistent behavior

## Migration Checklist

When migrating an existing content page:

1. ✅ Create new file (e.g., `contact-v2.astro`)
2. ✅ Replace HTML with reusable components
3. ✅ Replace inline script with `createContentForm`
4. ✅ Define validation schema in `schemas/content.ts`
5. ✅ Test thoroughly
6. ✅ Rename old file to `contact-old.astro`
7. ✅ Rename new file to `contact.astro`
8. ✅ Monitor for 1 week
9. ✅ Delete old file

## Troubleshooting

### Form not loading data
- Check `formId` matches the form's `id` attribute
- Verify `collectionName` and `documentId` are correct
- Check browser console for errors

### Validation not working
- Ensure schema is imported and passed to `createContentForm`
- Check field names in schema match form input names
- Verify validation rules are correctly defined

### Save not working
- Check Firestore permissions
- Verify form fields have `name` attributes
- Check browser console for errors
- Ensure `showToast` is imported in `ContentFormManager`

## Examples

See working examples:
- `src/pages/admin/content/contact-v2.astro` - Basic usage
- More examples coming in Phase 4 migration
