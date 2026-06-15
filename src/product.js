/**
 * product.js - Core Entry point for Product Detail Page (product.html)
 * Dynamically renders product data from URL param and coordinates all interactions.
 */

import { PRODUCTS } from './utils/products.js';
import { initCart, addToCart } from './components/layout/cart.js';
import { initSidebar } from './components/layout/sidebar.js';
import { initScrollReveal } from './components/ui/scroll-reveal.js';

// Get product ID from URL
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// DOM Elements
const DOM = {
  announceSlides: document.querySelectorAll('.mc-announce-slide'),
  header: document.querySelector('.mc-header'),

  // Breadcrumbs
  breadcrumbCat: document.getElementById('mc-breadcrumb-cat'),
  breadcrumbCurrent: document.getElementById('mc-breadcrumb-current'),

  // Gallery
  mainGallerySvg: document.getElementById('mc-main-gallery-svg'),
  galleryThumbs: document.getElementById('mc-gallery-thumbs'),

  // Product Info
  pdpBadges: document.getElementById('mc-pdp-badges'),
  pdpCategory: document.getElementById('mc-pdp-category'),
  pdpTitle: document.getElementById('mc-pdp-title'),
  pdpPriceOld: document.getElementById('mc-pdp-price-old'),
  pdpPrice: document.getElementById('mc-pdp-price'),
  pdpDiscount: document.getElementById('mc-pdp-discount'),
  pdpDesc: document.getElementById('mc-pdp-desc'),
  pdpFeatures: document.getElementById('mc-pdp-features'),
  pdpSizeGroup: document.getElementById('mc-pdp-size-group'),
  pdpSizes: document.getElementById('mc-pdp-sizes'),

  // Quantity & Cart
  prodQtyInput: document.getElementById('mc-prod-qty'),
  prodQtyMinus: document.getElementById('mc-prod-qty-minus'),
  prodQtyPlus: document.getElementById('mc-prod-qty-plus'),
  prodAddBtn: document.getElementById('mc-prod-add-btn'),

  // Tabs
  productTabs: document.getElementById('mc-product-tabs'),
  tabIndicator: document.getElementById('mc-tab-indicator'),
  tabContents: document.querySelectorAll('.mc-product-tab-content'),
  tabDescContent: document.getElementById('mc-tab-desc-content'),
  specsTable: document.getElementById('mc-specs-table'),

  // Related Products
  relatedGrid: document.getElementById('mc-related-grid'),

  // Sticky Bar
  stickyBar: document.getElementById('mc-mobile-sticky-bar'),
  stickyBuyBtn: document.getElementById('mc-sticky-buy-btn'),
  stickyTitle: document.getElementById('mc-sticky-title'),
  stickyPrice: document.getElementById('mc-sticky-price')
};

// Current product reference
let currentProduct = null;

// Initialize
function init() {
  initCart();
  initSidebar();

  const productId = getProductIdFromURL();

  if (productId) {
    currentProduct = PRODUCTS.find(p => p.id === productId);
  }

  // Fallback: default to first product if none found
  if (!currentProduct) {
    currentProduct = PRODUCTS[0];
    // Update URL silently
    const newUrl = `${window.location.pathname}?id=${currentProduct.id}`;
    window.history.replaceState(null, '', newUrl);
  }

  renderProduct(currentProduct);
  startAnnouncementRotator();
  setupProductPageListeners();
  setupStickyPurchaseBar();
  setupHeaderScroll();

  // Mobile Cart Trigger
  const mobileCartTrigger = document.getElementById('mc-mobile-cart-trigger');
  if (mobileCartTrigger) {
    mobileCartTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('mc-open-cart')?.click();
    });
  }

  initScrollReveal();
  initSlidingNavbar();
}

// ══════════════════════════════════════════════════════════════
// RENDER PRODUCT DATA
// ══════════════════════════════════════════════════════════════
function renderProduct(product) {
  // Page title
  document.title = `${product.title} — Morecare`;

  // Breadcrumbs
  if (DOM.breadcrumbCat) {
    const catPage = product.megaCategory === 'cp-kids' ? 'kids.html' : 'adults.html';
    const catLabel = product.megaCategory === 'cp-kids' ? 'CP Kids' : 'Adults';
    DOM.breadcrumbCat.href = catPage;
    DOM.breadcrumbCat.textContent = catLabel;
  }
  if (DOM.breadcrumbCurrent) {
    DOM.breadcrumbCurrent.textContent = product.title;
  }

  // Badges
  if (DOM.pdpBadges) {
    let badges = '';
    if (product.bestSeller) {
      badges += '<span class="mc-badge mc-badge-bestseller">BEST SELLER</span>';
    }
    if (product.oldPrice && product.price < product.oldPrice) {
      const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
      badges += `<span class="mc-badge mc-badge-sale">${discount}% OFF</span>`;
    }
    DOM.pdpBadges.innerHTML = badges;
  }

  // Category
  if (DOM.pdpCategory) DOM.pdpCategory.textContent = product.categoryLabel;

  // Title
  if (DOM.pdpTitle) DOM.pdpTitle.textContent = product.title;

  // Pricing
  if (DOM.pdpPrice) DOM.pdpPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  if (DOM.pdpPriceOld) {
    if (product.oldPrice && product.oldPrice > product.price) {
      DOM.pdpPriceOld.textContent = `₹${product.oldPrice.toLocaleString('en-IN')}`;
      DOM.pdpPriceOld.style.display = '';
    } else {
      DOM.pdpPriceOld.style.display = 'none';
    }
  }
  if (DOM.pdpDiscount) {
    if (product.oldPrice && product.oldPrice > product.price) {
      const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
      const savings = product.oldPrice - product.price;
      DOM.pdpDiscount.textContent = `Save ₹${savings.toLocaleString('en-IN')} (${discount}% OFF)`;
      DOM.pdpDiscount.style.display = '';
    } else {
      DOM.pdpDiscount.style.display = 'none';
    }
  }

  // Description
  if (DOM.pdpDesc) DOM.pdpDesc.textContent = product.desc;

  // Features grid
  if (DOM.pdpFeatures && product.features) {
    const featureIcons = [
      '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
      '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'
    ];

    DOM.pdpFeatures.innerHTML = product.features.map((feat, i) => `
      <div class="mc-pdp-feature-item">
        <div class="mc-pdp-feature-icon">${featureIcons[i % featureIcons.length]}</div>
        <span class="mc-pdp-feature-text">${feat}</span>
      </div>
    `).join('');
  }

  // Sizes
  if (DOM.pdpSizes && product.sizes) {
    if (product.sizes.length > 0) {
      DOM.pdpSizes.innerHTML = product.sizes.map((size, i) =>
        `<button class="mc-size-btn mc-prod-size-btn ${i === 0 ? 'selected' : ''}" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}">${size}</button>`
      ).join('');
      DOM.pdpSizeGroup.style.display = '';
    } else {
      DOM.pdpSizeGroup.style.display = 'none';
    }
  }

  // Add to Cart button data
  if (DOM.prodAddBtn) DOM.prodAddBtn.setAttribute('data-id', product.id);

  // Gallery
  renderGallery(product);

  // Description tab content
  if (DOM.tabDescContent) {
    DOM.tabDescContent.innerHTML = `
      <p>The <strong>${product.title}</strong> is a premium-grade product designed by rehabilitation specialists. ${product.desc}</p>
      <p>Engineered with the highest quality materials and rigorous testing standards, this product delivers consistent performance for daily use. Whether at home, in the office, or on the go — it adapts to your needs.</p>
    `;
  }

  // Specs table
  if (DOM.specsTable) {
    const specs = [
      { label: 'Product Name', value: product.title },
      { label: 'SKU', value: product.id },
      { label: 'Category', value: product.categoryLabel },
      ...(product.sizes ? [{ label: 'Available Sizes', value: product.sizes.join(' / ') }] : []),
      ...(product.features ? product.features.map(f => ({ label: 'Feature', value: f })) : []),
      { label: 'Warranty', value: '1 Year limited manufacturer warranty' }
    ];

    DOM.specsTable.innerHTML = specs.map(s => `
      <tr>
        <td class="mc-specs-label">${s.label}</td>
        <td class="mc-specs-value">${s.value}</td>
      </tr>
    `).join('');
  }

  // Sticky bar
  if (DOM.stickyTitle) DOM.stickyTitle.textContent = product.title;
  if (DOM.stickyPrice) DOM.stickyPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;

  // Related products
  renderRelatedProducts(product);
}

// ══════════════════════════════════════════════════════════════
// GALLERY
// ══════════════════════════════════════════════════════════════
function renderGallery(product) {
  if (!DOM.mainGallerySvg || !DOM.galleryThumbs) return;

  // Main image
  DOM.mainGallerySvg.innerHTML = product.graphic;
  DOM.mainGallerySvg.style.transition = 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';

  // Generate 3 thumbnail variations
  const thumbVariants = [
    product.graphic,
    // Rotated variation
    `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="20" y="20" width="60" height="60" rx="6" stroke="currentColor" stroke-dasharray="2 2" />
      <path d="M30 40h40M30 60h40" stroke-linecap="round" />
    </svg>`,
    // Detail variation
    `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="50" cy="50" r="24" stroke="currentColor" stroke-width="3" />
      <path d="M50 26v48M26 50h48" stroke-linecap="round" />
    </svg>`
  ];

  DOM.galleryThumbs.innerHTML = thumbVariants.map((svg, i) => `
    <div class="mc-gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
      ${svg}
    </div>
  `).join('');

  // Thumb click handlers
  const thumbs = DOM.galleryThumbs.querySelectorAll('.mc-gallery-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      if (this.classList.contains('active')) return;

      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Crossfade effect
      DOM.mainGallerySvg.style.opacity = '0';
      DOM.mainGallerySvg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        const idx = parseInt(this.dataset.index);
        DOM.mainGallerySvg.innerHTML = thumbVariants[idx];
        DOM.mainGallerySvg.style.opacity = '1';
        DOM.mainGallerySvg.style.transform = 'scale(1)';
      }, 220);
    });
  });
}

// ══════════════════════════════════════════════════════════════
// RELATED PRODUCTS
// ══════════════════════════════════════════════════════════════
function renderRelatedProducts(product) {
  if (!DOM.relatedGrid) return;

  // Get products from same category, excluding current product
  let related = PRODUCTS.filter(p => p.megaCategory === product.megaCategory && p.id !== product.id);
  related = related.slice(0, 4);

  if (related.length === 0) {
    document.getElementById('mc-related-section').style.display = 'none';
    return;
  }

  DOM.relatedGrid.innerHTML = related.map(p => {
    let badgeHTML = '';
    if (p.bestSeller) {
      badgeHTML = '<span class="mc-badge mc-badge-bestseller">BEST SELLER</span>';
    } else if (p.oldPrice && p.price < p.oldPrice) {
      const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      badgeHTML = `<span class="mc-badge mc-badge-sale">${discount}% OFF</span>`;
    }

    return `
      <a href="product.html?id=${p.id}" class="mc-related-card">
        <div class="mc-related-badge-wrap">${badgeHTML}</div>
        <div class="mc-related-image">
          ${p.graphic}
        </div>
        <div class="mc-related-info">
          <span class="mc-product-category">${p.categoryLabel}</span>
          <h3 class="mc-related-title">${p.title}</h3>
          <div class="mc-price-group">
            ${p.oldPrice ? `<span class="mc-price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
            <span class="mc-price-new">₹${p.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════════════════
function setupProductPageListeners() {
  // Size selection
  if (DOM.pdpSizes) {
    DOM.pdpSizes.addEventListener('click', (e) => {
      const btn = e.target.closest('.mc-prod-size-btn');
      if (!btn) return;
      DOM.pdpSizes.querySelectorAll('.mc-prod-size-btn').forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
    });
  }

  // Quantity controllers
  if (DOM.prodQtyInput && DOM.prodQtyMinus && DOM.prodQtyPlus) {
    DOM.prodQtyMinus.addEventListener('click', () => {
      let val = parseInt(DOM.prodQtyInput.value);
      if (val > 1) {
        DOM.prodQtyInput.value = val - 1;
        DOM.prodQtyMinus.classList.add('mc-qty-pulse');
        setTimeout(() => DOM.prodQtyMinus.classList.remove('mc-qty-pulse'), 200);
      }
    });

    DOM.prodQtyPlus.addEventListener('click', () => {
      let val = parseInt(DOM.prodQtyInput.value);
      if (val < 99) {
        DOM.prodQtyInput.value = val + 1;
        DOM.prodQtyPlus.classList.add('mc-qty-pulse');
        setTimeout(() => DOM.prodQtyPlus.classList.remove('mc-qty-pulse'), 200);
      }
    });
  }

  // Main purchase button with success animation
  if (DOM.prodAddBtn) {
    DOM.prodAddBtn.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      const qty = parseInt(DOM.prodQtyInput ? DOM.prodQtyInput.value : 1);
      const selectedSize = document.querySelector('.mc-prod-size-btn.selected');
      const size = selectedSize ? selectedSize.textContent : null;

      // Success animation
      this.classList.add('mc-btn-success');
      const originalHTML = this.innerHTML;
      this.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Added!`;

      setTimeout(() => {
        this.classList.remove('mc-btn-success');
        this.innerHTML = originalHTML;
      }, 1800);

      addToCart(id, qty, size);
    });
  }

  // Detail tabs with sliding indicator
  if (DOM.productTabs) {
    const tabs = DOM.productTabs.querySelectorAll('.mc-product-tab');

    // Position indicator initially
    requestAnimationFrame(() => updateTabIndicator(tabs[0]));

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        DOM.tabContents.forEach(c => c.classList.remove('active'));

        this.classList.add('active');
        updateTabIndicator(this);

        const activeContent = document.getElementById(`mc-tab-${target}`);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }
}

function updateTabIndicator(activeTab) {
  if (!DOM.tabIndicator || !activeTab) return;
  const tabsContainer = activeTab.parentElement;
  if (!tabsContainer) return;

  const containerRect = tabsContainer.getBoundingClientRect();
  const tabRect = activeTab.getBoundingClientRect();

  // Decide orientation from current layout.
  // Desktop/tablet vertical: flex-direction: column
  // Mobile horizontal: flex-direction: row
  const styles = window.getComputedStyle(tabsContainer);
  const flexDirection = styles.flexDirection;
  const isVertical = flexDirection === 'column';

  if (isVertical) {
    DOM.tabIndicator.style.left = '0px';
    DOM.tabIndicator.style.width = '3px';
    DOM.tabIndicator.style.top = `${tabRect.top - containerRect.top}px`;
    DOM.tabIndicator.style.height = `${tabRect.height}px`;
  } else {
    DOM.tabIndicator.style.top = 'auto';
    DOM.tabIndicator.style.height = '3px';
    DOM.tabIndicator.style.left = `${tabRect.left - containerRect.left}px`;
    DOM.tabIndicator.style.width = `${tabRect.width}px`;
  }
}


// ══════════════════════════════════════════════════════════════
// STICKY PURCHASE BAR (Mobile)
// ══════════════════════════════════════════════════════════════
function setupStickyPurchaseBar() {
  if (!DOM.prodAddBtn || !DOM.stickyBar) return;

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
  }, { root: null, threshold: 0 });

  observer.observe(DOM.prodAddBtn);

  // Sticky bar add to cart
  if (DOM.stickyBuyBtn) {
    DOM.stickyBuyBtn.addEventListener('click', () => {
      if (!currentProduct) return;
      const qty = parseInt(DOM.prodQtyInput ? DOM.prodQtyInput.value : 1);
      const selectedSize = document.querySelector('.mc-prod-size-btn.selected');
      const size = selectedSize ? selectedSize.textContent : null;
      addToCart(currentProduct.id, qty, size);
    });
  }
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
  }, 2000);
}

// ══════════════════════════════════════════════════════════════
// HEADER SCROLL
// ══════════════════════════════════════════════════════════════
function setupHeaderScroll() {
  if (!DOM.header) return;

  const mobileNav = document.querySelector('.mc-mobile-bottom-nav');
  let lastScrollY = window.scrollY;
  let ticking = false;
  const THRESHOLD = 12;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        DOM.header.classList.toggle('scrolled', currentY > 20);

        if (mobileNav && window.innerWidth <= 768) {
          if (delta > THRESHOLD) {
            mobileNav.classList.add('nav-hidden');
          } else if (delta < -THRESHOLD) {
            mobileNav.classList.remove('nav-hidden');
          }
        }

        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ══════════════════════════════════════════════════════════════
// SLIDING BOTTOM NAV
// ══════════════════════════════════════════════════════════════
function initSlidingNavbar() {
  const inner = document.querySelector('.mc-mobile-bottom-inner');
  if (!inner) return;

  let indicator = inner.querySelector('.mc-mobile-bottom-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'mc-mobile-bottom-indicator';
    inner.appendChild(indicator);
  }

  const items = inner.querySelectorAll('.mc-mobile-bottom-item');

  const updatePosition = (el) => {
    if (!el || el.offsetWidth === 0) return;
    indicator.style.left = `${el.offsetLeft + 2}px`;
    indicator.style.width = `${el.offsetWidth - 4}px`;
  };

  const resizeObserver = new ResizeObserver(() => {
    const activeItem = inner.querySelector('.mc-mobile-bottom-item.active');
    if (activeItem && activeItem.offsetWidth > 0) {
      indicator.style.transition = 'none';
      updatePosition(activeItem);
      indicator.offsetHeight;
      indicator.style.transition = '';
      indicator.style.opacity = '1';
    }
  });
  resizeObserver.observe(inner);

  const activeItem = inner.querySelector('.mc-mobile-bottom-item.active');
  if (activeItem) {
    const prevId = sessionStorage.getItem('mc_prev_active_nav');
    sessionStorage.setItem('mc_prev_active_nav', activeItem.id || '');

    indicator.style.transition = 'none';

    if (prevId && prevId !== activeItem.id) {
      const prevItem = document.getElementById(prevId);
      if (prevItem && prevItem.offsetWidth > 0) {
        updatePosition(prevItem);
        indicator.style.opacity = '1';
        indicator.offsetHeight;
        indicator.style.transition = '';
        updatePosition(activeItem);
      } else {
        updatePosition(activeItem);
        indicator.style.opacity = '1';
      }
    } else {
      updatePosition(activeItem);
      indicator.style.opacity = '1';
    }
  }

  // Cart toggle listener
  window.addEventListener('mc-cart-toggle', (e) => {
    const isOpen = e.detail.open;
    const cartTrigger = document.getElementById('mc-mobile-cart-trigger');
    const active = inner.querySelector('.mc-mobile-bottom-item.active') || inner.querySelector('.mc-mobile-bottom-item[data-actual-active]');

    if (isOpen && cartTrigger) {
      if (active && active !== cartTrigger) {
        active.dataset.actualActive = 'true';
        active.classList.remove('active');
      }
      cartTrigger.classList.add('active');
      updatePosition(cartTrigger);
    } else {
      if (cartTrigger) cartTrigger.classList.remove('active');
      const originalActive = inner.querySelector('[data-actual-active="true"]');
      if (originalActive) {
        originalActive.classList.add('active');
        originalActive.removeAttribute('data-actual-active');
        updatePosition(originalActive);
      } else if (active) {
        active.classList.add('active');
        updatePosition(active);
      }
    }
  });

  // Drag / slide logic
  let isDragging = false;
  let startX = 0;
  let initialLeft = 0;
  let currentHoveredItem = activeItem;

  const getEventX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  const onStart = (e) => {
    const active = inner.querySelector('.mc-mobile-bottom-item.active');
    if (!active) return;
    isDragging = true;
    startX = getEventX(e);
    initialLeft = active.offsetLeft + 2;
    indicator.style.transition = 'none';
    currentHoveredItem = active;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const currentX = getEventX(e);
    const deltaX = currentX - startX;
    const active = inner.querySelector('.mc-mobile-bottom-item.active');
    if (!active) return;

    let newLeft = initialLeft + deltaX;
    const minLeft = 2;
    const maxLeft = inner.offsetWidth - indicator.offsetWidth - 2;
    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    indicator.style.left = `${newLeft}px`;

    const indicatorCenter = newLeft + (indicator.offsetWidth / 2);
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
      const distance = Math.abs(indicatorCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem && closestItem !== currentHoveredItem) {
      currentHoveredItem = closestItem;
      indicator.style.width = `${closestItem.offsetWidth - 4}px`;
    }
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    indicator.style.transition = '';
    const active = inner.querySelector('.mc-mobile-bottom-item.active');

    if (currentHoveredItem && currentHoveredItem !== active) {
      if (active) sessionStorage.setItem('mc_prev_active_nav', active.id);
      currentHoveredItem.click();
      setTimeout(() => {
        const cartDrawer = document.getElementById('mc-cart-drawer');
        const isCartOpen = cartDrawer && cartDrawer.classList.contains('open');
        if (!isCartOpen) {
          const stillActive = inner.querySelector('.mc-mobile-bottom-item.active');
          if (stillActive) updatePosition(stillActive);
        }
      }, 300);
    } else if (active) {
      updatePosition(active);
    }
  };

  inner.addEventListener('mousedown', onStart, { passive: false });
  inner.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  items.forEach(item => {
    item.addEventListener('click', function () {
      if (this.id) sessionStorage.setItem('mc_prev_active_nav', this.id);
    });
  });
}

// DOM Bootstrapper
document.addEventListener('DOMContentLoaded', init);
