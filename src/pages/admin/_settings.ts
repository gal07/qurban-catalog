import { auth, db } from '../../lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// --- WhatsApp Settings ---
const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
const saveSettingsBtn = document.getElementById('save-settings-btn') as HTMLButtonElement;
const waNumberInput = document.getElementById('wa-number') as HTMLInputElement;
const waTemplateInput = document.getElementById('wa-template') as HTMLTextAreaElement;
let settingWaDocId: string | null = null;

// --- Theme Settings ---
const themeForm = document.getElementById('theme-settings-form') as HTMLFormElement;
const saveThemeBtn = document.getElementById('save-theme-btn') as HTMLButtonElement;
const resetThemeBtn = document.getElementById('reset-theme-btn') as HTMLButtonElement;

// Theme Inputs mapping (ID suffix -> property name)
const themeInputs = [
    { id: 'primary', prop: 'primary' },
    { id: 'primary-light', prop: 'primaryLight' },
    { id: 'primary-dark', prop: 'primaryDark' },
    { id: 'accent', prop: 'accent' },
    { id: 'accent-light', prop: 'accentLight' }
];

// Defaults
const defaultTheme = {
    primary: '#365BAB',
    primaryLight: '#5d7cc4',
    primaryDark: '#2a4685',
    accent: '#75C9ED',
    accentLight: '#a0e0fc'
};

// --- Helper Functions ---

function syncColorInputs(colorId: string, textId: string) {
    const colorInput = document.getElementById(colorId) as HTMLInputElement;
    const textInput = document.getElementById(textId) as HTMLInputElement;

    if (!colorInput || !textInput) return;

    colorInput.addEventListener('input', () => {
        textInput.value = colorInput.value;
    });

    textInput.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(textInput.value)) {
            colorInput.value = textInput.value;
        }
    });

    textInput.addEventListener('change', () => {
        if (!/^#[0-9A-F]{6}$/i.test(textInput.value)) {
            // Reset to color input value if invalid
            textInput.value = colorInput.value;
        }
    });
}

function initThemeSync() {
    themeInputs.forEach(item => {
        syncColorInputs(`color-${item.id}`, `text-${item.id}`);
    });
}

// --- Fetch Functions ---

async function fetchWASettings() {
    if (!waNumberInput) return; // Guard

    waNumberInput.disabled = true;
    waTemplateInput.disabled = true;
    if (saveSettingsBtn) saveSettingsBtn.disabled = true;

    try {
        const querySnapshot = await getDocs(collection(db, "setting_wa"));
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            settingWaDocId = docSnap.id;
            waNumberInput.value = data.whatsappNumber || '';
            waTemplateInput.value = data.messageTemplate || '';
        }
    } catch (e) {
        console.error("Error fetching WA settings:", e);
    } finally {
        waNumberInput.disabled = false;
        waTemplateInput.disabled = false;
        if (saveSettingsBtn) saveSettingsBtn.disabled = false;
    }
}

async function fetchThemeSettings() {
    if (!saveThemeBtn) return;
    saveThemeBtn.disabled = true;

    try {
        const docRef = doc(db, "settings", "theme");
        const docSnap = await getDoc(docRef);

        let data = defaultTheme;
        if (docSnap.exists()) {
            data = { ...defaultTheme, ...docSnap.data() };
        }

        themeInputs.forEach(item => {
            const colorInput = document.getElementById(`color-${item.id}`) as HTMLInputElement;
            const textInput = document.getElementById(`text-${item.id}`) as HTMLInputElement;
            const val = data[item.prop as keyof typeof defaultTheme];

            if (colorInput && textInput && val) {
                colorInput.value = val;
                textInput.value = val;
            }
        });

    } catch (e) {
        console.error("Error fetching theme:", e);
    } finally {
        if (saveThemeBtn) saveThemeBtn.disabled = false;
    }
}

// --- Event Listeners ---

settingsForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (saveSettingsBtn) {
        saveSettingsBtn.disabled = true;
        saveSettingsBtn.textContent = 'Menyimpan...';
    }

    try {
        if (settingWaDocId) {
            await updateDoc(doc(db, "setting_wa", settingWaDocId), {
                whatsappNumber: waNumberInput.value,
                messageTemplate: waTemplateInput.value
            });
        } else {
            // Handle race condition if created elsewhere or double check
            const querySnapshot = await getDocs(collection(db, "setting_wa"));
            if (!querySnapshot.empty) {
                settingWaDocId = querySnapshot.docs[0].id;
                await updateDoc(doc(db, "setting_wa", settingWaDocId), {
                    whatsappNumber: waNumberInput.value,
                    messageTemplate: waTemplateInput.value
                });
            } else {
                const docRef = await addDoc(collection(db, "setting_wa"), {
                    whatsappNumber: waNumberInput.value,
                    messageTemplate: waTemplateInput.value
                });
                settingWaDocId = docRef.id;
            }
        }
        alert('Pengaturan WhatsApp berhasil disimpan!');
    } catch (e) {
        console.error(e);
        alert('Gagal menyimpan pengaturan WhatsApp.');
    } finally {
        if (saveSettingsBtn) {
            saveSettingsBtn.disabled = false;
            saveSettingsBtn.textContent = 'Simpan Pengaturan';
        }
    }
});

themeForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (saveThemeBtn) {
        saveThemeBtn.disabled = true;
        saveThemeBtn.textContent = 'Menyimpan...';
    }

    try {
        const newData: any = {};
        themeInputs.forEach(item => {
            const textInput = document.getElementById(`text-${item.id}`) as HTMLInputElement;
            if (textInput) {
                newData[item.prop] = textInput.value;
            }
        });

        const docRef = doc(db, "settings", "theme");
        await setDoc(docRef, newData, { merge: true });

        alert('Tema berhasil disimpan! Refresh halaman untuk melihat perubahan.');

        // Optional: Update current session preview (though refresh is safer)
        const root = document.documentElement;
        if (newData.primary) root.style.setProperty("--color-primary", newData.primary);
        // ... updates others if needed, but alert mentions refresh

    } catch (e) {
        console.error(e);
        alert('Gagal menyimpan tema.');
    } finally {
        if (saveThemeBtn) {
            saveThemeBtn.disabled = false;
            saveThemeBtn.textContent = 'Simpan Tema';
        }
    }
});

resetThemeBtn?.addEventListener('click', async () => {
    if (!confirm('Apakah anda yakin ingin mengembalikan tema ke default?')) return;

    themeInputs.forEach(item => {
        const colorInput = document.getElementById(`color-${item.id}`) as HTMLInputElement;
        const textInput = document.getElementById(`text-${item.id}`) as HTMLInputElement;
        const val = defaultTheme[item.prop as keyof typeof defaultTheme];

        if (colorInput && textInput) {
            colorInput.value = val;
            textInput.value = val;
        }
    });

    // Auto save? or just let user save? User should click save.
    // But let's trigger save? No, let user confirm by clicking save.
});

// --- Init ---

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchWASettings();
        fetchThemeSettings();
    }
});

initThemeSync();
