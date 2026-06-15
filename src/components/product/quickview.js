/* ==========================================================================
   PRODUCT QUICK VIEW MODAL (quickview.js)
   ========================================================================= */

import { PRODUCTS } from '../../utils/products.js';
import { addToCart } from '../layout/cart.js';

const DOM = {
  quickViewModal: document.getElementById('mc-quickview-modal'),
  modalCloseBtn: document.getElementById('mc-modal-close-btn'),
  modalMeta: document.getElementById('mc-modal-meta'),
  modalTitle: document.getElementById('mc-modal-title'),
  modalPrice: document.getElementById('mc-modal-price'),
  modalPriceOld: document.getElementById('mc-modal-price-old'),
  modalPriceSave: document.getElementById('mc-modal-price-save'),
  modalBadges: document.getElementById('mc-modal-badges'),
  modalDesc: document.getElementById('mc-modal-desc'),
  modalGraphic: document.getElementById('mc-modal-graphic'),
  modalSizeContainer: document.getElementById('mc-modal-sizes'),
  modalAddBtn: document.getElementById('mc-modal-add-btn'),
  modalViewFull: document.getElementById('mc-modal-view-full')
};

// Tracks which element triggered the modal to restore focus after closing
let triggerElement = null;

export function initQuickView() {
  if (!DOM.quickViewModal) return;
  setupEventListeners();
}

export function openQuickView(productId, triggerBtn = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  triggerElement = triggerBtn;

  if (DOM.modalMeta) DOM.modalMeta.textContent = product.categoryLabel;
  if (DOM.modalTitle) DOM.modalTitle.textContent = product.title;
  if (DOM.modalPrice) DOM.modalPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  if (DOM.modalDesc) DOM.modalDesc.textContent = product.desc;
  if (DOM.modalGraphic) DOM.modalGraphic.innerHTML = product.graphic;

  // Price group: old price + savings
  if (DOM.modalPriceOld) {
    if (product.oldPrice && product.oldPrice > product.price) {
      DOM.modalPriceOld.textContent = `₹${product.oldPrice.toLocaleString('en-IN')}`;
      DOM.modalPriceOld.style.display = '';
    } else {
      DOM.modalPriceOld.textContent = '';
      DOM.modalPriceOld.style.display = 'none';
    }
  }

  if (DOM.modalPriceSave) {
    if (product.oldPrice && product.oldPrice > product.price) {
      const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
      const savings = product.oldPrice - product.price;
      DOM.modalPriceSave.textContent = `Save ₹${savings.toLocaleString('en-IN')} (${discount}% OFF)`;
      DOM.modalPriceSave.style.display = '';
    } else {
      DOM.modalPriceSave.textContent = '';
      DOM.modalPriceSave.style.display = 'none';
    }
  }

  // Best Seller badge
  if (DOM.modalBadges) {
    DOM.modalBadges.innerHTML = product.bestSeller
      ? '<span class="mc-badge mc-badge-bestseller">BEST SELLER</span>'
      : '';
  }

  // View Full Details link
  if (DOM.modalViewFull) {
    DOM.modalViewFull.href = `product.html?id=${product.id}`;
  }

  // Render sizes
  if (DOM.modalSizeContainer) {
    DOM.modalSizeContainer.innerHTML = '';
    if (product.sizes && product.sizes.length > 0) {
      product.sizes.forEach((size, idx) => {
        const btn = document.createElement('button');
        btn.className = `mc-size-btn ${idx === 0 ? 'selected' : ''}`;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', idx === 0 ? 'true' : 'false');
        btn.textContent = size;
        btn.addEventListener('click', () => {
          DOM.modalSizeContainer.querySelectorAll('.mc-size-btn').forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-checked', 'false');
          });
          btn.classList.add('selected');
          btn.setAttribute('aria-checked', 'true');
        });
        DOM.modalSizeContainer.appendChild(btn);
      });
      DOM.modalSizeContainer.closest('.mc-option-group').style.display = 'block';
    } else {
      DOM.modalSizeContainer.closest('.mc-option-group').style.display = 'none';
    }
  }

  if (DOM.modalAddBtn) DOM.modalAddBtn.setAttribute('data-id', product.id);
  
  if (DOM.quickViewModal) {
    DOM.quickViewModal.classList.add('open');
    DOM.quickViewModal.setAttribute('aria-hidden', 'false');
  }

  // Focus trap: set focus to close button
  setTimeout(() => {
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.focus();
  }, 100);
}

export function closeQuickView() {
  if (DOM.quickViewModal) {
    DOM.quickViewModal.classList.remove('open');
    DOM.quickViewModal.setAttribute('aria-hidden', 'true');
  }

  // Restore focus to original button
  if (triggerElement) {
    triggerElement.focus();
    triggerElement = null;
  }
}

function setupEventListeners() {
  if (DOM.modalCloseBtn) {
    DOM.modalCloseBtn.addEventListener('click', closeQuickView);
  }

  // Click on backdrop (outside modal content) closes modal
  if (DOM.quickViewModal) {
    DOM.quickViewModal.addEventListener('click', (e) => {
      if (e.target === DOM.quickViewModal) {
        closeQuickView();
      }
    });
  }

  // Add to cart click
  if (DOM.modalAddBtn) {
    DOM.modalAddBtn.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      const selectedSizeBtn = DOM.modalSizeContainer.querySelector('.mc-size-btn.selected');
      const size = selectedSizeBtn ? selectedSizeBtn.textContent : null;
      
      addToCart(productId, 1, size);
      closeQuickView();
    });
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.quickViewModal && DOM.quickViewModal.classList.contains('open')) {
      closeQuickView();
    }
  });
}
