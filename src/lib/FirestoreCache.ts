/**
 * Firestore Cache Manager
 * 
 * Reduces Firestore reads by caching documents in memory with TTL.
 * Automatically invalidates cache on writes.
 * 
 * @example
 * ```typescript
 * import { CachedFirestore } from './FirestoreCache';
 * 
 * const cache = new CachedFirestore();
 * const data = await cache.getDocument('content', 'hero');
 * await cache.setDocument('content', 'hero', newData);
 * ```
 */

interface CacheEntry<T = any> {
    data: T;
    timestamp: number;
}

interface CacheOptions {
    /** Time-to-live in milliseconds (default: 5 minutes) */
    ttl?: number;
    /** Enable console logging for cache hits/misses */
    debug?: boolean;
}

export class FirestoreCache {
    private cache: Map<string, CacheEntry> = new Map();
    private ttl: number;
    private debug: boolean;

    constructor(options: CacheOptions = {}) {
        this.ttl = options.ttl || 5 * 60 * 1000; // 5 minutes default
        this.debug = options.debug || false;
    }

    /**
     * Generate cache key from collection and document ID
     */
    private getCacheKey(collection: string, docId: string): string {
        return `${collection}/${docId}`;
    }

    /**
     * Check if cache entry is still valid
     */
    private isValid(entry: CacheEntry): boolean {
        return Date.now() - entry.timestamp < this.ttl;
    }

    /**
     * Get cached data if available and valid
     */
    get<T = any>(collection: string, docId: string): T | null {
        const key = this.getCacheKey(collection, docId);
        const entry = this.cache.get(key);

        if (!entry) {
            if (this.debug) console.log(`[Cache MISS] ${key}`);
            return null;
        }

        if (!this.isValid(entry)) {
            if (this.debug) console.log(`[Cache EXPIRED] ${key}`);
            this.cache.delete(key);
            return null;
        }

        if (this.debug) console.log(`[Cache HIT] ${key}`);
        return entry.data as T;
    }

    /**
     * Store data in cache
     */
    set<T = any>(collection: string, docId: string, data: T): void {
        const key = this.getCacheKey(collection, docId);
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
        if (this.debug) console.log(`[Cache SET] ${key}`);
    }

    /**
     * Invalidate specific cache entry
     */
    invalidate(collection: string, docId: string): void {
        const key = this.getCacheKey(collection, docId);
        this.cache.delete(key);
        if (this.debug) console.log(`[Cache INVALIDATE] ${key}`);
    }

    /**
     * Invalidate all cache entries for a collection
     */
    invalidateCollection(collection: string): void {
        const keysToDelete: string[] = [];
        this.cache.forEach((_, key) => {
            if (key.startsWith(`${collection}/`)) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach((key) => this.cache.delete(key));
        if (this.debug) console.log(`[Cache INVALIDATE COLLECTION] ${collection} (${keysToDelete.length} entries)`);
    }

    /**
     * Clear all cache
     */
    clear(): void {
        const size = this.cache.size;
        this.cache.clear();
        if (this.debug) console.log(`[Cache CLEAR] Cleared ${size} entries`);
    }

    /**
     * Get cache statistics
     */
    getStats(): { size: number; keys: string[] } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys()),
        };
    }
}

/**
 * Global cache instance
 */
export const firestoreCache = new FirestoreCache({
    ttl: 5 * 60 * 1000, // 5 minutes
    debug: import.meta.env.DEV, // Enable debug in development
});

/**
 * Cached wrapper for getDocument
 * 
 * @example
 * ```typescript
 * const data = await getCachedDocument('content', 'hero');
 * ```
 */
export async function getCachedDocument<T = any>(
    collection: string,
    docId: string,
    options: { skipCache?: boolean } = {}
): Promise<T | null> {
    // Check cache first
    if (!options.skipCache) {
        const cached = firestoreCache.get<T>(collection, docId);
        if (cached !== null) {
            return cached;
        }
    }

    // Import dynamically to avoid circular dependency
    const { getDocument } = await import('./firestore');
    const result = await getDocument(collection, docId);

    if (result.success && result.data) {
        // Store in cache
        firestoreCache.set(collection, docId, result.data);
        return result.data as T;
    }

    return null;
}

/**
 * Cached wrapper for setDocument
 * Automatically invalidates cache after write
 * 
 * @example
 * ```typescript
 * await setCachedDocument('content', 'hero', data);
 * ```
 */
export async function setCachedDocument(
    collection: string,
    docId: string,
    data: any,
    merge: boolean = true
): Promise<{ success: boolean; error?: any }> {
    const { setDocument } = await import('./firestore');
    const result = await setDocument(collection, docId, data, merge);

    if (result.success) {
        // Invalidate cache after successful write
        firestoreCache.invalidate(collection, docId);
    }

    return result;
}
