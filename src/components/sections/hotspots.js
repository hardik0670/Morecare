/* ==========================================================================
   INTERACTIVE PRODUCT IMAGE HOTSPOTS (hotspots.js)
   ========================================================================= */

const DOM = {
  hotspotPoints: document.querySelectorAll('.mc-hotspot-point'),
  hotspotPanel: document.getElementById('mc-hotspot-panel')
};

const FEATURES = {
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

export function initHotspots() {
  if (DOM.hotspotPoints.length === 0) return;
  setupEventListeners();
}

function selectHotspot(hotspotId) {
  DOM.hotspotPoints.forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-selected', 'false');
  });
  
  const activePoint = document.querySelector(`.mc-hotspot-${hotspotId}`);
  if (activePoint) {
    activePoint.classList.add('active');
    activePoint.setAttribute('aria-selected', 'true');
  }

  const feature = FEATURES[hotspotId];
  if (feature && DOM.hotspotPanel) {
    DOM.hotspotPanel.innerHTML = `
      <div class="mc-hotspot-detail-content" role="tabpanel" aria-label="${feature.title}">
        <h3 class="mc-hotspot-detail-title"><span></span>${feature.title}</h3>
        <p class="mc-hotspot-detail-desc">${feature.desc}</p>
      </div>
    `;
  }
}

function setupEventListeners() {
  DOM.hotspotPoints.forEach(p => {
    const id = p.dataset.id;
    p.setAttribute('tabindex', '0');
    p.setAttribute('role', 'tab');
    p.setAttribute('aria-selected', id === '1' ? 'true' : 'false');
    
    // Mouse Click Trigger
    p.addEventListener('click', () => selectHotspot(id));

    // Keyboard navigation (Enter & Space triggers)
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectHotspot(id);
      }
    });
  });
}
