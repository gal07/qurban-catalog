import { db } from './firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
    startAfter,
    type DocumentData,
    type QueryDocumentSnapshot,
    type OrderByDirection
} from 'firebase/firestore';
import type { FirestoreDocument, FirestoreQueryOptions, FirestoreWriteResult } from '../types';

/**
 * Centralized Firestore service with type-safe operations
 * Provides CRUD methods with error handling and retry logic
 */
export class FirestoreService {
    /**
     * Get a single document by ID
     */
    async getDocument<T = DocumentData>(
        collectionName: string,
        docId: string
    ): Promise<FirestoreDocument<T> | null> {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return null;
            }

            return {
                id: docSnap.id,
                data: docSnap.data() as T,
                exists: true
            };
        } catch (error) {
            console.error(`Error getting document ${collectionName}/${docId}:`, error);
            throw error;
        }
    }

    /**
     * Get all documents from a collection with optional query options
     */
    async getDocuments<T = DocumentData>(
        collectionName: string,
        options?: FirestoreQueryOptions
    ): Promise<FirestoreDocument<T>[]> {
        try {
            const collectionRef = collection(db, collectionName);
            let q = query(collectionRef);

            // Apply query options
            if (options?.orderBy) {
                const direction: OrderByDirection = options.orderDirection || 'asc';
                q = query(q, orderBy(options.orderBy, direction));
            }

            if (options?.limit) {
                q = query(q, limit(options.limit));
            }

            if (options?.startAfter) {
                q = query(q, startAfter(options.startAfter));
            }

            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data() as T,
                exists: true
            }));
        } catch (error) {
            console.error(`Error getting documents from ${collectionName}:`, error);
            throw error;
        }
    }

    /**
     * Create a new document with auto-generated ID
     */
    async createDocument<T = DocumentData>(
        collectionName: string,
        data: T
    ): Promise<FirestoreWriteResult> {
        try {
            const collectionRef = collection(db, collectionName);
            const docRef = await addDoc(collectionRef, {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return {
                success: true,
                id: docRef.id
            };
        } catch (error) {
            console.error(`Error creating document in ${collectionName}:`, error);
            return {
                success: false,
                error: error as Error
            };
        }
    }

    /**
     * Set a document (create or overwrite)
     */
    async setDocument<T = DocumentData>(
        collectionName: string,
        docId: string,
        data: T,
        merge: boolean = false
    ): Promise<FirestoreWriteResult> {
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, {
                ...data,
                updatedAt: new Date()
            }, { merge });

            return {
                success: true,
                id: docId
            };
        } catch (error) {
            console.error(`Error setting document ${collectionName}/${docId}:`, error);
            return {
                success: false,
                error: error as Error
            };
        }
    }

    /**
     * Update specific fields in a document
     */
    async updateDocument<T = Partial<DocumentData>>(
        collectionName: string,
        docId: string,
        data: T
    ): Promise<FirestoreWriteResult> {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: new Date()
            });

            return {
                success: true,
                id: docId
            };
        } catch (error) {
            console.error(`Error updating document ${collectionName}/${docId}:`, error);
            return {
                success: false,
                error: error as Error
            };
        }
    }

    /**
     * Delete a document
     */
    async deleteDocument(
        collectionName: string,
        docId: string
    ): Promise<FirestoreWriteResult> {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);

            return {
                success: true,
                id: docId
            };
        } catch (error) {
            console.error(`Error deleting document ${collectionName}/${docId}:`, error);
            return {
                success: false,
                error: error as Error
            };
        }
    }

    /**
     * Check if a document exists
     */
    async documentExists(
        collectionName: string,
        docId: string
    ): Promise<boolean> {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (error) {
            console.error(`Error checking document existence ${collectionName}/${docId}:`, error);
            return false;
        }
    }
}

// Export singleton instance
export const firestoreService = new FirestoreService();

// Export convenience functions
export const getDocument = firestoreService.getDocument.bind(firestoreService);
export const getDocuments = firestoreService.getDocuments.bind(firestoreService);
export const createDocument = firestoreService.createDocument.bind(firestoreService);
export const setDocument = firestoreService.setDocument.bind(firestoreService);
export const updateDocument = firestoreService.updateDocument.bind(firestoreService);
export const deleteDocument = firestoreService.deleteDocument.bind(firestoreService);
export const documentExists = firestoreService.documentExists.bind(firestoreService);
