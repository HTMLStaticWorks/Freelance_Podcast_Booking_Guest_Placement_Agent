// Theme and RTL Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const rtlToggle = document.getElementById('rtlToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Theme Management
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // RTL Management
    const currentDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', currentDir);
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', dir);
            localStorage.setItem('dir', dir);
        });
    }

    // Mobile Menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const reveal = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Dashboard Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-hidden');
        });
    }

    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a:not(.gradient-text)');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle cases where the link might be relative or absolute
        if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
            link.classList.add('active');
            // If it's a sidebar link, also style its parent/container if needed
            if (link.closest('#sidebar')) {
                link.classList.add('bg-primary', 'text-white');
                link.classList.remove('text-slate-500');
            }
        }
    });

    // Back to Top Logic
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
