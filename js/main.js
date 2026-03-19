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

    // Force hero items in view
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(el => el.classList.add('visible'));
    }, 500);

    // ==========================================
    // Hero Parallax Effect
    // ==========================================
    const heroCenter = document.querySelector('.hero-center');
    window.addEventListener('scroll', () => {
        if (heroCenter && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroCenter.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroCenter.style.opacity = 1 - (scrolled * 0.0025);
        }
    }, { passive: true });

    // ==========================================
    // Active Menu Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const deskNavLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    // ==========================================
    // Contact Form Submission (AJAX to contact.php)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';
            formResponse.style.display = 'none';
            
            const formData = new FormData(contactForm);
            const dataObj = Object.fromEntries(formData);
            
            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dataObj)
                });
                
                const result = await response.json();
                
                formResponse.style.display = 'block';
                formResponse.innerText = result.message;
                formResponse.style.color = result.status === 'success' ? '#38bdf8' : '#e05555';
                
                if (result.status === 'success') {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
                    submitBtn.style.background = '#0ea5e9';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.pointerEvents = 'auto';
                        formResponse.style.display = 'none';
                    }, 4000);
                } else {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                }
                
            } catch (error) {
                console.error("Form submission error:", error);
                formResponse.style.display = 'block';
                formResponse.innerText = "Network error. Please try again later or contact us via WhatsApp.";
                formResponse.style.color = '#e05555';
                
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
            }
        });
    }

});
