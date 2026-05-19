import { createNavbar } from '../components/Navbar.js';
import { createHeroCarousel } from '../components/HeroCarousel.js';
import { renderProductGrid } from '../components/ProductCard.js';
import { createFooter } from '../components/Footer.js';

export function renderHome(productsData, socialData) {
  // Utilise les données importées pour générer les grilles
  const slides = [
    { type: 'video', src: '/videos/video1.mp4' },
    { type: 'image', src: '/images/pict01.jpeg' },
    // ...
  ];

  return `
    ${createNavbar()}
    <div class="main-wrapper" id="main-wrapper">
      ${createHeroCarousel(slides)}
      <main class="main-content">
        <!-- bannière marquee, sections boutique, catalogues… -->
      </main>
      ${createFooter()}
    </div>
  `;
}