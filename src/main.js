import { renderHome } from './pages/Home.js';
import { initNavbar } from './components/Navbar.js';
import { initHeroCarousel } from './components/HeroCarousel.js';
import productsData from './data/products.json';
import socialData from './data/social.json';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = renderHome(productsData, socialData);

  // Initialisations après le rendu du DOM
  initNavbar();
  initHeroCarousel('.hero-carousel');

  // Scroll reveal déjà géré si tu utilises l’observer dans un module
  // Tu peux l’initialiser ici
});