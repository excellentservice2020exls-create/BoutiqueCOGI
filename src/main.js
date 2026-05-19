// scr/main.js
// Importation des fonctions de rendu pour chaque page

import { renderHome } from './pages/Home.js';
import { renderCollection } from './pages/Collection.js';
import { renderProductDetails } from './pages/ProductDetails.js';
import { initNavbar } from './components/navbar.js';
// Importer tes données simulées
// import productsData from './data/products.json'; 

const app = document.getElementById('app');

// Définition stricte des routes
const routes = {
    '/': renderHome,
    '/collection': renderCollection,
    '/product': renderProductDetails,
};

// Routeur performant basé sur l'API History
const router = async () => {
    // Nettoyage de l'URL pour gérer les paramètres (ex: /product?id=123)
    const path = window.location.pathname;
    const renderFunction = routes[path] || routes['/'];
    
    // Injection sécurisée avec DOMPurify si des données externes sont utilisées
    app.innerHTML = renderFunction(); 
    
    // Réinitialisation du DOM (EventListeners) après chaque rendu
    initNavbar();
    
    // Si nous sommes sur la page d'accueil, initier le carrousel
    if (path === '/') {
        const { initHeroCarousel } = await import('./components/herocarousel.js');
        initHeroCarousel('.hero-carousel');
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