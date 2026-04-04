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

// Smooth scroll offset adjustment for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});