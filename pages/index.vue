<template>
  <div>
    <!-- Premium Hero Section with YouTube Video Banner -->
    <section class="mc-hero-section-new">
      <div class="mc-container mc-hero-grid-new">
        <div class="mc-hero-content-new">
          <span class="mc-hero-tagline-new">
            🇮🇳 Made in India. Built to Global Standards.
          </span>
          <h1 class="mc-hero-title-new">
            Empowering Mobility.<br>
            <span>Restoring Independence.</span>
          </h1>
          <p class="mc-hero-description-new">
            Discover advanced, clinician-backed physical rehabilitation systems. From high-durability electric wheelchairs to specialized patient lifts, we build adaptive products tailored to your needs.
          </p>
          <div class="mc-hero-actions-new">
            <button class="mc-btn mc-btn-accent" @click="scrollToSection('mc-products-section')">
              Explore Products
            </button>
            <a href="https://www.youtube.com/@morecare.mobility" target="_blank" class="mc-btn mc-btn-secondary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="color: #FF0000; margin-right: 4px;"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.454 12 20.454 12 20.454s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Visit YouTube Channel
            </a>
          </div>
          <div class="mc-hero-trust-new">
            <div class="mc-trust-stars">★★★★★</div>
            <div class="mc-trust-text">Trusted by leading therapists & caregivers across India</div>
          </div>
        </div>

        <div class="mc-hero-video-wrapper-new">
          <div class="mc-video-card-new">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/videoseries?list=PLuG0bC2PvZcK39qC7x_4hV9P-e0GZl2y9" 
              title="Morecare Mobility & Rehabilitation Solutions Video" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
            <div class="mc-video-badge-new">
              <span class="mc-video-badge-dot"></span> Featured Demo
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="mc-highlights-section-new">
      <div class="mc-container">
        <div class="mc-highlights-grid-new">
          <!-- Made in India -->
          <div class="mc-highlight-card-new">
            <div class="mc-highlight-icon-wrap-new">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="mc-icon-orange">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mc-highlight-title-new">Made in India</h3>
            <p class="mc-highlight-desc-new">Designed with pride, built to global standards</p>
          </div>

          <!-- Customized Solutions -->
          <div class="mc-highlight-card-new">
            <div class="mc-highlight-icon-wrap-new">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="mc-icon-blue">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <h3 class="mc-highlight-title-new">Customized Solutions</h3>
            <p class="mc-highlight-desc-new">Adaptive products tailored to every need</p>
          </div>

          <!-- Therapist-Backed -->
          <div class="mc-highlight-card-new">
            <div class="mc-highlight-icon-wrap-new">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="mc-icon-teal">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l-3.328 3.329a.75.75 0 01-1.06 0L2.122 16.5a.75.75 0 010-1.061l3.329-3.328m0 0A3.75 3.75 0 1010.5 7.5a3.75 3.75 0 00-5.048 4.623z" />
              </svg>
            </div>
            <h3 class="mc-highlight-title-new">Therapist-Backed</h3>
            <p class="mc-highlight-desc-new">Developed with clinical expertise for better outcomes</p>
          </div>

          <!-- Trusted Quality -->
          <div class="mc-highlight-card-new">
            <div class="mc-highlight-icon-wrap-new">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="mc-icon-blue-dark">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 class="mc-highlight-title-new">Trusted Quality</h3>
            <p class="mc-highlight-desc-new">Durable & safe, built for long-term use</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Circular Categories Section -->
    <section class="mc-categories-section">
      <div class="mc-container">
        <div class="mc-categories-list">
          <div class="mc-category-circle-card" @click="filterAndScroll('cushion')">
            <div class="mc-category-circle">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
            </div>
            <span class="mc-category-title">Seat Cushions</span>
          </div>
          <div class="mc-category-circle-card" @click="filterAndScroll('insoles')">
            <div class="mc-category-circle">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 3c-4.5 9-1 14-8.5 17S4 17 9 21s11-2 11-7-1-8.5-3.5-11z"/></svg>
            </div>
            <span class="mc-category-title">Foot Insoles</span>
          </div>
          <div class="mc-category-circle-card" @click="filterAndScroll('wheelchair')">
            <div class="mc-category-circle">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="18" r="4"/><circle cx="19" cy="18" r="4"/><path d="M5 14h14M9 10h6M9 6v8"/></svg>
            </div>
            <span class="mc-category-title">Electric Wheelchairs</span>
          </div>
          <div class="mc-category-circle-card" @click="filterAndScroll('wheelchair')">
            <div class="mc-category-circle">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="8" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8 15h10M11 6v9M4 6h14"/></svg>
            </div>
            <span class="mc-category-title">Travel Chairs</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Grid & Filters -->
    <section class="mc-products-section" id="mc-products-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag">Shop Best Sellers</span>
          <h2 class="mc-section-title">Mobility solutions for <span>every journey</span></h2>
          <p class="mc-section-desc">Engineered for comfort, high durability, and maximum independence. Explore orthopedic cushions, walking supports, and carbon fiber chairs.</p>
        </div>

        <div class="mc-filter-tabs">
          <button class="mc-filter-tab" :class="{ active: currentCategory === 'all' }" @click="currentCategory = 'all'">All Products</button>
          <button class="mc-filter-tab" :class="{ active: currentCategory === 'wheelchair' }" @click="currentCategory = 'wheelchair'">Wheelchairs</button>
          <button class="mc-filter-tab" :class="{ active: currentCategory === 'cushion' }" @click="currentCategory = 'cushion'">Comfort Cushions</button>
          <button class="mc-filter-tab" :class="{ active: currentCategory === 'insoles' }" @click="currentCategory = 'insoles'">Foot Insoles</button>
        </div>

        <div class="mc-products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="mc-product-card">
            <div class="mc-product-badge-wrap">
              <span v-if="product.price < product.oldPrice" class="mc-badge mc-badge-sale">
                {{ Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) }}% OFF
              </span>
              <span v-else-if="product.rating >= 4.8" class="mc-badge mc-badge-new">BEST SELLER</span>
            </div>
            <div class="mc-product-image-area">
              <div v-html="product.graphic" style="width: 100%; height: 100%;"></div>
              <div class="mc-product-actions-overlay">
                <button class="mc-product-action-icon mc-quick-view-btn" @click="cartStore.openQuickView(product.id)" title="Quick View">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button class="mc-product-action-icon mc-add-to-cart-quick" @click="cartStore.addToCart(product.id, 1)" title="Add to Cart">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </div>
            <div class="mc-product-details">
              <span class="mc-product-category">{{ product.categoryLabel }}</span>
              <h3 class="mc-product-title">{{ product.title }}</h3>
              <div class="mc-product-rating">
                ★ {{ product.rating }} <span class="mc-product-rating-count">({{ product.reviews }} reviews)</span>
              </div>
              <p class="mc-product-description">{{ product.desc }}</p>
              <div class="mc-product-footer">
                <div class="mc-price-group">
                  <span v-if="product.oldPrice" class="mc-price-old">₹{{ product.oldPrice.toLocaleString('en-IN') }}</span>
                  <span class="mc-price-new">₹{{ product.price.toLocaleString('en-IN') }}</span>
                </div>
                <button class="mc-btn mc-btn-accent mc-btn-sm mc-buy-btn" @click="cartStore.addToCart(product.id, 1)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hotspot Visualizer -->
    <section class="mc-hotspot-section" id="mc-hotspot-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag">Science & Ergonomics</span>
          <h2 class="mc-section-title">Designed to relieve <span>pelvic stress</span></h2>
          <p class="mc-section-desc">Click on the pulsing hotspots to discover the engineering secrets behind the Morecare Ergo-Air Cushion.</p>
        </div>

        <div class="mc-hotspot-grid">
          <div class="mc-hotspot-viewer">
            <svg class="mc-hotspot-product-graphic" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="15" y="15" width="70" height="70" rx="14" stroke="var(--mc-primary)" stroke-width="3" fill="var(--mc-primary)" fill-opacity="0.03"/>
              <rect x="25" y="25" width="50" height="50" rx="8" stroke="var(--mc-accent)" stroke-width="2" stroke-dasharray="1 3"/>
              <circle cx="35" cy="35" r="4" fill="var(--mc-text-light)"/>
              <circle cx="50" cy="35" r="4" fill="var(--mc-text-light)"/>
              <circle cx="65" cy="35" r="4" fill="var(--mc-text-light)"/>
              <circle cx="35" cy="50" r="4" fill="var(--mc-text-light)"/>
              <circle cx="50" cy="50" r="8" stroke="var(--mc-text-light)" stroke-width="2"/>
              <circle cx="65" cy="50" r="4" fill="var(--mc-text-light)"/>
              <circle cx="35" cy="65" r="4" fill="var(--mc-text-light)"/>
              <circle cx="50" cy="65" r="4" fill="var(--mc-text-light)"/>
              <circle cx="65" cy="65" r="4" fill="var(--mc-text-light)"/>
            </svg>
            <div class="mc-hotspot-point mc-hotspot-1" :class="{ active: activeHotspot === 1 }" @click="activeHotspot = 1" title="Ergonomic Air Cells"></div>
            <div class="mc-hotspot-point mc-hotspot-2" :class="{ active: activeHotspot === 2 }" @click="activeHotspot = 2" title="Dual-Flow Ventilation"></div>
            <div class="mc-hotspot-point mc-hotspot-3" :class="{ active: activeHotspot === 3 }" @click="activeHotspot = 3" title="Silica Grip Base"></div>
            <div class="mc-hotspot-point mc-hotspot-4" :class="{ active: activeHotspot === 4 }" @click="activeHotspot = 4" title="Precision Valve"></div>
          </div>

          <div class="mc-hotspot-details-panel">
            <div class="mc-hotspot-detail-content">
              <h3 class="mc-hotspot-detail-title"><span></span>{{ hotspotFeatures[activeHotspot].title }}</h3>
              <p class="mc-hotspot-detail-desc">{{ hotspotFeatures[activeHotspot].desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fit Finder Quiz -->
    <section class="mc-quiz-section" id="mc-quiz-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag" style="background-color: rgba(255,255,255,0.1); color: #fff;">Interactive Fit Finder</span>
          <h2 class="mc-section-title" style="color: #fff;">Find your perfect <span>Morecare fit</span></h2>
          <p class="mc-section-desc" style="color: rgba(255,255,255,0.7);">Our custom orthopedic matching engine recommends the perfect sitting, walking, or mobility aid for your clinical conditions.</p>
        </div>

        <div class="mc-quiz-container">
          <div class="mc-quiz-progress">
            <div class="mc-quiz-progress-bar" :style="{ width: `${quizProgressPercent}%` }"></div>
          </div>

          <!-- Quiz Screen -->
          <div v-if="!showRecommendation" id="mc-quiz-quiz-screen">
            <!-- Question 1 -->
            <div class="mc-quiz-step" :class="{ active: currentQuizStep === 0 }">
              <h3 class="mc-quiz-question">1. What is your primary comfort or pain concern?</h3>
              <div class="mc-quiz-options">
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[0] === 'back-pain' }" @click="selectQuizOption(0, 'back-pain')">
                  <span>Lower Back / Tailbone / Sciatic Pain</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[0] === 'mobility' }" @click="selectQuizOption(0, 'mobility')">
                  <span>Mobility Assistance / Post-op Recovery</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[0] === 'foot-pain' }" @click="selectQuizOption(0, 'foot-pain')">
                  <span>Foot Pain / Plantar Fasciitis / High Arch Strain</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
              </div>
            </div>

            <!-- Question 2 -->
            <div class="mc-quiz-step" :class="{ active: currentQuizStep === 1 }">
              <h3 class="mc-quiz-question">2. On average, how many hours do you spend sitting or walking daily?</h3>
              <div class="mc-quiz-options">
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[1] === 'sitting-short' }" @click="selectQuizOption(1, 'sitting-short')">
                  <span>Less than 3 hours</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[1] === 'sitting-medium' }" @click="selectQuizOption(1, 'sitting-medium')">
                  <span>3 to 7 hours</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[1] === 'sitting-long' }" @click="selectQuizOption(1, 'sitting-long')">
                  <span>More than 8 hours (Long hours)</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
              </div>
            </div>

            <!-- Question 3 -->
            <div class="mc-quiz-step" :class="{ active: currentQuizStep === 2 }">
              <h3 class="mc-quiz-question">3. What is your primary activity setting or state?</h3>
              <div class="mc-quiz-options">
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[2] === 'office' }" @click="selectQuizOption(2, 'office')">
                  <span>Office Chair / Working at desk</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[2] === 'wheelchair-user' }" @click="selectQuizOption(2, 'wheelchair-user')">
                  <span>Wheelchair bound or requires transfer assistance</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
                <div class="mc-quiz-option" :class="{ selected: quizAnswers[2] === 'standing' }" @click="selectQuizOption(2, 'standing')">
                  <span>Standing on feet / Active walking for work</span>
                  <div class="mc-quiz-option-circle"></div>
                </div>
              </div>
            </div>

            <div class="mc-quiz-nav">
              <button 
                class="mc-btn mc-btn-secondary mc-btn-sm" 
                @click="navigateQuiz(-1)" 
                :disabled="currentQuizStep === 0"
                :style="{ opacity: currentQuizStep === 0 ? 0.3 : 1, pointerEvents: currentQuizStep === 0 ? 'none' : 'auto' }"
              >
                Back
              </button>
              <button 
                class="mc-btn mc-btn-accent mc-btn-sm" 
                @click="navigateQuiz(1)" 
                :disabled="!quizAnswers[currentQuizStep]"
              >
                {{ currentQuizStep === 2 ? 'Find Solution' : 'Next' }}
              </button>
            </div>
          </div>

          <!-- Recommendation Result Screen -->
          <div v-else class="mc-quiz-recommendation">
            <svg width="48" height="48" fill="none" stroke="var(--mc-teal)" stroke-width="2.5" viewBox="0 0 24 24" style="margin-bottom: 16px;"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>
            <h3 style="font-size: 24px; color: #fff; margin-bottom: 8px;">Recommended Solution Found!</h3>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 24px;">Based on your inputs, our clinical matching system recommends the following device:</p>
            
            <div v-if="recommendedProduct" class="mc-quiz-rec-card">
              <div class="mc-quiz-rec-graphic" v-html="recommendedProduct.graphic"></div>
              <div class="mc-quiz-rec-info">
                <span class="mc-product-category">{{ recommendedProduct.categoryLabel }}</span>
                <h3 class="mc-quiz-rec-title">{{ recommendedProduct.title }}</h3>
                <p class="mc-product-description">{{ recommendedProduct.desc }}</p>
                <div class="mc-quiz-rec-price">₹{{ recommendedProduct.price.toLocaleString('en-IN') }}</div>
                <button class="mc-btn mc-btn-accent mc-btn-sm mc-add-recommended-btn" @click="cartStore.addToCart(recommendedProduct.id, 1)">
                  Add to Cart & Checkout
                </button>
              </div>
            </div>

            <button class="mc-btn mc-btn-secondary mc-btn-sm" @click="resetQuiz">Retake Quiz</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs Section -->
    <section class="mc-faq-section" id="mc-faq-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag">Frequently Asked Questions</span>
          <h2 class="mc-section-title">Got questions? <span>We have answers.</span></h2>
          <p class="mc-section-desc">Learn more about our trial periods, shipping policies, warranty covers, and clinical testings.</p>
        </div>

        <div class="mc-faq-list">
          <div 
            v-for="(faq, idx) in faqs" 
            :key="idx" 
            class="mc-faq-item"
            :class="{ active: activeFaqIndex === idx }"
          >
            <div class="mc-faq-question" @click="toggleFaq(idx)">
              <span>{{ faq.q }}</span>
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div 
              class="mc-faq-answer" 
              :style="{ maxHeight: activeFaqIndex === idx ? '200px' : '0px' }"
            >
              <div class="mc-faq-answer-inner">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Slider -->
    <section class="mc-social-testimonials-section" id="mc-testimonials-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag">Customer Stories</span>
          <h2 class="mc-section-title">Tested and trusted by <span>real people</span></h2>
          <p class="mc-section-desc">Hear from our community through Google Reviews, Instagram Reels, and YouTube videos.</p>
        </div>

        <div class="mc-social-testimonials-grid">
          <!-- Column 1: Google Reviews -->
          <div class="mc-testimonial-col">
            <div class="mc-col-header">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="color: #4285F4;"><path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.74-.078-1.305-.175-1.785H12.24z"/></svg>
              <h3>Google Reviews <span class="mc-rating-number">4.9 ★★★★★</span></h3>
            </div>
            <div class="mc-google-reviews-list">
              <div class="mc-google-review-card">
                <div class="mc-review-stars">★★★★★</div>
                <p class="mc-review-text">"The Ergo-Air Cushion literally saved my lower back. The constant sciatic ache has completely vanished since I switched to Morecare."</p>
                <div class="mc-review-author">
                  <span>Rajesh K. Verma</span>
                  <span>Verified Buyer</span>
                </div>
              </div>
              <div class="mc-google-review-card">
                <div class="mc-review-stars">★★★★★</div>
                <p class="mc-review-text">"Purchased the Carbon X Electric Wheelchair for my grandmother. It is incredibly lightweight and folds in seconds."</p>
                <div class="mc-review-author">
                  <span>Priyanka Sen</span>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Instagram Reels -->
          <div class="mc-testimonial-col">
            <div class="mc-col-header">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="color: #E1306C;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              <h3>Instagram Reels</h3>
            </div>
            <div class="mc-media-card">
              <div class="mc-video-mockup">
                <div class="mc-video-placeholder" style="background: radial-gradient(circle, #f97316 0%, #1476AF 100%);">
                  <svg width="48" height="48" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  <div class="mc-video-overlay-text">Pelvic Pressure Test</div>
                </div>
                <div class="mc-video-play-btn">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div class="mc-media-caption">
                <strong>@morecare_wellness:</strong> Witness how the air cell matrix handles 80kg of concentrated pelvic force.
              </div>
            </div>
          </div>

          <!-- Column 3: YouTube Videos -->
          <div class="mc-testimonial-col">
            <div class="mc-col-header">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="color: #FF0000;"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.454 12 20.454 12 20.454s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <h3>YouTube Videos</h3>
            </div>
            <div class="mc-media-card">
              <div class="mc-youtube-embed-wrapper">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Morecare Rehabilitation Solutions Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="mc-media-caption">
                <strong>Morecare Carbon X Review:</strong> Folding mechanism and outdoor ramp navigation demo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reels Showcase Section -->
    <section class="mc-reels-showcase-section">
      <div class="mc-container">
        <div class="mc-section-header">
          <span class="mc-section-tag">Watch Us On Instagram</span>
          <h2 class="mc-section-title">Ergonomic tips <span>& stories</span></h2>
        </div>
      </div>
      
      <div class="mc-reels-marquee-container">
        <div class="mc-reels-marquee-track">
          <!-- Reel Cards (1-6 duplicated for infinite marquee loop) -->
          <div v-for="r in [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]" :key="r" class="mc-reel-card">
            <div class="mc-reel-thumb-img" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('https://picsum.photos/200/320?random=${r}')` }">
              <div class="mc-reel-meta">
                <svg fill="currentColor" viewBox="0 0 24 24" style="width: 12px; height: 12px; margin-right: 4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span>{{ r * 700 }}</span>
              </div>
              <div class="mc-reel-play">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Maps Section -->
    <section class="mc-maps-section" id="mc-maps-section">
      <div class="mc-container">
        <div class="mc-maps-grid">
          <div class="mc-address-card">
            <span class="mc-section-tag">Visit Our Experience Center</span>
            <h3 class="mc-section-title" style="margin-top: 10px;">Find Us in <span>Jaipur</span></h3>
            <div class="mc-address-details">
              <div class="mc-address-row">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-top: 4px;"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <p style="font-weight: 700; color: var(--mc-primary); margin-bottom: 4px;">Morecare Office & Experience Lounge</p>
                  <p>E -22, Gayatri Nagar Vistar,<br>Maharani Farm, Durgapura<br>Jaipur, Rajasthan, 302018 India</p>
                </div>
              </div>
              <div class="mc-address-row">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-top: 4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <div>
                  <p style="font-weight: 700; color: var(--mc-primary); margin-bottom: 4px;">Opening Hours</p>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM<br>Sunday: Closed</p>
                </div>
              </div>
              <div class="mc-address-row">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-top: 4px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <p style="font-weight: 700; color: var(--mc-primary); margin-bottom: 4px;">Direct Contact</p>
                  <p>Email: support@morecare.in<br>Phone: +91 9309888615</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mc-map-iframe-wrapper">
            <iframe width="100%" height="100%" src="https://maps.google.com/maps?q=E%20-22,%20Gayatri%20Nagar%20Vistar,%20Maharani%20Farm,%20Durgapura%20Jaipur,%20Rajasthan.%20302018%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PRODUCTS } from '~/utils/products'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// --- Category Selection ---
const currentCategory = ref('all')

const filteredProducts = computed(() => {
  if (currentCategory.value === 'all') {
    return PRODUCTS
  }
  return PRODUCTS.filter(p => p.category === currentCategory.value)
})

const filterAndScroll = (category) => {
  currentCategory.value = category
  scrollToSection('mc-products-section')
}

// --- Hotspot Interactive Features ---
const activeHotspot = ref(1)

const hotspotFeatures = {
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
}

// --- Quiz State & Logic ---
const currentQuizStep = ref(0)
const quizAnswers = ref({})
const showRecommendation = ref(false)

const selectQuizOption = (step, val) => {
  quizAnswers.value[step] = val
}

const navigateQuiz = (direction) => {
  if (direction === 1) {
    if (currentQuizStep.value < 2) {
      currentQuizStep.value++
    } else {
      showRecommendation.value = true
    }
  } else {
    if (currentQuizStep.value > 0) {
      currentQuizStep.value--
    }
  }
}

const quizProgressPercent = computed(() => {
  return ((currentQuizStep.value + 1) / 3) * 100
})

const recommendedProduct = computed(() => {
  if (!showRecommendation.value) return null
  const concern = quizAnswers.value[0]
  const mobility = quizAnswers.value[2]

  let id = 'MC-C01' // Default: cushion
  if (concern === 'mobility' || mobility === 'wheelchair-user') {
    id = 'MC-W01' // Carbon X wheelchair
  } else if (concern === 'foot-pain' || mobility === 'standing') {
    id = 'MC-I01' // Insoles
  }
  return PRODUCTS.find(p => p.id === id) || PRODUCTS[1]
})

const resetQuiz = () => {
  currentQuizStep.value = 0
  quizAnswers.value = {}
  showRecommendation.value = false
}

// --- FAQs Accordion State ---
const activeFaqIndex = ref(null)

const faqs = [
  {
    q: 'Do Morecare seat cushions fit on any office chair?',
    a: 'Yes, our cushions are designed to fit standard office chairs, car seats, wheelchairs, and sofas. The anti-slip silica grip base ensures the cushion stays locked in place on fabric, leather, or mesh surfaces without shifting.'
  },
  {
    q: 'What is the return or trial policy for cushions?',
    a: 'We offer a 30-day, risk-free trial for all ergonomic cushions and sleep contour pillows. If you do not experience structural relief from tailbone or neck pains, you can request a return for a full refund, no questions asked.'
  },
  {
    q: 'How does the Carbon X wheelchair perform on outdoor terrain?',
    a: 'The Morecare Carbon X is equipped with solid puncture-proof rear tires and high-grade front shocks. It is designed to navigate ramps, sidewalks, grass, and gravel paths smoothly. The electromagnetic braking engages automatically the second you release the joystick, protecting against slopes.'
  },
  {
    q: 'Are Morecare products approved by medical agencies?',
    a: 'Yes, our manufacturing facility is ISO 13485 certified for medical devices, and our flagship cushions and carbon electric wheelchairs are registered with the FDA, meeting strict rehabilitation criteria.'
  }
]

const toggleFaq = (idx) => {
  if (activeFaqIndex.value === idx) {
    activeFaqIndex.value = null
  } else {
    activeFaqIndex.value = idx
  }
}

// --- Scroll helper ---
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}


</script>

<style scoped>
/* Replicate the accordion open height transition natively */
.mc-faq-answer {
  overflow: hidden;
  transition: max-height var(--mc-transition-smooth);
}
.mc-quick-view-btn,
.mc-add-to-cart-quick {
  cursor: pointer;
}
.mc-hotspot-point {
  cursor: pointer;
}
.mc-quiz-option {
  cursor: pointer;
}
.mc-categories-section .mc-category-circle-card {
  cursor: pointer;
}

/* --- New Hero Section with YouTube Video --- */
.mc-hero-section-new {
  background: linear-gradient(135deg, #f0f7fc 0%, #e2eef6 100%);
  padding: 80px 0;
  border-bottom: 1px solid var(--mc-border);
}

.mc-hero-grid-new {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 60px;
}

@media (max-width: 991px) {
  .mc-hero-grid-new {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}

.mc-hero-content-new {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 991px) {
  .mc-hero-content-new {
    align-items: center;
  }
}

.mc-hero-tagline-new {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mc-accent);
  background-color: var(--mc-bright-white);
  padding: 8px 18px;
  border-radius: var(--mc-radius-full);
  margin-bottom: 24px;
  box-shadow: var(--mc-shadow-sm);
  border: 1px solid var(--mc-border-light);
}

.mc-hero-title-new {
  font-size: 48px;
  line-height: 1.15;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.mc-hero-title-new span {
  color: var(--mc-primary);
}

.mc-hero-description-new {
  font-size: 16px;
  line-height: 1.6;
  color: var(--mc-text-muted);
  margin-bottom: 32px;
  max-width: 580px;
}

.mc-hero-actions-new {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.mc-hero-trust-new {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--mc-text-muted);
}

.mc-trust-stars {
  color: var(--mc-coral);
  font-size: 16px;
  letter-spacing: 2px;
}

.mc-hero-video-wrapper-new {
  display: flex;
  justify-content: center;
  width: 100%;
}

.mc-video-card-new {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
  border-radius: var(--mc-radius-lg);
  overflow: hidden;
  box-shadow: var(--mc-shadow-xl);
  border: 4px solid var(--mc-bright-white);
  transition: transform var(--mc-transition-smooth);
}

.mc-video-card-new:hover {
  transform: scale(1.02);
}

.mc-video-badge-new {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: var(--mc-radius-full);
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
}

.mc-video-badge-dot {
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px #22c55e;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

/* --- Highlights Section --- */
.mc-highlights-section-new {
  background-color: var(--mc-bright-white);
  padding: 60px 0;
  border-bottom: 1px solid var(--mc-border-light);
}

.mc-highlights-grid-new {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

@media (max-width: 991px) {
  .mc-highlights-grid-new {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 576px) {
  .mc-highlights-grid-new {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.mc-highlight-card-new {
  background-color: var(--mc-bg);
  padding: 30px 24px;
  border-radius: var(--mc-radius-md);
  border: 1px solid var(--mc-border);
  transition: all var(--mc-transition-smooth);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
}

.mc-highlight-card-new::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--mc-accent);
  opacity: 0;
  transition: opacity var(--mc-transition-fast);
}

.mc-highlight-card-new:hover {
  transform: translateY(-5px);
  box-shadow: var(--mc-shadow-lg);
  border-color: var(--mc-accent);
}

.mc-highlight-card-new:hover::after {
  opacity: 1;
}

.mc-highlight-icon-wrap-new {
  background-color: var(--mc-bright-white);
  padding: 10px;
  border-radius: var(--mc-radius-sm);
  margin-bottom: 20px;
  box-shadow: var(--mc-shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mc-highlight-icon-wrap-new svg {
  transition: transform var(--mc-transition-smooth);
}

.mc-highlight-card-new:hover .mc-highlight-icon-wrap-new svg {
  transform: scale(1.1);
}

.mc-icon-orange {
  color: var(--mc-coral);
}
.mc-icon-blue {
  color: var(--mc-primary);
}
.mc-icon-teal {
  color: var(--mc-teal);
}
.mc-icon-blue-dark {
  color: #0369a1;
}

.mc-highlight-title-new {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--mc-primary);
}

.mc-highlight-desc-new {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mc-text-muted);
}
</style>
