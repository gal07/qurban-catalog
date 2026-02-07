import type { FormState } from '../types';

/**
 * Form utilities for managing form state, loading states, and button states
 */

/**
 * Manages form loading state and button text
 */
export class FormStateManager {
    private submitButton: HTMLButtonElement | null = null;
    private originalButtonText: string = 'Simpan Perubahan';

    constructor(formId: string) {
        const form = document.getElementById(formId);
        if (form) {
            this.submitButton = form.querySelector('button[type="submit"]');
            if (this.submitButton) {
                this.originalButtonText = this.submitButton.textContent || this.originalButtonText;
            }
        }
    }

    /**
     * Set form to loading state
     */
    setLoading(loadingText: string = 'Menyimpan...') {
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = loadingText;
        }
    }

    /**
     * Reset form to normal state
     */
    setIdle() {
        if (this.submitButton) {
            this.submitButton.disabled = false;
            this.submitButton.textContent = this.originalButtonText;
        }
    }

    /**
     * Set form to error state
     */
    setError(errorText?: string) {
        if (this.submitButton) {
            this.submitButton.disabled = false;
            if (errorText) {
                this.submitButton.textContent = errorText;
                setTimeout(() => this.setIdle(), 2000);
            }
        }
    }
}

/**
 * Get all form field values as an object
 */
export function getFormValues(formId: string): Record<string, any> {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return {};

    const formData = new FormData(form);
    const values: Record<string, any> = {};

    formData.forEach((value, key) => {
        // Handle checkboxes
        if (form.elements[key as any] instanceof HTMLInputElement) {
            const input = form.elements[key as any] as HTMLInputElement;
            if (input.type === 'checkbox') {
                values[key] = input.checked;
                return;
            }
            if (input.type === 'number') {
                values[key] = Number(value);
                return;
            }
        }
        values[key] = value;
    });

    return values;
}

/**
 * Set form field values from an object
 */
export function setFormValues(formId: string, values: Record<string, any>) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    Object.entries(values).forEach(([key, value]) => {
        const element = form.elements[key as any];

        if (!element) return;

        if (element instanceof HTMLInputElement) {
            if (element.type === 'checkbox') {
                element.checked = Boolean(value);
            } else if (element.type === 'file') {
                // Skip file inputs
            } else {
                element.value = value?.toString() || '';
            }
        } else if (element instanceof HTMLTextAreaElement) {
            element.value = value?.toString() || '';
        } else if (element instanceof HTMLSelectElement) {
            element.value = value?.toString() || '';
        }
    });
}

/**
 * Clear all form fields
 */
export function clearForm(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form) {
        form.reset();
    }
}

/**
 * Get a single form field value
 */
export function getFieldValue(formId: string, fieldName: string): any {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return null;

    const element = form.elements[fieldName as any];

    if (!element) return null;

    if (element instanceof HTMLInputElement) {
        if (element.type === 'checkbox') {
            return element.checked;
        }
        if (element.type === 'number') {
            return Number(element.value);
        }
        return element.value;
    } else if (element instanceof HTMLTextAreaElement) {
        return element.value;
    } else if (element instanceof HTMLSelectElement) {
        return element.value;
    }

    return null;
}

/**
 * Set a single form field value
 */
export function setFieldValue(formId: string, fieldName: string, value: any) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const element = form.elements[fieldName as any];

    if (!element) return;

    if (element instanceof HTMLInputElement) {
        if (element.type === 'checkbox') {
            element.checked = Boolean(value);
        } else if (element.type !== 'file') {
            element.value = value?.toString() || '';
        }
    } else if (element instanceof HTMLTextAreaElement) {
        element.value = value?.toString() || '';
    } else if (element instanceof HTMLSelectElement) {
        element.value = value?.toString() || '';
    }
}

/**
 * Disable all form fields
 */
export function disableForm(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        element.disabled = true;
    }
}

/**
 * Enable all form fields
 */
export function enableForm(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        element.disabled = false;
    }
}

/**
 * Check if form has unsaved changes
 */
export function hasUnsavedChanges(formId: string, originalValues: Record<string, any>): boolean {
    const currentValues = getFormValues(formId);

    return Object.keys(originalValues).some(key => {
        return originalValues[key] !== currentValues[key];
    });
}

/**
 * Add unsaved changes warning
 */
export function addUnsavedChangesWarning(formId: string, originalValues: Record<string, any>) {
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges(formId, originalValues)) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

/**
 * Show field error
 */
export function showFieldError(formId: string, fieldName: string, errorMessage: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const element = form.elements[fieldName as any];
    if (!element) return;

    // Add error class
    element.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    element.classList.remove('border-gray-300', 'focus:border-sky-500', 'focus:ring-sky-500');

    // Create or update error message
    let errorEl = element.parentElement?.querySelector('.field-error');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'field-error text-sm text-red-600 mt-1';
        element.parentElement?.appendChild(errorEl);
    }
    errorEl.textContent = errorMessage;
}

/**
 * Clear field error
 */
export function clearFieldError(formId: string, fieldName: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const element = form.elements[fieldName as any];
    if (!element) return;

    // Remove error class
    element.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    element.classList.add('border-gray-300', 'focus:border-sky-500', 'focus:ring-sky-500');

    // Remove error message
    const errorEl = element.parentElement?.querySelector('.field-error');
    errorEl?.remove();
}

/**
 * Clear all field errors
 */
export function clearAllFieldErrors(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(el => el.remove());

    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        element.classList.add('border-gray-300', 'focus:border-sky-500', 'focus:ring-sky-500');
    }
}
