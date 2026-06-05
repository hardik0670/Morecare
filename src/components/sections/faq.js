/* ==========================================================================
   FAQ ACCORDION TRANSITIONS (faq.js)
   ========================================================================= */

const DOM = {
  faqQuestions: document.querySelectorAll('.mc-faq-question')
};

export function initFaqs() {
  if (DOM.faqQuestions.length === 0) return;
  setupEventListeners();
}

function toggleFaq(questionElement) {
  const item = questionElement.parentElement;
  const answer = item.querySelector('.mc-faq-answer');
  const isActive = item.classList.contains('active');

  // Close all other FAQs for clean SaaS feel
  DOM.faqQuestions.forEach(otherQ => {
    const otherItem = otherQ.parentElement;
    if (otherItem !== item) {
      otherItem.classList.remove('active');
      const otherAnswer = otherItem.querySelector('.mc-faq-answer');
      if (otherAnswer) otherAnswer.style.maxHeight = null;
      otherQ.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle active item
  if (isActive) {
    item.classList.remove('active');
    answer.style.maxHeight = null;
    questionElement.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    questionElement.setAttribute('aria-expanded', 'true');
  }
}

function setupEventListeners() {
  DOM.faqQuestions.forEach(q => {
    q.setAttribute('role', 'button');
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('tabindex', '0');

    // Click handler
    q.addEventListener('click', () => toggleFaq(q));

    // Keyboard navigation (Enter & Space triggers)
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(q);
      }
    });
  });
}
