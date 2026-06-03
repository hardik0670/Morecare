/* ==========================================================================
   MORECARE E-COMMERCE DYNAMIC INTERACTIONS (app.js)
   Self-contained logic for sliders, drawers, filters, quiz, cart, and modals.
   ========================================================================== */

(function() {
  'use strict';

  // --- PRODUCT DATA CATALOG ---
  const PRODUCTS = [
    {
      id: 'MC-W01',
      title: 'Morecare Carbon X Electric Wheelchair',
      category: 'wheelchair',
      categoryLabel: 'Electric Wheelchairs',
      price: 139999,
      oldPrice: 155000,
      rating: 4.9,
      reviews: 124,
      desc: 'Ultra-lightweight aerospace carbon fiber frame. One-click folding, dual brushless motors, smart electromagnetic braking, and intelligent joystick controller with speed dial.',
      features: ['Aviation Grade Carbon Fiber', '14.2 kg Net Weight', '18 km Battery Range', 'Anti-tip Safety Wheels'],
      sizes: ['Standard Seat (18")', 'Wide Seat (20")'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="40" cy="70" r="18" stroke-width="4" /><circle cx="75" cy="70" r="10" stroke-width="3" /><rect x="25" y="30" width="30" height="25" rx="4" /><path d="M25 45h35M40 70l20-30M30 20h25M75 70l-15-30" stroke-linecap="round"/><circle cx="45" cy="70" r="4" fill="currentColor"/><circle cx="75" cy="70" r="3" fill="currentColor"/></svg>`
    },
    {
      id: 'MC-C01',
      title: 'Morecare Ergo-Air Seat Cushion',
      category: 'cushion',
      categoryLabel: 'Comfort Cushions',
      price: 4999,
      oldPrice: 5999,
      rating: 4.8,
      reviews: 342,
      desc: 'Advanced air-inflatable support featuring 36 interconnected contour cells. Promotes tailbone pressure relief, pelvic alignment, and prevents long-sitting tailbone sores.',
      features: ['Adjustable Inflation Valve', 'Anti-Slip Silica Base', 'Breathable Cool-Mesh Cover', 'Precision Hand Pump Included'],
      sizes: ['Standard (18" x 16")', 'Compact (16" x 16")'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="20" y="25" width="60" height="50" rx="8" stroke-width="3" /><path d="M30 35h40M30 45h40M30 55h40M30 65h40M50 25v50" stroke-opacity="0.2"/><path d="M80 50h8M88 45v10" stroke-linecap="round"/></svg>`
    },
    {
      id: 'MC-I01',
      title: 'Morecare Cloud-Gel Orthotic Insoles',
      category: 'insoles',
      categoryLabel: 'Foot Wellness',
      price: 1499,
      oldPrice: 1999,
      rating: 4.7,
      reviews: 580,
      desc: 'Physiotherapist-approved dual gel shoe inserts. Features targeted heel shock absorption, reinforced high-arch cradle, and dynamic alignment support for physical activity.',
      features: ['Medical Grade PU Gel', 'Deep Heel Cradle', 'Arch Support Structure', 'Odor-Resistant Fabric'],
      sizes: ['Small (UK 4-6)', 'Medium (UK 7-9)', 'Large (UK 10-12)'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M45 15c-10 20-5 35-15 50s5 20 20 20c15 0 20-10 20-25S55 35 45 15z" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="70" r="6" stroke-dasharray="2 2" /><path d="M40 50c5 5 15 5 20 0" /></svg>`
    },
    {
      id: 'MC-W02',
      title: 'Morecare Transit Lite Wheelchair',
      category: 'wheelchair',
      categoryLabel: 'Manual Wheelchairs',
      price: 12500,
      oldPrice: 15000,
      rating: 4.6,
      reviews: 98,
      desc: 'Ultra-portable manual attendant wheelchair. Extremely light weight, folds completely flat in seconds. Ideal for travel, doctor visits, and restaurant excursions.',
      features: ['Aerospace Aluminum Alloy', '8.9 kg Total Weight', 'Attendant Loop Brakes', 'Foldable Backrest & Footplates'],
      sizes: ['Standard (17" width)'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="35" cy="65" r="15" /><circle cx="68" cy="65" r="8" /><path d="M20 25h15M35 25v40M35 45h30M65 45v20M25 45h20" stroke-linecap="round"/><rect x="30" y="42" width="10" height="5" fill="currentColor"/></svg>`
    },
    {
      id: 'MC-C02',
      title: 'Morecare Contoured Cervical Pillow',
      category: 'cushion',
      categoryLabel: 'Comfort Cushions',
      price: 2999,
      oldPrice: 3999,
      rating: 4.8,
      reviews: 215,
      desc: 'Ergonomic neck support pillow molded from premium slow-rebound memory foam. Unique wave shape matches cervical curve to eliminate morning neck and shoulder stiffness.',
      features: ['Premium Density Memory Foam', 'Contoured Neck Cradle', 'Side-Sleeper Flat Zones', 'Washable Bamboo Fiber Cover'],
      sizes: ['Standard (23" x 14")', 'Queen (25" x 15")'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="15" y="30" width="70" height="40" rx="10" stroke-width="3"/><path d="M15 50q17.5-10 35 0t35 0" stroke-width="2"/></svg>`
    },
    {
      id: 'MC-I02',
      title: 'Morecare Arch-Active Sports Insoles',
      category: 'insoles',
      categoryLabel: 'Foot Wellness',
      price: 1799,
      oldPrice: 2299,
      rating: 4.9,
      reviews: 112,
      desc: 'High-performance running and fitness orthotics. Semi-rigid plastic shell gives structural support while forefoot gel padding maximizes energy rebound.',
      features: ['Vibe-Guard Shock Shell', 'Aerated Forefoot Breathing', 'Heel Pad Cushioning', 'Moisture-Wicking Top Mesh'],
      sizes: ['Medium (UK 7-9)', 'Large (UK 10-12)'],
      graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M40 10c-5 15-5 30-10 45s5 25 15 25 15-5 20-15-5-35-10-45-5-10-15-10z" stroke-width="3"/><path d="M35 55c10 0 15 10 20 20M32 40h12" stroke-linecap="round"/></svg>`
    }
  ];

  // --- STATE VARIABLES ---
  let cart = [];
  let currentHeroSlide = 0;
  let currentQuizStep = 0;
  let quizAnswers = {};

  // --- DOM SELECTORS ---
  const DOM = {
    announceSlides: document.querySelectorAll('.mc-announce-slide'),
    heroSlides: document.querySelectorAll('.mc-hero-slide'),
    heroDots: document.querySelectorAll('.mc-hero-dot'),
    productsGrid: document.querySelector('.mc-products-grid'),
    filterTabs: document.querySelectorAll('.mc-filter-tab'),
    hotspotPoints: document.querySelectorAll('.mc-hotspot-point'),
    hotspotTitle: document.getElementById('mc-hotspot-title'),
    hotspotDesc: document.getElementById('mc-hotspot-desc'),
    
    // Quiz
    quizProgress: document.getElementById('mc-quiz-progress-bar'),
    quizSteps: document.querySelectorAll('.mc-quiz-step'),
    quizOptions: document.querySelectorAll('.mc-quiz-option'),
    btnPrevQuiz: document.getElementById('mc-quiz-prev'),
    btnNextQuiz: document.getElementById('mc-quiz-next'),
    quizRecScreen: document.getElementById('mc-quiz-rec-screen'),
    quizRecCard: document.getElementById('mc-quiz-rec-card'),
    quizQuizScreen: document.getElementById('mc-quiz-quiz-screen'),
    
    // Cart Drawer
    cartDrawer: document.getElementById('mc-cart-drawer'),
    cartItemsContainer: document.getElementById('mc-cart-items'),
    cartSubtotal: document.getElementById('mc-cart-subtotal-val'),
    cartCountBadges: document.querySelectorAll('.mc-cart-count-badge'),
    shippingProgressFill: document.getElementById('mc-shipping-progress-fill'),
    shippingBarText: document.getElementById('mc-shipping-bar-text'),
    btnOpenCart: document.getElementById('mc-open-cart'),
    btnCloseCart: document.getElementById('mc-close-cart'),
    cartToast: document.getElementById('mc-cart-toast'),
    cartToastText: document.getElementById('mc-cart-toast-text'),
    
    // Quick View Modal
    quickViewModal: document.getElementById('mc-quickview-modal'),
    modalCloseBtn: document.getElementById('mc-modal-close-btn'),
    modalMeta: document.getElementById('mc-modal-meta'),
    modalTitle: document.getElementById('mc-modal-title'),
    modalPrice: document.getElementById('mc-modal-price'),
    modalDesc: document.getElementById('mc-modal-desc'),
    modalGraphic: document.getElementById('mc-modal-graphic'),
    modalSizeContainer: document.getElementById('mc-modal-sizes'),
    modalAddBtn: document.getElementById('mc-modal-add-btn'),

    // Sidebar
    mobileSidebar: document.getElementById('mc-mobile-sidebar'),
    sidebarOverlay: document.getElementById('mc-sidebar-overlay'),
    menuToggle: document.getElementById('mc-menu-toggle'),
    mobileSidebarClose: document.getElementById('mc-mobile-sidebar-close'),
    
    // FAQs
    faqQuestions: document.querySelectorAll('.mc-faq-question'),
    
    // Testimonials
    testimonialTrack: document.querySelector('.mc-testimonials-track'),
    testimonialCards: document.querySelectorAll('.mc-testimonial-card'),
    testimonialPrev: document.getElementById('mc-testimonial-prev'),
    testimonialNext: document.getElementById('mc-testimonial-next')
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    loadCartFromStorage();
    renderProductsGrid('all');
    setupEventListeners();
    startAnnouncementRotator();
    updateCartUI();
  }

  // ==========================================================================
  // LOCAL STORAGE & CART ACTIONS
  // ==========================================================================
  function loadCartFromStorage() {
    const savedCart = localStorage.getItem('morecare_cart');
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch (e) {
        cart = [];
      }
    }
  }

  function saveCartToStorage() {
    localStorage.setItem('morecare_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(productId, qty = 1, size = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Check if item with exact product ID and size already in cart
    const existingIndex = cart.findIndex(item => item.id === productId && item.selectedSize === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        selectedSize: size || (product.sizes ? product.sizes[0] : null),
        quantity: qty,
        graphic: product.graphic
      });
    }

    saveCartToStorage();
    showToast(`Added ${product.title} to cart!`);
    openCartDrawer();
  }

  function updateCartQty(productId, size, delta) {
    const index = cart.findIndex(item => item.id === productId && item.selectedSize === size);
    if (index === -1) return;

    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCartToStorage();
  }

  function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
    saveCartToStorage();
  }

  function updateCartUI() {
    // 1. Update Badge counts
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    DOM.cartCountBadges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });

    // 2. Clear items container
    DOM.cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div class="mc-cart-empty">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Your shopping cart is empty</p>
          <button class="mc-btn mc-btn-accent mc-btn-sm" id="mc-cart-shop-now">Shop Best Sellers</button>
        </div>
      `;
      
      const shopNowBtn = document.getElementById('mc-cart-shop-now');
      if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
          closeCartDrawer();
          scrollToSection('mc-products-section');
        });
      }
      
      DOM.cartSubtotal.textContent = '₹0';
      DOM.shippingProgressFill.style.width = '0%';
      DOM.shippingBarText.innerHTML = 'Add <span>₹4,999</span> more for <strong>FREE shipping</strong>';
      return;
    }

    // 3. Render items
    let subtotal = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'mc-cart-item';
      itemEl.innerHTML = `
        <div class="mc-cart-item-image">
          ${item.graphic}
        </div>
        <div class="mc-cart-item-details">
          <div class="mc-cart-item-title">${item.title}</div>
          <div class="mc-cart-item-meta">${item.selectedSize ? 'Size: ' + item.selectedSize : ''}</div>
          <div class="mc-cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="mc-cart-item-controls">
            <div class="mc-qty-selector">
              <button class="mc-qty-btn mc-qty-minus" data-id="${item.id}" data-size="${item.selectedSize || ''}">-</button>
              <input type="text" class="mc-qty-input" value="${item.quantity}" readonly>
              <button class="mc-qty-btn mc-qty-plus" data-id="${item.id}" data-size="${item.selectedSize || ''}">+</button>
            </div>
            <button class="mc-cart-item-remove" data-id="${item.id}" data-size="${item.selectedSize || ''}">Remove</button>
          </div>
        </div>
      `;
      DOM.cartItemsContainer.appendChild(itemEl);
    });

    // 4. Update Price summary
    DOM.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // 5. Update Free Shipping Progress (Threshold: ₹4999)
    const threshold = 4999;
    const progress = Math.min((subtotal / threshold) * 100, 100);
    DOM.shippingProgressFill.style.width = `${progress}%`;

    if (subtotal >= threshold) {
      DOM.shippingProgressFill.style.backgroundColor = 'var(--mc-teal)';
      DOM.shippingBarText.innerHTML = '🎉 You qualify for <strong>FREE Shipping!</strong>';
    } else {
      DOM.shippingProgressFill.style.backgroundColor = 'var(--mc-teal)';
      const remaining = threshold - subtotal;
      DOM.shippingBarText.innerHTML = `Add <span>₹${remaining.toLocaleString('en-IN')}</span> more for <strong>FREE shipping</strong>`;
    }
  }

  function openCartDrawer() {
    DOM.cartDrawer.classList.add('open');
    DOM.sidebarOverlay.classList.add('active');
  }

  function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('open');
    if (!DOM.mobileSidebar.classList.contains('open')) {
      DOM.sidebarOverlay.classList.remove('active');
    }
  }

  function showToast(message) {
    DOM.cartToastText.textContent = message;
    DOM.cartToast.classList.add('active');
    setTimeout(() => {
      DOM.cartToast.classList.remove('active');
    }, 3000);
  }

  // ==========================================================================
  // PRODUCT RENDERING & FILTERING
  // ==========================================================================
  function renderProductsGrid(filterCategory = 'all') {
    if (!DOM.productsGrid) return;
    DOM.productsGrid.innerHTML = '';

    const filtered = filterCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filterCategory);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'mc-product-card';
      
      // Badges
      let badgeHTML = '';
      if (p.price < p.oldPrice) {
        const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
        badgeHTML = `<span class="mc-badge mc-badge-sale">${discount}% OFF</span>`;
      } else if (p.rating >= 4.8) {
        badgeHTML = `<span class="mc-badge mc-badge-new">BEST SELLER</span>`;
      }

      card.innerHTML = `
        <div class="mc-product-badge-wrap">${badgeHTML}</div>
        <div class="mc-product-image-area">
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
  }

  // ==========================================================================
  // QUICK VIEW MODAL
  // ==========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    DOM.modalMeta.textContent = product.categoryLabel;
    DOM.modalTitle.textContent = product.title;
    DOM.modalPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
    DOM.modalDesc.textContent = product.desc;
    DOM.modalGraphic.innerHTML = product.graphic;

    // Render sizes if available
    DOM.modalSizeContainer.innerHTML = '';
    if (product.sizes && product.sizes.length > 0) {
      product.sizes.forEach((size, idx) => {
        const btn = document.createElement('button');
        btn.className = `mc-size-btn ${idx === 0 ? 'selected' : ''}`;
        btn.textContent = size;
        btn.addEventListener('click', () => {
          DOM.modalSizeContainer.querySelectorAll('.mc-size-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
        DOM.modalSizeContainer.appendChild(btn);
      });
      DOM.modalSizeContainer.closest('.mc-option-group').style.display = 'block';
    } else {
      DOM.modalSizeContainer.closest('.mc-option-group').style.display = 'none';
    }

    DOM.modalAddBtn.setAttribute('data-id', product.id);
    DOM.quickViewModal.classList.add('open');
    DOM.sidebarOverlay.classList.add('active');
  }

  function closeQuickView() {
    DOM.quickViewModal.classList.remove('open');
    if (!DOM.cartDrawer.classList.contains('open') && !DOM.mobileSidebar.classList.contains('open')) {
      DOM.sidebarOverlay.classList.remove('active');
    }
  }

  // ==========================================================================
  // INTERACTIVE FEATURE HOTSPOTS
  // ==========================================================================
  const HOTSPOT_FEATURES = {
    1: {
      title: 'Ergonomic Air Cells',
      desc: '36 interconnected, multi-layer medical-grade PVC cells distribute body weight evenly across sit bones, relieving high coccyx pressure by up to 80%.'
    },
    2: {
      title: 'Dual-Flow Ventilation',
      desc: 'Patent-pending micro-channels between air cells enable dynamic airflow under load, preventing moisture build-up and keeping the temperature 2-3°C cooler.'
    },
    3: {
      title: 'Silica Grip Base',
      desc: 'High-friction honeycomb patterned silicone bottom ensures the cushion clings tightly to any wheelchair seat, car leather, or executive office chair.'
    },
    4: {
      title: 'Precision Micro-Pump Valve',
      desc: 'Universal high-pressure seal allows users to modify the air volume in seconds. Deflate for contour immersion, pump up for active pelvic posture support.'
    }
  };

  function selectHotspot(hotspotId) {
    DOM.hotspotPoints.forEach(p => p.classList.remove('active'));
    
    const point = document.querySelector(`.mc-hotspot-${hotspotId}`);
    if (point) point.classList.add('active');

    const feature = HOTSPOT_FEATURES[hotspotId];
    if (feature) {
      const panel = document.getElementById('mc-hotspot-panel');
      panel.innerHTML = `
        <div class="mc-hotspot-detail-content">
          <h3 class="mc-hotspot-detail-title"><span></span>${feature.title}</h3>
          <p class="mc-hotspot-detail-desc">${feature.desc}</p>
        </div>
      `;
    }
  }

  // ==========================================================================
  // RECOMMENDATION QUIZ (PRODUCT FINDER)
  // ==========================================================================
  function selectQuizOption(optionElement) {
    const questionContainer = optionElement.closest('.mc-quiz-step');
    const questionId = questionContainer.dataset.step;
    
    questionContainer.querySelectorAll('.mc-quiz-option').forEach(opt => {
      opt.classList.remove('selected');
    });

    optionElement.classList.add('selected');
    quizAnswers[questionId] = optionElement.dataset.val;

    // Enable next button
    DOM.btnNextQuiz.removeAttribute('disabled');
  }

  function navigateQuiz(direction) {
    if (direction === 1) {
      if (currentQuizStep < DOM.quizSteps.length - 1) {
        DOM.quizSteps[currentQuizStep].classList.remove('active');
        currentQuizStep++;
        DOM.quizSteps[currentQuizStep].classList.add('active');
        updateQuizProgress();
      } else {
        showQuizRecommendation();
      }
    } else {
      if (currentQuizStep > 0) {
        DOM.quizSteps[currentQuizStep].classList.remove('active');
        currentQuizStep--;
        DOM.quizSteps[currentQuizStep].classList.add('active');
        updateQuizProgress();
      }
    }
  }

  function updateQuizProgress() {
    const percentage = ((currentQuizStep + 1) / DOM.quizSteps.length) * 100;
    DOM.quizProgress.style.width = `${percentage}%`;

    // Toggle previous button visibility
    if (currentQuizStep === 0) {
      DOM.btnPrevQuiz.style.opacity = '0.3';
      DOM.btnPrevQuiz.style.pointerEvents = 'none';
    } else {
      DOM.btnPrevQuiz.style.opacity = '1';
      DOM.btnPrevQuiz.style.pointerEvents = 'auto';
    }

    // Check if option selected for current step
    const currentSelected = DOM.quizSteps[currentQuizStep].querySelector('.mc-quiz-option.selected');
    if (currentSelected) {
      DOM.btnNextQuiz.removeAttribute('disabled');
    } else {
      DOM.btnNextQuiz.setAttribute('disabled', 'true');
    }

    // Change next button text on final step
    if (currentQuizStep === DOM.quizSteps.length - 1) {
      DOM.btnNextQuiz.textContent = 'Find Solution';
    } else {
      DOM.btnNextQuiz.textContent = 'Next';
    }
  }

  function showQuizRecommendation() {
    DOM.quizQuizScreen.style.display = 'none';
    DOM.quizRecScreen.style.display = 'block';

    let recommendedProductId = 'MC-C01'; // Default: Seat Cushion

    const concern = quizAnswers['1'];
    const duration = quizAnswers['2'];
    const mobility = quizAnswers['3'];

    if (concern === 'back-pain' || concern === 'sciatic') {
      recommendedProductId = 'MC-C01'; // Cushion
    } else if (concern === 'mobility' || mobility === 'chair-bound') {
      recommendedProductId = 'MC-W01'; // Wheelchair
    } else if (concern === 'foot-pain' || mobility === 'standing') {
      recommendedProductId = 'MC-I01'; // Insoles
    }

    const recommendedProduct = PRODUCTS.find(p => p.id === recommendedProductId);

    DOM.quizRecCard.innerHTML = `
      <div class="mc-quiz-rec-graphic">
        ${recommendedProduct.graphic}
      </div>
      <div class="mc-quiz-rec-info">
        <span class="mc-product-category">${recommendedProduct.categoryLabel}</span>
        <h3 class="mc-quiz-rec-title">${recommendedProduct.title}</h3>
        <p class="mc-product-description">${recommendedProduct.desc}</p>
        <div class="mc-quiz-rec-price">₹${recommendedProduct.price.toLocaleString('en-IN')}</div>
        <button class="mc-btn mc-btn-accent mc-btn-sm mc-add-recommended-btn" data-id="${recommendedProduct.id}">
          Add to Cart & Checkout
        </button>
      </div>
    `;

    // Add event listener to the newly generated recommendation button
    const recAddBtn = DOM.quizRecCard.querySelector('.mc-add-recommended-btn');
    if (recAddBtn) {
      recAddBtn.addEventListener('click', function() {
        addToCart(this.dataset.id, 1);
      });
    }
  }

  function resetQuiz() {
    currentQuizStep = 0;
    quizAnswers = {};
    DOM.quizSteps.forEach(s => s.classList.remove('active'));
    DOM.quizSteps[0].classList.add('active');
    DOM.quizOptions.forEach(o => o.classList.remove('selected'));
    DOM.quizRecScreen.style.display = 'none';
    DOM.quizQuizScreen.style.display = 'block';
    updateQuizProgress();
  }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {
    // 1. Sidebar toggles (Mobile)
    const mobileDropdownTrigger = document.querySelector('.mc-mobile-dropdown-trigger');
    const mobileDropdownContent = document.querySelector('.mc-mobile-dropdown-content');
    const mobileDropdownWrapper = document.querySelector('.mc-mobile-dropdown-wrapper');

    // Desktop Dropdown click-toggle & close outside
    const desktopDropdownWrapper = document.querySelector('.mc-nav-dropdown-wrapper');
    const desktopDropdownTrigger = document.querySelector('.mc-nav-dropdown-wrapper > .mc-nav-link');

    if (desktopDropdownTrigger && desktopDropdownWrapper) {
      desktopDropdownTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        desktopDropdownWrapper.classList.toggle('mc-open');
      });

      document.addEventListener('click', function(e) {
        if (!desktopDropdownWrapper.contains(e.target)) {
          desktopDropdownWrapper.classList.remove('mc-open');
        }
      });
    }

    if (DOM.menuToggle) {
      DOM.menuToggle.addEventListener('click', () => {
        DOM.mobileSidebar.classList.add('open');
        DOM.sidebarOverlay.classList.add('active');
      });
    }

    if (DOM.mobileSidebarClose) {
      DOM.mobileSidebarClose.addEventListener('click', () => {
        DOM.mobileSidebar.classList.remove('open');
        if (!DOM.cartDrawer.classList.contains('open')) {
          DOM.sidebarOverlay.classList.remove('active');
        }
        // Reset mobile accordion menu
        if (mobileDropdownWrapper && mobileDropdownContent) {
          mobileDropdownWrapper.classList.remove('open');
          mobileDropdownContent.style.maxHeight = null;
        }
      });
    }

    // Overlay click closes everything
    if (DOM.sidebarOverlay) {
      DOM.sidebarOverlay.addEventListener('click', () => {
        closeCartDrawer();
        closeQuickView();
        DOM.mobileSidebar.classList.remove('open');
        DOM.sidebarOverlay.classList.remove('active');
        // Reset mobile accordion menu
        if (mobileDropdownWrapper && mobileDropdownContent) {
          mobileDropdownWrapper.classList.remove('open');
          mobileDropdownContent.style.maxHeight = null;
        }
      });
    }

    // Mobile Products Accordion toggle
    if (mobileDropdownTrigger && mobileDropdownContent && mobileDropdownWrapper) {
      mobileDropdownTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = mobileDropdownWrapper.classList.contains('open');
        
        if (isOpen) {
          mobileDropdownWrapper.classList.remove('open');
          mobileDropdownContent.style.maxHeight = null;
        } else {
          mobileDropdownWrapper.classList.add('open');
          mobileDropdownContent.style.maxHeight = mobileDropdownContent.scrollHeight + 'px';
        }
      });
    }

    // 2. Open / Close Cart Drawer
    if (DOM.btnOpenCart) {
      DOM.btnOpenCart.addEventListener('click', openCartDrawer);
    }
    if (DOM.btnCloseCart) {
      DOM.btnCloseCart.addEventListener('click', closeCartDrawer);
    }

    // Mobile bar cart trigger
    const mobileCartTrigger = document.getElementById('mc-mobile-cart-trigger');
    if (mobileCartTrigger) {
      mobileCartTrigger.addEventListener('click', openCartDrawer);
    }

    // 3. Cart item controls (plus, minus, remove)
    DOM.cartItemsContainer.addEventListener('click', (e) => {
      const target = e.target;
      const productId = target.dataset.id;
      const size = target.dataset.size || null;

      if (target.classList.contains('mc-qty-plus')) {
        updateCartQty(productId, size, 1);
      } else if (target.classList.contains('mc-qty-minus')) {
        updateCartQty(productId, size, -1);
      } else if (target.classList.contains('mc-cart-item-remove')) {
        removeFromCart(productId, size);
      }
    });

    // 4. Product Tab Filters
    DOM.filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        DOM.filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        renderProductsGrid(this.dataset.filter);
      });
    });

    // 5. Product Grid Clicks (Add to Cart, Quick View)
    if (DOM.productsGrid) {
      DOM.productsGrid.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const productId = button.dataset.id;
        
        if (button.classList.contains('mc-buy-btn') || button.classList.contains('mc-add-to-cart-quick')) {
          addToCart(productId, 1);
        } else if (button.classList.contains('mc-quick-view-btn')) {
          openQuickView(productId);
        }
      });
    }

    // 6. Quick View modal add to cart
    if (DOM.modalAddBtn) {
      DOM.modalAddBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const selectedSizeBtn = DOM.modalSizeContainer.querySelector('.mc-size-btn.selected');
        const size = selectedSizeBtn ? selectedSizeBtn.textContent : null;
        addToCart(productId, 1, size);
        closeQuickView();
      });
    }

    if (DOM.modalCloseBtn) {
      DOM.modalCloseBtn.addEventListener('click', closeQuickView);
    }

    // Close modal on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeQuickView();
        closeCartDrawer();
      }
    });

    // 7. Hotspots click listeners
    DOM.hotspotPoints.forEach(p => {
      p.addEventListener('click', function() {
        selectHotspot(this.dataset.id);
      });
    });

    // 8. Quiz Controls
    DOM.quizOptions.forEach(opt => {
      opt.addEventListener('click', function() {
        selectQuizOption(this);
      });
    });

    if (DOM.btnPrevQuiz) {
      DOM.btnPrevQuiz.addEventListener('click', () => navigateQuiz(-1));
    }
    if (DOM.btnNextQuiz) {
      DOM.btnNextQuiz.addEventListener('click', () => navigateQuiz(1));
    }

    const btnResetQuiz = document.getElementById('mc-quiz-reset');
    if (btnResetQuiz) {
      btnResetQuiz.addEventListener('click', resetQuiz);
    }

    // 9. FAQ Toggle Accordion
    DOM.faqQuestions.forEach(q => {
      q.addEventListener('click', function() {
        const item = this.parentElement;
        const answer = item.querySelector('.mc-faq-answer');
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        DOM.faqQuestions.forEach(otherQ => {
          const otherItem = otherQ.parentElement;
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.mc-faq-answer').style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    // 10. Testimonials Slider
    let currentTestimonialIndex = 0;
    const updateTestimonialSlider = () => {
      const cardWidth = DOM.testimonialCards[0].offsetWidth;
      DOM.testimonialTrack.style.transform = `translateX(-${currentTestimonialIndex * cardWidth}px)`;
    };

    if (DOM.testimonialNext) {
      DOM.testimonialNext.addEventListener('click', () => {
        if (currentTestimonialIndex < DOM.testimonialCards.length - 1) {
          currentTestimonialIndex++;
        } else {
          currentTestimonialIndex = 0; // wrap around
        }
        updateTestimonialSlider();
      });
    }

    if (DOM.testimonialPrev) {
      DOM.testimonialPrev.addEventListener('click', () => {
        if (currentTestimonialIndex > 0) {
          currentTestimonialIndex--;
        } else {
          currentTestimonialIndex = DOM.testimonialCards.length - 1; // wrap around
        }
        updateTestimonialSlider();
      });
    }

    // Adjust slider alignment on window resize
    window.addEventListener('resize', () => {
      if (DOM.testimonialTrack && DOM.testimonialCards.length > 0) {
        updateTestimonialSlider();
      }
    });

    // 11. Hero Slider dots / auto rotator
    DOM.heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setActiveHeroSlide(idx);
      });
    });

    startHeroSliderAuto();

    // 12. Category Circle click events
    const circleCards = document.querySelectorAll('.mc-category-circle-card');
    circleCards.forEach(card => {
      card.addEventListener('click', function() {
        const cat = this.dataset.category;
        
        // Find matching tab and click it
        const matchingTab = Array.from(DOM.filterTabs).find(t => t.dataset.filter === cat);
        if (matchingTab) {
          matchingTab.click();
        }
        
        scrollToSection('mc-products-section');
      });
    });

    // Mobile nav bar clicks (Home, Shop, Test, Cart, Contact)
    const mobileBottomItems = document.querySelectorAll('.mc-mobile-bottom-item');
    mobileBottomItems.forEach(item => {
      item.addEventListener('click', function() {
        const targetSection = this.dataset.target;
        if (targetSection === 'cart') {
          openCartDrawer();
          return;
        }
        
        mobileBottomItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        scrollToSection(targetSection);
      });
    });

    // Sync product page controls if we are on product.html
    setupProductPageGallery();
  }

  // ==========================================================================
  // HELPER ANIMATIONS & TRANSITIONS
  // ==========================================================================
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  function setActiveHeroSlide(index) {
    if (index === currentHeroSlide) return;

    DOM.heroSlides[currentHeroSlide].classList.remove('active');
    DOM.heroDots[currentHeroSlide].classList.remove('active');

    currentHeroSlide = index;

    DOM.heroSlides[currentHeroSlide].classList.add('active');
    DOM.heroDots[currentHeroSlide].classList.add('active');
  }

  let heroInterval;
  function startHeroSliderAuto() {
    heroInterval = setInterval(() => {
      let nextSlide = (currentHeroSlide + 1) % DOM.heroSlides.length;
      setActiveHeroSlide(nextSlide);
    }, 6000);
  }

  // Reset auto slider timer when user interacts
  DOM.heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(heroInterval);
      startHeroSliderAuto();
    });
  });

  // Announcement bar rotator (Speed up to 3s per requirements)
  function startAnnouncementRotator() {
    let activeIdx = 0;
    setInterval(() => {
      DOM.announceSlides[activeIdx].classList.remove('active');
      activeIdx = (activeIdx + 1) % DOM.announceSlides.length;
      DOM.announceSlides[activeIdx].classList.add('active');
    }, 3000);
  }

  // Specific logic for product.html detailed view gallery
  function setupProductPageGallery() {
    const mainImg = document.getElementById('mc-main-gallery-svg');
    const thumbs = document.querySelectorAll('.mc-gallery-thumb');
    const sizeBtns = document.querySelectorAll('.mc-prod-size-btn');
    const prodQtyInput = document.getElementById('mc-prod-qty');
    const prodQtyMinus = document.getElementById('mc-prod-qty-minus');
    const prodQtyPlus = document.getElementById('mc-prod-qty-plus');
    const prodAddBtn = document.getElementById('mc-prod-add-btn');

    if (thumbs && mainImg) {
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
          thumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          mainImg.innerHTML = this.querySelector('svg').innerHTML;
        });
      });
    }

    if (sizeBtns) {
      sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          sizeBtns.forEach(b => b.classList.remove('selected'));
          this.classList.add('selected');
        });
      });
    }

    if (prodQtyInput && prodQtyMinus && prodQtyPlus) {
      prodQtyMinus.addEventListener('click', () => {
        let val = parseInt(prodQtyInput.value);
        if (val > 1) prodQtyInput.value = val - 1;
      });
      prodQtyPlus.addEventListener('click', () => {
        let val = parseInt(prodQtyInput.value);
        prodQtyInput.value = val + 1;
      });
    }

    if (prodAddBtn) {
      prodAddBtn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const qty = parseInt(prodQtyInput ? prodQtyInput.value : 1);
        const selectedSize = document.querySelector('.mc-prod-size-btn.selected');
        const size = selectedSize ? selectedSize.textContent : null;
        addToCart(id, qty, size);
      });
    }

    // Detail page specifications tabs
    const prodTabs = document.querySelectorAll('.mc-product-tab');
    const tabContents = document.querySelectorAll('.mc-product-tab-content');

    if (prodTabs && tabContents) {
      prodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const target = this.dataset.tab;
          
          prodTabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          this.classList.add('active');
          const activeContent = document.getElementById(`mc-tab-${target}`);
          if (activeContent) activeContent.classList.add('active');
        });
      });
    }
  }

  // --- START THE APPLICATION ---
  document.addEventListener('DOMContentLoaded', init);

})();
