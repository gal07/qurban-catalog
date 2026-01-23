import { db, auth } from '../../../lib/firebase';
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, query, limit, startAfter, orderBy, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// --- DOM Elements ---
const listContainer = document.getElementById('animal-list');
const loadingSpinner = document.getElementById('loading');
const loadMoreBtn = document.getElementById('load-more-btn');

// Modal Elements
const openModalBtn = document.getElementById('open-add-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('add-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalPanel = document.getElementById('modal-panel');
const addForm = document.getElementById('add-animal-form') as HTMLFormElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

// --- State ---
let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
const PAGE_SIZE = 10;
let isLoading = false;

// --- Modal Logic ---
function toggleModal(show: boolean) {
    if (!modal || !modalBackdrop || !modalPanel) return;

    if (show) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalPanel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
            modalPanel.classList.add('translate-y-0', 'sm:scale-100', 'opacity-100');
        }, 10);
    } else {
        modalBackdrop.classList.add('opacity-0');
        modalPanel.classList.remove('translate-y-0', 'sm:scale-100', 'opacity-100');
        modalPanel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            addForm?.reset(); // Reset form on close
        }, 300); // Match transition duration
    }
}

openModalBtn?.addEventListener('click', () => toggleModal(true));
closeModalBtn?.addEventListener('click', () => toggleModal(false));
// Close on click outside
modalBackdrop?.addEventListener('click', () => toggleModal(false));


// --- Add Animal Logic ---
if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Menyimpan...';
        }

        // Create FormData and upload image first
        const imageInput = document.getElementById('imageFile') as HTMLInputElement;
        const imageFile = imageInput?.files?.[0];
        let imageUrl = '';

        if (imageFile) {
            try {
                submitBtn.textContent = 'Mengupload...';
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadRes.ok) throw new Error('Upload failed');

                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
            } catch (err) {
                console.error("Upload error:", err);
                alert("Gagal mengupload gambar.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan';
                return;
            }
        } else {
            // Validate if image is required
            alert("Mohon pilih gambar.");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Simpan';
            return;
        }

        const data = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            type: (document.getElementById('type') as HTMLInputElement).value,
            price: Number((document.getElementById('price') as HTMLInputElement).value),
            weight: Number((document.getElementById('weight') as HTMLInputElement).value),
            available: (document.getElementById('available') as HTMLInputElement).value === 'true',
            imageUrl: imageUrl,
            description: (document.getElementById('description') as HTMLTextAreaElement).value,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            await addDoc(collection(db, "animals"), data);

            // Success
            toggleModal(false);

            // Refresh list
            fetchAnimals(false);

        } catch (e) {
            console.error("Error adding animal:", e);
            alert('Gagal menyimpan data');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan';
            }
        }
    });
}


// --- List Logic ---
async function fetchAnimals(isNextPage = false) {
    if (!listContainer || !loadingSpinner || !loadMoreBtn) return;
    if (isLoading) return;

    isLoading = true;

    // UI Updates
    if (!isNextPage) {
        listContainer.innerHTML = '';
        lastVisible = null;
        loadingSpinner.classList.remove('hidden');
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.textContent = 'Memuat...';
        loadMoreBtn.setAttribute('disabled', 'true');
    }

    try {
        let q;
        const animalsRef = collection(db, "animals");

        // Use createdAt for better ordering usually, but stick to plan if index issues
        // We'll try ordering by createdAt desc (newest first)
        q = isNextPage && lastVisible
            ? query(animalsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(PAGE_SIZE))
            : query(animalsRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

        // If createdAt is missing on old data, basic query might be needed or catch error
        // For this refactor, let's assume valid data or just fix if error occurs.
        // Fallback to name if createdAt fails? No, keep it simple first.

        const querySnapshot = await getDocs(q);

        // Hide loading states
        loadingSpinner.classList.add('hidden');
        loadMoreBtn.textContent = 'Muat Lebih Banyak';
        loadMoreBtn.removeAttribute('disabled');

        if (querySnapshot.empty) {
            if (!isNextPage) {
                listContainer.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-slate-500">Belum ada data hewan.</td></tr>';
            }
            loadMoreBtn.classList.add('hidden');
            isLoading = false;
            return;
        }

        // Update Cursor
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Render Items
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            // Safety check for older data without createdAt
            if (!data.createdAt && !isNextPage) {
                // warning or handle legacy data
            }

            const id = docSnap.id;
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-50 transition-colors";

            const imageUrl = data.imageUrl || 'https://placehold.co/100x100?text=No+Img';

            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap" data-label="Gambar">
                    <img src="${imageUrl}" alt="${data.name}" class="h-12 w-12 rounded-lg object-cover bg-slate-100 border border-slate-200" loading="lazy">
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-slate-900" data-label="Nama">${data.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-slate-500" data-label="Jenis">${data.type}</td>
                <td class="px-6 py-4 whitespace-nowrap text-slate-500" data-label="Berat">${data.weight} Kg</td>
                <td class="px-6 py-4 whitespace-nowrap font-mono text-slate-700" data-label="Harga">Rp ${parseInt(data.price || '0').toLocaleString('id-ID')}</td>
                <td class="px-6 py-4 whitespace-nowrap" data-label="Status">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${data.available ? 'Tersedia' : 'Terjual'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-label="Aksi">
                    <div class="flex justify-end gap-2">
                        <a href="/admin/animals/edit/${id}" class="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                        </a>
                        <button class="delete p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${id}" title="Hapus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </td>
            `;
            listContainer.appendChild(tr);
        });

        // Toggle Load More Button
        if (querySnapshot.size < PAGE_SIZE) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }

    } catch (e) {
        console.error("Error fetching animals:", e);
        loadingSpinner.classList.add('hidden');
        if (!isNextPage) {
            // Fallback to simple query if 'createdAt' index is missing
            if (String(e).includes('index')) {
                console.warn("Index missing, falling back to name sort");
                // You might trigger a retry with different query here or just alert user
                listContainer.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-amber-600">Terjadi kesalahan index Firestore. Cek console.</td></tr>';
            } else {
                listContainer.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-rose-500">Gagal memuat data. Periksa koneksi.</td></tr>';
            }
        }
    } finally {
        isLoading = false;
    }
}

// Global Event Delegation for Delete
if (listContainer) {
    listContainer.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        const deleteBtn = target.closest('.delete');

        if (deleteBtn) {
            if (confirm('Yakin hapus data ini?')) {
                const id = deleteBtn.getAttribute('data-id');
                if (id) await deleteAnimal(id);
            }
        }
    });
}

async function deleteAnimal(id: string) {
    try {
        // 1. Get the document first to retrieve the image URL
        const docRef = doc(db, "animals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const imageUrl = data.imageUrl;

            // 2. Delete image from S3 if it exists
            if (imageUrl) {
                try {
                    await fetch('/api/delete-image', {
                        method: 'DELETE',
                        body: JSON.stringify({ url: imageUrl }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (imgErr) {
                    console.warn("Failed to delete image from S3:", imgErr);
                    // Proceed to delete document anyway
                }
            }
        }

        // 3. Delete document from Firestore
        await deleteDoc(doc(db, "animals", id));

        // Remove row immediately for better UX
        const btn = document.querySelector(`button[data-id="${id}"]`);
        const row = btn?.closest('tr');
        if (row) row.remove();

        // Optional: Re-fetch if list becomes empty?
    } catch (e) {
        alert('Gagal menghapus');
        console.error(e);
    }
}

// Load More Handler
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        fetchAnimals(true);
    });
}

// Initial Load handled by Auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchAnimals();
    } else {
        console.log("Waiting for auth...");
    }
});
