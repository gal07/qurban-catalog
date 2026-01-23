import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
                alert("Gagal mengupload gambar. Silakan coba lagi.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan Data';
                return;
            }
        } else {
            alert("Mohon pilih gambar hewan.");
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
            description: (document.getElementById('description') as HTMLTextAreaElement).value,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            await addDoc(collection(db, "animals"), data);
            alert('Data berhasil disimpan');
            window.location.href = '/admin/animals';
        } catch (e) {
            console.error(e);
            alert('Gagal menyimpan data');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan Data';
            }
        }
    });
}
