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

    // Professional Dashboard Sidebar System
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const sidebarLinks = sidebar?.querySelectorAll('nav a');

    if (sidebar && sidebarToggle) {
        function openSidebar() {
            sidebar.classList.remove('sidebar-hidden');
            sidebar.style.transform = 'translateX(0)';
            if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
            document.body.classList.add('sidebar-open');
        }

        function closeSidebar() {
            if (window.innerWidth < 1024) {
                sidebar.classList.add('sidebar-hidden');
                sidebar.style.transform = '';
                if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        }

        // Toggle Click (Modern Event Listener)
        sidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar.classList.contains('sidebar-hidden')) {
                openSidebar();
            } else {
                closeSidebar();
            }
        });

        // Backdrop & Close Button Click
        const sidebarClose = document.getElementById('sidebarClose');
        if (sidebarBackdrop) sidebarBackdrop.onclick = closeSidebar;
        if (sidebarClose) sidebarClose.onclick = closeSidebar;

        // Close on Link Click (Mobile)
        sidebarLinks?.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) closeSidebar();
            });
        });

        // Handle Window Resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                sidebar.classList.remove('sidebar-hidden');
                sidebar.style.transform = 'translateX(0)';
                if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            } else {
                sidebar.classList.add('sidebar-hidden');
                sidebar.style.transform = '';
            }
        });
    }

    // Active Link Highlighting (Global)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a:not(.group)');
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

    // FAQ Dropdown Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');

        if (btn && answer) {
            btn.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQs (optional, but cleaner)
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.fa-chevron-down').classList.remove('rotate-180');
                    otherItem.classList.remove('border-primary');
                });

                if (!isOpen) {
                    answer.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                    item.classList.add('border-primary');
                }
            });
        }
    });

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
    // Password Visibility Toggle
    window.togglePassword = function(id, btn) {
        const input = document.getElementById(id);
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };
});
