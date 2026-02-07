/**
 * Get the current language from the cookie string or document.cookie.
 * @param cookieString explicit cookie string (server-side) or null for client-side
 * @returns 'id' or 'en'
 */
export const getLanguage = (cookieString?: string | null): "id" | "en" => {
    let cookies = cookieString;
    if (typeof document !== "undefined" && !cookies) {
        cookies = document.cookie;
    }
    if (!cookies) return "id";

    const parts = cookies.split(`; app_lang=`);
    if (parts.length === 2) {
        const val = parts.pop()?.split(";").shift();
        return val === "en" ? "en" : "id";
    }
    return "id";
};

/**
 * Get localized content from a data object.
 * Logic:
 * 1. If lang is 'en', try `key_en`, then `key_id`, then `key`.
 * 2. If lang is 'id', try `key_id`, then `key`.
 * @param data The object containing data (e.g., Firestore doc data)
 * @param key The base key (e.g., 'title')
 * @param lang The language code ('id' or 'en')
 */
export const getLocalizedContent = (data: any, key: string, lang: string): string => {
    if (lang === "en") {
        return data[`${key}_en`] || data[`${key}_id`] || data[key] || "";
    }
    return data[`${key}_id`] || data[key] || "";
};
