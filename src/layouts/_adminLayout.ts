import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Auth Protection
const protectedRoutes = ['/admin']; // protected path prefix

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Redirect to login if not authenticated
        window.location.href = '/admin/login';
    } else {
        // Show layout (optional: remove loading state)
        document.body.classList.remove('loading');
    }
});

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            // Clear any cached data
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to login page
            window.location.href = '/admin/login';
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if signOut fails
            window.location.href = '/admin/login';
        }
    });
}

// Mobile Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open-sidebar');
const closeBtn = document.getElementById('close-sidebar');

if (openBtn) {
    openBtn.addEventListener('click', () => {
        sidebar?.classList.add('active');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidebar?.classList.remove('active');
    });
}

// Active Link Highlight
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});
