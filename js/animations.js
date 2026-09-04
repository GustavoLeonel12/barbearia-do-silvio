export function initAnimations() {
  // Registra os plugins do GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Hero Animations
  const tl = gsap.timeline();

  tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    skewY: 5
  })
  .from('.hero-desc', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.hero .btn', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.6');

  // Hero Parallax
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Reveal Sections on Scroll
  const sections = gsap.utils.toArray('.section-header, .history-grid, .reviews-grid, .contact-grid, .cta-mid-card');
  
  sections.forEach((sec) => {
    gsap.from(sec, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Animate Stat Numbers
  const stats = gsap.utils.toArray('.stat-number');
  stats.forEach(stat => {
    // Para simplificar no vanilla sem biblioteca adicional, 
    // faremos um reveal simples. Uma lib como countUp seria ideal para o contador.
    gsap.from(stat, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%'
      }
    });
  });
}
