/* ==========================================================================
   INSTAGRAM REELS SLIDESHOW (reels.js)
   ========================================================================== */

import { INSTAGRAM_REELS, getReelToneClass } from '../../utils/reels.js';

const PLAY_ICON = `<svg width="32" height="32" fill="none" stroke="#ffffff" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
  <polygon points="5 3 19 12 5 21 5 3" />
</svg>`;

function buildReelSlide(reel, index, labelIndex) {
  const slide = document.createElement('div');
  slide.className = 'mc-reel-slide';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `mc-reel-placeholder ${getReelToneClass(index)}`;
  btn.dataset.instagramId = reel.id;
  btn.dataset.instagramUrl = reel.url;
  btn.setAttribute('aria-label', `Watch Instagram reel ${labelIndex}`);

  const thumb = document.createElement('img');
  thumb.className = 'mc-reel-thumb';
  thumb.src = `https://www.instagram.com/p/${reel.id}/media/?size=m`;
  thumb.alt = '';
  thumb.loading = 'lazy';
  thumb.decoding = 'async';
  thumb.addEventListener('load', () => btn.classList.add('has-thumb'));
  thumb.addEventListener('error', () => thumb.remove());

  const label = document.createElement('span');
  label.className = 'mc-reel-label';
  label.textContent = `Reel ${labelIndex}`;

  btn.appendChild(thumb);
  btn.insertAdjacentHTML('beforeend', PLAY_ICON);
  btn.appendChild(label);
  slide.appendChild(btn);
  return slide;
}

function renderReelSlides(track) {
  track.innerHTML = '';

  const slides = [...INSTAGRAM_REELS, ...INSTAGRAM_REELS];

  slides.forEach((reel, index) => {
    const labelIndex = (index % INSTAGRAM_REELS.length) + 1;
    track.appendChild(buildReelSlide(reel, index, labelIndex));
  });
}

export function initReels() {
  const track = document.getElementById('mc-reels-track');
  if (!track) return;

  const reelsModal = document.getElementById('mc-reels-modal');
  const reelsVideoContainer = document.getElementById('mc-reels-video-container');
  const reelsModalCloseBtn = document.getElementById('mc-reels-modal-close-btn');

  if (!reelsModal || !reelsVideoContainer || !reelsModalCloseBtn) return;

  renderReelSlides(track);

  track.addEventListener('click', (e) => {
    const placeholder = e.target.closest('.mc-reel-placeholder');
    if (!placeholder) return;

    const postId = placeholder.dataset.instagramId;
    const postUrl = placeholder.dataset.instagramUrl;
    if (!postId) return;

    reelsVideoContainer.innerHTML = `
      <iframe
        src="https://www.instagram.com/p/${postId}/embed"
        title="Morecare Instagram reel"
        frameborder="0"
        scrolling="no"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
      <a href="${postUrl}" class="mc-reel-view-on-ig" target="_blank" rel="noopener noreferrer">
        View on Instagram
      </a>
    `;

    reelsModal.classList.add('open');
  });

  const closeReelsModal = () => {
    reelsModal.classList.remove('open');
    reelsVideoContainer.innerHTML = '';
  };

  reelsModalCloseBtn.addEventListener('click', closeReelsModal);
  reelsModal.addEventListener('click', (e) => {
    if (e.target === reelsModal) closeReelsModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reelsModal.classList.contains('open')) {
      closeReelsModal();
    }
  });
}
