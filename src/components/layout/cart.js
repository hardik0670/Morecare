/* ==========================================================================
   CART SYSTEM OPERATIONS (cart.js)
   ========================================================================= */

import { PRODUCTS } from '../../utils/products.js';

let cart = [];

const DOM = {
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
  cartOverlay: document.getElementById('mc-cart-overlay'),
  mobileCartTrigger: document.getElementById('mc-mobile-cart-trigger'),
  mobileSidebar: document.getElementById('mc-mobile-sidebar')
};

// Initialize Cart
export function initCart() {
  loadCartFromStorage();
  updateCartUI();
  setupEventListeners();
}

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

// Open / Close Drawer Actions
export function openCartDrawer() {
  if (DOM.cartDrawer) DOM.cartDrawer.classList.add('open');
  if (DOM.cartOverlay) DOM.cartOverlay.classList.add('active');

  // Dispatch custom event to notify other UI components (like bottom nav indicator)
  window.dispatchEvent(new CustomEvent('mc-cart-toggle', { detail: { open: true } }));

  // Accessibility Focus Trap: focus the close button
  setTimeout(() => {
    if (DOM.btnCloseCart) DOM.btnCloseCart.focus();
  }, 100);
}

export function closeCartDrawer() {
  if (DOM.cartDrawer) DOM.cartDrawer.classList.remove('open');
  if (DOM.cartOverlay) DOM.cartOverlay.classList.remove('active');

  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('mc-cart-toggle', { detail: { open: false } }));
}

export function addToCart(productId, qty = 1, size = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

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

// Update Cart Badge Count and Render Items
function updateCartUI() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (DOM.cartCountBadges) {
    DOM.cartCountBadges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';

      // Screen-reader announced update
      badge.setAttribute('aria-label', `${totalItems} items in cart`);
    });
  }

  if (!DOM.cartItemsContainer) return;
  DOM.cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="mc-cart-empty">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Your shopping cart is empty</p>
        <button class="mc-btn mc-btn-accent mc-btn-sm" id="mc-cart-shop-now">Shop Best Sellers</button>
      </div>
    `;

    const shopNowBtn = document.getElementById('mc-cart-shop-now');
    if (shopNowBtn) {
      shopNowBtn.addEventListener('click', () => {
        closeCartDrawer();
        const section = document.getElementById('mc-products-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = '₹0';
    if (DOM.shippingProgressFill) DOM.shippingProgressFill.style.width = '0%';
    if (DOM.shippingBarText) DOM.shippingBarText.innerHTML = 'Add <span>₹4,999</span> more for <strong>FREE shipping</strong>';
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'mc-cart-item';
    itemEl.innerHTML = `
      <div class="mc-cart-item-image" aria-hidden="true">
        ${item.graphic}
      </div>
      <div class="mc-cart-item-details">
        <div class="mc-cart-item-title">${item.title}</div>
        <div class="mc-cart-item-meta">${item.selectedSize ? 'Size: ' + item.selectedSize : ''}</div>
        <div class="mc-cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="mc-cart-item-controls">
          <div class="mc-qty-selector">
            <button class="mc-qty-btn mc-qty-minus" data-id="${item.id}" data-size="${item.selectedSize || ''}" aria-label="Decrease quantity">-</button>
            <input type="text" class="mc-qty-input" value="${item.quantity}" readonly aria-label="Quantity">
            <button class="mc-qty-btn mc-qty-plus" data-id="${item.id}" data-size="${item.selectedSize || ''}" aria-label="Increase quantity">+</button>
          </div>
          <button class="mc-cart-item-remove" data-id="${item.id}" data-size="${item.selectedSize || ''}" aria-label="Remove item">Remove</button>
        </div>
      </div>
    `;
    DOM.cartItemsContainer.appendChild(itemEl);
  });

  if (DOM.cartSubtotal) {
    DOM.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  // Shipping bar calculation (Threshold: ₹4999)
  const threshold = 4999;
  const progress = Math.min((subtotal / threshold) * 100, 100);

  if (DOM.shippingProgressFill) {
    DOM.shippingProgressFill.style.width = `${progress}%`;
  }

  if (DOM.shippingBarText) {
    if (subtotal >= threshold) {
      DOM.shippingBarText.innerHTML = '🎉 You qualify for <strong>FREE Shipping!</strong>';
    } else {
      const remaining = threshold - subtotal;
      DOM.shippingBarText.innerHTML = `Add <span>₹${remaining.toLocaleString('en-IN')}</span> more for <strong>FREE shipping</strong>`;
    }
  }
}

function showToast(message) {
  if (!DOM.cartToast || !DOM.cartToastText) return;
  DOM.cartToastText.textContent = message;
  DOM.cartToast.classList.add('active');

  // Accessibility: Screen reader notification
  DOM.cartToast.setAttribute('role', 'alert');

  setTimeout(() => {
    DOM.cartToast.classList.remove('active');
  }, 3000);
}

function setupEventListeners() {
  if (DOM.btnOpenCart) {
    DOM.btnOpenCart.addEventListener('click', openCartDrawer);
  }
  if (DOM.btnCloseCart) {
    DOM.btnCloseCart.addEventListener('click', closeCartDrawer);
  }
  if (DOM.cartOverlay) {
    DOM.cartOverlay.addEventListener('click', closeCartDrawer);
  }
  if (DOM.mobileCartTrigger) {
    DOM.mobileCartTrigger.addEventListener('click', openCartDrawer);
  }

  if (DOM.cartItemsContainer) {
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
  }
}
