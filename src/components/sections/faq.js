/* ==========================================================================
   FAQ ACCORDION & SCROLL (faq.js)
   ========================================================================= */

export function initFaqs() {
  const faqQuestions = document.querySelectorAll('.mc-faq-question');
  if (faqQuestions.length === 0) return;

  setupEventListeners(faqQuestions);
}

function toggleFaq(questionElement, faqQuestions) {
  const item = questionElement.parentElement;
  const answer = item.querySelector('.mc-faq-answer');
  const isActive = item.classList.contains('active');

  // Close all other FAQs in the page for a clean SaaS feel
  faqQuestions.forEach(otherQ => {
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
    
    // Smoothly scroll the expanded item into view if it overflows the container
    setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  }
}

function setupEventListeners(faqQuestions) {
  faqQuestions.forEach(q => {
    q.setAttribute('role', 'button');
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('tabindex', '0');

    // Click handler
    q.addEventListener('click', () => toggleFaq(q, faqQuestions));

    // Keyboard navigation (Enter & Space triggers)
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(q, faqQuestions);
      }
    });
  });
}
