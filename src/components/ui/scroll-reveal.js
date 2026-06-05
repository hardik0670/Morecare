/**
 * Scroll Reveal Component
 * Uses IntersectionObserver to apply reveal classes when elements enter viewport.
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.mc-reveal, .mc-reveal-fade');
  
  if (revealElements.length === 0) return;

  // Check if prefers-reduced-motion is enabled
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before entry for smoother rhythm
    threshold: 0.10 // 10% visible
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        self.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
