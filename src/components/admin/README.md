# Admin Component Library

This directory contains reusable components for the admin interface.

## Form Components (`forms/`)

### TextInput
Single-line text input with label, error handling, and help text.

```astro
<TextInput
    name="title"
    label="Title"
    value={data.title}
    required
    error={errors.title}
    helpText="Enter the page title"
/>
```

### TextArea
Multi-line textarea with configurable rows.

```astro
<TextArea
    name="description"
    label="Description"
    value={data.description}
    rows={6}
    required
/>
```

### LocalizedInput
ID/EN field pair for bilingual content.

```astro
<LocalizedInput
    name="title"
    labelId="Judul (ID)"
    labelEn="Title (EN)"
    type="text"
    valueId={data.title}
    valueEn={data.title_en}
    required
/>
```

### SaveButton
Button with loading state and spinner.

```astro
<SaveButton
    text="Simpan Perubahan"
    loadingText="Menyimpan..."
    variant="primary"
/>
```

### ImageUpload
File input with image preview.

```astro
<ImageUpload
    name="image"
    label="Upload Image"
    currentUrl={data.imageUrl}
    accept="image/*"
    required
/>
```

### ColorPicker
Color picker with hex value display.

```astro
<ColorPicker
    name="primaryColor"
    label="Primary Color"
    value={data.primary}
/>
```

### FormCard
Card wrapper for form sections.

```astro
<FormCard
    title="Basic Information"
    description="Enter the basic details"
>
    <!-- Form fields here -->
</FormCard>
```

## Layout Components (`layout/`)

### PageHeader
Page title with optional icon and actions.

```astro
<PageHeader
    title="Content Management"
    description="Manage your website content"
    icon="📝"
>
    <div slot="actions">
        <button>Action</button>
    </div>
</PageHeader>
```

### ContentSection
Section wrapper for organizing content.

```astro
<ContentSection
    title="Hero Section"
    description="Configure hero content"
>
    <!-- Content here -->
</ContentSection>
```

### ActionBar
Button group with flexible alignment.

```astro
<ActionBar align="right">
    <button>Cancel</button>
    <SaveButton />
</ActionBar>
```

## Usage Example

```astro
---
import PageHeader from '../../components/admin/layout/PageHeader.astro';
import FormCard from '../../components/admin/forms/FormCard.astro';
import LocalizedInput from '../../components/admin/forms/LocalizedInput.astro';
import SaveButton from '../../components/admin/forms/SaveButton.astro';
import ActionBar from '../../components/admin/layout/ActionBar.astro';
---

<PageHeader
    title="Edit Contact"
    description="Update contact information"
    icon="📞"
/>

<form id="contact-form">
    <FormCard title="Contact Details">
        <LocalizedInput
            name="address"
            labelId="Alamat (ID)"
            labelEn="Address (EN)"
            type="textarea"
            required
        />
        
        <LocalizedInput
            name="phone"
            labelId="Telepon (ID)"
            labelEn="Phone (EN)"
            type="tel"
            required
        />
    </FormCard>
    
    <ActionBar align="right">
        <SaveButton />
    </ActionBar>
</form>
```
