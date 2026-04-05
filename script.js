// ====================================================
// STITCHED BY SOPHIA — JavaScript
// ====================================================

// ---- PAGE ROUTING ----
function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
  
  // Show target page
  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.add('page--active');
  }

  // Scroll to top (below nav + ticker)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update active nav link styling
  document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
}

// ---- NAV SCROLL SHADOW ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.nav__burger');
  if (menu && burger && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ---- BLOG FILTER ----
function filterBlog(cat, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
  btn.classList.add('filter-btn--active');

  // Show/hide cards
  document.querySelectorAll('.blog-card').forEach(card => {
    if (cat === 'all') {
      card.classList.remove('hidden');
    } else {
      const cardCat = card.dataset.cat;
      if (cardCat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    }
  });
}

// ---- BOOKING FORM ----
function submitBooking() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;

  if (!name || !email || !service) {
    // Simple inline validation
    if (!name) highlight('name');
    if (!email) highlight('email');
    if (!service) highlight('service');
    return;
  }

  // Show success message
  const success = document.getElementById('booking-success');
  success.style.display = 'block';

  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('service').value = '';
  document.getElementById('items').value = '';
  document.getElementById('message').value = '';

  // Scroll to success message
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Hide after 6 seconds
  setTimeout(() => { success.style.display = 'none'; }, 6000);
}

function highlight(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#8b3a3a';
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; }, 2000);
}

// ---- SCROLL REVEAL (lightweight) ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  const els = document.querySelectorAll(
    '.blog-card, .portfolio-item, .team-card, .services-teaser__card, .booking-service'
  );
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    revealObserver.observe(el);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initReveal();

  // Re-run reveal when pages become active (MutationObserver)
  const pageObserver = new MutationObserver(() => {
    initReveal();
  });
  document.querySelectorAll('.page').forEach(p => {
    pageObserver.observe(p, { attributes: true, attributeFilter: ['class'] });
  });
});
