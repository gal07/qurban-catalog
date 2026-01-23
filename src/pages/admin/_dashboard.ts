import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function fetchStats() {
    try {
        const querySnapshot = await getDocs(collection(db, "animals"));
        const total = querySnapshot.size;
        let available = 0;
        let sold = 0;

        querySnapshot.forEach(doc => {
            if (doc.data().available) available++;
            else sold++;
        });

        const totalEl = document.getElementById('total-animals');
        const availEl = document.getElementById('available-animals');
        const soldEl = document.getElementById('sold-animals');

        if (totalEl) totalEl.textContent = total.toString();
        if (availEl) availEl.textContent = available.toString();
        if (soldEl) soldEl.textContent = sold.toString();
    } catch (e) {
        console.error(e);
    }
}

// Initial Load handled by Auth state
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchStats();
    } else {
        console.log("Waiting for auth...");
    }
});
