/**
 * navigation.js
 * Sticky navbar: scroll effect, active section, smooth scroll, mobile menu
 */

export function initNavigation() {
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('nav-toggle');
  const navMobile  = document.getElementById('nav-mobile');
  const navLinks   = document.querySelectorAll('.nav-link[href^="#"]');
  const sections   = document.querySelectorAll('section[id]');

  if (!navbar) return;

  // ─── Scroll class ──────────────────────────────────────────────────────────
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run immediately

  // ─── Active section detection ─────────────────────────────────────────────
  function updateActiveLink() {
    let currentId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) - 80;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  }

  // ─── Smooth scroll ────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      ) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── Mobile menu ──────────────────────────────────────────────────────────
  navToggle?.addEventListener('click', () => {
    const isOpen = navMobile?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      navMobile?.classList.contains('open') &&
      !navbar.contains(e.target) &&
      !navMobile.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  function openMobileMenu() {
    navToggle?.classList.add('open');
    navMobile?.classList.add('open');
    navToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navToggle?.classList.remove('open');
    navMobile?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ─── Language Switcher ──────────────────────────────────────────────────
  const langBtns = [
    document.getElementById('lang-toggle-btn'),
    document.getElementById('lang-toggle-btn-mobile'),
  ].filter(Boolean);

  // Auto redirect to saved language if root url accessed with no param
  const urlParams = new URLSearchParams(window.location.search);
  const savedLang = localStorage.getItem('preferred_lang');
  if (!urlParams.has('lang') && savedLang && savedLang === 'vi') {
    urlParams.set('lang', 'vi');
    window.location.search = urlParams.toString();
    return;
  }

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentLang = urlParams.get('lang') || 'en';
      const targetLang = currentLang === 'vi' ? 'en' : 'vi';

      urlParams.set('lang', targetLang);
      localStorage.setItem('preferred_lang', targetLang);
      window.location.search = urlParams.toString();
    });
  });
}
