/* ============================================
   GEV DESIGN — Main JavaScript
   Apple-style staggered scroll animations
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

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }


  /* --- Staggered Scroll Animations --- */
  
  // 1. "My Work" heading — simple fade up
  document.querySelectorAll('.my-work-heading, .scroll-arrow').forEach(el => {
    el.classList.add('anim');
  });

  // 2. Card sections — the card itself animates, then children stagger
  document.querySelectorAll('.card-section').forEach(card => {
    // Card container animates up
    card.classList.add('anim');

    // Find children to stagger inside work sections
    const image = card.querySelector('.work-section-image');
    const text = card.querySelector('.work-section-text');
    
    if (image) {
      image.classList.add('anim', 'anim-delay-1');
    }
    if (text) {
      text.classList.add('anim', 'anim-delay-2');
    }

    // Humanize section children
    const humanizeH2 = card.querySelector('.humanize-section h2');
    const humanizePs = card.querySelectorAll('.humanize-section p');
    const humanizeImg = card.querySelector('.humanize-section img');
    
    if (humanizeH2) {
      humanizeH2.classList.add('anim', 'anim-delay-1');
    }
    if (humanizeImg) {
      humanizeImg.classList.add('anim', 'anim-delay-2');
    }
    humanizePs.forEach((p, i) => {
      p.classList.add('anim', i === 0 ? 'anim-delay-1' : 'anim-delay-3');
    });

    // Bottom CTA children
    const ctaH2 = card.querySelector('.bottom-cta h2');
    const ctaBtn = card.querySelector('.bottom-cta .btn-primary');
    
    if (ctaH2) {
      ctaH2.classList.add('anim', 'anim-delay-1');
    }
    if (ctaBtn) {
      ctaBtn.classList.add('anim', 'anim-delay-2');
    }
  });

  // 3. Set up Intersection Observer
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  };

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // When a card becomes visible, also trigger its children
        if (entry.target.classList.contains('card-section')) {
          entry.target.querySelectorAll('.anim').forEach(child => {
            child.classList.add('is-visible');
          });
        }

        animObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all top-level animated elements
  document.querySelectorAll('.my-work-heading.anim, .scroll-arrow.anim, .card-section.anim').forEach(el => {
    animObserver.observe(el);
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


  /* --- Image Lazy Loading --- */
  document.querySelectorAll('img:not([loading])').forEach(img => {
    if (!img.closest('.hero-bg') && !img.closest('.case-hero') && !img.closest('.nav-logo')) {
      img.setAttribute('loading', 'lazy');
    }
  });

});
