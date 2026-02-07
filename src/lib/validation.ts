import type { ValidationRule, FieldValidation } from '../types';

/**
 * Validation library with schema-based validation and reusable validators
 */

/**
 * Validate a single value against a rule
 */
export function validateRule(value: any, rule: ValidationRule): boolean {
    switch (rule.type) {
        case 'required':
            return value !== null && value !== undefined && value !== '';

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(String(value));

        case 'url':
            try {
                new URL(String(value));
                return true;
            } catch {
                return false;
            }

        case 'min':
            if (typeof value === 'number') {
                return value >= (rule.value as number);
            }
            if (typeof value === 'string') {
                return value.length >= (rule.value as number);
            }
            return false;

        case 'max':
            if (typeof value === 'number') {
                return value <= (rule.value as number);
            }
            if (typeof value === 'string') {
                return value.length <= (rule.value as number);
            }
            return false;

        case 'pattern':
            const regex = new RegExp(rule.value as string);
            return regex.test(String(value));

        default:
            return true;
    }
}

/**
 * Validate a field against multiple rules
 */
export function validateField(value: any, rules: ValidationRule[]): { valid: boolean; error?: string } {
    for (const rule of rules) {
        if (!validateRule(value, rule)) {
            return {
                valid: false,
                error: rule.message
            };
        }
    }

    return { valid: true };
}

/**
 * Validate multiple fields using a validation schema
 */
export function validateSchema(
    values: Record<string, any>,
    schema: FieldValidation[]
): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const fieldValidation of schema) {
        const value = values[fieldValidation.field];
        const result = validateField(value, fieldValidation.rules);

        if (!result.valid && result.error) {
            errors[fieldValidation.field] = result.error;
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

// ============================================================================
// REUSABLE VALIDATORS
// ============================================================================

/**
 * Required field validator
 */
export const required = (message: string = 'Field ini wajib diisi'): ValidationRule => ({
    type: 'required',
    message
});

/**
 * Email validator
 */
export const email = (message: string = 'Email tidak valid'): ValidationRule => ({
    type: 'email',
    message
});

/**
 * URL validator
 */
export const url = (message: string = 'URL tidak valid'): ValidationRule => ({
    type: 'url',
    message
});

/**
 * Minimum value/length validator
 */
export const min = (value: number, message?: string): ValidationRule => ({
    type: 'min',
    value,
    message: message || `Minimal ${value}`
});

/**
 * Maximum value/length validator
 */
export const max = (value: number, message?: string): ValidationRule => ({
    type: 'max',
    value,
    message: message || `Maksimal ${value}`
});

/**
 * Pattern validator
 */
export const pattern = (regex: string, message: string): ValidationRule => ({
    type: 'pattern',
    value: regex,
    message
});

/**
 * Phone number validator (Indonesian format)
 */
export const phoneNumber = (message: string = 'Nomor telepon tidak valid'): ValidationRule => ({
    type: 'pattern',
    value: '^(\\+62|62|0)[0-9]{9,12}$',
    message
});

/**
 * WhatsApp number validator (Indonesian format)
 */
export const whatsappNumber = (message: string = 'Nomor WhatsApp tidak valid (gunakan format 628xxx)'): ValidationRule => ({
    type: 'pattern',
    value: '^628[0-9]{9,12}$',
    message
});

// ============================================================================
// VALIDATION SCHEMAS FOR COMMON CONTENT TYPES
// ============================================================================

/**
 * Contact form validation schema
 */
export const contactValidationSchema: FieldValidation[] = [
    {
        field: 'address',
        rules: [required('Alamat wajib diisi'), min(10, 'Alamat minimal 10 karakter')]
    },
    {
        field: 'phone',
        rules: [required('Nomor telepon wajib diisi'), phoneNumber()]
    },
    {
        field: 'email',
        rules: [required('Email wajib diisi'), email()]
    }
];

/**
 * Footer form validation schema
 */
export const footerValidationSchema: FieldValidation[] = [
    {
        field: 'description',
        rules: [required('Deskripsi wajib diisi'), min(20, 'Deskripsi minimal 20 karakter')]
    },
    {
        field: 'bottom',
        rules: [required('Teks bawah wajib diisi')]
    }
];

/**
 * Social link validation schema
 */
export const socialLinkValidationSchema: FieldValidation[] = [
    {
        field: 'platform',
        rules: [required('Platform wajib dipilih')]
    },
    {
        field: 'url',
        rules: [required('URL wajib diisi'), url()]
    }
];

/**
 * WhatsApp settings validation schema
 */
export const whatsappSettingsValidationSchema: FieldValidation[] = [
    {
        field: 'whatsappNumber',
        rules: [required('Nomor WhatsApp wajib diisi'), whatsappNumber()]
    },
    {
        field: 'messageTemplate_id',
        rules: [required('Template pesan (ID) wajib diisi'), min(10, 'Template minimal 10 karakter')]
    }
];

/**
 * SEO settings validation schema
 */
export const seoValidationSchema: FieldValidation[] = [
    {
        field: 'title',
        rules: [required('Title wajib diisi'), min(10, 'Title minimal 10 karakter'), max(60, 'Title maksimal 60 karakter')]
    },
    {
        field: 'description',
        rules: [required('Description wajib diisi'), min(50, 'Description minimal 50 karakter'), max(160, 'Description maksimal 160 karakter')]
    },
    {
        field: 'keywords',
        rules: [required('Keywords wajib diisi')]
    }
];

/**
 * Animal form validation schema
 */
export const animalValidationSchema: FieldValidation[] = [
    {
        field: 'name',
        rules: [required('Nama hewan wajib diisi'), min(3, 'Nama minimal 3 karakter')]
    },
    {
        field: 'type',
        rules: [required('Jenis hewan wajib dipilih')]
    },
    {
        field: 'price',
        rules: [required('Harga wajib diisi'), min(0, 'Harga tidak boleh negatif')]
    },
    {
        field: 'weight',
        rules: [required('Berat wajib diisi'), min(0, 'Berat tidak boleh negatif')]
    },
    {
        field: 'description',
        rules: [required('Deskripsi wajib diisi'), min(20, 'Deskripsi minimal 20 karakter')]
    }
];
