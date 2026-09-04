import { initAnimations } from './animations.js';
import { initCarousel } from './carousel.js';
import { initChatbot } from './chat.js';
import { initMapStyles } from './map.js';
import { HERO_IMAGE } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Define a imagem de fundo do Hero dinamicamente
  const heroImg = document.querySelector('.hero-bg img');
  if (heroImg && HERO_IMAGE) {
    heroImg.src = HERO_IMAGE;
  }

  // Inicializa o Scroll Suave (Lenis)
  const lenis = new Lenis({
    duration: 0.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);



  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Remove Loading Screen
  const loader = document.querySelector('.loader');
  const loaderLogo = document.querySelector('.loader-logo');
  const loaderLine = document.querySelector('.loader-line');

  gsap.to(loaderLogo, { opacity: 1, duration: 1, delay: 0.5 });
  gsap.to(loaderLine, { x: '0%', duration: 1.5, delay: 0.5, ease: 'power2.inOut' });
  
  gsap.to(loader, {
    y: '-100%',
    duration: 1,
    delay: 2.5,
    ease: 'power3.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      // Inicia as animações principais após o loading
      initAnimations();
    }
  });

  // Inicia os outros módulos
  initCarousel();
  initChatbot();
  initMapStyles();
});

