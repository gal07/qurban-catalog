import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { showToast } from '../../../lib/toast';

const form = document.getElementById('animal-form') as HTMLFormElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Menyimpan...';
        }

        const imageFile = (document.getElementById('imageFile') as HTMLInputElement).files?.[0];
        let imageUrl = '';

        if (imageFile) {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('file', imageFile);

            try {
                submitBtn.textContent = 'Mengupload Gambar...';
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadRes.ok) throw new Error('Upload gagal');

                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
            } catch (err) {
                console.error("Upload Error:", err);
                showToast("Gagal mengupload gambar. Silakan coba lagi.", 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan Data';
                return;
            }
        } else {
            showToast("Mohon pilih gambar hewan.", 'warning');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Simpan Data';
            return;
        }

        const data = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            type: (document.getElementById('type') as HTMLInputElement).value,
            price: Number((document.getElementById('price') as HTMLInputElement).value),
            weight: Number((document.getElementById('weight') as HTMLInputElement).value),
            available: (document.getElementById('available') as HTMLInputElement).value === 'true',
            imageUrl: imageUrl,
            urlCampaign: (document.getElementById('urlCampaign') as HTMLInputElement).value || null,
            description: (document.getElementById('description') as HTMLTextAreaElement).value,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            await addDoc(collection(db, "animals"), data);
            showToast('Data berhasil disimpan', 'success');
            setTimeout(() => {
                window.location.href = '/admin/animals';
            }, 1000);
        } catch (e) {
            console.error(e);
            showToast('Gagal menyimpan data', 'error');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan Data';
            }
        }
    });
}
