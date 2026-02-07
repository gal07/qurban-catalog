export interface Animal {
    id?: string;
    name: string;
    name_en?: string;
    description: string;
    description_en?: string;
    price: number;
    weight: number;
    type: "Sapi" | "Kambing";
    imageUrl: string;
    urlCampaign?: string;
    available: boolean;
    createdAt?: any; // Firestore Timestamp
    updatedAt?: any; // Firestore Timestamp
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

export interface Settings {
    waNumber: string;
    waTemplate: string;
}
