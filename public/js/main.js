/**
 * main.js
 * Core portfolio JavaScript — orchestrates all modules
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';

// ─── Contact Form ─────────────────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous messages
    hideMessages();
    clearErrors(form);

    const data = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    // Client-side basic validation
    let hasErrors = false;
    if (!data.name) { showFieldError('name', 'Name is required.'); hasErrors = true; }
    if (!data.email || !isValidEmail(data.email)) { showFieldError('email', 'Enter a valid email.'); hasErrors = true; }
    if (!data.subject) { showFieldError('subject', 'Subject is required.'); hasErrors = true; }
    if (!data.message || data.message.length < 10) { showFieldError('message', 'Message must be at least 10 characters.'); hasErrors = true; }

    if (hasErrors) return;

    // Submit
    setLoading(submitBtn, true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        form.reset();
        showMessage(successMsg, json.message || "Message sent! I'll get back to you soon.");
      } else {
        if (json.errors) {
          json.errors.forEach((e) => showFieldError(e.field, e.message));
        }
        showMessage(errorMsg, json.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      showMessage(errorMsg, 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(submitBtn, false);
    }
  });

  // Helpers
  function showFieldError(field, msg) {
    const group = form.querySelector(`[name="${field}"]`)?.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  }

  function clearErrors(f) {
    f.querySelectorAll('.form-group').forEach((g) => {
      g.classList.remove('has-error');
    });
  }

  function showMessage(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 6000);
  }

  function hideMessages() {
    successMsg?.classList.remove('visible');
    errorMsg?.classList.remove('visible');
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Sending...' : 'Send Message';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ─── GitHub Repos ─────────────────────────────────────────────────────────────
async function initGitHubRepos() {
  const container = document.getElementById('github-repos');
  const loadingEl = document.getElementById('github-loading');
  const emptyEl   = document.getElementById('github-empty');

  if (!container) return;

  // Language color map
  const langColors = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python:     '#3572A5',
    Java:       '#B07219',
    HTML:       '#E34C26',
    CSS:        '#563D7C',
    'C#':       '#178600',
    PHP:        '#4F5D95',
    Ruby:       '#701516',
    Go:         '#00ADD8',
    Rust:       '#DEA584',
    Shell:      '#89E051',
  };

  try {
    const res = await fetch('/api/github/repos');
    const json = await res.json();

    loadingEl?.remove();

    if (!json.success || !json.data.length) {
      emptyEl?.classList.remove('hidden');
      return;
    }

    container.innerHTML = json.data.map((repo) => {
      const color = langColors[repo.language] || '#94A3B8';
      const relDate = getRelativeDate(repo.updatedAt);
      return `
        <article class="card card-hoverable repo-card fade-up" aria-label="Repository: ${escHtml(repo.name)}">
          <div class="repo-header">
            <a href="${escHtml(repo.url)}" class="repo-name" target="_blank" rel="noopener noreferrer" aria-label="Open ${escHtml(repo.name)} on GitHub">
              ${escHtml(repo.name)}
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
          <p class="repo-description">${escHtml(repo.description)}</p>
          ${repo.topics.length ? `<div class="tags-grid">${repo.topics.slice(0,3).map(t => `<span class="tag badge-mono">${escHtml(t)}</span>`).join('')}</div>` : ''}
          <div class="repo-meta">
            ${repo.language ? `
              <span class="repo-lang">
                <span class="lang-dot" style="background:${color}" aria-hidden="true"></span>
                ${escHtml(repo.language)}
              </span>` : ''}
            <span class="repo-stat" aria-label="${repo.stars} stars">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${repo.stars}
            </span>
            <span class="repo-stat" title="${relDate}" style="margin-left:auto;font-size:0.7rem">
              ${relDate}
            </span>
          </div>
        </article>`;
    }).join('');

    // Trigger animations
    requestAnimationFrame(() => {
      container.querySelectorAll('.fade-up').forEach((el, i) => {
        el.style.transitionDelay = `${i * 60}ms`;
        el.classList.add('visible');
      });
    });

  } catch (err) {
    loadingEl?.remove();
    if (emptyEl) {
      emptyEl.textContent = 'Unable to load repositories at this time.';
      emptyEl.classList.remove('hidden');
    }
  }
}

// ─── Utility: relative date ───────────────────────────────────────────────────
function getRelativeDate(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1)   return 'today';
  if (days < 7)   return `${days}d ago`;
  if (days < 30)  return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// ─── Utility: escape HTML ─────────────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[c]));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initContactForm();
  initGitHubRepos();
});
