import { auth, db } from '../../lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
const saveSettingsBtn = document.getElementById('save-settings-btn') as HTMLButtonElement;
const waNumberInput = document.getElementById('wa-number') as HTMLInputElement;
const waTemplateInput = document.getElementById('wa-template') as HTMLTextAreaElement;
let settingDocId: string | null = null;

// Disable inputs initially
function setFormState(loading: boolean) {
    if (!waNumberInput || !waTemplateInput || !saveSettingsBtn) return;

    if (loading) {
        waNumberInput.disabled = true;
        waTemplateInput.disabled = true;
        saveSettingsBtn.disabled = true;
        saveSettingsBtn.textContent = 'Memuat...';
    } else {
        waNumberInput.disabled = false;
        waTemplateInput.disabled = false;
        saveSettingsBtn.disabled = false;
        saveSettingsBtn.textContent = 'Simpan Pengaturan';
    }
}

async function fetchSettings() {
    setFormState(true);
    try {
        console.log("Fetching settings...");
        const querySnapshot = await getDocs(collection(db, "setting_wa"));
        console.log("Settings found:", querySnapshot.size);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            settingDocId = docSnap.id;

            console.log("Setting ID:", settingDocId);
            if (waNumberInput) waNumberInput.value = data.whatsappNumber || '';
            if (waTemplateInput) waTemplateInput.value = data.messageTemplate || '';
        } else {
            console.log("No settings found, will create new on save.");
        }
    } catch (e) {
        console.error("Error fetching settings:", e);
    } finally {
        setFormState(false);
    }
}

// Load when auth is ready
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchSettings();
    } else {
        console.log("User not logged in, skipping fetch.");
    }
});

settingsForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (saveSettingsBtn) {
        saveSettingsBtn.disabled = true;
        saveSettingsBtn.textContent = 'Menyimpan...';
    }

    try {
        if (settingDocId) {
            console.log("Updating existing setting:", settingDocId);
            await updateDoc(doc(db, "setting_wa", settingDocId), {
                whatsappNumber: waNumberInput.value,
                messageTemplate: waTemplateInput.value
            });
        } else {
            // Double check
            const querySnapshot = await getDocs(collection(db, "setting_wa"));
            if (!querySnapshot.empty) {
                settingDocId = querySnapshot.docs[0].id;
                await updateDoc(doc(db, "setting_wa", settingDocId), {
                    whatsappNumber: waNumberInput.value,
                    messageTemplate: waTemplateInput.value
                });
            } else {
                console.log("Creating new setting doc");
                const docRef = await addDoc(collection(db, "setting_wa"), {
                    whatsappNumber: waNumberInput.value,
                    messageTemplate: waTemplateInput.value
                });
                settingDocId = docRef.id;
            }
        }
        alert('Pengaturan berhasil disimpan!');
    } catch (e) {
        console.error(e);
        alert('Gagal menyimpan pengaturan.');
    } finally {
        if (saveSettingsBtn) {
            saveSettingsBtn.disabled = false;
            saveSettingsBtn.textContent = 'Simpan Pengaturan';
        }
    }
});
