// Initialize AOS Animations
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('suyash-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (theme, save = false) => {
    html.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('suyash-theme', theme);
};

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(systemPrefersDark.matches ? 'dark' : 'light');
    systemPrefersDark.addEventListener('change', (event) => {
        setTheme(event.matches ? 'dark' : 'light');
    });
}

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme, true);
});

// Mobile navigation
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const mobileNav = window.matchMedia('(max-width: 680px)');
const setMenuOpen = (open) => {
    navLinks.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
};
menuBtn.addEventListener('click', () => {
    setMenuOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
});
navLinks.addEventListener('click', (event) => {
    if (mobileNav.matches && event.target.closest('a')) {
        setMenuOpen(false);
        menuBtn.focus();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuBtn.focus();
    }
});
mobileNav.addEventListener('change', () => setMenuOpen(false));

// Smooth scroll offset adjustment for fixed header
const navbar = document.querySelector('.navbar');
const updateNavClearance = () => {
    html.style.setProperty('--nav-clearance', `${navbar.getBoundingClientRect().height + 24}px`);
};
new ResizeObserver(updateNavClearance).observe(navbar);
updateNavClearance();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (mobileNav.matches) setMenuOpen(false);
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - navbar.getBoundingClientRect().height - 16,
                behavior: 'smooth'
            });
        }
    });
});