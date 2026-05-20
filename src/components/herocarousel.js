// src/components/herocarousel.js
export function createHeroCarouselHTML(slides) {
    if (!Array.isArray(slides) || slides.length === 0) return '';

    const slidesHTML = slides.map((slide, idx) => `
        <div class="slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
            ${slide.type === 'video' 
                ? `<video muted loop preload="metadata" playsinline class="carousel-video"><source src="${slide.src}" type="video/mp4"></video>`
                : `<img src="${slide.src}" loading="${idx === 0 ? 'eager' : 'lazy'}" alt="Collection COGI">`
            }
        </div>
    `).join('');

    return `
    <section id="hero" class="hero-carousel" aria-label="Vitrine Principale">
        <div class="carousel-track">${slidesHTML}</div>
        <div class="dots"></div>
        <button class="nav-btn prev" aria-label="Précédent">❮</button>
        <button class="nav-btn next" aria-label="Suivant">❯</button>
    </section>
    `;
}

export function initHeroCarousel(selector) {
    const carousel = document.querySelector(selector);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.nav-btn.prev');
    const nextBtn = carousel.querySelector('.nav-btn.next');
    let currentIndex = 0;
    let intervalId = null;

    const changeSlide = (nextIndex) => {
        slides[currentIndex].classList.remove('active');
        const oldVideo = slides[currentIndex].querySelector('video');
        if (oldVideo) oldVideo.pause();

        currentIndex = (nextIndex + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');

        const newVideo = slides[currentIndex].querySelector('video');
        if (newVideo) newVideo.play().catch(() => {});
    };

    const startAutoplay = () => {
        stopAutoplay();
        intervalId = setInterval(() => changeSlide(currentIndex + 1), 5000);
    };

    const stopAutoplay = () => {
        if (intervalId) clearInterval(intervalId);
    };

    prevBtn?.addEventListener('click', () => { changeSlide(currentIndex - 1); startAutoplay(); });
    nextBtn?.addEventListener('click', () => { changeSlide(currentIndex + 1); startAutoplay(); });

    // Contrôle de lecture intelligent selon la visibilité du composant
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const currentVideo = slides[currentIndex].querySelector('video');
            if (entry.isIntersecting) {
                startAutoplay();
                if (currentVideo) currentVideo.play().catch(() => {});
            } else {
                stopAutoplay();
                if (currentVideo) currentVideo.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(carousel);
}