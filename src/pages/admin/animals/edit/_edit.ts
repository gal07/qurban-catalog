import { db, auth } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const form = document.getElementById('animal-form') as HTMLFormElement;
const loading = document.getElementById('loading');
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const idInput = document.getElementById('animal-id') as HTMLInputElement;

if (!idInput) {
    console.error("No ID input found");
} else {
    const id = idInput.value;

    // Fetch Existing Data
    async function fetchData() {
        if (!loading || !form) return;

        try {
            const docSnap = await getDoc(doc(db, "animals", id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                (document.getElementById('name') as HTMLInputElement).value = data.name;
                (document.getElementById('type') as HTMLInputElement).value = data.type;
                (document.getElementById('price') as HTMLInputElement).value = data.price;
                (document.getElementById('weight') as HTMLInputElement).value = data.weight;
                (document.getElementById('available') as HTMLInputElement).value = String(data.available);
                (document.getElementById('imageUrl') as HTMLInputElement).value = data.imageUrl || '';
                (document.getElementById('description') as HTMLTextAreaElement).value = data.description || '';

                loading.style.display = 'none';
                form.classList.remove('hidden');
            } else {
                alert('Data tidak ditemukan');
                window.location.href = '/admin/animals';
            }
        } catch (e) {
            console.error(e);
            alert('Error memuat data: ' + e); // Show error to user
        }
    }

    // Wait for Auth
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchData();
        } else {
            console.log("Waiting for auth...");
            // Optionally redirect here if not already handled by layout
        }
    });

    // Update
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Menyimpan...';
            }

            const data = {
                name: (document.getElementById('name') as HTMLInputElement).value,
                type: (document.getElementById('type') as HTMLInputElement).value,
                price: Number((document.getElementById('price') as HTMLInputElement).value),
                weight: Number((document.getElementById('weight') as HTMLInputElement).value),
                available: (document.getElementById('available') as HTMLInputElement).value === 'true',
                imageUrl: (document.getElementById('imageUrl') as HTMLInputElement).value,
                description: (document.getElementById('description') as HTMLTextAreaElement).value,
                updatedAt: new Date()
            };

            try {
                await updateDoc(doc(db, "animals", id), data);
                alert('Data berhasil diupdate');
                window.location.href = '/admin/animals';
            } catch (e) {
                console.error(e);
                alert('Gagal menyimpan data');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Update Data';
                }
            }
        });
    }
}
