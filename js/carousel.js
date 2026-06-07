export function initCarousel() {
  const sliderEl = document.querySelector('.portfolio-slider');
  if (!sliderEl) return;

  const totalSlides = 7;
  let manualIndex = 2; // Começa no initialSlide (2 = Imagem 3)
  let isAnimating = false;

  const swiper = new Swiper('.portfolio-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    initialSlide: manualIndex,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 2,
      slideShadows: false,
      scale: 0.85, // Aplicando a escala nativamente no Swiper (evita conflito com CSS)
    },
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.portfolio-slider .swiper-pagination',
      clickable: true,
    },
    // Removido 'navigation' nativo intencionalmente para usar a lógica customizada abaixo
    keyboard: {
      enabled: true,
    },
  });

  // ==========================================
  // CONTROLE CUSTOMIZADO (Aritmética Modular)
  // ==========================================
  const nextBtn = document.querySelector('.portfolio-slider .swiper-button-next');
  const prevBtn = document.querySelector('.portfolio-slider .swiper-button-prev');

  function resetAutoplay() {
    if (swiper.autoplay && swiper.autoplay.running) {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  }

  function logState(source) {
    // Aritmética modular para exibição (1 a 7)
    const displayIndex = (swiper.realIndex % totalSlides) + 1;
    console.log(`[Carousel Log - ${source}] Índice exibido: ${displayIndex}`);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return; // Trava anti-spam: previne múltiplos eventos simultâneos
      
      // Aritmética modular: calcula exatamente 1 avanço
      manualIndex = (swiper.realIndex + 1) % totalSlides;
      
      swiper.slideToLoop(manualIndex, 800);
      resetAutoplay();
      logState('Navegação Next');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return; // Trava anti-spam
      
      // Aritmética modular: calcula exatamente 1 recuo evitando números negativos
      manualIndex = (swiper.realIndex - 1 + totalSlides) % totalSlides;
      
      swiper.slideToLoop(manualIndex, 800);
      resetAutoplay();
      logState('Navegação Prev');
    });
  }

  // Sincroniza trava de animação para impedir cliques encavalados
  swiper.on('transitionStart', () => { isAnimating = true; });
  swiper.on('transitionEnd', () => { isAnimating = false; });

  // Sincroniza alterações via Autoplay ou Touch (Swipe)
  swiper.on('slideChange', () => {
    manualIndex = swiper.realIndex;
    logState('Autoplay / Touch');
  });
}
