import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const form = document.getElementById('seo-form') as HTMLFormElement;
const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
const statusMsg = document.getElementById('status-message');

// Inputs
const titleInput = document.getElementById('title') as HTMLInputElement;
const descInput = document.getElementById('description') as HTMLTextAreaElement;
const keywordsInput = document.getElementById('keywords') as HTMLInputElement;

// Image Handling
const fileInput = document.getElementById('ogFile') as HTMLInputElement;
const urlInput = document.getElementById('ogImage') as HTMLInputElement;
const previewImg = document.getElementById('image-preview') as HTMLImageElement;
const previewContainer = document.getElementById('image-preview-container');

// Load Data
async function loadData() {
    try {
        const docRef = doc(db, 'seo', 'landing');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            titleInput.value = data.title || '';
            descInput.value = data.description || '';
            keywordsInput.value = data.keywords || '';
            urlInput.value = data.ogImage || '';

            if (data.ogImage) {
                previewImg.src = data.ogImage;
                previewImg.classList.remove('hidden');
                previewContainer?.classList.remove('border-dashed');
            }
        }
    } catch (e) {
        console.error("Error loading SEO data:", e);
    }
}

// File Preview
fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (file) {
        // Preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target?.result as string;
            previewImg.classList.remove('hidden');
            previewContainer?.classList.remove('border-dashed');
        };
        reader.readAsDataURL(file);
    }
});

// Save Logic
form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Menyimpan...';
    }

    try {
        let imageUrl = urlInput.value;
        const file = fileInput.files?.[0];

        // Upload image if new file selected
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) throw new Error('Failed to upload image');

            const uploadData = await uploadRes.json();
            imageUrl = uploadData.url;
        }

        const data = {
            title: titleInput.value,
            description: descInput.value,
            keywords: keywordsInput.value,
            ogImage: imageUrl,
            updatedAt: new Date()
        };

        // Save to Firestore
        await setDoc(doc(db, 'seo', 'landing'), data, { merge: true });

        // Show Success
        if (statusMsg) {
            statusMsg.textContent = "Berhasil disimpan!";
            statusMsg.className = "text-sm font-medium text-emerald-600";
            statusMsg.classList.remove('hidden');
            setTimeout(() => statusMsg.classList.add('hidden'), 3000);
        }

    } catch (error) {
        console.error("Save error:", error);
        if (statusMsg) {
            statusMsg.textContent = "Gagal menyimpan data.";
            statusMsg.className = "text-sm font-medium text-rose-600";
            statusMsg.classList.remove('hidden');
        }
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Simpan Perubahan';
        }
    }
});

// Initialize
loadData();
