import { db, auth } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { showToast } from '../../../../lib/toast';

// Export init function
export function init() {
    const form = document.getElementById('animal-form') as HTMLFormElement;
    const loading = document.getElementById('loading');
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    const idInput = document.getElementById('animal-id') as HTMLInputElement;

    if (!idInput) {
        // If we are not on the edit page (or ID field missing), just return.
        // This script might be loaded but we might be navigating away.
        return;
    }

    const id = idInput.value;

    // Fetch Existing Data
    async function fetchData() {
        if (!loading || !form) return;

        try {
            const docSnap = await getDoc(doc(db, "animals", id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const nameEnInput = document.getElementById('name_en') as HTMLInputElement;
                const typeInput = document.getElementById('type') as HTMLInputElement;
                const priceInput = document.getElementById('price') as HTMLInputElement;
                const weightInput = document.getElementById('weight') as HTMLInputElement;
                const availableInput = document.getElementById('available') as HTMLInputElement;
                const urlCampaignInput = document.getElementById('urlCampaign') as HTMLInputElement;
                const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;
                const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
                const descriptionEnInput = document.getElementById('description_en') as HTMLTextAreaElement;

                if (nameInput) nameInput.value = data.name;
                if (nameEnInput) nameEnInput.value = data.name_en || '';
                if (typeInput) typeInput.value = data.type;
                if (priceInput) priceInput.value = data.price;
                if (weightInput) weightInput.value = data.weight;
                if (availableInput) availableInput.value = String(data.available);
                if (urlCampaignInput) urlCampaignInput.value = data.urlCampaign || '';
                if (imageUrlInput) imageUrlInput.value = data.imageUrl || '';
                if (descriptionInput) descriptionInput.value = data.description || '';
                if (descriptionEnInput) descriptionEnInput.value = data.description_en || '';

                loading.style.display = 'none';
                form.classList.remove('hidden');
            } else {
                showToast('Data tidak ditemukan', 'error');
                setTimeout(() => window.location.href = '/admin/animals', 1500);
            }
        } catch (e) {
            console.error(e);
            showToast('Error memuat data: ' + e, 'error');
        }
    }

    // Wait for Auth or check current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchData();
        } else {
            console.log("Waiting for auth...");
        }
    });

    // Update
    if (form) {
        // Remove previous listener if possible? 
        // With ViewTransitions, elements are new, so it's fine.
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Menyimpan...';
            }

            const data = {
                name: (document.getElementById('name') as HTMLInputElement).value,
                name_en: (document.getElementById('name_en') as HTMLInputElement).value || "",
                type: (document.getElementById('type') as HTMLInputElement).value,
                price: Number((document.getElementById('price') as HTMLInputElement).value),
                weight: Number((document.getElementById('weight') as HTMLInputElement).value),
                available: (document.getElementById('available') as HTMLInputElement).value === 'true',
                urlCampaign: (document.getElementById('urlCampaign') as HTMLInputElement).value || null,
                imageUrl: (document.getElementById('imageUrl') as HTMLInputElement).value,
                description: (document.getElementById('description') as HTMLTextAreaElement).value,
                description_en: (document.getElementById('description_en') as HTMLTextAreaElement).value || "",
                updatedAt: new Date()
            };

            try {
                await updateDoc(doc(db, "animals", id), data);
                showToast('Data berhasil diupdate', 'success');
                setTimeout(() => window.location.href = '/admin/animals', 1000);
            } catch (e) {
                console.error(e);
                showToast('Gagal menyimpan data', 'error');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Update Data';
                }
            }
        });
    }
}
