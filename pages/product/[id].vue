<template>
  <main v-if="product" class="mc-container" style="padding-top: 40px; padding-bottom: 60px;">
    
    <!-- Breadcrumbs -->
    <div style="font-size: 13px; color: var(--mc-text-muted); margin-bottom: 24px;">
      <NuxtLink to="/" style="hover: color: var(--mc-accent);">Home</NuxtLink> &nbsp;/&nbsp; 
      <NuxtLink to="/#mc-products-section">{{ product.categoryLabel }}</NuxtLink> &nbsp;/&nbsp; 
      <span style="color: var(--mc-primary); font-weight: 600;">{{ product.title }}</span>
    </div>

    <!-- Product Grid -->
    <div class="mc-product-page-grid">
      
      <!-- Gallery Column -->
      <div class="mc-gallery-wrapper">
        <div class="mc-gallery-main">
          <div v-html="activeGallerySvg"></div>
        </div>
        <div class="mc-gallery-thumbs">
          <div 
            v-for="(thumb, idx) in productThumbs" 
            :key="idx" 
            class="mc-gallery-thumb"
            :class="{ active: idx === activeThumbIdx }"
            @click="activeThumbIdx = idx"
            v-html="thumb"
          ></div>
        </div>
      </div>

      <!-- Info Column -->
      <div class="mc-prod-detail-info">
        <span class="mc-modal-meta">{{ product.categoryLabel }}</span>
        <h1 class="mc-modal-title" style="font-size: 32px; margin-bottom: 8px;">{{ product.title }}</h1>
        
        <div class="mc-modal-rating" style="margin-bottom: 20px;">
          ★ {{ product.rating }} <span style="color: var(--mc-text-muted); font-weight: 500; margin-left: 6px;">({{ product.reviews }} Verified Customer Reviews)</span>
        </div>

        <div class="mc-price-group" style="margin-bottom: 24px;">
          <span v-if="product.oldPrice" class="mc-price-old" style="font-size: 14px;">₹{{ product.oldPrice.toLocaleString('en-IN') }}</span>
          <span class="mc-price-new" style="font-size: 32px; color: var(--mc-accent);">₹{{ product.price.toLocaleString('en-IN') }}</span>
          <span v-if="product.oldPrice" style="font-size: 12px; color: var(--mc-teal); font-weight: 700; margin-top: 4px;">
            🎉 Save ₹{{ (product.oldPrice - product.price).toLocaleString('en-IN') }} ({{ Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) }}% OFF)
          </span>
        </div>

        <p class="mc-modal-desc" style="font-size: 15px; margin-bottom: 28px;">
          {{ product.desc }}
        </p>

        <!-- Product highlights list -->
        <ul style="list-style: none; margin-bottom: 30px; display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: var(--mc-text-main);">
          <li v-for="(highlight, hIdx) in productHighlights" :key="hIdx" style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" fill="none" stroke="var(--mc-teal)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            {{ highlight }}
          </li>
        </ul>

        <!-- Sizing options -->
        <div v-if="product.sizes && product.sizes.length > 0" class="mc-option-group">
          <span class="mc-option-label">Select Option / Size</span>
          <div class="mc-size-options">
            <button 
              v-for="size in product.sizes" 
              :key="size"
              class="mc-size-btn mc-prod-size-btn"
              :class="{ selected: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Add to cart row -->
        <div style="display: flex; gap: 16px; align-items: center; margin-top: 8px;">
          <div class="mc-qty-selector" style="height: 46px; padding: 0 4px;">
            <button class="mc-qty-btn" @click="qty > 1 ? qty-- : null">-</button>
            <input type="text" class="mc-qty-input" :value="qty" readonly style="font-size: 15px;">
            <button class="mc-qty-btn" @click="qty++">+</button>
          </div>
          <button 
            class="mc-btn mc-btn-accent mc-modal-add-btn" 
            @click="addToCart" 
            style="height: 46px; font-size: 15px;"
          >
            Add to Shopping Cart
          </button>
        </div>

        <!-- Trust strips -->
        <div class="mc-badge-strip">
          <div class="mc-badge-item">🛡️ 1 Year Warranty</div>
          <div class="mc-badge-item">🔄 30 Day Free Trial</div>
          <div class="mc-badge-item">🔒 Secure Checkout</div>
          <div class="mc-badge-item">⭐ FDA Registered</div>
        </div>

      </div>

    </div>

    <!-- Product specification tabs -->
    <div class="mc-product-tabs">
      <button 
        class="mc-product-tab" 
        :class="{ active: activeTab === 'desc' }" 
        @click="activeTab = 'desc'"
      >
        Product Description
      </button>
      <button 
        class="mc-product-tab" 
        :class="{ active: activeTab === 'specs' }" 
        @click="activeTab = 'specs'"
      >
        Specifications
      </button>
      <button 
        class="mc-product-tab" 
        :class="{ active: activeTab === 'care' }" 
        @click="activeTab = 'care'"
      >
        Care & Usage
      </button>
    </div>

    <!-- Tab 1: Description -->
    <div class="mc-product-tab-content" :class="{ active: activeTab === 'desc' }">
      <div style="max-width: 800px; font-size: 15px; color: var(--mc-text-muted); line-height: 1.8;">
        <p style="margin-bottom: 16px;">
          The <strong>{{ product.title }}</strong> represents the peak of professional wellness engineering. 
          Developed in consultation with senior clinicians and physiotherapists, this product utilizes high-durability, hypoallergenic materials to optimize body mechanics, maximize user convenience, and provide long-lasting comfort.
        </p>
        <p style="margin-bottom: 16px;">
          Whether for clinical care, rehabilitation, or active everyday usage, MoreCare products undergo strict quality testings to meet ISO and FDA registration requirements, offering users complete peace of mind.
        </p>
      </div>
    </div>

    <!-- Tab 2: Specifications -->
    <div class="mc-product-tab-content" :class="{ active: activeTab === 'specs' }">
      <div style="max-width: 600px;">
        <table class="mc-specs-table">
          <tr v-for="(spec, label) in productSpecs" :key="label">
            <td class="mc-specs-label">{{ label }}</td>
            <td class="mc-specs-value">{{ spec }}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Tab 3: Care & Maintenance -->
    <div class="mc-product-tab-content" :class="{ active: activeTab === 'care' }">
      <div style="max-width: 800px; font-size: 15px; color: var(--mc-text-muted); line-height: 1.8;">
        <h4 style="color: var(--mc-primary); margin-bottom: 10px; font-size: 16px;">How to Use & Adjust:</h4>
        <ol style="margin-left: 20px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
          <li v-for="(step, sIdx) in productCare.use" :key="sIdx">{{ step }}</li>
        </ol>
        <h4 style="color: var(--mc-primary); margin-bottom: 10px; font-size: 16px;">Washing & Maintenance:</h4>
        <ul style="margin-left: 20px; display: flex; flex-direction: column; gap: 8px;">
          <li v-for="(step, mIdx) in productCare.maintenance" :key="mIdx">{{ step }}</li>
        </ul>
      </div>
    </div>

  </main>
  <div v-else class="mc-container" style="padding: 100px 24px; text-align: center;">
    <h2>Product not found</h2>
    <p style="color: var(--mc-text-muted); margin-top: 10px;">The product code you requested is not in our catalog.</p>
    <NuxtLink to="/" class="mc-btn mc-btn-primary" style="margin-top: 20px;">Return Home</NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from '#app'
import { PRODUCTS } from '~/utils/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const selectedSize = ref(null)
const qty = ref(1)
const activeTab = ref('desc')
const activeThumbIdx = ref(0)

const fetchProduct = () => {
  const id = route.params.id || 'MC-C01'
  const p = PRODUCTS.find(item => item.id === id)
  if (p) {
    product.value = p
    selectedSize.value = p.sizes && p.sizes.length > 0 ? p.sizes[0] : null
    qty.value = 1
    activeThumbIdx.value = 0
  } else {
    product.value = null
  }
}

watch(() => route.params.id, () => {
  fetchProduct()
})

onMounted(() => {
  fetchProduct()
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value.id, qty.value, selectedSize.value)
  }
}

// --- Dynamic Galleries ---
const productThumbs = computed(() => {
  if (!product.value) return []
  if (product.value.id === 'MC-C01') {
    return [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="25" y="25" width="50" height="50" rx="8" stroke="currentColor" fill="currentColor" fill-opacity="0.05"/><circle cx="50" cy="50" r="6" stroke="currentColor" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="20" width="60" height="60" rx="6" stroke="currentColor" stroke-dasharray="2 2"/><path d="M30 40h40M30 60h40" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="24" stroke="currentColor" stroke-width="3"/><path d="M50 26v48M26 50h48" stroke-linecap="round"/></svg>`
    ]
  }

  // Generate generic wireframe thumbnails for other products
  return [
    product.value.graphic,
    `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="20" width="60" height="60" rx="10" stroke="currentColor" stroke-dasharray="3 3" /><circle cx="50" cy="50" r="15" stroke="currentColor" /></svg>`,
    `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 50h60M50 20v60" stroke="currentColor" stroke-linecap="round" /><circle cx="50" cy="50" r="20" stroke="currentColor" /></svg>`
  ]
})

const activeGallerySvg = computed(() => {
  if (!product.value || productThumbs.value.length === 0) return ''
  return productThumbs.value[activeThumbIdx.value]
})

// --- Highlights ---
const productHighlights = computed(() => {
  if (!product.value) return []
  if (product.value.id === 'MC-C01') {
    return [
      '🩺 Medical-grade PVC core for ultimate durability',
      '🎈 Includes custom valve & high-pressure hand pump',
      '🌬️ Breathable cooling-mesh washable cover',
      '🚗 Ideal for office chairs, car leather seats, and wheelchairs'
    ]
  }
  
  // Generic or product-specific
  if (product.value.id === 'MC-W01') {
    return [
      '✈️ Airline-approved lithium-ion smart battery pack',
      '🌱 Lightweight aerospace carbon fiber build (14.2 kg net)',
      '🔋 Dual 250W silent brushless motors for ultimate torque',
      '🔒 Electromagnetic automatic braking triggers instantly'
    ]
  }

  // Default highlights
  return product.value.features || [
    '✨ Ergonomically tested for anatomical wellness',
    '🛡️ High-durability construction and build quality',
    '🌱 Environmentally friendly, hypoallergenic core',
    '🔒 Secure and safe daily rehabilitation utility'
  ]
})

// --- Specifications ---
const productSpecs = computed(() => {
  if (!product.value) return {}
  
  if (product.value.id === 'MC-C01') {
    return {
      'Dimensions': '18 x 16 x 2.2 inches (Standard) / 16 x 16 x 2.2 inches (Compact)',
      'Material Core': 'High-grade medical PVC (heat-sealed, hypoallergenic)',
      'Cover fabric': 'Cool-Mesh Breathable Polyester with Silicone anti-slip base',
      'Max Load Capacity': 'Up to 150 kg (330 lbs)',
      'Inflation Style': 'Manual micro-valve with double-action pump (included)',
      'Warranty': '1 Year limited manufacturer warranty against air leaks'
    }
  }

  if (product.value.id === 'MC-W01') {
    return {
      'Dimensions': '38 x 24 x 36 inches (Unfolded) / 12.5 x 24 x 30 inches (Folded)',
      'Material Core': 'Aerospace-grade Carbon Fiber frame',
      'Net Weight': '14.2 kg (without battery)',
      'Max Load Capacity': 'Up to 120 kg (265 lbs)',
      'Motor': '2x 250W brushless hub motors',
      'Battery': '24V 12Ah lithium-ion',
      'Warranty': '2 Years limited frame warranty'
    }
  }

  if (product.value.id === 'MC-I01') {
    return {
      'Dimensions': 'Cut-to-fit sizing for UK 4-12',
      'Material Core': 'High-density medical PU gel & EVA base',
      'Fabric cover': 'Odor-resistant breathable mesh cover',
      'Arch Support': 'Reinforced nylon TPU arch cradle',
      'Shock Absorption': 'Heel & metatarsal gel pads',
      'Warranty': '6 Months structural warranty'
    }
  }

  // Fallback specs
  return {
    'Dimensions': 'Standard sizing',
    'Material Core': 'Clinical-grade composite',
    'Warranty': '1 Year warranty coverage'
  }
})

// --- Care & Usage ---
const productCare = computed(() => {
  if (!product.value) return { use: [], maintenance: [] }

  if (product.value.id === 'MC-C01') {
    return {
      use: [
        'Twist the brass valve counter-clockwise to open the seal.',
        'Attach the rubber nozzle of the included pump to the valve.',
        'Pump air until the cushion is fully expanded (around 20 pumps). We recommend inflating to 70% capacity rather than 100% stiffness for the best contour immersion.',
        'Close the valve tightly by twisting clockwise. Sit down; if you feel the seat bottom below, open the valve slightly, add 3-5 pumps of air, and close.'
      ],
      maintenance: [
        'Unzip and remove the outer mesh cover. Machine wash the cover in cold water on a gentle cycle. Air dry or tumble dry on low.',
        'Do not wash the PVC cushion insert in a washing machine. Clean the PVC insert by wiping it down with a damp cloth and mild soap. Air dry completely before re-inserting into the cover.'
      ]
    }
  }

  if (product.value.id === 'MC-W01') {
    return {
      use: [
        'Unfold the wheelchair until the locking latch clicks firmly.',
        'Ensure the battery is charged and slotted securely in the chassis.',
        'Sit down, adjust the flip-up footrest, and turn on the controller speed dial.',
        'Slowly push the joystick in the direction you want to travel.'
      ],
      maintenance: [
        'Wipe down the carbon frame with a clean, damp cloth. Avoid high-pressure water spray.',
        'Charge the lithium battery monthly when storing. Keep controller terminals free of moisture.'
      ]
    }
  }

  if (product.value.id === 'MC-I01') {
    return {
      use: [
        'Remove existing insoles from your footwear.',
        'Use the guided trim lines on the bottom of the Morecare Insoles to cut to your exact shoe size.',
        'Insert insoles into footwear fabric side up and test fit.'
      ],
      maintenance: [
        'Wipe the gel base clean with a damp soapy sponge.',
        'Air dry completely in shade. Do not machine wash or expose to direct solar heat.'
      ]
    }
  }

  // Default care guidelines
  return {
    use: [
      'Read user manual for detailed deployment instructions.',
      'Adjust straps, buckles, or valves to conform snugly to body contour.',
      'Consult a certified orthopedist or therapist for specialized clinical alignment configurations.'
    ],
    maintenance: [
      'Clean periodically using standard non-abrasive household detergent.',
      'Inspect mechanical components weekly for signs of strain or structural fatigue.'
    ]
  }
})
</script>

<style scoped>
.mc-prod-size-btn {
  cursor: pointer;
}
.mc-qty-btn {
  cursor: pointer;
}
.mc-product-tab {
  cursor: pointer;
}
.mc-gallery-thumb {
  cursor: pointer;
}
</style>
