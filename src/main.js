/**
 * main.js - Core Entry point for Homepage (index.html)
 * Bootstraps and coordinates all modules.
 */

import { PRODUCTS } from './utils/products.js';
import { initCart, addToCart } from './components/layout/cart.js';
import { initSidebar } from './components/layout/sidebar.js';
import { initHeroSlider } from './components/sections/slider.js';
import { initFaqs } from './components/sections/faq.js';
import { initQuickView, openQuickView } from './components/product/quickview.js';
import { initScrollReveal } from './components/ui/scroll-reveal.js';
import { initReels } from './components/sections/reels.js';

// ── DOM Elements ──
const DOM = {
  productsGrid: document.getElementById('mc-products-grid'),
  announceSlides: document.querySelectorAll('.mc-announce-slide'),
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
  initFaqs();
  initQuickView();

  // Build product grid
  renderProductsGrid();

  // Start homepage behaviors
  startAnnouncementRotator();
  setupHomepageListeners();
  setupHeaderScroll();
  initReels();

  // Video testimonials carousel + lightbox
  initVideoTestimonialCarousel();
  initVideoLightbox();
  initGoogleReviewsCarousel();
  carouselAutoplaySync.start();

  // Scroll reveal (after render)
  initScrollReveal();

  // Sliding bottom nav indicator
  initSlidingNavbar();
}

function initSlidingNavbar() {
  const inner = document.querySelector('.mc-mobile-bottom-inner');
  if (!inner) return;

  // Create indicator if not already present
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

  // Robust visibility and size monitoring using ResizeObserver
  const resizeObserver = new ResizeObserver(() => {
    const activeItem = inner.querySelector('.mc-mobile-bottom-item.active');
    if (activeItem && activeItem.offsetWidth > 0) {
      indicator.style.transition = 'none';
      updatePosition(activeItem);
      indicator.offsetHeight; // force reflow
      indicator.style.transition = '';
      indicator.style.opacity = '1';
    }
  });
  resizeObserver.observe(inner);

  // Position indicator at active item initially
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
        indicator.offsetHeight; // force reflow
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

  // Listen to cart open/close toggle
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
      if (cartTrigger) {
        cartTrigger.classList.remove('active');
      }
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

  // DRAG / HOLD & SLIDE LOGIC
  let isDragging = false;
  let startX = 0;
  let initialLeft = 0;
  let currentHoveredItem = activeItem;

  const getEventX = (e) => {
    return e.touches ? e.touches[0].clientX : e.clientX;
  };

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

    // Prevent default scrolling during swipe/drag
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
      if (active) {
        sessionStorage.setItem('mc_prev_active_nav', active.id);
      }
      currentHoveredItem.click();

      // Automatically snap back to active item if navigation doesn't occur (e.g. Cart button) and cart isn't open
      setTimeout(() => {
        const cartDrawer = document.getElementById('mc-cart-drawer');
        const isCartOpen = cartDrawer && cartDrawer.classList.contains('open');
        if (!isCartOpen) {
          const stillActive = inner.querySelector('.mc-mobile-bottom-item.active');
          if (stillActive) {
            updatePosition(stillActive);
          }
        }
      }, 300);
    } else if (active) {
      updatePosition(active);
    }
  };

  // Attach handlers to the bottom nav bar container
  inner.addEventListener('mousedown', onStart, { passive: false });
  inner.addEventListener('touchstart', onStart, { passive: false });

  window.addEventListener('mousemove', onMove, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });

  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  // Intercept click on navigation items to save active ID before browser page load/navigation
  items.forEach(item => {
    item.addEventListener('click', function () {
      if (this.id) {
        sessionStorage.setItem('mc_prev_active_nav', this.id);
      }
    });
  });
}

// ══════════════════════════════════════════════════════════════
// PRODUCT GRID RENDERER (Hero Products — limited subset)
// ══════════════════════════════════════════════════════════════
const HERO_PRODUCT_LIMIT = 6;

function renderProductsGrid() {
  if (!DOM.productsGrid) return;
  DOM.productsGrid.innerHTML = '';

  // Determine which products to show based on current page
  const path = window.location.pathname;
  let filtered = PRODUCTS;

  if (path.includes('kids.html')) {
    filtered = PRODUCTS.filter(p => p.megaCategory === 'cp-kids');
  } else if (path.includes('adults.html')) {
    filtered = PRODUCTS.filter(p => p.megaCategory === 'adults');
  }

  // Limit to hero products only
  filtered = filtered.slice(0, HERO_PRODUCT_LIMIT);

  filtered.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'mc-product-card mc-reveal';

    // Badge logic: discount takes priority, then best seller
    let badgeHTML = '';
    if (p.oldPrice && p.price < p.oldPrice) {
      const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      badgeHTML = `<span class="mc-badge mc-badge-sale">${discount}% OFF</span>`;
      if (p.bestSeller) {
        badgeHTML += `<span class="mc-badge mc-badge-bestseller">BEST SELLER</span>`;
      }
    } else if (p.bestSeller) {
      badgeHTML = `<span class="mc-badge mc-badge-bestseller">BEST SELLER</span>`;
    }

    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="mc-product-card-link" aria-label="View ${p.title}">
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
          <h3 class="mc-product-title">${p.title}</h3>
          <p class="mc-product-description">${p.desc}</p>
          <div class="mc-product-footer">
            <div class="mc-price-group">
              ${p.oldPrice ? `<span class="mc-price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
              <span class="mc-price-new">₹${p.price.toLocaleString('en-IN')}</span>
            </div>
            <span class="mc-product-view-link">View Product <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </div>
      </a>
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

      // Prevent the anchor tag from navigating when clicking action buttons
      e.preventDefault();
      e.stopPropagation();

      const productId = button.dataset.id;

      if (button.classList.contains('mc-buy-btn') || button.classList.contains('mc-add-to-cart-quick')) {
        addToCart(productId, 1);
      } else if (button.classList.contains('mc-quick-view-btn')) {
        openQuickView(productId, button);
      }
    });
  }

  // Mobile Bottom Nav
  const mobileCartTrigger = document.getElementById('mc-mobile-cart-trigger');
  if (mobileCartTrigger) {
    mobileCartTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('mc-open-cart')?.click();
    });
  }

  DOM.mobileBottomItems.forEach(item => {
    item.addEventListener('click', function (e) {
      const target = this.dataset.target;
      if (!target || target === 'cart') return; // Allow natural anchor tag links to navigate

      e.preventDefault();
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

  const mobileNav = document.querySelector('.mc-mobile-bottom-nav');
  let lastScrollY = window.scrollY;
  let ticking = false;
  const THRESHOLD = 12; // px — ignore micro-jitter

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        // Header scrolled state
        DOM.header.classList.toggle('scrolled', currentY > 20);

        // Mobile nav hide/show — only on mobile widths
        if (mobileNav && window.innerWidth <= 768) {
          if (delta > THRESHOLD) {
            // Scrolling DOWN (toward footer) — hide nav
            mobileNav.classList.add('nav-hidden');
          } else if (delta < -THRESHOLD) {
            // Scrolling UP (toward top) — show nav
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

// ══════════════════════════════════════════════════════════════
// SYNCHRONIZED AUTOPLAY CONTROLLER (Locks transitions of both carousels to the same timer)
// ══════════════════════════════════════════════════════════════
const carouselAutoplaySync = {
  video: null,
  google: null,
  intervalId: null,
  delay: 4000,
  isVideoHovered: false,
  isGoogleHovered: false,
  scrollTimeout: null,

  registerVideo(controller) {
    this.video = controller;
  },

  registerGoogle(controller) {
    this.google = controller;
  },

  start() {
    this.stop();
    if (!this.video && !this.google) return;
    this.intervalId = setInterval(() => {
      if (this.video && !this.isVideoHovered) {
        this.video.next();
      }
      if (this.google && !this.isGoogleHovered) {
        this.google.next();
      }
    }, this.delay);
  },

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  reset() {
    this.start();
  },

  handleScrollPause() {
    this.stop();
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.start();
    }, 1500);
  }
};

// ══════════════════════════════════════════════════════════════
// VIDEO TESTIMONIALS CAROUSEL
// ══════════════════════════════════════════════════════════════
function initVideoTestimonialCarousel() {
  const track = document.getElementById('mc-vtest-track');
  const dotsWrap = document.getElementById('mc-vtest-dots');
  const prevBtn = document.getElementById('mc-vtest-prev');
  const nextBtn = document.getElementById('mc-vtest-next');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.mc-vtest-card'));
  const isMobile = () => window.innerWidth <= 768;
  let currentIdx = 0;

  // ── Desktop carousel (JS translate) ──
  function getVisibleCount() { return isMobile() ? 1 : 3; }
  function getMaxIdx() { return Math.max(0, cards.length - getVisibleCount()); }

  function getCardWidth() {
    if (!cards[0]) return 0;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    const wrap = track.parentElement;
    const visible = getVisibleCount();
    return (wrap.offsetWidth - gap * (visible - 1)) / visible + gap;
  }

  function goTo(idx) {
    const maxIdx = getMaxIdx();
    currentIdx = Math.max(0, Math.min(idx, maxIdx));
    const slideDist = currentIdx * getCardWidth();
    
    if (isMobile()) {
      track.scrollTo({ left: slideDist, behavior: 'smooth' });
    } else {
      track.style.transform = `translateX(-${slideDist}px)`;
    }
    
    updateDots();
    if (prevBtn) prevBtn.disabled = currentIdx === 0;
    if (nextBtn) nextBtn.disabled = currentIdx >= maxIdx;
  }

  // Build dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const totalDots = getMaxIdx() + 1;
    for (let i = 0; i < totalDots; i++) {
      const btn = document.createElement('button');
      btn.className = 'mc-vtest-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => {
        goTo(i);
        carouselAutoplaySync.reset(); // Reset timer on user click
      });
      dotsWrap.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.mc-vtest-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    goTo(currentIdx - 1);
    carouselAutoplaySync.reset(); // Reset timer
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    goTo(currentIdx + 1);
    carouselAutoplaySync.reset(); // Reset timer
  });

  // Register with synchronizer
  carouselAutoplaySync.registerVideo({
    next: () => {
      const maxIdx = getMaxIdx();
      let nextIdx = currentIdx + 1;
      if (nextIdx > maxIdx) {
        nextIdx = 0; // wrap back
      }
      goTo(nextIdx);
    }
  });

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    carouselAutoplaySync.isVideoHovered = true;
  });
  track.addEventListener('mouseleave', () => {
    carouselAutoplaySync.isVideoHovered = false;
    carouselAutoplaySync.reset();
  });

  buildDots();
  goTo(0);

  // Mobile: update dots on scroll snap + handle manual swipe pause
  if (isMobile() && track) {
    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardW = getCardWidth();
      const newIdx = Math.round(scrollLeft / cardW);
      if (newIdx !== currentIdx) {
        currentIdx = newIdx;
        updateDots();
      }
      carouselAutoplaySync.handleScrollPause();
    }, { passive: true });
  }

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { 
      buildDots(); 
      goTo(currentIdx); 
    }, 200);
  });
}

// ── Google Reviews Carousel ──
function initGoogleReviewsCarousel() {
  const track = document.getElementById('mc-google-track');
  const dotsWrap = document.getElementById('mc-google-dots');
  const prevBtn = document.getElementById('mc-google-prev');
  const nextBtn = document.getElementById('mc-google-next');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.mc-google-review-card'));
  const isMobile = () => window.innerWidth <= 768;
  let currentIdx = 0;

  const getCardWidth = () => cards[0] ? cards[0].offsetWidth : 275;
  const getGap = () => {
    const style = window.getComputedStyle(track);
    return parseFloat(style.gap) || 24;
  };

  function getVisibleCount() {
    const wrap = track.parentElement;
    return Math.max(1, Math.floor(wrap.offsetWidth / (getCardWidth() + getGap())));
  }

  function getMaxIdx() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function goTo(idx) {
    const maxIdx = getMaxIdx();
    currentIdx = Math.max(0, Math.min(idx, maxIdx));
    const slideDist = currentIdx * (getCardWidth() + getGap());
    
    if (isMobile()) {
      track.scrollTo({ left: slideDist, behavior: 'smooth' });
    } else {
      track.style.transform = `translateX(-${slideDist}px)`;
    }
    
    updateDots();
    if (prevBtn) prevBtn.disabled = currentIdx === 0;
    if (nextBtn) nextBtn.disabled = currentIdx >= maxIdx;
  }

  // Build dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const totalDots = getMaxIdx() + 1;
    for (let i = 0; i < totalDots; i++) {
      const btn = document.createElement('button');
      btn.className = 'mc-google-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => {
        goTo(i);
        carouselAutoplaySync.reset(); // Reset timer on user click
      });
      dotsWrap.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.mc-google-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    goTo(currentIdx - 1);
    carouselAutoplaySync.reset(); // Reset timer
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    goTo(currentIdx + 1);
    carouselAutoplaySync.reset(); // Reset timer
  });

  // Register with synchronizer
  carouselAutoplaySync.registerGoogle({
    next: () => {
      const maxIdx = getMaxIdx();
      let nextIdx = currentIdx + 1;
      if (nextIdx > maxIdx) {
        nextIdx = 0; // wrap back
      }
      goTo(nextIdx);
    }
  });

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    carouselAutoplaySync.isGoogleHovered = true;
  });
  track.addEventListener('mouseleave', () => {
    carouselAutoplaySync.isGoogleHovered = false;
    carouselAutoplaySync.reset();
  });

  buildDots();
  goTo(0);

  // Mobile: update dots on scroll snap + handle manual swipe pause
  if (isMobile() && track) {
    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardW = getCardWidth() + getGap();
      const newIdx = Math.round(scrollLeft / cardW);
      if (newIdx !== currentIdx) {
        currentIdx = newIdx;
        updateDots();
      }
      carouselAutoplaySync.handleScrollPause();
    }, { passive: true });
  }

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { 
      buildDots(); 
      goTo(currentIdx); 
    }, 200);
  });
}

// ── Lightbox ──
function initVideoLightbox() {
  const lightbox = document.getElementById('mc-vtest-lightbox');
  const backdrop = document.getElementById('mc-vtest-lightbox-backdrop');
  const closeBtn = document.getElementById('mc-vtest-lightbox-close');
  const videoWrap = document.getElementById('mc-vtest-lightbox-video');
  if (!lightbox) return;

  function openLightbox(videoId, startTime) {
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime || 0}&rel=0&modestbranding=1&playsinline=1`;
    videoWrap.innerHTML = `<iframe src="${src}" title="Video testimonial" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { videoWrap.innerHTML = ''; }, 350);
  }

  // Click on any play button inside a vtest-thumb
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.mc-vtest-thumb');
    if (thumb && document.getElementById('mc-testimonials-section')) {
      const videoId = thumb.dataset.videoId;
      const start = thumb.dataset.start || 0;
      if (videoId) openLightbox(videoId, start);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

window.scrollToSection = scrollToSection;

// ── Bootstrapper ──
document.addEventListener('DOMContentLoaded', init);
