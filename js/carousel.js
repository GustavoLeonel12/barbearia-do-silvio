export function initCarousel() {
  const sliderEl = document.querySelector('.portfolio-slider');
  if (!sliderEl) return;

  const swiper = new Swiper('.portfolio-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
      scale: 0.85,
    },
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.portfolio-slider .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.portfolio-slider .swiper-button-next',
      prevEl: '.portfolio-slider .swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
  });
}

