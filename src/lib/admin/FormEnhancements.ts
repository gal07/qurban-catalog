/**
 * Form Enhancement Helper
 * Reusable integration code for auto-save and unsaved changes
 * 
 * Use this in admin content pages to add auto-save and unsaved changes warning
 * 
 * @example
 * ```typescript
 * import { setupFormEnhancements } from "../../../lib/admin/FormEnhancements";
 * 
 * document.addEventListener("astro:page-load", async () => {
 *     const contentForm = await createContentForm({ ... });
 *     setupFormEnhancements("my-form", contentForm);
 * });
 * ```
 */

import { AutoSaveManager } from "./AutoSave";
import { UnsavedChangesManager } from "./UnsavedChanges";
import { showToast } from "../toast";
import type { ContentFormManager } from "./ContentFormManager";

export function setupFormEnhancements(
    formId: string,
    contentForm: ContentFormManager
): { autoSave: AutoSaveManager; unsavedChanges: UnsavedChangesManager } {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
        throw new Error(`Form with id "${formId}" not found`);
    }

    // Initialize auto-save
    const autoSave = new AutoSaveManager(formId, form);

    // Check for and restore draft
    if (autoSave.hasDraft()) {
        const draft = autoSave.restoreDraft();
        const ageString = autoSave.getDraftAgeString();

        if (draft && confirm(`Draft found from ${ageString}. Restore it?`)) {
            // Restore draft data to form
            Object.entries(draft).forEach(([key, value]) => {
                const input = form.querySelector(
                    `[name="${key}"]`
                ) as HTMLInputElement | HTMLTextAreaElement;
                if (input && typeof value === "string") {
                    input.value = value;
                }
            });
            showToast("Draft restored successfully", "success");
        } else {
            autoSave.clearDraft();
        }
    }

    // Start auto-saving
    autoSave.start();

    // Initialize unsaved changes warning
    const unsavedChanges = new UnsavedChangesManager(form);
    unsavedChanges.start();

    // Override the saveData method to add our hooks
    const originalSaveData = contentForm.saveData.bind(contentForm);
    contentForm.saveData = async function () {
        unsavedChanges.disable();
        const result = await originalSaveData();
        if (result) {
            // Save was successful
            autoSave.clearDraft();
            unsavedChanges.markAsSaved();
        }
        unsavedChanges.enable();
        return result;
    };

    // Cleanup on page unload
    document.addEventListener("astro:before-swap", () => {
        autoSave.stop();
        unsavedChanges.stop();
    });

    return { autoSave, unsavedChanges };
}
