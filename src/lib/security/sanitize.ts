/**
 * Input Sanitization Utilities
 * 
 * Prevents XSS attacks by sanitizing user input before rendering.
 * Use these functions whenever displaying user-generated content.
 * 
 * @example
 * ```typescript
 * import { sanitizeHTML, sanitizeURL } from './sanitize';
 * 
 * // Safe text rendering
 * div.innerHTML = `<p>${sanitizeHTML(userInput)}</p>`;
 * 
 * // Safe URL rendering
 * link.href = sanitizeURL(userURL);
 * ```
 */

/**
 * Sanitize HTML string to prevent XSS attacks
 * Converts HTML special characters to entities
 * 
 * @param input - User input string
 * @returns Sanitized string safe for innerHTML
 */
export function sanitizeHTML(input: string | null | undefined): string {
    if (!input) return '';

    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Sanitize URL to prevent javascript: and data: protocol attacks
 * 
 * @param url - URL string to sanitize
 * @returns Safe URL or empty string if dangerous
 */
export function sanitizeURL(url: string | null | undefined): string {
    if (!url) return '';

    const trimmed = url.trim().toLowerCase();

    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    for (const protocol of dangerousProtocols) {
        if (trimmed.startsWith(protocol)) {
            console.warn(`Blocked dangerous URL protocol: ${protocol}`);
            return '';
        }
    }

    return url;
}

/**
 * Create a safe HTML element with text content
 * Safer alternative to innerHTML for simple elements
 * 
 * @param tag - HTML tag name
 * @param textContent - Text content (will be escaped)
 * @param className - Optional CSS class
 * @returns HTMLElement
 */
export function createSafeElement(
    tag: string,
    textContent: string,
    className?: string
): HTMLElement {
    const el = document.createElement(tag);
    el.textContent = textContent; // Safe - no HTML parsing
    if (className) el.className = className;
    return el;
}

/**
 * Sanitize filename to prevent path traversal attacks
 * 
 * @param filename - Filename to sanitize
 * @returns Safe filename
 */
export function sanitizeFilename(filename: string | null | undefined): string {
    if (!filename) return 'untitled';

    // Remove path separators and special characters
    return filename
        .replace(/[\/\\]/g, '')
        .replace(/[<>:"|?*]/g, '')
        .trim() || 'untitled';
}

/**
 * Format file size safely
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string
 */
export function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes || bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
