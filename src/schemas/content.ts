import type { FieldValidation } from '../types';
import { required, min, max, email, phoneNumber } from '../lib/validation';

/**
 * Content validation schemas for admin forms
 * Each schema defines validation rules for a specific content type
 */

// ============================================================================
// HERO CONTENT SCHEMA
// ============================================================================

export const heroContentSchema: FieldValidation[] = [
    {
        field: 'badge',
        rules: [required('Badge wajib diisi'), min(3, 'Badge minimal 3 karakter')]
    },
    {
        field: 'title',
        rules: [required('Title wajib diisi'), min(5, 'Title minimal 5 karakter')]
    },
    {
        field: 'titleHighlight',
        rules: [required('Title highlight wajib diisi'), min(3, 'Title highlight minimal 3 karakter')]
    },
    {
        field: 'description',
        rules: [required('Deskripsi wajib diisi'), min(20, 'Deskripsi minimal 20 karakter')]
    },
    {
        field: 'catalogTitle',
        rules: [required('Catalog title wajib diisi'), min(3, 'Catalog title minimal 3 karakter')]
    },
    {
        field: 'catalogSubtitle',
        rules: [required('Catalog subtitle wajib diisi'), min(10, 'Catalog subtitle minimal 10 karakter')]
    }
];

// ============================================================================
// CONTACT CONTENT SCHEMA
// ============================================================================

export const contactContentSchema: FieldValidation[] = [
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

// ============================================================================
// FOOTER CONTENT SCHEMA
// ============================================================================

export const footerContentSchema: FieldValidation[] = [
    {
        field: 'description',
        rules: [required('Deskripsi wajib diisi'), min(20, 'Deskripsi minimal 20 karakter')]
    },
    {
        field: 'bottom',
        rules: [required('Teks bawah wajib diisi'), min(5, 'Teks bawah minimal 5 karakter')]
    }
];

// ============================================================================
// SOCIAL LINKS SCHEMA
// ============================================================================

export const socialLinkSchema: FieldValidation[] = [
    {
        field: 'platform',
        rules: [required('Platform wajib dipilih')]
    },
    {
        field: 'url',
        rules: [required('URL wajib diisi'), min(10, 'URL minimal 10 karakter')]
    }
];

// ============================================================================
// HOW TO BUY CONTENT SCHEMA
// ============================================================================

export const howToBuyContentSchema: FieldValidation[] = [
    // Steps are dynamic arrays, validated separately
];

// ============================================================================
// SEDEKAH DAGING CONTENT SCHEMA
// ============================================================================

export const sedekahDagingContentSchema: FieldValidation[] = [
    {
        field: 'title',
        rules: [required('Title wajib diisi'), min(5, 'Title minimal 5 karakter')]
    },
    {
        field: 'description',
        rules: [required('Deskripsi wajib diisi'), min(20, 'Deskripsi minimal 20 karakter')]
    }
    // Features are dynamic arrays, validated separately
];

// ============================================================================
// SCHEMA REGISTRY
// ============================================================================

/**
 * Registry of all content schemas by document ID
 * Makes it easy to retrieve the correct schema for a content type
 */
export const contentSchemas: Record<string, FieldValidation[]> = {
    'hero': heroContentSchema,
    'hubungi_kami': contactContentSchema,
    'footer': footerContentSchema,
    'social': socialLinkSchema,
    'how_to_buy': howToBuyContentSchema,
    'sedekah_daging': sedekahDagingContentSchema
};

/**
 * Get validation schema for a content type
 */
export function getContentSchema(documentId: string): FieldValidation[] | undefined {
    return contentSchemas[documentId];
}
