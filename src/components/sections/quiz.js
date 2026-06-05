/* ==========================================================================
   INTERACTIVE FIT FINDER QUIZ (quiz.js)
   ========================================================================= */

import { PRODUCTS } from '../../utils/products.js';
import { addToCart } from '../layout/cart.js';

const DOM = {
  quizProgress: document.getElementById('mc-quiz-progress-bar'),
  quizSteps: document.querySelectorAll('.mc-quiz-step'),
  quizOptions: document.querySelectorAll('.mc-quiz-option'),
  btnPrevQuiz: document.getElementById('mc-quiz-prev'),
  btnNextQuiz: document.getElementById('mc-quiz-next'),
  quizRecScreen: document.getElementById('mc-quiz-rec-screen'),
  quizRecCard: document.getElementById('mc-quiz-rec-card'),
  quizQuizScreen: document.getElementById('mc-quiz-quiz-screen'),
  btnResetQuiz: document.getElementById('mc-quiz-reset')
};

let currentStep = 0;
let quizAnswers = {};

export function initQuiz() {
  if (DOM.quizSteps.length === 0) return;
  setupEventListeners();
  updateQuizProgress();
}

function selectOption(optionElement) {
  const stepContainer = optionElement.closest('.mc-quiz-step');
  const stepId = stepContainer.dataset.step;
  
  stepContainer.querySelectorAll('.mc-quiz-option').forEach(opt => {
    opt.classList.remove('selected');
    opt.setAttribute('aria-checked', 'false');
  });

  optionElement.classList.add('selected');
  optionElement.setAttribute('aria-checked', 'true');
  quizAnswers[stepId] = optionElement.dataset.val;

  if (DOM.btnNextQuiz) DOM.btnNextQuiz.removeAttribute('disabled');
}

function navigateQuiz(direction) {
  if (direction === 1) {
    if (currentStep < DOM.quizSteps.length - 1) {
      DOM.quizSteps[currentStep].classList.remove('active');
      currentStep++;
      DOM.quizSteps[currentStep].classList.add('active');
      updateQuizProgress();
    } else {
      showQuizRecommendation();
    }
  } else {
    if (currentStep > 0) {
      DOM.quizSteps[currentStep].classList.remove('active');
      currentStep--;
      DOM.quizSteps[currentStep].classList.add('active');
      updateQuizProgress();
    }
  }
}

function updateQuizProgress() {
  if (!DOM.quizProgress) return;
  
  const percentage = ((currentStep + 1) / DOM.quizSteps.length) * 100;
  DOM.quizProgress.style.width = `${percentage}%`;

  // Back button accessibility
  if (DOM.btnPrevQuiz) {
    if (currentStep === 0) {
      DOM.btnPrevQuiz.style.opacity = '0.3';
      DOM.btnPrevQuiz.style.pointerEvents = 'none';
      DOM.btnPrevQuiz.setAttribute('tabindex', '-1');
    } else {
      DOM.btnPrevQuiz.style.opacity = '1';
      DOM.btnPrevQuiz.style.pointerEvents = 'auto';
      DOM.btnPrevQuiz.setAttribute('tabindex', '0');
    }
  }

  // Next button states
  const hasSelected = DOM.quizSteps[currentStep].querySelector('.mc-quiz-option.selected');
  if (DOM.btnNextQuiz) {
    if (hasSelected) {
      DOM.btnNextQuiz.removeAttribute('disabled');
    } else {
      DOM.btnNextQuiz.setAttribute('disabled', 'true');
    }

    if (currentStep === DOM.quizSteps.length - 1) {
      DOM.btnNextQuiz.textContent = 'Find Solution';
    } else {
      DOM.btnNextQuiz.textContent = 'Next';
    }
  }
}

function showQuizRecommendation() {
  if (!DOM.quizQuizScreen || !DOM.quizRecScreen || !DOM.quizRecCard) return;

  DOM.quizQuizScreen.style.display = 'none';
  DOM.quizRecScreen.style.display = 'block';

  let recommendedProductId = 'MC-C01'; // Default: Seat Cushion

  const concern = quizAnswers['1'];
  const duration = quizAnswers['2'];
  const mobility = quizAnswers['3'];

  // Custom orthopedic decision tree
  if (concern === 'back-pain') {
    recommendedProductId = 'MC-C01'; // Ergo-Air Cushion
  } else if (concern === 'mobility' || mobility === 'wheelchair-user') {
    recommendedProductId = 'MC-W01'; // Carbon X Wheelchair
  } else if (concern === 'foot-pain' || mobility === 'standing') {
    recommendedProductId = 'MC-I01'; // Cloud-Gel Insoles
  }

  const product = PRODUCTS.find(p => p.id === recommendedProductId);

  DOM.quizRecCard.innerHTML = `
    <div class="mc-quiz-rec-graphic" aria-hidden="true">
      ${product.graphic}
    </div>
    <div class="mc-quiz-rec-info">
      <span class="mc-product-category">${product.categoryLabel}</span>
      <h4 class="mc-quiz-rec-title">${product.title}</h4>
      <p class="mc-product-description" style="margin-bottom: 12px;">${product.desc}</p>
      <div class="mc-quiz-rec-price" style="margin-bottom: var(--mc-space-4);">₹${product.price.toLocaleString('en-IN')}</div>
      <button class="mc-btn mc-btn-accent mc-btn-sm mc-add-recommended-btn" data-id="${product.id}">
        Add to Cart & Checkout
      </button>
    </div>
  `;

  // Focus recommendation button for keyboard users
  const recAddBtn = DOM.quizRecCard.querySelector('.mc-add-recommended-btn');
  if (recAddBtn) {
    recAddBtn.focus();
    recAddBtn.addEventListener('click', function() {
      addToCart(this.dataset.id, 1);
    });
  }
}

function resetQuiz() {
  currentStep = 0;
  quizAnswers = {};
  
  DOM.quizSteps.forEach(s => s.classList.remove('active'));
  if (DOM.quizSteps[0]) DOM.quizSteps[0].classList.add('active');
  
  DOM.quizOptions.forEach(o => {
    o.classList.remove('selected');
    o.setAttribute('aria-checked', 'false');
  });

  if (DOM.quizRecScreen) DOM.quizRecScreen.style.display = 'none';
  if (DOM.quizQuizScreen) DOM.quizQuizScreen.style.display = 'block';
  
  updateQuizProgress();
}

function setupEventListeners() {
  DOM.quizOptions.forEach(opt => {
    opt.setAttribute('role', 'radio');
    opt.setAttribute('aria-checked', 'false');
    opt.addEventListener('click', function() {
      selectOption(this);
    });
  });

  if (DOM.btnPrevQuiz) {
    DOM.btnPrevQuiz.addEventListener('click', () => navigateQuiz(-1));
  }
  if (DOM.btnNextQuiz) {
    DOM.btnNextQuiz.addEventListener('click', () => navigateQuiz(1));
  }
  if (DOM.btnResetQuiz) {
    DOM.btnResetQuiz.addEventListener('click', resetQuiz);
  }
}
