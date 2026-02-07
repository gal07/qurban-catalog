/**
 * AutoSave Manager
 * Automatically saves form data to localStorage to prevent data loss
 * 
 * @example
 * ```typescript
 * const autoSave = new AutoSaveManager('contact-form', form);
 * autoSave.start();
 * 
 * // Restore draft on load
 * const draft = autoSave.restoreDraft();
 * if (draft) {
 *   // populate form with draft data
 * }
 * 
 * // Clear draft after successful save
 * autoSave.clearDraft();
 * ```
 */
export class AutoSaveManager {
    private storageKey: string;
    private form: HTMLFormElement;
    private saveInterval: number;
    private intervalId: number | null = null;
    private lastSavedData: string = '';

    /**
     * Create an AutoSave manager
     * @param pageId - Unique identifier for the page (e.g., 'contact-form', 'hero-form')
     * @param form - The form element to auto-save
     * @param saveInterval - How often to save in milliseconds (default: 3000ms = 3s)
     */
    constructor(pageId: string, form: HTMLFormElement, saveInterval: number = 3000) {
        this.storageKey = `admin-draft-${pageId}`;
        this.form = form;
        this.saveInterval = saveInterval;
    }

    /**
     * Start auto-saving the form
     */
    start(): void {
        // Initial save
        this.saveDraft();

        // Set up interval
        this.intervalId = window.setInterval(() => {
            this.saveDraft();
        }, this.saveInterval);

        // Save on form change (debounced by interval)
        this.form.addEventListener('input', () => {
            // The interval will handle the actual save
        });
    }

    /**
     * Stop auto-saving
     */
    stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Save current form data to localStorage
     */
    private saveDraft(): void {
        const formData = new FormData(this.form);
        const data: Record<string, any> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            if (data[key]) {
                // Handle multiple values (arrays)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        const dataString = JSON.stringify(data);

        // Only save if data has changed
        if (dataString !== this.lastSavedData) {
            try {
                localStorage.setItem(this.storageKey, dataString);
                localStorage.setItem(`${this.storageKey}-timestamp`, Date.now().toString());
                this.lastSavedData = dataString;
            } catch (error) {
                console.error('Failed to save draft:', error);
            }
        }
    }

    /**
     * Restore draft from localStorage
     * @returns The draft data or null if no draft exists
     */
    restoreDraft(): Record<string, any> | null {
        try {
            const draft = localStorage.getItem(this.storageKey);
            if (!draft) return null;

            const timestamp = localStorage.getItem(`${this.storageKey}-timestamp`);
            const data = JSON.parse(draft);

            // Check if draft is older than 7 days
            if (timestamp) {
                const age = Date.now() - parseInt(timestamp);
                const sevenDays = 7 * 24 * 60 * 60 * 1000;
                if (age > sevenDays) {
                    this.clearDraft();
                    return null;
                }
            }

            return data;
        } catch (error) {
            console.error('Failed to restore draft:', error);
            return null;
        }
    }

    /**
     * Clear the saved draft
     */
    clearDraft(): void {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(`${this.storageKey}-timestamp`);
            this.lastSavedData = '';
        } catch (error) {
            console.error('Failed to clear draft:', error);
        }
    }

    /**
     * Check if a draft exists
     */
    hasDraft(): boolean {
        return localStorage.getItem(this.storageKey) !== null;
    }

    /**
     * Get draft age in milliseconds
     */
    getDraftAge(): number | null {
        const timestamp = localStorage.getItem(`${this.storageKey}-timestamp`);
        if (!timestamp) return null;
        return Date.now() - parseInt(timestamp);
    }

    /**
     * Format draft age as human-readable string
     */
    getDraftAgeString(): string | null {
        const age = this.getDraftAge();
        if (age === null) return null;

        const seconds = Math.floor(age / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'just now';
    }
}
