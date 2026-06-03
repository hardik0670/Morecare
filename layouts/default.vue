<template>
  <div class="mc-scope">
    <!-- Announcement Bar -->
    <div class="mc-announce-bar">
      <div class="mc-container">
        <div class="mc-announce-slider">
          <div 
            v-for="(slide, idx) in announceSlides" 
            :key="idx" 
            class="mc-announce-slide"
            :class="{ active: idx === activeAnnounceIdx }"
          >
            {{ slide }}
          </div>
        </div>
      </div>
    </div>

    <!-- Header & Navigation -->
    <header class="mc-header">
      <div class="mc-container mc-header-inner">
        <!-- Hamburger Toggle for Mobile -->
        <button class="mc-action-btn mc-menu-toggle" @click="cartStore.openMobileSidebar" aria-label="Open Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        <!-- Logo -->
        <NuxtLink to="/" class="mc-logo-container">
          <div class="mc-logo-text">
            <span class="mc-logo-more">more</span><span class="mc-logo-care">care</span>
          </div>
          <div class="mc-logo-tagline">Mobility & Rehabilitation Solutions</div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="mc-nav-desktop">
          <NuxtLink to="/" class="mc-nav-link" :class="{ active: route.path === '/' }">Home</NuxtLink>
          <div 
            class="mc-nav-dropdown-wrapper"
            :class="{ 'mc-open': desktopDropdownOpen }"
            @click.stop="desktopDropdownOpen = !desktopDropdownOpen"
          >
            <span class="mc-nav-link">
              Products
              <svg class="mc-chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <div class="mc-mega-menu">
              <div class="mc-mega-menu-grid">
                <!-- Column 1: Electric Wheelchairs -->
                <div class="mc-mega-menu-column">
                  <h4 class="mc-mega-menu-title">Electric Wheelchairs</h4>
                  <ul class="mc-mega-menu-list">
                    <li><NuxtLink to="/#mc-products-section" class="mc-mega-menu-item">Carbon X Power Chair <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><a class="mc-mega-menu-item disabled">Transit Lite Power <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Heavy-Duty Power <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Fold-n-Go Travel <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Off-Road All-Terrain <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                  </ul>
                </div>
                <!-- Column 2: Manual Wheelchairs -->
                <div class="mc-mega-menu-column">
                  <h4 class="mc-mega-menu-title">Manual Wheelchairs</h4>
                  <ul class="mc-mega-menu-list">
                    <li><NuxtLink to="/#mc-products-section" class="mc-mega-menu-item">Transit Lite Manual <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><a class="mc-mega-menu-item disabled">Ergo-Active Comfort <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Lightweight Travel <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Reclining Rehab <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Patient Mover Lite <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                  </ul>
                </div>
                <!-- Column 3: Seat Cushions -->
                <div class="mc-mega-menu-column">
                  <h4 class="mc-mega-menu-title">Seat Cushions</h4>
                  <ul class="mc-mega-menu-list">
                    <li><NuxtLink to="/product/MC-C01" class="mc-mega-menu-item">Ergo-Air Cushion <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><a class="mc-mega-menu-item disabled">Memory Foam Coccyx <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Cool-Gel Orthopedic <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Honeycomb Relief Pad <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Lumbar Support Back <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                  </ul>
                </div>
                <!-- Column 4: Foot Insoles -->
                <div class="mc-mega-menu-column">
                  <h4 class="mc-mega-menu-title">Foot Insoles</h4>
                  <ul class="mc-mega-menu-list">
                    <li><NuxtLink to="/#mc-products-section" class="mc-mega-menu-item">Cloud-Gel Orthotics <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><NuxtLink to="/#mc-products-section" class="mc-mega-menu-item">Arch-Active Sports <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><a class="mc-mega-menu-item disabled">Plantar Fasciitis Gel <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Diabetic Comfort <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Heel Pain Cups <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                  </ul>
                </div>
                <!-- Column 5: Neck & Sleep -->
                <div class="mc-mega-menu-column">
                  <h4 class="mc-mega-menu-title">Neck & Sleep</h4>
                  <ul class="mc-mega-menu-list">
                    <li><NuxtLink to="/#mc-products-section" class="mc-mega-menu-item">Contoured Cervical <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                    <li><a class="mc-mega-menu-item disabled">Travel Memory Neck <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Orthopedic Knee <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Bed Wedge Elevation <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                    <li><a class="mc-mega-menu-item disabled">Full Body Sleep <span class="mc-sku-tag temp">Temp SKU</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <NuxtLink to="/#mc-hotspot-section" class="mc-nav-link">Technology</NuxtLink>
          <NuxtLink to="/#mc-quiz-section" class="mc-nav-link">Fit Finder</NuxtLink>
          <NuxtLink to="/product/MC-C01" class="mc-nav-link" :class="{ active: route.path.startsWith('/product') }">Cushion Page</NuxtLink>
          <NuxtLink to="/#mc-faq-section" class="mc-nav-link">Help</NuxtLink>
        </nav>

        <!-- Header Action Icons -->
        <div class="mc-header-actions">
          <button class="mc-action-btn" aria-label="Search Products">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
          <button class="mc-action-btn" aria-label="Account Profile">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button class="mc-action-btn" @click="cartStore.openCart" aria-label="Open Shopping Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="mc-action-badge mc-cart-count-badge" v-show="cartStore.totalItems > 0">{{ cartStore.totalItems }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Sidebar Menu -->
    <div 
      class="mc-sidebar-overlay" 
      :class="{ active: cartStore.mobileSidebarOpen || cartStore.cartDrawerOpen || cartStore.quickViewOpen }"
      @click="closeAllDrawers"
    ></div>
    <aside class="mc-mobile-sidebar" :class="{ open: cartStore.mobileSidebarOpen }">
      <div class="mc-mobile-sidebar-header">
        <NuxtLink to="/" class="mc-logo-container" @click="cartStore.closeMobileSidebar">
          <div class="mc-logo-text">
            <span class="mc-logo-more">more</span><span class="mc-logo-care">care</span>
          </div>
          <div class="mc-logo-tagline">Mobility & Rehabilitation Solutions</div>
        </NuxtLink>
        <button class="mc-action-btn" @click="cartStore.closeMobileSidebar" aria-label="Close Menu">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <nav class="mc-mobile-nav">
        <NuxtLink to="/" class="mc-mobile-nav-link" @click="cartStore.closeMobileSidebar">Home</NuxtLink>
        <div class="mc-mobile-dropdown-wrapper" :class="{ open: mobileDropdownOpen }">
          <button class="mc-mobile-nav-link mc-mobile-dropdown-trigger" @click="mobileDropdownOpen = !mobileDropdownOpen">
            Products
            <svg class="mc-mobile-chevron" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div 
            class="mc-mobile-dropdown-content" 
            :style="{ maxHeight: mobileDropdownOpen ? '1000px' : '0px' }"
          >
            <!-- Category 1 -->
            <div class="mc-mobile-category-group">
              <span class="mc-mobile-category-title">Electric Wheelchairs</span>
              <ul class="mc-mobile-subcategory-list">
                <li><NuxtLink to="/#mc-products-section" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Carbon X Power Chair <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><span class="mc-mobile-menu-item disabled">Transit Lite Power <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Heavy-Duty Power <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Fold-n-Go Travel <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Off-Road All-Terrain <span class="mc-sku-tag temp">Temp SKU</span></span></li>
              </ul>
            </div>
            <!-- Category 2 -->
            <div class="mc-mobile-category-group">
              <span class="mc-mobile-category-title">Manual Wheelchairs</span>
              <ul class="mc-mobile-subcategory-list">
                <li><NuxtLink to="/#mc-products-section" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Transit Lite Manual <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><span class="mc-mobile-menu-item disabled">Ergo-Active Comfort <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Lightweight Travel <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Reclining Rehab <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Patient Mover Lite <span class="mc-sku-tag temp">Temp SKU</span></span></li>
              </ul>
            </div>
            <!-- Category 3 -->
            <div class="mc-mobile-category-group">
              <span class="mc-mobile-category-title">Seat Cushions</span>
              <ul class="mc-mobile-subcategory-list">
                <li><NuxtLink to="/product/MC-C01" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Ergo-Air Cushion <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><span class="mc-mobile-menu-item disabled">Memory Foam Coccyx <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Cool-Gel Orthopedic <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Honeycomb Relief Pad <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Lumbar Support Back <span class="mc-sku-tag temp">Temp SKU</span></span></li>
              </ul>
            </div>
            <!-- Category 4 -->
            <div class="mc-mobile-category-group">
              <span class="mc-mobile-category-title">Foot Insoles</span>
              <ul class="mc-mobile-subcategory-list">
                <li><NuxtLink to="/#mc-products-section" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Cloud-Gel Orthotics <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><NuxtLink to="/#mc-products-section" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Arch-Active Sports <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><span class="mc-mobile-menu-item disabled">Plantar Fasciitis Gel <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Diabetic Comfort <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Heel Pain Cups <span class="mc-sku-tag temp">Temp SKU</span></span></li>
              </ul>
            </div>
            <!-- Category 5 -->
            <div class="mc-mobile-category-group">
              <span class="mc-mobile-category-title">Neck & Sleep</span>
              <ul class="mc-mobile-subcategory-list">
                <li><NuxtLink to="/#mc-products-section" class="mc-mobile-menu-item" @click="cartStore.closeMobileSidebar">Contoured Cervical <span class="mc-sku-tag active">Active</span></NuxtLink></li>
                <li><span class="mc-mobile-menu-item disabled">Travel Memory Neck <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Orthopedic Knee <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Bed Wedge Elevation <span class="mc-sku-tag temp">Temp SKU</span></span></li>
                <li><span class="mc-mobile-menu-item disabled">Full Body Sleep <span class="mc-sku-tag temp">Temp SKU</span></span></li>
              </ul>
            </div>
          </div>
        </div>
        <NuxtLink to="/#mc-hotspot-section" class="mc-mobile-nav-link" @click="cartStore.closeMobileSidebar">Technology</NuxtLink>
        <NuxtLink to="/#mc-quiz-section" class="mc-mobile-nav-link" @click="cartStore.closeMobileSidebar">Fit Finder</NuxtLink>
        <NuxtLink to="/product/MC-C01" class="mc-mobile-nav-link" @click="cartStore.closeMobileSidebar">Cushion Page</NuxtLink>
        <NuxtLink to="/#mc-faq-section" class="mc-mobile-nav-link" @click="cartStore.closeMobileSidebar">Help & FAQs</NuxtLink>
      </nav>
      <div style="margin-top: auto;">
        <a href="tel:+919309888615" class="mc-btn mc-btn-primary" style="width: 100%;">
          📞 Call Support
        </a>
      </div>
    </aside>

    <!-- Page Body -->
    <slot />

    <!-- Footer -->
    <footer class="mc-footer">
      <div class="mc-container">
        <div class="mc-footer-top">
          <div class="mc-footer-brand">
            <NuxtLink to="/" class="mc-logo-container" style="margin-bottom: 20px;">
              <div class="mc-logo-text">
                <span class="mc-logo-more">more</span><span class="mc-logo-care">care</span>
              </div>
              <div class="mc-logo-tagline">Mobility & Rehabilitation Solutions</div>
            </NuxtLink>
            <p class="mc-footer-about">Morecare is dedicated to restoring physical independence and sitting comfort through clinical design, innovative air-cell systems, and carbon fiber technology.</p>
            <div class="mc-footer-socials">
              <a href="#" class="mc-footer-social-btn" aria-label="Facebook"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" class="mc-footer-social-btn" aria-label="Twitter"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
              <a href="#" class="mc-footer-social-btn" aria-label="Instagram"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg></a>
            </div>
          </div>

          <div>
            <h3 class="mc-footer-title">Products</h3>
            <div class="mc-footer-links">
              <NuxtLink to="/#mc-products-section" class="mc-footer-link">Electric Wheelchairs</NuxtLink>
              <NuxtLink to="/#mc-products-section" class="mc-footer-link">Attendant Chairs</NuxtLink>
              <NuxtLink to="/product/MC-C01" class="mc-footer-link">Air Seat Cushions</NuxtLink>
              <NuxtLink to="/#mc-products-section" class="mc-footer-link">Orthopedic Insoles</NuxtLink>
              <NuxtLink to="/#mc-products-section" class="mc-footer-link">Contour Pillows</NuxtLink>
            </div>
          </div>

          <div>
            <h3 class="mc-footer-title">Resources</h3>
            <div class="mc-footer-links">
              <NuxtLink to="/#mc-quiz-section" class="mc-footer-link">Posture Fit Quiz</NuxtLink>
              <NuxtLink to="/#mc-hotspot-section" class="mc-footer-link">Medical Research</NuxtLink>
              <NuxtLink to="/#mc-faq-section" class="mc-footer-link">Warranty Details</NuxtLink>
              <a href="#" class="mc-footer-link">Customer Care Center</a>
              <a href="#" class="mc-footer-link">Become a Distributor</a>
            </div>
          </div>

          <div>
            <h3 class="mc-footer-title">Contact Us</h3>
            <div class="mc-footer-links" style="font-size: 13.5px; line-height: 1.6;">
              <div>📍 403/B, Amar Tech Park,<br>Balewadi, Pune, India</div>
              <div>📧 mobility@morecare.in</div>
              <div>📞 +91 9309888615</div>
              <div style="margin-top: 10px; color: var(--mc-teal); font-weight: 700;">🟢 Support Online (9AM - 6PM)</div>
            </div>
          </div>
        </div>

        <div class="mc-footer-bottom">
          <span class="mc-footer-copyright">© 2026 Morecare Mobility Private Limited. All rights reserved.</span>
          <div class="mc-footer-badges">
            <span class="mc-footer-badge">ISO 13485</span>
            <span class="mc-footer-badge">FDA Registered</span>
            <span class="mc-footer-badge">ADA Compliant</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Sliding Cart Drawer -->
    <div class="mc-cart-drawer" :class="{ open: cartStore.cartDrawerOpen }">
      <div class="mc-cart-header">
        <h2 class="mc-cart-title">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Your Cart (<span class="mc-cart-count-badge">{{ cartStore.totalItems }}</span>)
        </h2>
        <button class="mc-cart-close" @click="cartStore.closeCart" aria-label="Close Cart">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Free Shipping Bar -->
      <div class="mc-cart-shipping-bar">
        <div class="mc-shipping-bar-text">
          <span v-if="cartStore.qualifiesForFreeShipping">🎉 You qualify for <strong>FREE Shipping!</strong></span>
          <span v-else>Add <span>₹{{ cartStore.remainingForFreeShipping.toLocaleString('en-IN') }}</span> more for <strong>FREE shipping</strong></span>
        </div>
        <div class="mc-shipping-progress">
          <div 
            class="mc-shipping-progress-fill" 
            :style="{ width: `${cartStore.shippingProgress}%`, backgroundColor: 'var(--mc-teal)' }"
          ></div>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="mc-cart-items">
        <div v-if="cartStore.cart.length === 0" class="mc-cart-empty">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Your shopping cart is empty</p>
          <button class="mc-btn mc-btn-accent mc-btn-sm" @click="shopNow">Shop Best Sellers</button>
        </div>
        <div 
          v-else 
          v-for="item in cartStore.cart" 
          :key="`${item.id}-${item.selectedSize}`" 
          class="mc-cart-item"
        >
          <div class="mc-cart-item-image" v-html="item.graphic"></div>
          <div class="mc-cart-item-details">
            <div class="mc-cart-item-title">{{ item.title }}</div>
            <div class="mc-cart-item-meta">{{ item.selectedSize ? 'Size: ' + item.selectedSize : '' }}</div>
            <div class="mc-cart-item-price">₹{{ item.price.toLocaleString('en-IN') }}</div>
            <div class="mc-cart-item-controls">
              <div class="mc-qty-selector">
                <button class="mc-qty-btn" @click="cartStore.updateCartQty(item.id, item.selectedSize, -1)">-</button>
                <input type="text" class="mc-qty-input" :value="item.quantity" readonly>
                <button class="mc-qty-btn" @click="cartStore.updateCartQty(item.id, item.selectedSize, 1)">+</button>
              </div>
              <button class="mc-cart-item-remove" @click="cartStore.removeFromCart(item.id, item.selectedSize)">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="mc-cart-footer">
        <div class="mc-cart-subtotal">
          <span>Subtotal</span>
          <span>₹{{ cartStore.subtotal.toLocaleString('en-IN') }}</span>
        </div>
        <button 
          class="mc-btn mc-btn-accent mc-cart-checkout-btn" 
          @click="proceedCheckout"
          :disabled="cartStore.cart.length === 0"
        >
          Proceed to Checkout
        </button>
        <div style="text-align: center; font-size: 11px; color: var(--mc-text-light);">
          🔒 Safe & Secure 256-bit SSL encrypted checkout
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div class="mc-cart-toast" :class="{ active: cartStore.toast.visible }">
      <div class="mc-cart-toast-icon">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      </div>
      <span>{{ cartStore.toast.message }}</span>
    </div>

    <!-- Quick View Modal -->
    <div class="mc-modal-backdrop" :class="{ open: cartStore.quickViewOpen }" @click="cartStore.closeQuickView">
      <div class="mc-quickview-modal" :class="{ open: cartStore.quickViewOpen }" @click.stop>
        <button class="mc-modal-close" @click="cartStore.closeQuickView" aria-label="Close modal">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div v-if="cartStore.quickViewProduct" class="mc-modal-grid">
          <div class="mc-modal-visual" v-html="cartStore.quickViewProduct.graphic"></div>
          <div class="mc-modal-info">
            <span class="mc-modal-meta">{{ cartStore.quickViewProduct.categoryLabel }}</span>
            <h2 class="mc-modal-title">{{ cartStore.quickViewProduct.title }}</h2>
            <div class="mc-modal-rating">★ {{ cartStore.quickViewProduct.rating }}</div>
            <div class="mc-modal-price">₹{{ cartStore.quickViewProduct.price.toLocaleString('en-IN') }}</div>
            <p class="mc-modal-desc">{{ cartStore.quickViewProduct.desc }}</p>
            
            <div v-if="cartStore.quickViewProduct.sizes && cartStore.quickViewProduct.sizes.length > 0" class="mc-option-group">
              <span class="mc-option-label">Select Size</span>
              <div class="mc-size-options">
                <button 
                  v-for="size in cartStore.quickViewProduct.sizes" 
                  :key="size"
                  class="mc-size-btn"
                  :class="{ selected: cartStore.quickViewSelectedSize === size }"
                  @click="cartStore.quickViewSelectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <button class="mc-btn mc-btn-accent mc-modal-add-btn" @click="addToCartFromModal">
              Add to Shopping Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="mc-mobile-bottom-nav">
      <div class="mc-mobile-bottom-inner">
        <div class="mc-mobile-bottom-item" :class="{ active: route.path === '/' }" @click="navigateToSection('/')">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"/></svg>
          <span>Home</span>
        </div>
        <div class="mc-mobile-bottom-item" @click="navigateToSection('/#mc-products-section')">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <span>Shop</span>
        </div>
        <div class="mc-mobile-bottom-item" @click="navigateToSection('/#mc-quiz-section')">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
          <span>Quiz</span>
        </div>
        <div class="mc-mobile-bottom-item" @click="cartStore.openCart">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
          <span>Cart</span>
          <span class="mc-mobile-bottom-badge mc-cart-count-badge" v-show="cartStore.totalItems > 0">{{ cartStore.totalItems }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const announceSlides = [
  '🚚 Free Express Shipping across India on orders above ₹4,999!',
  '⚡ Summer Ergonomics Sale: Get 10% off with code: MORECOMFORT',
  '🏥 ISO 13485 Certified & FDA Registered Medical Devices'
]
const activeAnnounceIdx = ref(0)
const desktopDropdownOpen = ref(false)
const mobileDropdownOpen = ref(false)

onMounted(() => {
  cartStore.loadCart()
  
  // Rotator for announcements
  setInterval(() => {
    activeAnnounceIdx.value = (activeAnnounceIdx.value + 1) % announceSlides.length
  }, 3000)
})

const closeAllDrawers = () => {
  cartStore.closeCart()
  cartStore.closeMobileSidebar()
  cartStore.closeQuickView()
}

const shopNow = () => {
  closeAllDrawers()
  navigateToSection('/#mc-products-section')
}

const addToCartFromModal = () => {
  if (cartStore.quickViewProduct) {
    cartStore.addToCart(
      cartStore.quickViewProduct.id, 
      1, 
      cartStore.quickViewSelectedSize
    )
    cartStore.closeQuickView()
  }
}

const navigateToSection = (target) => {
  closeAllDrawers()
  if (target.startsWith('/#')) {
    const id = target.substring(2)
    router.push('/').then(() => {
      setTimeout(() => {
        scrollToSection(id)
      }, 100)
    })
  } else {
    router.push(target)
  }
}

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

const proceedCheckout = () => {
  alert(`Proceeding to checkout with ${cartStore.totalItems} items (total: ₹${cartStore.subtotal.toLocaleString('en-IN')}) via dev.morecare.in mock checkout gateway.`)
}
</script>

<style scoped>
/* Scoped overrides to handle backdrop and specific Vue drawer styles */
.mc-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 140;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--mc-transition-smooth);
}
.mc-modal-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}
.mc-quickview-modal {
  display: block !important;
}
.mc-quickview-modal:not(.open) {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -40%) scale(0.95);
}
.mc-nav-dropdown-wrapper {
  position: relative;
}
</style>
