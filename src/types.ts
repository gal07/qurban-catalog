import type { Timestamp } from 'firebase/firestore';

// ============================================================================
// ANIMAL TYPES
// ============================================================================

export interface Animal {
    id?: string;
    name: string;
    name_en?: string;
    description: string;
    description_en?: string;
    price: number;
    weight: number;
    type: "Sapi" | "Kambing" | "Domba";
    imageUrl: string;
    urlCampaign?: string;
    available: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// ============================================================================
// CONTENT TYPES
// ============================================================================

export interface LocalizedField {
    id: string;
    en?: string;
}

export interface HeroData {
    badge: string;
    badge_en?: string;
    title: string;
    title_en?: string;
    titleHighlight: string;
    titleHighlight_en?: string;
    description: string;
    description_en?: string;
    image?: string;
    features: string[]; // Legacy array of strings
    catalogSubtitle?: string;
    catalogSubtitle_en?: string;
    catalogTitle?: string;
    catalogTitle_en?: string;
}

export interface ContactData {
    address: string;
    address_en?: string;
    phone: string;
    email: string;
    updatedAt?: string;
}

export interface FooterData {
    description: string;
    description_en?: string;
    bottom: string;
    bottom_en?: string;
    updatedAt?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface SocialData {
    links: SocialLink[];
    updatedAt?: string;
}

export interface HowToBuyData {
    steps: string[];
    steps_en?: string[];
    updatedAt?: string;
}

export interface SedekahDagingData {
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    features: string[];
    features_en?: string[];
    updatedAt?: string;
}

// ============================================================================
// SETTINGS TYPES
// ============================================================================

export interface Settings {
    waNumber: string;
    waTemplate: string;
}

export interface WhatsAppSettings {
    whatsappNumber: string;
    messageTemplate_id: string;
    messageTemplate_en: string;
    messageTemplate?: string; // Legacy field
}

export interface ThemeSettings {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
}

export interface LogoSettings {
    url: string;
    updatedAt?: Date;
}

export interface SEOSettings {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    updatedAt?: Date;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'email' | 'tel' | 'url' | 'number' | 'color' | 'file';
    required?: boolean;
    placeholder?: string;
    localized?: boolean; // Has ID/EN versions
    rows?: number; // For textarea
    accept?: string; // For file input
    min?: number; // For number input
    max?: number; // For number input
}

export interface FormState {
    isLoading: boolean;
    isSaving: boolean;
    isDirty: boolean;
    errors: Record<string, string>;
    values: Record<string, any>;
}

export interface ValidationRule {
    type: 'required' | 'email' | 'url' | 'min' | 'max' | 'pattern';
    value?: any;
    message: string;
}

export interface FieldValidation {
    field: string;
    rules: ValidationRule[];
}

// ============================================================================
// FIRESTORE TYPES
// ============================================================================

export interface FirestoreDocument<T = any> {
    id: string;
    data: T;
    exists: boolean;
}

export interface FirestoreQueryOptions {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    limit?: number;
    startAfter?: any;
}

export interface FirestoreWriteResult {
    success: boolean;
    id?: string;
    error?: Error;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface UploadResponse {
    url: string;
    success: boolean;
    error?: string;
}

export interface DeleteImageResponse {
    success: boolean;
    error?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export interface ErrorContext {
    component?: string;
    action?: string;
    userId?: string;
    timestamp: Date;
}
