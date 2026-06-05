$path = "d:\Semester Workflow\Summer Internship'26\Morecare\Morecare WebDev\index.html"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Keep lines 1-124 (index 0-123), replace 125-184 (index 124-183), keep 185+ (index 184+)
$before = $lines[0..123]
$after = $lines[184..($lines.Length-1)]

$newSection = @'
          Products
          <svg class="mc-mobile-chevron" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="mc-mobile-dropdown-content">
          <div class="mc-mobile-category-group">
            <span class="mc-mobile-category-title">CP Kids</span>
            <ul class="mc-mobile-subcategory-list">
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">CP Wheelchairs</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Seating &amp; Posture</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Standing Frames</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Gait Trainers</a></li>
            </ul>
          </div>
          <div class="mc-mobile-category-group">
            <span class="mc-mobile-category-title">Adults</span>
            <ul class="mc-mobile-subcategory-list">
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Electric Wheelchairs</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Seat Cushions</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Orthotic Insoles</a></li>
              <li><a href="#mc-products-section" class="mc-mobile-menu-item" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Cervical Pillows</a></li>
            </ul>
          </div>
        </div>
      </div>

      <a href="#mc-about-section" class="mc-mobile-nav-link" onclick="document.getElementById('mc-mobile-sidebar-close').click()">About Us</a>
      <a href="#mc-maps-section" class="mc-mobile-nav-link" onclick="document.getElementById('mc-mobile-sidebar-close').click()">Contact Us</a>
    </nav>
    <div style="margin-top: auto;">
      <a href="tel:+919309888615" class="mc-btn mc-btn-primary" style="width: 100%;">&#128222; Call Support</a>
    </div>
  </aside>
  <!-- ==============================================================
       HERO SECTION
       ============================================================== -->
  <section class="mc-hero-section mc-hero-video-layout">
    <div class="mc-hero-video-bg">
      <iframe src="https://www.youtube.com/embed/9tO5qXvqf-M?autoplay=1&mute=1&loop=1&playlist=9tO5qXvqf-M&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" title="Morecare - Every Move Matters" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="mc-hero-gradient-fade"></div>
    <div class="mc-container mc-hero-video-inner">
      <div class="mc-hero-content">
        <div class="mc-hero-badges-row">
          <span class="mc-hero-badge-pill mc-badge-india">Made in India</span>
          <span class="mc-hero-badge-divider"></span>
          <span class="mc-hero-badge-text">Trusted Worldwide.</span>
        </div>
        <h1 class="mc-hero-title-big">EVERY MOVE<br>MATTERS.</h1>
        <p class="mc-hero-description">Manufacturer of <strong>assistive, mobility, and neurological rehabilitation equipment</strong> built for both children and adults.</p>
        <div class="mc-hero-actions">
          <a href="#" class="mc-btn mc-btn-accent">Download Catalogue</a>
          <a href="#mc-maps-section" class="mc-btn mc-btn-ghost">Book a Consultation</a>
        </div>
      </div>
    </div>
    <div class="mc-hero-yt-card" id="mc-hero-yt-card">
      <iframe src="https://www.youtube.com/embed/9tO5qXvqf-M?rel=0&modestbranding=1" title="Morecare - From Idea to Impact" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </section>
  <!-- ==============================================================
       TRUST STRIP
       ============================================================== -->
  <div class="mc-trust-strip mc-trust-strip-v2">
    <div class="mc-container">
      <div class="mc-trust-strip-inner">
        <div class="mc-trust-item-v2">
          <svg class="mc-trust-icon-v2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
          <div class="mc-trust-item-text"><strong>Made in India</strong><span>Designed with pride, built to global standards</span></div>
        </div>
        <div class="mc-trust-item-v2">
          <svg class="mc-trust-icon-v2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          <div class="mc-trust-item-text"><strong>Customized Solutions</strong><span>Adaptive products tailored to every need</span></div>
        </div>
        <div class="mc-trust-item-v2">
          <svg class="mc-trust-icon-v2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          <div class="mc-trust-item-text"><strong>Therapist-Backed</strong><span>Developed with clinical expertise for better outcomes</span></div>
        </div>
        <div class="mc-trust-item-v2">
          <svg class="mc-trust-icon-v2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div class="mc-trust-item-text"><strong>Trusted Quality</strong><span>Durable &amp; safe, built for long-term use</span></div>
        </div>
      </div>
    </div>
  </div>
  <!-- ==============================================================
       CATEGORY CIRCLES
       ============================================================== -->
  <section class="mc-categories-section">
    <div class="mc-container">
      <div class="mc-categories-list">
        <div class="mc-category-circle-card mc-reveal" data-mega="cp-kids">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="18" r="4"/><circle cx="19" cy="18" r="4"/><path d="M5 14h14M9 10h6M9 6v8"/></svg>
          </div>
          <span class="mc-category-title">CP Wheelchairs</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-100" data-mega="cp-kids" data-sub="cp-seating">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M3 15h18"/></svg>
          </div>
          <span class="mc-category-title">CP Seating</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-200" data-mega="cp-kids" data-sub="cp-mobility">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><path d="M12 8v8M8 12h8M8 20h8"/></svg>
          </div>
          <span class="mc-category-title">CP Mobility</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-100" data-mega="adults" data-sub="wheelchair">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="18" r="4"/><circle cx="19" cy="18" r="4"/><path d="M5 14h14M9 10h6M9 6v8"/></svg>
          </div>
          <span class="mc-category-title">Wheelchairs</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-200" data-mega="adults" data-sub="cushion">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
          </div>
          <span class="mc-category-title">Cushions</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-300" data-mega="adults" data-sub="insoles">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 3c-4.5 9-1 14-8.5 17S4 17 9 21s11-2 11-7-1-8.5-3.5-11z"/></svg>
          </div>
          <span class="mc-category-title">Insoles</span>
        </div>
        <div class="mc-category-circle-card mc-reveal delay-300" data-mega="adults" data-sub="pillow">
          <div class="mc-category-circle">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="5"/><path d="M2 12q5-4 10 0t10 0"/></svg>
          </div>
          <span class="mc-category-title">Pillows</span>
        </div>
      </div>
    </div>
  </section>
'@

$newLines = $newSection -split "`n"
$allLines = $before + $newLines + $after

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, ($allLines -join "`r`n"), $utf8NoBom)

Write-Host "File reconstructed successfully. Total lines: $($allLines.Length)"
