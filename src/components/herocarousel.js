/**
 * Gère le carrousel en hero section (vidéos + images)
 * Utilisation :
 *   import { createHeroCarouselHTML, initHeroCarousel } from './HeroCarousel.js';
 */

/**
 * Génère le HTML du carrousel à partir d'un tableau de slides.
 * @param {Array} slides - Chaque élément : { type: 'video'|'image', src: 'chemin' }
 * @returns {string}
 */
export function createHeroCarouselHTML(slides) {
  const slidesHTML = slides
    .map(slide => {
      if (slide.type === 'video') {
        return `
          <div class="slide">
            <video muted preload="metadata" playsinline>
              <source src="${slide.src}" type="video/mp4" />
            </video>
          </div>
        `;
      }
      // Image par défaut
      return `
        <div class="slide">
          <img src="${slide.src}" loading="lazy" alt="" />
        </div>
      `;
    })
    .join('');

  return `
    <section class="hero-carousel" aria-label="Hero Carousel">
      <div class="carousel-track">
        ${slidesHTML}
      </div>
      <button class="nav prev" aria-label="Previous slide">❮</button>
      <button class="nav next" aria-label="Next slide">❯</button>
      <div class="dots"></div>
    </section>
  `;
}

/**
 * Initialise le comportement du carrousel (navigation, autoplay, swipe, vidéos).
 * @param {string} selector - Sélecteur CSS de l'élément .hero-carousel
 */
export function initHeroCarousel(selector = '.hero-carousel') {
  const carousel = document.querySelector(selector);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.dots');

  if (!track || slides.length === 0) return;

  let index = 0;
  let interval;
  let startX = 0;
  let isHovering = false;

  // Création des dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = [...dotsContainer.children];

  function updateDots() {
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function goToSlide(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    handleVideos();
    updateDots();
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(() => goToSlide(index + 1), 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  // Gestion des vidéos : lecture seulement pour la slide active
  function handleVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (video) {
        i === index ? video.play() : video.pause();
      }
    });
  }

  // IntersectionObserver optionnel pour optimiser la lecture quand le carrousel est visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (!video) return;
        if (entry.isIntersecting) {
          // Si la slide contient la vidéo active, on la joue
          if (slides.indexOf(entry.target) === index) {
            video.play();
          }
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.6 }
  );
  slides.forEach(slide => observer.observe(slide));

  // Navigation manuelle
  prevBtn?.addEventListener('click', () => {
    goToSlide(index - 1);
    stopAuto();
    startAuto(); // relance l'autoplay après un clic
  });

  nextBtn?.addEventListener('click', () => {
    goToSlide(index + 1);
    stopAuto();
    startAuto();
  });

  // Pause au survol
  track.addEventListener('mouseenter', () => {
    isHovering = true;
    stopAuto();
  });
  track.addEventListener('mouseleave', () => {
    isHovering = false;
    startAuto();
  });

  // Swipe tactile mobile
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) goToSlide(index - 1);
    if (diff < -50) goToSlide(index + 1);
  });

  // Lancement
  goToSlide(0);
  startAuto();
}