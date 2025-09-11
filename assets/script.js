// Tiny JS: nav toggle, theme toggle, year stamp
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Theme preference with icon =====
const THEMES = { LIGHT: 'light', DARK: 'dark' };
const storageKey = 'mohit-theme';
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const SUN_SVG = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h-2v3h2V4zm7.45 1.46l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM17 11h-2a3 3 0 10-6 0H7a5 5 0 1010 0zm6 0h-3v2h3v-2zM4 20l1.41 1.41 1.8-1.79-1.42-1.42L4 20zm7 0h2v-3h-2v3zm7.24-.84l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42z"/>
</svg>`;

const MOON_SVG = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M21.64 13a9 9 0 01-11.64 8.64A9 9 0 1019 2.36 7 7 0 0121.64 13z"/>
</svg>`;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeIcon) {
    themeIcon.innerHTML = (theme === THEMES.DARK) ? SUN_SVG : MOON_SVG;
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} theme`);
    themeToggle.title = `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} theme`;
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || getPreferredTheme();
  const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(next);
  localStorage.setItem(storageKey, next);
}

// initialize
applyTheme(getPreferredTheme());
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
/// Smooth typewriter effect for subheading
const typeTarget = document.getElementById("typewriter");
if (typeTarget) {
  const text = "Hello, I am Mohit 👋";
  let i = 0;
  function type() {
    if (i < text.length) {
      typeTarget.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80); // adjust speed here
    }
  }
  type();
}

// ===== Simple Carousel (auto-play, arrows, dots, swipe) =====
(function initCarousel(){
  const root = document.getElementById('carousel');
  if (!root) return;

  const track = root.querySelector('.car-track');
  const slides = Array.from(root.querySelectorAll('.car-slide'));
  const prev  = root.querySelector('.car-btn.prev');
  const next  = root.querySelector('.car-btn.next');
  const dotsC = root.querySelector('.car-dots');

  let index = 0;
  const last = slides.length - 1;

  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to slide ${i+1}`);
    b.addEventListener('click', () => goTo(i));
    dotsC.appendChild(b);
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dotsC.children).forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }
  function goTo(i){ index = (i + slides.length) % slides.length; update(); }
  function nextSlide(){ goTo(index + 1); }
  function prevSlide(){ goTo(index - 1); }

  // Arrow handlers
  if (next) next.addEventListener('click', nextSlide);
  if (prev) prev.addEventListener('click', prevSlide);

  // Auto-play
  let timer = setInterval(nextSlide, 4000);
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', () => (timer = setInterval(nextSlide, 4000)));

  // Swipe on touch
  let startX = 0, dx = 0;
  root.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dx = 0; }, {passive:true});
  root.addEventListener('touchmove',  e => { dx = e.touches[0].clientX - startX; }, {passive:true});
  root.addEventListener('touchend',   () => {
    if (Math.abs(dx) > 50) (dx < 0 ? nextSlide() : prevSlide());
    dx = 0;
  });

  // Init
  update();
})();


