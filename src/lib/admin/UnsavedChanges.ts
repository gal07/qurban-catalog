import { showToast } from "../toast";

/**
 * Unsaved Changes Manager
 * Tracks form changes and warns users before leaving with unsaved data
 * 
 * @example
 * ```typescript
 * const unsavedChanges = new UnsavedChangesManager(form);
 * unsavedChanges.start();
 * 
 * // Mark as saved after successful save
 * unsavedChanges.markAsSaved();
 * ```
 */
export class UnsavedChangesManager {
    private form: HTMLFormElement;
    private isDirty: boolean = false;
    private originalData: string = '';
    private isEnabled: boolean = true;

    /**
     * Create an UnsavedChanges manager
     * @param form - The form element to track
     */
    constructor(form: HTMLFormElement) {
        this.form = form;
        this.captureOriginalData();
    }

    /**
     * Capture the original form data
     */
    private captureOriginalData(): void {
        const formData = new FormData(this.form);
        const data: Record<string, any> = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        this.originalData = JSON.stringify(data);
    }

    /**
     * Start tracking changes
     */
    start(): void {
        // Track form changes
        this.form.addEventListener('input', () => {
            this.checkIfDirty();
        });

        this.form.addEventListener('change', () => {
            this.checkIfDirty();
        });

        // Browser navigation warning
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        // Astro View Transitions warning
        document.addEventListener('astro:before-swap', this.handleAstroNavigation);
    }

    /**
     * Stop tracking changes
     */
    stop(): void {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        document.removeEventListener('astro:before-swap', this.handleAstroNavigation);
    }

    /**
     * Check if form data has changed
     */
    private checkIfDirty(): void {
        const formData = new FormData(this.form);
        const data: Record<string, any> = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const currentData = JSON.stringify(data);
        this.isDirty = currentData !== this.originalData;
    }

    /**
     * Handle browser navigation
     */
    private handleBeforeUnload = (e: BeforeUnloadEvent): string | undefined => {
        if (this.isDirty && this.isEnabled) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
        return undefined;
    };

    /**
     * Handle Astro View Transitions navigation
     */
    private handleAstroNavigation = (e: Event): void => {
        if (this.isDirty && this.isEnabled) {
            const confirmed = confirm('You have unsaved changes. Are you sure you want to leave?');
            if (!confirmed) {
                e.preventDefault();
            }
        }
    };

    /**
     * Mark form as saved (resets dirty state)
     */
    markAsSaved(): void {
        this.captureOriginalData();
        this.isDirty = false;
    }

    /**
     * Check if form has unsaved changes
     */
    hasUnsavedChanges(): boolean {
        return this.isDirty;
    }

    /**
     * Temporarily disable warnings (useful during save operation)
     */
    disable(): void {
        this.isEnabled = false;
    }

    /**
     * Re-enable warnings
     */
    enable(): void {
        this.isEnabled = true;
    }

    /**
     * Reset to original state
     */
    reset(): void {
        this.isDirty = false;
        this.captureOriginalData();
    }
}
