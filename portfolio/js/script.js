/* ========================================
   K-Drama Portfolio - JavaScript
   Animations, interactions, and magic ✨
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
});

/* ========================================
   Floating Particles - Cherry Blossoms & Stars
   ======================================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleSymbols = ['🌸', '✨', '💫', '🌟', '✿', '❀', '⋆'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, particleSymbols);
    }

    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer, particleSymbols);
        }
    }, 2000);
}

function createParticle(container, symbols) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Random positioning and animation
    particle.style.left = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

/* ========================================
   Mobile Navigation
   ======================================== */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ========================================
   Scroll Animations - Fade In
   ======================================== */
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .timeline-content, .stat-item, .about-text, .contact-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add stagger effect for grids
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });
}

/* ========================================
   Smooth Scrolling
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ========================================
   Typing Effect for Hero (Optional)
   ======================================== */
function initTypingEffect() {
    const titles = ['Fullstack Developer', 'AI Enthusiast', 'Problem Solver', 'K-Drama Fan 🎬'];
    const titleElement = document.querySelector('.hero-title');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Uncomment to enable typing effect
    // type();
}

/* ========================================
   Skill Cards Hover Effects
   ======================================== */
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ========================================
   Easter Egg - Konami Code 🎮
   ======================================== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKdramaMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKdramaMode() {
    // Special K-Drama mode activated!
    document.body.style.transition = 'all 1s ease';
    
    // Create heart explosion
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartBurst 2s ease forwards';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }

    // Add keyframe animation if not exists
    if (!document.querySelector('#heartBurstStyle')) {
        const style = document.createElement('style');
        style.id = 'heartBurstStyle';
        style.textContent = `
            @keyframes heartBurst {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg) translateY(-100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('🎬 K-Drama Mode Activated! 사랑해요! 💕');
}

/* ========================================
   Console Easter Egg
   ======================================== */
console.log('%c🌸 Welcome to John Paulo\'s Portfolio! 🌸', 
    'background: linear-gradient(135deg, #FFE4E6, #E9D5FF); color: #B76E79; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c✨ Built with love and a lot of K-drama inspiration ✨', 
    'color: #B76E79; font-size: 14px;');
console.log('%c💡 Tip: Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)', 
    'color: #6B6B6B; font-size: 12px;');
