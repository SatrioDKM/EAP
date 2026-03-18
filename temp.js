/* =====================================================
   PT EEL AVIA PRATAMA â script.js
   Maintained separately for easy updates
   ===================================================== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2600);
});

// ===== GENERATE RUNWAY DOTS =====
const runwayDots = document.getElementById('runwayDots');
if (runwayDots) {
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.className = 'runway-dot';
    dot.style.animationDelay = (i * 0.4) + 's';
    runwayDots.appendChild(dot);
  }
}

// ===== GENERATE CLOUD PARTICLES =====
const cloudsLayer = document.getElementById('cloudsLayer');
if (cloudsLayer) {
  const cloudConfigs = [
    { w: 300, h: 80, x: '10%', y: '55%', blur: 40, opacity: 0.08 },
    { w: 500, h: 120, x: '40%', y: '45%', blur: 55, opacity: 0.06 },
    { w: 250, h: 70, x: '70%', y: '60%', blur: 35, opacity: 0.07 },
    { w: 400, h: 100, x: '25%', y: '70%', blur: 50, opacity: 0.05 },
    { w: 350, h: 90, x: '60%', y: '50%', blur: 45, opacity: 0.06 },
    { w: 200, h: 60, x: '85%', y: '65%', blur: 30, opacity: 0.08 },
  ];
  cloudConfigs.forEach(cfg => {
    const cloud = document.createElement('div');
    cloud.className = 'cloud-particle';
    cloud.style.cssText = `
      width: ${cfg.w}px; height: ${cfg.h}px;
      left: ${cfg.x}; top: ${cfg.y};
      filter: blur(${cfg.blur}px);
      opacity: ${cfg.opacity};
    `;
    cloudsLayer.appendChild(cloud);
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

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

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }
});

// ===== SERVICES TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
    
    // Activate clicked
    btn.classList.add('active');
    const targetId = 'panel-' + btn.dataset.tab;
    const panel = document.getElementById(targetId);
    if (panel) panel.classList.add('active');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HERO PARALLAX (gentle) =====
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  if (scrollY < vh) {
    heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
  }
}, { passive: true });

// ===== MOUSE PARALLAX ON HERO =====
const heroSection = document.getElementById('hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5);
    const yRatio = (e.clientY / window.innerHeight - 0.5);
    const plane = document.getElementById('heroPlane');
    if (plane) {
      // Gentle mouse tracking for plane
      const baseTransform = plane.style.animationPlayState;
    }
  });
}

// ===== COUNTER ANIMATION for numbers if added in future =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

// ===== FORM SUBMIT HANDLER =====
function handleFormSubmit() {
  const btn = document.querySelector('.contact-form-card .btn-primary');
  const name = document.querySelector('.contact-form-card input[type="text"]').value;
  
  if (!name.trim()) {
    showNotification('Please fill in your name.', 'error');
    return;
  }
  
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = 'â Message Sent!';
    btn.style.background = '#0e9b8a';
    showNotification('Thank you! We will contact you soon. â', 'success');
    
    // Reset after 3 seconds
    setTimeout(() => {
      btn.textContent = 'Send Message â';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1500);
}

// ===== NOTIFICATION TOAST =====
function showNotification(message, type = 'success') {
  // Remove existing
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'success' ? '#0e9b8a' : '#e05555'};
    color: white;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    z-index: 9000;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===== ACTIVE NAV LINK on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--eap-blue)';
    }
  });
}, { passive: true });

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

