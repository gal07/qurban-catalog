import { getDocument, setDocument } from '../firestore';
import { FormStateManager, getFormValues, setFormValues } from '../forms';
import { validateSchema } from '../validation';
import { showToast } from '../toast';
import type { FieldValidation } from '../../types';

/**
 * Content Form Manager - Unified form handling for admin content pages
 * Handles loading, saving, validation, and state management
 */
export class ContentFormManager {
    private formId: string;
    private collectionName: string;
    private documentId: string;
    private validationSchema?: FieldValidation[];
    private formStateManager: FormStateManager;
    private originalValues: Record<string, any> = {};
    private onLoadCallback?: (data: any) => void;
    private onSaveCallback?: (data: any) => any;

    constructor(config: {
        formId: string;
        collectionName: string;
        documentId: string;
        validationSchema?: FieldValidation[];
        onLoad?: (data: any) => void;
        onSave?: (data: any) => any;
    }) {
        this.formId = config.formId;
        this.collectionName = config.collectionName;
        this.documentId = config.documentId;
        this.validationSchema = config.validationSchema;
        this.onLoadCallback = config.onLoad;
        this.onSaveCallback = config.onSave;
        this.formStateManager = new FormStateManager(this.formId);
    }

    /**
     * Initialize the form - load data and setup event handlers
     */
    async init() {
        await this.loadData();
        this.setupFormHandlers();
    }

    /**
     * Load data from Firestore and populate form
     */
    async loadData() {
        try {
            const result = await getDocument(this.collectionName, this.documentId);

            if (result && result.exists) {
                const data = result.data;
                setFormValues(this.formId, data);
                this.originalValues = { ...data };

                // Call custom onLoad callback if provided
                if (this.onLoadCallback) {
                    this.onLoadCallback(data);
                }
            }
        } catch (error) {
            console.error('Error loading data:', error);
            showToast('Gagal memuat data. Silakan coba lagi.', 'error');
        }
    }

    /**
     * Save form data to Firestore
     */
    async saveData() {
        try {
            this.formStateManager.setLoading('Menyimpan...');

            // Get form values
            const values = getFormValues(this.formId);

            // Validate if schema is provided
            if (this.validationSchema) {
                const validation = validateSchema(values, this.validationSchema);

                if (!validation.valid) {
                    // Show first error
                    const firstError = Object.values(validation.errors)[0];
                    showToast(firstError, 'error');
                    this.formStateManager.setIdle();
                    return false;
                }
            }

            // Call custom onSave callback if provided (for data transformation)
            let dataToSave = values;
            if (this.onSaveCallback) {
                const transformed = this.onSaveCallback(values);
                if (transformed) {
                    dataToSave = transformed;
                }
            }

            // Save to Firestore
            const result = await setDocument(
                this.collectionName,
                this.documentId,
                dataToSave,
                true // merge
            );

            if (result.success) {
                showToast('Data berhasil disimpan!', 'success');
                this.originalValues = { ...values };
                this.formStateManager.setIdle();
                return true;
            } else {
                throw result.error || new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            showToast('Gagal menyimpan data: ' + (error as Error).message, 'error');
            this.formStateManager.setIdle();
            return false;
        }
    }

    /**
     * Setup form submit handler
     */
    private setupFormHandlers() {
        const form = document.getElementById(this.formId) as HTMLFormElement;
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveData();
        });
    }

    /**
     * Get current form values
     */
    getValues(): Record<string, any> {
        return getFormValues(this.formId);
    }

    /**
     * Set form values programmatically
     */
    setValues(values: Record<string, any>) {
        setFormValues(this.formId, values);
    }

    /**
     * Check if form has unsaved changes
     */
    hasUnsavedChanges(): boolean {
        const currentValues = this.getValues();
        return JSON.stringify(currentValues) !== JSON.stringify(this.originalValues);
    }

    /**
     * Reset form to original values
     */
    reset() {
        setFormValues(this.formId, this.originalValues);
    }
}

/**
 * Factory function to create and initialize a ContentFormManager
 */
export async function createContentForm(config: {
    formId: string;
    collectionName: string;
    documentId: string;
    validationSchema?: FieldValidation[];
    onLoad?: (data: any) => void;
    onSave?: (data: any) => any;
}): Promise<ContentFormManager> {
    const manager = new ContentFormManager(config);
    await manager.init();
    return manager;
}
