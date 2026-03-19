document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Preloader
    // ==========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1500); // Wait for the load bar animation slightly
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans.forEach(s => {
                    s.style.transform = '';
                    s.style.opacity = '';
                });
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(s => {
                    s.style.transform = '';
                    s.style.opacity = '';
                });
            });
        });
    }

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ==========================================
    // Scroll Reveals
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once for premium feel
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // Hero Parallax Effect (Optimized via rAF)
    // ==========================================
    const heroCenter = document.querySelector('.hero-center');
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (heroCenter && window.scrollY < window.innerHeight) {
                    const scrolled = window.scrollY;
                    heroCenter.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroCenter.style.opacity = 1 - (scrolled * 0.0025);
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
    
    // Force hero items in view on load
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(el => el.classList.add('visible'));
    }, 200);
    // Active Menu Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const deskNavLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    // ==========================================
    // Contact Form Submission (Mailto Redirection)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const dataObj = Object.fromEntries(formData);
            
            const subject = encodeURIComponent(`EAP Website Inquiry: ${dataObj.service || 'General'} - ${dataObj.name}`);
            let bodyText = `Name: ${dataObj.name}\n`;
            if (dataObj.company) bodyText += `Company: ${dataObj.company}\n`;
            bodyText += `Email: ${dataObj.email}\n`;
            if (dataObj.phone) bodyText += `Phone: ${dataObj.phone}\n`;
            if (dataObj.service) bodyText += `Service Interest: ${dataObj.service}\n`;
            bodyText += `\nMessage:\n${dataObj.message}\n`;
            
            const body = encodeURIComponent(bodyText);
            
            // Open user's default email client
            window.location.href = `mailto:info@eelaviapratama.com?subject=${subject}&body=${body}`;
            
            // Provide UI feedback
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Opening Email Client... <i class="fa-solid fa-envelope-open-text"></i>';
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                contactForm.reset();
            }, 3500);
        });
    }

    // (Custom cursor removed per user request for ultimate performance & native feel)

    // (Magnetic buttons removed per user request)

});
