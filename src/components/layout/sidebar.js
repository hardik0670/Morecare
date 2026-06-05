/* ==========================================================================
   MOBILE SIDEBAR & HEADER NAVIGATION (sidebar.js)
   Updated for multiple mega-category dropdown wrappers
   ========================================================================= */

const DOM = {
  mobileSidebar: document.getElementById('mc-mobile-sidebar'),
  sidebarOverlay: document.getElementById('mc-sidebar-overlay'),
  menuToggle: document.getElementById('mc-menu-toggle'),
  mobileSidebarClose: document.getElementById('mc-mobile-sidebar-close')
};

export function initSidebar() {
  setupEventListeners();
}

function openSidebar() {
  if (DOM.mobileSidebar) {
    DOM.mobileSidebar.classList.add('open');
    DOM.mobileSidebar.setAttribute('aria-hidden', 'false');
  }
  if (DOM.sidebarOverlay) DOM.sidebarOverlay.classList.add('active');
  if (DOM.mobileSidebarClose) DOM.mobileSidebarClose.focus();
}

function closeSidebar() {
  if (DOM.mobileSidebar) {
    DOM.mobileSidebar.classList.remove('open');
    DOM.mobileSidebar.setAttribute('aria-hidden', 'true');
  }
  if (DOM.sidebarOverlay) DOM.sidebarOverlay.classList.remove('active');

  // Reset all mobile dropdowns
  document.querySelectorAll('.mc-mobile-dropdown-wrapper.open').forEach(w => {
    w.classList.remove('open');
  });
}

function setupEventListeners() {
  // Mobile Menu Toggles
  if (DOM.menuToggle) {
    DOM.menuToggle.addEventListener('click', openSidebar);
  }
  if (DOM.mobileSidebarClose) {
    DOM.mobileSidebarClose.addEventListener('click', closeSidebar);
  }

  // Overlay click closure
  if (DOM.sidebarOverlay) {
    DOM.sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Keyboard navigation: Escape key closes sidebar
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });
}
