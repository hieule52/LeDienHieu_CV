/**
 * animations.js
 * Fade-up scroll animations + terminal typing effect
 */

export function initAnimations() {
  initScrollAnimations();
  initTerminalTyping();
  initTypingRotator();
  initProjectTiltEffect();
}

// ─── Scroll reveal (IntersectionObserver) ────────────────────────────────────
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up, .fade-in');

  // Use double rAF so browser paints opacity:0 state BEFORE adding .visible
  // (prevents "no animation" bug for elements already in viewport on load)
  const revealInViewport = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
        el.classList.add('visible');
      }
    });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealInViewport();
    });
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '100px 0px 50px 0px', threshold: 0 }
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
}

// ─── Terminal typing effect ───────────────────────────────────────────────────
function initTerminalTyping() {
  const lines = document.querySelectorAll('[data-type]');
  if (!lines.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    lines.forEach((el) => { el.style.opacity = '1'; });
    return;
  }

  // Initially hide all lines
  lines.forEach((el) => { el.style.opacity = '0'; });

  let delay = 400;
  lines.forEach((el, i) => {
    const text = el.getAttribute('data-type');
    const speed = parseInt(el.getAttribute('data-speed') || '40');
    const isOutput = el.classList.contains('terminal-output');

    setTimeout(() => {
      el.style.opacity = '1';
      if (isOutput) return; // Output appears instantly

      // Type out command text
      const span = el.querySelector('.terminal-cmd');
      if (!span || !text) return;

      const original = span.textContent;
      span.textContent = '';
      let charIdx = 0;

      const typeInterval = setInterval(() => {
        span.textContent = text.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx >= text.length) clearInterval(typeInterval);
      }, speed);
    }, delay);

    delay += isOutput ? 200 : text ? text.length * 45 + 200 : 200;
  });
}

// ─── Hero title rotating text ─────────────────────────────────────────────────
function initTypingRotator() {
  const el = document.getElementById('hero-typing');
  if (!el) return;

  const roles = JSON.parse(el.dataset.roles || '[]');
  if (!roles.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = roles[0];
    return;
  }

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const TYPING_SPEED  = 80;
  const DELETE_SPEED  = 50;
  const PAUSE_AFTER   = 2200;
  const PAUSE_BEFORE  = 500;

  function tick() {
    const current = roles[roleIdx];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

// ─── Modern 3D Tilt & Magnetic Glow Effect for Projects ──────────────────────
function initProjectTiltEffect() {
  const cards = document.querySelectorAll('[data-project-card]');
  if (!cards.length) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Skip 3D tilt on mobile for performance

  cards.forEach((card) => {
    let bounds;

    function rotateToMouse(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const maxTilt = 4.5;
      const xRot = (-center.y / (bounds.height / 2)) * maxTilt;
      const yRot = (center.x / (bounds.width / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${xRot.toFixed(2)}deg) rotateY(${yRot.toFixed(2)}deg) translateY(-4px)`;

      // Dynamic mouse spotlight gradient
      const glow = card.querySelector('.project-glow-backdrop');
      if (glow) {
        glow.style.background = `radial-gradient(circle 350px at ${leftX}px ${topY}px, rgba(56, 189, 248, 0.18), transparent 70%)`;
        glow.style.opacity = '1';
      }
    }

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    });

    card.addEventListener('mousemove', rotateToMouse);

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      const glow = card.querySelector('.project-glow-backdrop');
      if (glow) {
        glow.style.opacity = '0';
      }
    });
  });
}
