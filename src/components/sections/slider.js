/* ==========================================================================
   HERO CAROUSEL SLIDER (slider.js)
   ========================================================================= */

const DOM = {
  heroSlides: document.querySelectorAll('.mc-hero-slide'),
  heroDots: document.querySelectorAll('.mc-hero-dot')
};

let currentSlide = 0;
let slideInterval = null;

export function initHeroSlider() {
  if (DOM.heroSlides.length === 0) return;
  setupDots();
  startAutoPlay();
}

function showSlide(index) {
  if (index >= DOM.heroSlides.length) index = 0;
  if (index < 0) index = DOM.heroSlides.length - 1;

  DOM.heroSlides.forEach(slide => {
    slide.classList.remove('active');
    slide.setAttribute('aria-hidden', 'true');
  });
  DOM.heroDots.forEach(dot => {
    dot.classList.remove('active');
    dot.setAttribute('aria-selected', 'false');
  });

  DOM.heroSlides[index].classList.add('active');
  DOM.heroSlides[index].setAttribute('aria-hidden', 'false');
  DOM.heroDots[index].classList.add('active');
  DOM.heroDots[index].setAttribute('aria-selected', 'true');

  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoPlay() {
  stopAutoPlay();
  slideInterval = setInterval(nextSlide, 7000); // Premium slow-rotation 7s
}

function stopAutoPlay() {
  if (slideInterval) clearInterval(slideInterval);
}

function setupDots() {
  DOM.heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoPlay(); // Reset timer on click
    });

    // Keyboard support for accessibility
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSlide(index);
        startAutoPlay();
      }
    });
  });

  // Pause on mouse hover for high-end SaaS feel
  const sliderContainer = document.querySelector('.mc-hero-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
}
