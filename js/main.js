/* ═══════════════════════════════════════════════════════════════════
   ATERNA ACADEMY — Main JavaScript
   Handles: nav scroll, mobile menu, scroll reveal, active nav links
═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── NAVBAR SCROLL EFFECT ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── MOBILE MENU ──────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');

  // Create mobile menu dynamically
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <button class="mobile-close" aria-label="Close menu" style="
      position:absolute;top:28px;right:32px;background:none;border:none;
      color:#F7F5ED;font-size:1.8rem;cursor:pointer;line-height:1;
    ">✕</button>
    <a href="#about"      class="mobile-link">About</a>
    <a href="#programs"   class="mobile-link">Programs</a>
    <a href="#services"   class="mobile-link">Services</a>
    <a href="#advantages" class="mobile-link">Why Us</a>
    <a href="#swot"       class="mobile-link">Strategy</a>
    <a href="#contact"    class="mobile-link" style="color:#B8962E">Apply Now</a>
  `;
  document.body.appendChild(mobileMenu);

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileMenu.querySelector('.mobile-close').style.zIndex = '999';

  mobileMenu.querySelector('.mobile-close').addEventListener('click', closeMobileMenu);

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  function closeMobileMenu () {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }


  // ── SCROLL REVEAL ────────────────────────────────────────────────
  // Wrap key elements with reveal class
  const revealTargets = [
    '.section-label',
    '.section-title',
    '.section-body',
    '.about-left p',
    '.about-pillars',
    '.mission-card',
    '.vision-card',
    '.track-card',
    '.service-block',
    '.advantage-row',
    '.swot-card',
    '.cta-headline',
    '.cta-body',
    '.cta-actions',
    '.cta-tagline',
  ];

  revealTargets.forEach((selector, si) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger children within same parent group
      if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ── ACTIVE NAV LINK ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--gold-light)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── SMOOTH ANCHOR SCROLL ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── TRACK CARD HOVER EFFECT ──────────────────────────────────────
  document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 16px 48px rgba(184,150,46,0.12)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });


  // ── PARALLAX HERO GLOW ───────────────────────────────────────────
  const heroGlows = document.querySelectorAll('.hero-glow');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroGlows.forEach((glow, i) => {
      const factor = i === 0 ? 1 : -0.6;
      glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  }, { passive: true });

})();
