// src/main.js
// Fichier principal de l'application

import { createNavbarHTML, initNavbar } from './components/navbar.js';
import { createFooter } from './components/footer.js';

const app = document.getElementById('app');

/**
 * Initialise la structure fixe de l'application (App Shell)
 */
function initAppShell() {
  app.innerHTML = DOMPurify.sanitize(`
    ${createNavbarHTML()}
    <main id="router-view"></main>
    ${createFooter()}
  `);

  initNavbar();
  setupGlobalEvents();
}

/**
 * Table de routage dynamique utilisant le Lazy Loading natif via Vite
 */
const routes = {
  '/': () => import('./pages/home.js').then(m => m.renderHome),
  '/collection': () => import('./pages/collection.js').then(m => m.renderCollection),
  '/product': () => import('./pages/productdetail.js').then(m => m.renderProductDetails)
};

/**
 * Routeur principal orienté performance et isolation du DOM
 */
const router = async () => {
  const viewContainer = document.getElementById('router-view');
  if (!viewContainer) return;

  const path = window.location.pathname;
  const getRenderFunction = routes[path] || routes['/'];

  try {
    const renderFunction = await getRenderFunction();
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    const productId = urlParams.get('id');

    // Extraction et injection sécurisée du contenu spécifique de la page
    const rawHTML = renderFunction(category || productId);
    viewContainer.innerHTML = DOMPurify.sanitize(rawHTML);

    // Initialisation ciblée des scripts de composants après injection dans le DOM
    const { initSiteInteractions } = await import('./utils/siteInteractions.js');
    initSiteInteractions();

    if (path === '/') {
      const { initHeroCarousel } = await import('./components/herocarousel.js');
      initHeroCarousel('.hero-carousel');
      const { loadHomeCategoryData } = await import('./utils/siteInteractions.js');
      loadHomeCategoryData();
    } else if (path === '/collection') {
      const { loadCollectionData } = await import('./utils/siteInteractions.js');
      loadCollectionData(category);
    } else if (path === '/product') {
      const { loadProductDetailData } = await import('./utils/siteInteractions.js');
      loadProductDetailData(productId);
    }
  } catch (error) {
    console.error("Erreur lors du routage :", error);
    viewContainer.innerHTML = `<p class="error">Une erreur est survenue lors du chargement de la page.</p>`;
  }
};

/**
 * Gestionnaire centralisé des événements (Délégation de clics)
 * Évite l'utilisation de variables globales "window.function"
 */
function setupGlobalEvents() {
  document.body.addEventListener('click', async (e) => {
    // Interception des liens de navigation internes (ex: data-link)
    const localLink = e.target.closest('[data-link]');
    if (localLink) {
      e.preventDefault();
      const href = localLink.getAttribute('href');
      window.history.pushState({}, '', window.location.origin + href);
      router();
      return;
    }

    // Interception des actions de filtres de catégories (ex: data-category)
    const categoryBtn = e.target.closest('[data-category]');
    if (categoryBtn) {
      e.preventDefault();
      const category = categoryBtn.getAttribute('data-category');

      // Gestion de la classe active visuelle
      document.querySelectorAll('[data-category]').forEach(btn => btn.classList.remove('active'));
      categoryBtn.classList.add('active');

      if (window.location.pathname === '/') {
        const { filterHomeCategory } = await import('./utils/siteInteractions.js');
        filterHomeCategory(category);
      } else {
        window.history.pushState({}, '', `/collection?cat=${category.toLowerCase()}`);
        router();
      }
    }
  });
}

// Gestion des boutons de retour/avance du navigateur
window.addEventListener('popstate', router);

// Lancement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  initAppShell();
  router();
});