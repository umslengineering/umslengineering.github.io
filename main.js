document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // Reveal animations on scroll
    const revealItems = document.querySelectorAll('.card, .stat-item, .faculty-card, .research-text, .research-visual');
    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.85) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal animation
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.research-card, .faculty-card, .facility-section, .chair-section').forEach(el => observer.observe(el));

    // Sidebar Navigation Active State
    const facilityNavLinks = document.querySelectorAll('.facilities-nav a');
    const sections = document.querySelectorAll('.facility-section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        facilityNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Back to Top Button Injection
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i data-lucide="chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    lucide.createIcons();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
