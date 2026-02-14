/* ============================================
   Farhan Bagwan Portfolio — Enhanced JS
   Dark Social-Media Theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileNav();
  initParallax();
  initScrollTopButton();
  initNavHighlight();
  initLazyImages();
  initSkillBars();
  initCounterAnimation();
  initCardTilt();
  initMagneticButtons();
  initHeroMesh();
  initTextReveal();
  initMouseParallax();
  initContactForm();
});


/* --- Scroll Reveal (Intersection Observer) --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Parallax Effect --- */
function initParallax() {
  const parallaxEls = document.querySelectorAll('.parallax-bg');
  if (!parallaxEls.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        parallaxEls.forEach(el => {
          const speed = el.dataset.speed || 0.3;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Scroll-to-Top Button --- */
function initScrollTopButton() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Active Nav Highlight --- */
function initNavHighlight() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Lazy Image Load --- */
function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
}

/* --- Skill Progress Bars --- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.dataset.progress || '80';
        fill.style.width = target + '%';
        fill.classList.add('animated');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimal = el.dataset.decimal === 'true';
        animateCounter(el, target, prefix, suffix, decimal);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, prefix, suffix, decimal) {
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = decimal
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* --- 3D Card Tilt on Hover --- */
function initCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // Skip on touch devices

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

/* --- Magnetic Button Effect --- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* --- Hero Gradient Mesh (Canvas) --- */
function initHeroMesh() {
  const canvas = document.querySelector('.hero-mesh-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationId;
  const orbs = [];
  const ORB_COUNT = 5;

  const colors = [
    { r: 24, g: 119, b: 242, a: 0.08 },   // Meta Blue
    { r: 37, g: 244, b: 238, a: 0.06 },    // TikTok Cyan
    { r: 254, g: 44, b: 85, a: 0.05 },     // TikTok Pink
    { r: 24, g: 119, b: 242, a: 0.04 },    // Meta Blue dim
    { r: 37, g: 244, b: 238, a: 0.04 },    // TikTok Cyan dim
  ];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function initOrbs() {
    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 150 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[i % colors.length]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;

      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${orb.color.a})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
    animationId = requestAnimationFrame(draw);
  }

  resize();
  initOrbs();
  draw();
  window.addEventListener('resize', resize);

  // Pause when not visible
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!animationId) draw();
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
  observer.observe(canvas);
}

/* --- Text Reveal Animation --- */
function initTextReveal() {
  const els = document.querySelectorAll('.text-reveal');
  if (!els.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => { el.style.opacity = '1'; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        el.textContent = '';
        el.style.opacity = '1';
        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(20px)';
          span.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`;
          el.appendChild(span);
          requestAnimationFrame(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        });
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/* --- Mouse Parallax (Floating elements) --- */
function initMouseParallax() {
  const container = document.querySelector('.mouse-parallax-container');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const items = container.querySelectorAll('[data-mouse-speed]');
  if (!items.length) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    items.forEach(item => {
      const speed = parseFloat(item.dataset.mouseSpeed) || 20;
      item.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  container.addEventListener('mouseleave', () => {
    items.forEach(item => {
      item.style.transition = 'transform 0.5s ease';
      item.style.transform = 'translate(0, 0)';
      setTimeout(() => { item.style.transition = ''; }, 500);
    });
  });
}

/* --- Contact Form Handler (AJAX) --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Prevent page reload and redirect to Formspree
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const subjectInput = document.getElementById('subject');

    try {
      // Validate required fields
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showFormNotification('Please fill in all required fields', 'error');
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Get form data
      const formData = new FormData(form);

      // Send via AJAX to Formspree (NO page redirect)
      const response = await fetch('https://formspree.io/f/xeelgazq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // Parse response
      let responseData = {};
      try {
        responseData = await response.json();
      } catch (err) {
        responseData.ok = true; // Assume success if parsing fails
      }

      // Handle success
      if (responseData.ok === true || response.ok) {
        // CLEAR ALL FORM FIELDS IMMEDIATELY
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        subjectInput.value = 'General Inquiry';
        form.reset();

        // Show success message on CURRENT PAGE (not Formspree)
        showFormNotification('Message sent successfully! Thanks for reaching out, I\'ll be in touch soon.', 'success');

        // Auto-scroll to notification
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Form Error:', error);
      showFormNotification('Oops! Something went wrong. Please try again.', 'error');
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    return false;
  });
}

/* --- Form Notification --- */
function showFormNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelectorAll('.form-notification');
  existing.forEach(el => {
    el.classList.add('removing');
    setTimeout(() => el.remove(), 300);
  });

  // Create notification
  const notification = document.createElement('div');
  notification.className = `form-notification ${type}`;
  
  // Set content and styles
  if (type === 'success') {
    notification.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 16px;
      right: 16px;
      max-width: 500px;
      margin: 0 auto;
      padding: 16px 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      animation: slideInFromTop 0.4s ease;
    `;
  } else {
    notification.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${message}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 16px;
      right: 16px;
      max-width: 500px;
      margin: 0 auto;
      padding: 16px 20px;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      animation: slideInFromTop 0.4s ease;
    `;
  }

  document.body.appendChild(notification);

  // Auto-remove after 6 seconds
  setTimeout(() => {
    notification.classList.add('removing');
    setTimeout(() => notification.remove(), 300);
  }, 6000);
}
