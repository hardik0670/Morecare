/**
 * product.js - Core Entry point for Product Detail Page (product.html)
 * Bootstraps and coordinates all product interaction states.
 */

import { initCart, addToCart } from './components/layout/cart.js';
import { initSidebar } from './components/layout/sidebar.js';
import { initScrollReveal } from './components/ui/scroll-reveal.js';

// DOM Elements
const DOM = {
  announceSlides: document.querySelectorAll('.mc-announce-slide'),
  mobileBottomItems: document.querySelectorAll('.mc-mobile-bottom-item'),
  
  // Gallery controls
  mainImg: document.getElementById('mc-main-gallery-svg'),
  thumbs: document.querySelectorAll('.mc-gallery-thumb'),
  
  // Product Configurator
  sizeBtns: document.querySelectorAll('.mc-prod-size-btn'),
  prodQtyInput: document.getElementById('mc-prod-qty'),
  prodQtyMinus: document.getElementById('mc-prod-qty-minus'),
  prodQtyPlus: document.getElementById('mc-prod-qty-plus'),
  prodAddBtn: document.getElementById('mc-prod-add-btn'),
  
  // Detail Tabs
  prodTabs: document.querySelectorAll('.mc-product-tab'),
  tabContents: document.querySelectorAll('.mc-product-tab-content'),
  
  // Sticky Bottom Bar
  stickyBar: document.getElementById('mc-mobile-sticky-bar'),
  stickyBuyBtn: document.getElementById('mc-sticky-buy-btn')
};

// Initialize Product Page
function init() {
  initCart();
  initSidebar();
  
  startAnnouncementRotator();
  setupProductPageListeners();
  setupGalleryCrossfade();
  setupStickyPurchaseBar();
  
  initScrollReveal();
}

// Gallery Thumbnail Clicks with Smooth Cross-fades & Outlines
function setupGalleryCrossfade() {
  if (!DOM.thumbs || !DOM.mainImg) return;

  // Add styles dynamically for crossfade transitions
  DOM.mainImg.style.transition = 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
  
  DOM.thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      if (this.classList.contains('active')) return;

      DOM.thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Visual crossfade effect: fade out, swap content, fade in
      DOM.mainImg.style.opacity = '0';
      DOM.mainImg.style.transform = 'scale(0.96)';
      
      setTimeout(() => {
        DOM.mainImg.innerHTML = this.querySelector('svg').innerHTML;
        DOM.mainImg.style.opacity = '1';
        DOM.mainImg.style.transform = 'scale(1)';
      }, 220);
    });
  });
}

// Product Page Specific Listeners
function setupProductPageListeners() {
  // Size selection toggles
  if (DOM.sizeBtns) {
    DOM.sizeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        DOM.sizeBtns.forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-checked', 'false');
        });
        this.classList.add('selected');
        this.setAttribute('aria-checked', 'true');
      });
    });
  }

  // Quantity controllers
  if (DOM.prodQtyInput && DOM.prodQtyMinus && DOM.prodQtyPlus) {
    DOM.prodQtyMinus.addEventListener('click', () => {
      let val = parseInt(DOM.prodQtyInput.value);
      if (val > 1) {
        DOM.prodQtyInput.value = val - 1;
      }
    });

    DOM.prodQtyPlus.addEventListener('click', () => {
      let val = parseInt(DOM.prodQtyInput.value);
      DOM.prodQtyInput.value = val + 1;
    });
  }

  // Main purchase button
  if (DOM.prodAddBtn) {
    DOM.prodAddBtn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      const qty = parseInt(DOM.prodQtyInput ? DOM.prodQtyInput.value : 1);
      const selectedSize = document.querySelector('.mc-prod-size-btn.selected');
      const size = selectedSize ? selectedSize.textContent : null;
      addToCart(id, qty, size);
    });
  }

  // Details specification tab navigation
  if (DOM.prodTabs && DOM.tabContents) {
    DOM.prodTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.dataset.tab;
        
        DOM.prodTabs.forEach(t => t.classList.remove('active'));
        DOM.tabContents.forEach(c => c.classList.remove('active'));

        this.classList.add('active');
        const activeContent = document.getElementById(`mc-tab-${target}`);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }
}

// Bottom Sticky Purchase Sheet for Mobile
function setupStickyPurchaseBar() {
  if (!DOM.prodAddBtn || !DOM.stickyBar) return;

  // Use a high-performance IntersectionObserver to detect when the main Buy Button scrolls past viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isPastButton = entry.boundingClientRect.top < 0;
      
      if (!entry.isIntersecting && isPastButton) {
        DOM.stickyBar.classList.add('mc-visible');
        document.body.classList.add('mc-has-sticky-bar');
      } else {
        DOM.stickyBar.classList.remove('mc-visible');
        document.body.classList.remove('mc-has-sticky-bar');
      }
    });
  }, {
    root: null,
    threshold: 0
  });

  observer.observe(DOM.prodAddBtn);

  // Bind click action on the sticky Add button
  if (DOM.stickyBuyBtn) {
    DOM.stickyBuyBtn.addEventListener('click', () => {
      const id = DOM.prodAddBtn.getAttribute('data-id');
      const qty = parseInt(DOM.prodQtyInput ? DOM.prodQtyInput.value : 1);
      const selectedSize = document.querySelector('.mc-prod-size-btn.selected');
      const size = selectedSize ? selectedSize.textContent : null;
      
      addToCart(id, qty, size);
    });
  }
}

// Announcement Bar Rotator
function startAnnouncementRotator() {
  if (DOM.announceSlides.length === 0) return;
  let activeIdx = 0;
  setInterval(() => {
    DOM.announceSlides[activeIdx].classList.remove('active');
    activeIdx = (activeIdx + 1) % DOM.announceSlides.length;
    DOM.announceSlides[activeIdx].classList.add('active');
  }, 3000);
}

// DOM Bootstrapper
document.addEventListener('DOMContentLoaded', init);
