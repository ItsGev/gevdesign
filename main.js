/* ============================================
   GEV DESIGN — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Navigation Toggle --- */
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Scroll-triggered Fade-in Animations --- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate in
  const animateElements = document.querySelectorAll(
    '.card-section, .my-work-heading, .case-image-block, .case-image-full, .image-row, .image-row--three, ' +
    '.existing-designs-row, .humanize-section, .stats-row, .about-section, ' +
    '.case-content h2, .case-content h3, .case-content h4, .bottom-cta'
  );

  animateElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });


  /* --- Navbar Background on Scroll --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 20) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }


  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* --- Image Lazy Loading Enhancement --- */
  // Add loading="lazy" to images that don't have it
  document.querySelectorAll('img:not([loading])').forEach(img => {
    // Don't lazy-load hero images or nav logo
    if (!img.closest('.hero-bg') && !img.closest('.case-hero') && !img.closest('.nav-logo')) {
      img.setAttribute('loading', 'lazy');
    }
  });

});
