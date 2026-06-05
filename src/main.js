/**
 * main.js - Core Entry point for Homepage (index.html)
 * Bootstraps and coordinates all modules.
 * Supports 25 SKUs with mega-category (CP Kids / Adults) filtering.
 */

import { PRODUCTS, MEGA_CATEGORIES, SUB_CATEGORIES } from './utils/products.js';
import { initCart, addToCart } from './components/layout/cart.js';
import { initSidebar } from './components/layout/sidebar.js';
import { initHeroSlider } from './components/sections/slider.js';
import { initHotspots } from './components/sections/hotspots.js';
import { initQuiz } from './components/sections/quiz.js';
import { initFaqs } from './components/sections/faq.js';
import { initQuickView, openQuickView } from './components/product/quickview.js';
import { initScrollReveal } from './components/ui/scroll-reveal.js';

// ── State ──
let currentMegaCategory = 'all';
let currentSubCategory = 'all';

// ── DOM Elements ──
const DOM = {
  productsGrid: document.getElementById('mc-products-grid'),
  megaFilterBar: document.getElementById('mc-mega-filter-bar'),
  filterTabsContainer: document.getElementById('mc-filter-tabs'),
  announceSlides: document.querySelectorAll('.mc-announce-slide'),
  circleCards: document.querySelectorAll('.mc-category-circle-card'),
  mobileBottomItems: document.querySelectorAll('.mc-mobile-bottom-item'),
  mobileDropdownWrappers: document.querySelectorAll('.mc-mobile-dropdown-wrapper'),
  header: document.querySelector('.mc-header')
};

// ══════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════
function init() {
  // Initialize modules
  initCart();
  initSidebar();
  initHeroSlider();
  initHotspots();
  initQuiz();
  initFaqs();
  initQuickView();

  // Build product grid with mega-category filters
  setupMegaFilter();
  renderSubCategoryTabs();
  renderProductsGrid();

  // Start homepage behaviors
  startAnnouncementRotator();
  setupHomepageListeners();
  setupHeaderScroll();
  initReelsSlideshow();

  // Scroll reveal (after render)
  initScrollReveal();
}

// ══════════════════════════════════════════════════════════════
// MEGA-CATEGORY FILTER SYSTEM
// ══════════════════════════════════════════════════════════════
function setupMegaFilter() {
  if (!DOM.megaFilterBar) return;

  DOM.megaFilterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.mc-mega-filter-btn');
    if (!btn) return;

    const mega = btn.dataset.mega;
    currentMegaCategory = mega;
    currentSubCategory = 'all';

    // Update active state
    DOM.megaFilterBar.querySelectorAll('.mc-mega-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Rebuild sub-category tabs and product grid
    renderSubCategoryTabs();
    renderProductsGrid();
  });
}

function renderSubCategoryTabs() {
  if (!DOM.filterTabsContainer) return;

  DOM.filterTabsContainer.innerHTML = '';

  // For 'all' mega-category, show no sub-filters
  if (currentMegaCategory === 'all') return;

  const subs = SUB_CATEGORIES[currentMegaCategory];
  if (!subs) return;

  // "All" tab
  const allTab = createFilterTab('All', 'all', currentSubCategory === 'all');
  DOM.filterTabsContainer.appendChild(allTab);

  subs.forEach(sub => {
    const tab = createFilterTab(sub.label, sub.id, currentSubCategory === sub.id);
    DOM.filterTabsContainer.appendChild(tab);
  });

  // Click handler
  DOM.filterTabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.mc-filter-tab');
    if (!tab) return;

    currentSubCategory = tab.dataset.sub;

    DOM.filterTabsContainer.querySelectorAll('.mc-filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    renderProductsGrid();
  });
}

function createFilterTab(label, subId, isActive) {
  const btn = document.createElement('button');
  btn.className = `mc-filter-tab${isActive ? ' active' : ''}`;
  btn.dataset.sub = subId;
  btn.textContent = label;
  return btn;
}

// ══════════════════════════════════════════════════════════════
// PRODUCT GRID RENDERER (Hero Products — limited subset)
// ══════════════════════════════════════════════════════════════
const HERO_PRODUCT_LIMIT = 6;

function renderProductsGrid() {
  if (!DOM.productsGrid) return;
  DOM.productsGrid.innerHTML = '';

  let filtered = PRODUCTS;

  // Filter by mega-category
  if (currentMegaCategory !== 'all') {
    filtered = filtered.filter(p => p.megaCategory === currentMegaCategory);
  }

  // Filter by sub-category
  if (currentSubCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentSubCategory);
  }

  // Limit to hero products only
  filtered = filtered.slice(0, HERO_PRODUCT_LIMIT);

  filtered.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'mc-product-card mc-reveal';

    // Use placeholder names as requested
    const displayTitle = `Product ${idx + 1}`;
    const displaySku = `SKU${String(idx + 1).padStart(2, '0')}`;

    let badgeHTML = '';
    if (p.price < p.oldPrice) {
      const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      badgeHTML = `<span class="mc-badge mc-badge-sale">${discount}% OFF</span>`;
    } else if (p.rating >= 4.8) {
      badgeHTML = `<span class="mc-badge mc-badge-new">BEST SELLER</span>`;
    }

    card.innerHTML = `
      <div class="mc-product-badge-wrap">${badgeHTML}</div>
      <div class="mc-product-image-area" aria-hidden="true">
        ${p.graphic}
        <div class="mc-product-actions-overlay">
          <button class="mc-product-action-icon mc-quick-view-btn" data-id="${p.id}" title="Quick View">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="mc-product-action-icon mc-add-to-cart-quick" data-id="${p.id}" title="Add to Cart">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
      <div class="mc-product-details">
        <span class="mc-product-category">${p.categoryLabel}</span>
        <h3 class="mc-product-title">${displayTitle} <small style="color: var(--mc-text-light); font-weight: 500; font-size: 11px;">(${displaySku})</small></h3>
        <div class="mc-product-rating">
          ★ ${p.rating} <span class="mc-product-rating-count">(${p.reviews} reviews)</span>
        </div>
        <p class="mc-product-description">${p.desc}</p>
        <div class="mc-product-footer">
          <div class="mc-price-group">
            ${p.oldPrice ? `<span class="mc-price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
            <span class="mc-price-new">₹${p.price.toLocaleString('en-IN')}</span>
          </div>
          <button class="mc-btn mc-btn-accent mc-btn-sm mc-buy-btn" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    `;
    DOM.productsGrid.appendChild(card);
  });

  // Re-observe for scroll animations
  initScrollReveal();
}

// ══════════════════════════════════════════════════════════════
// HOMEPAGE LISTENERS
// ══════════════════════════════════════════════════════════════
function setupHomepageListeners() {
  // Product grid delegation (buy btn / quick view)
  if (DOM.productsGrid) {
    DOM.productsGrid.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      const productId = button.dataset.id;

      if (button.classList.contains('mc-buy-btn') || button.classList.contains('mc-add-to-cart-quick')) {
        addToCart(productId, 1);
      } else if (button.classList.contains('mc-quick-view-btn')) {
        openQuickView(productId, button);
      }
    });
  }

  // Category Circle click → filter by mega/sub category
  DOM.circleCards.forEach(card => {
    card.addEventListener('click', function() {
      const mega = this.dataset.mega;
      const sub = this.dataset.sub;

      if (mega) {
        currentMegaCategory = mega;
        currentSubCategory = sub || 'all';

        // Update mega filter buttons
        if (DOM.megaFilterBar) {
          DOM.megaFilterBar.querySelectorAll('.mc-mega-filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.mega === mega);
          });
        }

        renderSubCategoryTabs();
        renderProductsGrid();

        // If sub-category was specified, activate its tab
        if (sub && DOM.filterTabsContainer) {
          setTimeout(() => {
            const matchTab = DOM.filterTabsContainer.querySelector(`[data-sub="${sub}"]`);
            if (matchTab) matchTab.click();
          }, 50);
        }
      }

      scrollToSection('mc-products-section');
    });
  });

  // Mobile Bottom Nav
  DOM.mobileBottomItems.forEach(item => {
    item.addEventListener('click', function() {
      const target = this.dataset.target;
      if (target === 'cart') {
        document.getElementById('mc-open-cart')?.click();
        return;
      }

      DOM.mobileBottomItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      if (target === 'index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(target);
      }
    });
  });

  // Mobile sidebar dropdown toggles
  DOM.mobileDropdownWrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.mc-mobile-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        wrapper.classList.toggle('open');
      });
    }
  });
}

// ══════════════════════════════════════════════════════════════
// HEADER SCROLL EFFECT
// ══════════════════════════════════════════════════════════════
function setupHeaderScroll() {
  if (!DOM.header) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        DOM.header.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ══════════════════════════════════════════════════════════════
// ANNOUNCEMENT BAR ROTATOR
// ══════════════════════════════════════════════════════════════
function startAnnouncementRotator() {
  if (DOM.announceSlides.length === 0) return;
  let activeIdx = 0;
  setInterval(() => {
    DOM.announceSlides[activeIdx].classList.remove('active');
    activeIdx = (activeIdx + 1) % DOM.announceSlides.length;
    DOM.announceSlides[activeIdx].classList.add('active');
  }, 3500);
}

// ══════════════════════════════════════════════════════════════
// HELPERS (exposed globally for inline onclick)
// ══════════════════════════════════════════════════════════════
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = document.querySelector('.mc-header')?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Global function for hero CTA buttons
window.filterMega = function(mega) {
  currentMegaCategory = mega;
  currentSubCategory = 'all';

  if (DOM.megaFilterBar) {
    DOM.megaFilterBar.querySelectorAll('.mc-mega-filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mega === mega);
    });
  }

  renderSubCategoryTabs();
  renderProductsGrid();
  scrollToSection('mc-products-section');
};

window.scrollToSection = scrollToSection;

// ══════════════════════════════════════════════════════════════
// INSTAGRAM REELS SLIDESHOW
// ══════════════════════════════════════════════════════════════
function initReelsSlideshow() {
  const track = document.getElementById('mc-reels-track');
  if (!track) return;

  const reelsModal = document.getElementById('mc-reels-modal');
  const reelsVideoContainer = document.getElementById('mc-reels-video-container');
  const reelsModalCloseBtn = document.getElementById('mc-reels-modal-close-btn');

  if (!reelsModal || !reelsVideoContainer || !reelsModalCloseBtn) return;

  // Handle click on any reel slide
  track.addEventListener('click', (e) => {
    const placeholder = e.target.closest('.mc-reel-placeholder');
    if (!placeholder) return;

    const videoId = placeholder.dataset.videoId || '9tO5qXvqf-M';
    
    // Embed the video in portrait format (autoplay)
    reelsVideoContainer.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
              title="Morecare Reel Video" 
              frameborder="0" 
              allow="autoplay; encrypted-media; picture-in-picture" 
              allowfullscreen></iframe>
    `;

    // Open the modal
    reelsModal.classList.add('open');
  });

  // Close modal logic
  const closeReelsModal = () => {
    reelsModal.classList.remove('open');
    // Clear video to stop audio playing
    reelsVideoContainer.innerHTML = '';
  };

  reelsModalCloseBtn.addEventListener('click', closeReelsModal);
  reelsModal.addEventListener('click', (e) => {
    if (e.target === reelsModal) {
      closeReelsModal();
    }
  });
}

// ── Bootstrapper ──
document.addEventListener('DOMContentLoaded', init);
