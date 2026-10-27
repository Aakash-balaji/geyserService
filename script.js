/**
 * ==============================================================================
 * HydServicePro — Premium SaaS Platform Client Script
 * ==============================================================================
 * Production-ready JavaScript providing interactivity for HydServicePro
 * single-page platform (index.html).
 *
 * Modules included:
 *  1. Dynamic Component Styles (Toasts, Back-to-Top, Form Errors, Animations)
 *  2. Toast Notification System (Reusable, animated, auto-dismissing)
 *  3. Mobile Navigation Toggle (Hamburger animation, drawer, click-outside)
 *  4. Sticky Navbar Scroll Effect (Shadow and compact padding on scroll)
 *  5. Smooth Scroll for Anchor Links (Dynamic navbar offset compensation)
 *  6. Scroll-Triggered Animations (IntersectionObserver with grid staggering)
 *  7. Animated Number Counters (Easing, 2s duration, formatting 15k+, 30k, 10k)
 *  8. Testimonial Carousel (Autoplay, hover pause, loop, dots, swipe support)
 *  9. Newsletter Form Handling (Validation, toast feedback, reset)
 * 10. Contact Form Validation (Field checks, inline error states, submission)
 * 11. Active Navigation Link & Scrollspy (Page highlight & section detection)
 * 12. Parallax Floating Cards (Hero 3D depth effect on desktop mousemove)
 * 13. Back to Top Button (Auto display past 500px with smooth return)
 * ==============================================================================
 */

'use strict';

/**
 * ==============================================================================
 * 1. DYNAMIC COMPONENT STYLES
 * Injects baseline CSS required for dynamically generated components (toasts,
 * back-to-top, error messages, and scroll animations) to guarantee visual
 * perfection regardless of external stylesheet loading order.
 * ==============================================================================
 */
const injectDynamicStyles = () => {
  if (document.getElementById('HydServicePro-dynamic-styles')) return;

  const style = document.createElement('style');
  style.id = 'HydServicePro-dynamic-styles';
  style.textContent = `
    /* Toast Notification System */
    #toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
      max-width: calc(100vw - 48px);
      width: 380px;
    }
    .toast-notification {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 18px;
      background: #0f172a;
      color: #f8fafc;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.45), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-family: inherit;
      font-size: 0.925rem;
      line-height: 1.45;
      opacity: 0;
      transform: translateX(120%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
      will-change: transform, opacity;
    }
    .toast-notification.toast-visible {
      opacity: 1;
      transform: translateX(0);
    }
    .toast-notification.toast-hiding {
      opacity: 0;
      transform: translateX(120%);
    }
    .toast-notification.toast-success {
      border-left: 4px solid #10b981;
    }
    .toast-notification.toast-error {
      border-left: 4px solid #ef4444;
    }
    .toast-notification.toast-info {
      border-left: 4px solid #3b82f6;
    }
    .toast-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .toast-notification.toast-success .toast-icon { color: #10b981; }
    .toast-notification.toast-error .toast-icon { color: #ef4444; }
    .toast-notification.toast-info .toast-icon { color: #3b82f6; }
    .toast-content {
      flex: 1;
      word-break: break-word;
    }
    .toast-close {
      flex-shrink: 0;
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 0 4px;
      font-size: 1.25rem;
      line-height: 1;
      border-radius: 4px;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .toast-close:hover {
      color: #ffffff;
      transform: scale(1.15);
    }

    /* Back to Top Button */
    #back-to-top {
      position: fixed;
      bottom: 28px;
      left: 28px;
      z-index: 999;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s ease, background 0.2s ease;
    }
    #back-to-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    #back-to-top:hover {
      background: #2563eb;
      color: #ffffff;
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 14px 28px -5px rgba(37, 99, 235, 0.5);
    }
    #back-to-top:active {
      transform: translateY(-1px) scale(0.98);
    }

    /* Form Validation Inline Errors */
    .form-error-message {
      display: block;
      color: #ef4444;
      font-size: 0.825rem;
      font-weight: 500;
      margin-top: 6px;
      animation: fadeInError 0.25s ease-out forwards;
    }
    .input-error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18) !important;
    }
    @keyframes fadeInError {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Scroll Animations Baseline */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Body scroll lock when mobile navigation is open */
    body.nav-open {
      overflow: hidden;
      touch-action: none;
    }
  `;
  document.head.appendChild(style);
};

// Inject baseline styles immediately
injectDynamicStyles();

/**
 * ==============================================================================
 * 2. TOAST NOTIFICATION SYSTEM
 * Reusable toast function. Appears at top-right, slides in, auto-dismisses in 4s.
 * Types: 'success' (green), 'error' (red), 'info' (blue).
 * ==============================================================================
 */
const showToast = (message, type = 'info', duration = 4000) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const normalizedType = ['success', 'error', 'info'].includes(type) ? type : 'info';

  const icons = {
    success: `
      <svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `,
    error: `
      <svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `,
    info: `
      <svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `
  };

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${normalizedType}`;
  toast.setAttribute('role', normalizedType === 'error' ? 'alert' : 'status');

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[normalizedType]}</span>
    <div class="toast-content">${message}</div>
    <button class="toast-close" type="button" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger enter animation on the next animation frame
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  let dismissTimeout;
  const dismissToast = () => {
    if (toast.classList.contains('toast-hiding')) return;
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    toast.addEventListener(
      'transitionend',
      () => {
        toast.remove();
        if (container && container.children.length === 0) {
          container.remove();
        }
      },
      { once: true }
    );
  };

  // Auto-dismiss after designated duration
  dismissTimeout = setTimeout(dismissToast, duration);

  // Pause timer on hover, resume on mouse leave
  toast.addEventListener('mouseenter', () => clearTimeout(dismissTimeout));
  toast.addEventListener('mouseleave', () => {
    dismissTimeout = setTimeout(dismissToast, duration / 2);
  });

  // Manual close button
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(dismissTimeout);
      dismissToast();
    });
  }
};

// Expose globally so external scripts or HTML events can trigger toasts if needed
window.showToast = showToast;

/**
 * ==============================================================================
 * MAIN DOM INITIALIZATION
 * Wraps page-dependent features once DOM is fully parsed.
 * ==============================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * ----------------------------------------------------------------------------
   * 3. MOBILE NAVIGATION TOGGLE
   * Elements: #hamburger, #nav-mobile, .navbar
   * - Toggles .active on #hamburger (animates to X)
   * - Toggles .active on #nav-mobile (slides down/out)
   * - Closes when clicking any link inside #nav-mobile
   * - Closes when clicking anywhere outside
   * - Closes on Escape key press or window resize to desktop
   * ----------------------------------------------------------------------------
   */
  const initMobileNav = () => {
    const hamburger = document.querySelector('#hamburger') || document.querySelector('.hamburger');
    const navMobile = document.querySelector('#nav-mobile') || document.querySelector('.nav-mobile') || document.querySelector('#mobile-menu');

    if (!hamburger || !navMobile) return;

    const openMenu = () => {
      hamburger.classList.add('active');
      navMobile.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    const toggleMenu = (e) => {
      e.stopPropagation();
      const isActive = navMobile.classList.contains('active');
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close when clicking any nav link inside mobile navigation
    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close when clicking outside of the mobile nav and hamburger
    document.addEventListener('click', (e) => {
      if (navMobile.classList.contains('active')) {
        const isClickInside = navMobile.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInside) {
          closeMenu();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('active')) {
        closeMenu();
      }
    });

    // Automatically close if screen is resized beyond tablet/mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navMobile.classList.contains('active')) {
        closeMenu();
      }
    });
  };

  /**
   * ----------------------------------------------------------------------------
   * 4. STICKY NAVBAR SCROLL EFFECT
   * Adds .scrolled class to .navbar when scrolled past 50px.
   * Toggles box-shadow and reduces padding via CSS.
   * ----------------------------------------------------------------------------
   */
  const initStickyNavbar = () => {
    const navbar = document.querySelector('.navbar') || document.querySelector('header');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    // Check immediately on load in case of page reload or deep-linking
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * ----------------------------------------------------------------------------
   * 5. SMOOTH SCROLL FOR ANCHOR LINKS
   * Smoothly scrolls to target sections accounting for navbar height offset.
   * Handles all <a href="#target"> anchor links.
   * ----------------------------------------------------------------------------
   */
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.querySelector('.navbar') || document.querySelector('header');

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#' || targetId === '#!') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        // Calculate dynamic navbar height + 16px buffer
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetRect = targetElement.getBoundingClientRect();
        const targetPosition = targetRect.top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });

        // Update URL hash without causing an instant layout jump
        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      });
    });
  };

  /**
   * ----------------------------------------------------------------------------
   * 6. SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   * Observes elements with class .animate-on-scroll.
   * Adds .visible when entering viewport (threshold 0.15).
   * Applies staggered delays to children inside grid / container layouts.
   * ----------------------------------------------------------------------------
   */
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    // Apply staggered animation delays to grouped items (cards, grid children)
    const gridContainers = document.querySelectorAll(
      '.grid, .features-grid, .services-grid, .cards-grid, .stats-grid, [data-stagger]'
    );

    gridContainers.forEach((container) => {
      const items = container.querySelectorAll('.animate-on-scroll');
      items.forEach((item, index) => {
        if (!item.style.transitionDelay && !item.dataset.delay) {
          item.style.transitionDelay = `${(index % 4) * 0.12}s`;
        }
      });
    });

    // Apply manual data-delay if explicitly defined (e.g., data-delay="300")
    animatedElements.forEach((el) => {
      if (el.dataset.delay) {
        const delayValue = el.dataset.delay.includes('s')
          ? el.dataset.delay
          : `${parseFloat(el.dataset.delay) / 1000}s`;
        el.style.transitionDelay = delayValue;
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      animatedElements.forEach((el) => observer.observe(el));
    } else {
      // Fallback for older browsers without IntersectionObserver
      animatedElements.forEach((el) => el.classList.add('visible'));
    }
  };

  /**
   * ----------------------------------------------------------------------------
   * 7. ANIMATED NUMBER COUNTERS
   * Elements: .stat-number with data-target attribute.
   * Animates numbers from 0 to target over ~2s with smooth cubic easing.
   * Formats large numbers:
   *  - 15000 -> "15k+"
   *  - 30000 -> "30k"
   *  - 10000 -> "10k"
   * Animates only once when the stats section enters the viewport.
   * ----------------------------------------------------------------------------
   */
  const initStatCounters = () => {
    const statElements = document.querySelectorAll('.stat-number');
    if (!statElements.length) return;

    // Formatter matching exact specification
    const formatStatValue = (currentVal, targetNum, rawString, isFinal = false) => {
      // Check explicit numbers requested by the user
      if (targetNum === 15000) {
        if (isFinal) return '15k+';
        const formatted = (currentVal / 1000).toFixed(currentVal < 1000 ? 0 : 1);
        return `${formatted}k+`;
      }
      if (targetNum === 30000) {
        if (isFinal) return '30k';
        const formatted = (currentVal / 1000).toFixed(currentVal < 1000 ? 0 : 1);
        return `${formatted}k`;
      }
      if (targetNum === 10000) {
        if (isFinal) return '10k';
        const formatted = (currentVal / 1000).toFixed(currentVal < 1000 ? 0 : 1);
        return `${formatted}k`;
      }

      // Dynamic fallback for any other large stats
      const hasPlus = rawString.includes('+');
      const hasPercent = rawString.includes('%');
      const hasK = rawString.toLowerCase().includes('k');

      if (hasK || targetNum >= 1000) {
        if (targetNum % 1000 === 0) {
          if (isFinal) return `${Math.round(targetNum / 1000)}k${hasPlus ? '+' : ''}`;
          return `${(currentVal / 1000).toFixed(1)}k${hasPlus ? '+' : ''}`;
        }
        if (isFinal) return `${Math.floor(targetNum).toLocaleString()}${hasPlus ? '+' : ''}`;
        return `${Math.floor(currentVal).toLocaleString()}${hasPlus ? '+' : ''}`;
      }

      if (hasPercent) {
        return `${Math.floor(currentVal)}%`;
      }

      return `${Math.floor(currentVal)}${hasPlus ? '+' : ''}`;
    };

    const animateCounter = (el) => {
      const rawTarget = el.dataset.target || el.textContent.trim() || '0';
      // Extract numeric component
      const cleanNumericString = rawTarget.replace(/[^0-9.]/g, '');
      let targetNum = parseFloat(cleanNumericString) || 0;

      // Handle cases where data-target="15k" or "30k" was entered directly
      if (rawTarget.toLowerCase().includes('k') && targetNum < 1000) {
        targetNum *= 1000;
      }

      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      // Smooth ease-out cubic function: fast start, soft landing
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentVal = easedProgress * targetNum;

        const isFinal = progress >= 1;
        el.textContent = formatStatValue(currentVal, targetNum, rawTarget, isFinal);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target); // Animate once only
            }
          });
        },
        { threshold: 0.25 }
      );

      statElements.forEach((stat) => counterObserver.observe(stat));
    } else {
      statElements.forEach((stat) => animateCounter(stat));
    }
  };

  /**
   * ----------------------------------------------------------------------------
   * 8. TESTIMONIAL CAROUSEL
   * Elements: #testimonial-track, #carousel-prev, #carousel-next
   * - Slide / transform horizontal cards
   * - Autoplay every 5 seconds
   * - Pause on hover
   * - Loop back to start
   * - Smooth CSS transform transitions
   * - Carousel dots synchronization & interactive switching
   * - Touch swipe gesture support for mobile devices
   * ----------------------------------------------------------------------------
   */
  const initTestimonialCarousel = () => {
    const track = document.querySelector('#testimonial-track');
    if (!track) return;

    const prevBtn = document.querySelector('#carousel-prev');
    const nextBtn = document.querySelector('#carousel-next');
    const dotsContainer = document.querySelector('#carousel-dots') || document.querySelector('.carousel-dots');
    const cards = Array.from(track.children);

    if (cards.length <= 1) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // Ensure CSS styles for horizontal carousel sliding
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.willChange = 'transform';

    cards.forEach((card) => {
      card.style.flex = '0 0 100%';
      card.style.width = '100%';
      card.style.boxSizing = 'border-box';
    });

    // Populate carousel dots dynamically if container exists and is empty
    if (dotsContainer && dotsContainer.children.length === 0) {
      cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
        dot.style.cursor = 'pointer';
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot, .dot')) : [];

    const updateDots = () => {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      if (index >= cards.length) {
        currentIndex = 0; // Loop back to start
      } else if (index < 0) {
        currentIndex = cards.length - 1; // Loop back to end
      } else {
        currentIndex = index;
      }

      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    // Navigation buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      });
    }

    // Interactive dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
        resetAutoplay();
      });
    });

    // Autoplay functionality (every 5 seconds)
    const startAutoplay = () => {
      if (!autoplayTimer) {
        autoplayTimer = setInterval(nextSlide, 5000);
      }
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    startAutoplay();

    // Pause on hover
    const carouselWrapper = track.closest('.testimonial-carousel') || track.parentElement;
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoplay);
      carouselWrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Pause when browser tab is inactive to conserve battery and CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Mobile touch swipe gestures
    track.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    track.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    const handleSwipe = () => {
      const swipeDistance = touchStartX - touchEndX;
      const threshold = 50; // Minimum drag distance to trigger slide

      if (swipeDistance > threshold) {
        nextSlide();
        resetAutoplay();
      } else if (swipeDistance < -threshold) {
        prevSlide();
        resetAutoplay();
      }
    };
  };

  /**
   * ----------------------------------------------------------------------------
   * 9. NEWSLETTER FORM HANDLING
   * Element: #newsletter-form
   * - Prevents default submission
   * - Validates email format
   * - Displays toast notification on success or error
   * - Clears input field upon success
   * ----------------------------------------------------------------------------
   */
  const initNewsletterForm = () => {
    const newsletterForm = document.querySelector('#newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput =
        newsletterForm.querySelector('input[type="email"]') ||
        newsletterForm.querySelector('input[name="email"]');

      if (!emailInput) return;

      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue) {
        showToast('Please enter your email address.', 'error');
        emailInput.focus();
        return;
      }

      if (!emailRegex.test(emailValue)) {
        showToast('Please enter a valid email address (e.g. name@company.com).', 'error');
        emailInput.classList.add('input-error');
        emailInput.focus();
        return;
      }

      // Success state
      emailInput.classList.remove('input-error');
      showToast('Thank you for subscribing to HydServicePro updates!', 'success');
      newsletterForm.reset();
    });

    // Real-time error clearance on typing
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.classList.remove('input-error');
      });
    }
  };

  /**
   * Quick Technician Issue Form (Homepage)
   */
  const initTechnicianIssueForm = () => {
    const form = document.querySelector('#technician-issue-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#tech-user-name')?.value.trim();
      const phone = form.querySelector('#tech-user-phone')?.value.trim();
      const issue = form.querySelector('#tech-user-issue')?.value;

      if (!name || name.length < 2) {
        showToast('Please enter your name.', 'error');
        return;
      }
      const digitsOnly = phone ? phone.replace(/\D/g, '') : '';
      if (!digitsOnly || digitsOnly.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }
      if (!issue) {
        showToast('Please select your geyser problem.', 'error');
        return;
      }

      showToast(`Thank you ${name}! Issue "${issue}" logged. Our technician will call you on ${phone} within 15 minutes.`, 'success', 6000);
      form.reset();
    });
  };

  /**
   * ----------------------------------------------------------------------------
   * 10. CONTACT FORM VALIDATION (Contact Page)
   * Element: #contact-form
   * - Validates:
   *   1. Name: not empty (at least 2 chars)
   *   2. Email: valid standard email pattern
   *   3. Phone: 10 valid digits
   *   4. Service: selection chosen (not empty or default placeholder)
   * - Shows inline error messages under each field
   * - Shows success toast and resets form on successful submission
   * ----------------------------------------------------------------------------
   */
  const initContactForm = () => {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    // Error helper functions
    const showFieldError = (field, message) => {
      field.classList.add('input-error');
      field.setAttribute('aria-invalid', 'true');

      let parent = field.closest('.form-group') || field.parentElement;
      let errorSpan = parent.querySelector('.form-error-message');

      if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'form-error-message';
        parent.appendChild(errorSpan);
      }

      errorSpan.textContent = message;
      errorSpan.style.display = 'block';
    };

    const clearFieldError = (field) => {
      field.classList.remove('input-error');
      field.removeAttribute('aria-invalid');

      const parent = field.closest('.form-group') || field.parentElement;
      const errorSpan = parent.querySelector('.form-error-message');
      if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
      }
    };

    // Form fields lookup with fallbacks
    const nameField =
      contactForm.querySelector('#name') ||
      contactForm.querySelector('input[name="name"]') ||
      contactForm.querySelector('input[type="text"]');

    const emailField =
      contactForm.querySelector('#email') ||
      contactForm.querySelector('input[name="email"]') ||
      contactForm.querySelector('input[type="email"]');

    const phoneField =
      contactForm.querySelector('#phone') ||
      contactForm.querySelector('input[name="phone"]') ||
      contactForm.querySelector('input[type="tel"]');

    const serviceField =
      contactForm.querySelector('#service') ||
      contactForm.querySelector('select[name="service"]') ||
      contactForm.querySelector('select');

    // Attach real-time clearance listeners to inputs
    [nameField, emailField, phoneField, serviceField].forEach((field) => {
      if (!field) return;
      const eventName = field.tagName.toLowerCase() === 'select' ? 'change' : 'input';
      field.addEventListener(eventName, () => clearFieldError(field));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstInvalidField = null;

      // 1. Name validation
      if (nameField) {
        const nameVal = nameField.value.trim();
        if (!nameVal || nameVal.length < 2) {
          showFieldError(nameField, 'Please enter your full name (minimum 2 characters).');
          isValid = false;
          firstInvalidField = firstInvalidField || nameField;
        } else {
          clearFieldError(nameField);
        }
      }

      // 2. Email validation
      if (emailField) {
        const emailVal = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          showFieldError(emailField, 'Please provide a valid email address.');
          isValid = false;
          firstInvalidField = firstInvalidField || emailField;
        } else {
          clearFieldError(emailField);
        }
      }

      // 3. Phone validation (10 digits required)
      if (phoneField) {
        const rawPhone = phoneField.value.trim();
        const digitsOnly = rawPhone.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
          showFieldError(phoneField, 'Please enter a valid 10-digit phone number.');
          isValid = false;
          firstInvalidField = firstInvalidField || phoneField;
        } else {
          clearFieldError(phoneField);
        }
      }

      // 4. Service selected validation
      if (serviceField) {
        const selectedValue = serviceField.value.trim();
        if (!selectedValue || selectedValue === 'default' || selectedValue === '0') {
          showFieldError(serviceField, 'Please choose a service from the list.');
          isValid = false;
          firstInvalidField = firstInvalidField || serviceField;
        } else {
          clearFieldError(serviceField);
        }
      }

      // If invalid, focus the first problem input
      if (!isValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        showToast('Please correct the highlighted fields before submitting.', 'error');
        return;
      }

      // Submission Success
      showToast('Thank you! Your message has been received. Our team will contact you shortly.', 'success');
      contactForm.reset();

      // Clear any lingering error UI
      [nameField, emailField, phoneField, serviceField].forEach((field) => {
        if (field) clearFieldError(field);
      });
    });
  };

  /**
   * ----------------------------------------------------------------------------
   * 11. ACTIVE NAVIGATION LINK & SCROLLSPY
   * - Highlights current page link across navbar & mobile drawer
   * - On homepage or pages with internal sections, triggers scrollspy
   *   to highlight active section links on scroll
   * ----------------------------------------------------------------------------
   */
  const initActiveNavAndScrollspy = () => {
    const navLinks = Array.from(document.querySelectorAll('.nav-links a, #nav-mobile a'));
    if (!navLinks.length) return;

    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    const isHomePage = currentPath === 'index.html';

    // Helper to activate only matched links and clear all others
    const setActiveLink = (predicate) => {
      navLinks.forEach((link) => {
        if (predicate(link)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    };

    if (!isHomePage) {
      // Non-homepage: highlight page-specific link only
      setActiveLink((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return false;
        const linkFile = href.split('/').pop().split('#')[0];
        return linkFile === currentPath;
      });
      return;
    }

    // Homepage: track sections for scrollspy
    const homeLinks = navLinks.filter((l) => {
      const h = l.getAttribute('href');
      return h === 'index.html' || h === '#hero' || h === '#' || h === '/';
    });

    const servicesLinks = navLinks.filter((l) => l.getAttribute('href') === '#services');
    const coverageLinks = navLinks.filter((l) => l.getAttribute('href') === '#coverage');

    const heroSec = document.querySelector('#hero');
    const servicesSec = document.querySelector('#services');
    const coverageSec = document.querySelector('#coverage');

    const handleScrollspy = () => {
      const scrollPos = window.scrollY + 140; // 140px navbar offset buffer

      const coverageTop = coverageSec ? coverageSec.offsetTop : Infinity;
      const servicesTop = servicesSec ? servicesSec.offsetTop : Infinity;

      if (coverageSec && scrollPos >= coverageTop && coverageLinks.length > 0) {
        setActiveLink((l) => coverageLinks.includes(l));
      } else if (servicesSec && scrollPos >= servicesTop) {
        setActiveLink((l) => servicesLinks.includes(l));
      } else {
        // At top or within hero
        setActiveLink((l) => homeLinks.includes(l));
      }
    };

    window.addEventListener('scroll', handleScrollspy, { passive: true });
    handleScrollspy(); // Run on initial render
  };

  /**
   * ----------------------------------------------------------------------------
   * 12. PARALLAX-LIKE FLOATING CARDS (Hero Section)
   * Translates .hero-card elements slightly based on desktop mouse movements.
   * Only active on desktop screens (width > 768px).
   * Uses requestAnimationFrame for 60fps rendering without jank.
   * ----------------------------------------------------------------------------
   */
  const initHeroParallax = () => {
    const hero = document.querySelector('.hero') || document.querySelector('.hero-section');
    if (!hero) return;

    const cards = hero.querySelectorAll('.hero-card, .floating-card, [data-parallax]');
    if (!cards.length) return;

    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;

    const updateParallax = () => {
      cards.forEach((card, index) => {
        // Vary the depth factor per card for multi-layered 3D depth
        const depth = parseFloat(card.dataset.speed) || (index + 1) * 14;
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;

        card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        card.style.transition = 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.willChange = 'transform';
      });
      rafId = null;
    };

    const onMouseMove = (e) => {
      if (window.innerWidth <= 768) return; // Desktop only

      const rect = hero.getBoundingClientRect();
      // Normalize mouse coordinates from -1 to 1 relative to hero center
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const onMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      cards.forEach((card) => {
        card.style.transform = 'translate3d(0, 0, 0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
  };

  /**
   * ----------------------------------------------------------------------------
   * 13. BACK TO TOP BUTTON
   * Shows a back-to-top button when scrolled past 500px.
   * Smoothly scrolls to top on click.
   * Creates the element programmatically if not already authored in HTML.
   * ----------------------------------------------------------------------------
   */
  const initBackToTop = () => {
    let backToTopBtn = document.querySelector('#back-to-top');

    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'back-to-top';
      backToTopBtn.type = 'button';
      backToTopBtn.setAttribute('aria-label', 'Return to top of page');
      backToTopBtn.setAttribute('title', 'Back to top');
      backToTopBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      document.body.appendChild(backToTopBtn);
    }

    const toggleBackToTopVisibility = () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTopVisibility, { passive: true });
    toggleBackToTopVisibility();

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /**
   * ----------------------------------------------------------------------------
   * INITIALIZE ALL MODULES
   * ----------------------------------------------------------------------------
   */
  initMobileNav();
  initStickyNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initStatCounters();
  initTestimonialCarousel();
  initNewsletterForm();
  initTechnicianIssueForm();
  initContactForm();
  initActiveNavAndScrollspy();
  initHeroParallax();
  initBackToTop();
});
