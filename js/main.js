// Initialize AOS with simpler settings
AOS.init({
    duration: 600,
    once: true,
    offset: 200,
//    disable: 'mobile' // Disable on mobile for better performance
});

// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        console.log('Hi')
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Set initial skill levels
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const skillValue = level.getAttribute('data-level');
        level.style.width = `${skillValue}%`;
    });
});

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
document.head.appendChild(style); 

function RedirectTo(links) {
    window.location.href=links;
}

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["System Administrator", "Devops Engineer", "Site Reliability Engineer", "Automating infrastructure and streamlining deployments"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

$(document).ready(function () {
    $(".typed-cursor").html("");
});