// src/main.js
// Importation des fonctions de rendu pour chaque page

import { renderHome } from './pages/home.js';
import { renderCollection } from './pages/collection.js';
import { renderProductDetails } from './pages/productdetail.js';
import { initNavbar } from './components/navbar.js';
import { initHeroCarousel } from './components/herocarousel.js';
import { initSiteInteractions, loadCollectionData, loadHomeCategoryData } from './utils/siteInteractions.js';

const app = document.getElementById('app');

// Définition stricte des routes
const routes = {
    '/': renderHome,
    '/collection': renderCollection,
    '/product': renderProductDetails,
};

// Routeur performant basé sur l'API History
const router = async () => {
    const path = window.location.pathname;
    const renderFunction = routes[path] || routes['/'];
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');

    app.innerHTML = renderFunction(category);
    initNavbar();
    initSiteInteractions();

    if (path === '/') {
        initHeroCarousel('.hero-carousel');
        loadHomeCategoryData();
    }

    if (path === '/collection') {
        loadCollectionData(category);
    }
};

// Navigation sans rechargement de page
window.navigate = (pathname) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    router();
};

// Écouteurs d'événements pour le cycle de vie du routeur
window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);