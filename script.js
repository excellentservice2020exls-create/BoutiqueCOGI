/* ============================================
   BOUTIQUE COGI — Core Engine (V2.1)
   Propulsion : Vanilla JS / Robustesse & Performance
   ============================================ */

/**
 * 1. CONFIGURATION & ÉTAT GLOBAL
 */
const CONFIG = {
    FILES: {
        PRODUCTS: 'data-product.json',
        SOCIAL: 'data-social.json'
    },
    CACHE: {
        KEY_PRODUCTS: 'cogi_cache_products',
        KEY_SOCIAL: 'cogi_cache_social',
        TTL: 86400000 // 24 heures
    },
    FETCH: {
        RETRY_COUNT: 3,
        TIMEOUT: 5000
    }
};

// Cache des références DOM pour éviter les recherches répétées
const DOM = {
    grids: {},
    navbar: null,
    sidebar: null,
    sidebarToggle: null,
    overlay: null
};

// Stockage local des données sociales (décodées à la demande)
let socialRegistry = {};
let fadeObserver = null;

/**
 * 2. UTILITAIRES DE PERFORMANCE & SÉCURITÉ
 */
const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn(...args);
        }
    };
};

const sanitize = (text) => DOMPurify.sanitize(text) || '';

/**
 * 3. VALIDATION DE SCHÉMA (Robustesse)
 */
function validateSchema(data, type) {
    if (type === 'social') {
        return !!data?.reseauxSociaux;
    }
    if (type === 'product') {
        const hasCatalogue = !!data?.catalogue;
        if (!hasCatalogue) return false;
        
        // Vérification profonde d'un échantillon pour la performance
        const categories = Object.keys(data.catalogue);
        return categories.every(cat => Array.isArray(data.catalogue[cat]));
    }
    return false;
}

/**
 * 4. GESTION DU CACHE (LocalStorage)
 */
function saveToCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({
            val: data,
            exp: Date.now() + CONFIG.CACHE.TTL
        }));
    } catch (e) { console.warn("Cache désactivé : ", e); }
}

function loadFromCache(key) {
    try {
        const cached = JSON.parse(localStorage.getItem(key));
        if (cached && Date.now() < cached.exp) return cached.val;
    } catch (e) { return null; }
    return null;
}

/**
 * 5. MOTEUR DE RENDU (Optimisation CLS & GPU)
 */
function renderProductGrid(products, gridId) {
    const container = DOM.grids[gridId] || document.getElementById(`grid-${gridId}`);
    if (!container) return;

    if (!products || products.length === 0) {
        container.innerHTML = '<p class="empty-msg">Nouveautés en cours d\'arrivage...</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    products.forEach(item => {
        const card = document.createElement('article');
        card.className = 'product-card fade-in-up';
        
        // Construction sécurisée (Anti-XSS & Anti-CLS)
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${sanitize(item.image)}" 
                     alt="${sanitize(item.nom)}" 
                     width="300" height="400" 
                     loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${sanitize(item.nom)}</h3>
                <div class="product-badges">
                    <span class="badge"><i class="fas fa-tag"></i> ${sanitize(item.taille)}</span>
                    <span class="badge"><i class="fas fa-palette"></i> ${sanitize(item.couleur)}</span>
                </div>
                <p class="product-price">${sanitize(item.prix)}</p>
                <button class="btn-buy" 
                        data-action="order" 
                        data-id="${item.id}" 
                        data-name="${sanitize(item.nom)}">
                    <i class="fab fa-whatsapp"></i> Commander
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    // Activer l'observation pour l'animation d'entrée
    container.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));
}

/**
 * 6. LOGIQUE D'INITIALISATION (Parallélisme)
 */
async function bootApp() {
    // 1. Mise en cache des sélecteurs critiques
    DOM.navbar = document.getElementById('navbar');
    DOM.sidebar = document.getElementById('sidebar');
    DOM.overlay = document.getElementById('sidebar-overlay');
    DOM.sidebarToggle = document.getElementById('sidebar-toggle');
    
    // Mappage automatique des grilles
    ['habitFemme', 'habitHomme', 'habitEnfant', 'accessoire'].forEach(id => {
        DOM.grids[id] = document.getElementById(`grid-${id}`);
    });

    // 2. Initialisation de l'observateur d'animation
    fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // 3. Récupération des données (Parallèle)
    try {
        let pData = loadFromCache(CONFIG.CACHE.KEY_PRODUCTS);
        let sData = loadFromCache(CONFIG.CACHE.KEY_SOCIAL);

        if (!pData || !sData) {
            const [pRes, sRes] = await Promise.all([
                fetch(CONFIG.FILES.PRODUCTS),
                fetch(CONFIG.FILES.SOCIAL)
            ]);

            if (!pRes.ok || !sRes.ok) throw new Error("Erreur de chargement des fichiers JSON.");

            pData = await pRes.json();
            sData = await sRes.json();

            if (validateSchema(pData, 'product') && validateSchema(sData, 'social')) {
                saveToCache(CONFIG.CACHE.KEY_PRODUCTS, pData);
                saveToCache(CONFIG.CACHE.KEY_SOCIAL, sData);
            }
        }

        // 4. Injection des données sociales
        socialRegistry = sData.reseauxSociaux;

        // 5. Rendu du catalogue
        Object.keys(pData.catalogue).forEach(category => {
            renderProductGrid(pData.catalogue[category], category);
        });

    } catch (error) {
        console.error("Échec de l'initialisation Boutique COGI :", error);
        // Optionnel : Afficher un message d'erreur UI ici
    }
}

/**
 * 7. GESTION DES ÉVÉNEMENTS (Délégation pour la Performance)
 */
document.addEventListener('DOMContentLoaded', bootApp);

// Gestion unique des clics (Navigation & Commandes)
document.addEventListener('click', (e) => {
    const target = e.target;

    // Toggle Sidebar
    if (target.closest('#sidebar-toggle') || target.closest('#sidebar-close') || target === DOM.overlay) {
        const isOpen = DOM.sidebar.classList.toggle('active');
        DOM.overlay.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Commande WhatsApp
    const buyBtn = target.closest('[data-action="order"]');
    if (buyBtn && socialRegistry.whatsapp) {
        const name = buyBtn.dataset.name;
        const id = buyBtn.dataset.id;
        const phone = atob(socialRegistry.whatsapp).replace('+', '');
        const message = encodeURIComponent(`Bonjour Boutique COGI, je souhaite commander l'article : ${name} (Réf: ${id})`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }

    // Réseaux Sociaux (Générique)
    const socialBtn = target.closest('[data-social]');
    if (socialBtn) {
        const network = socialBtn.dataset.social;
        if (socialRegistry[network]) {
            const decoded = atob(socialRegistry[network]);
            const url = network === 'facebook' ? `https://facebook.com/${decoded}` : `https://instagram.com/${decoded}`;
            window.open(url, '_blank');
        }
    }
});

// Optimisation du scroll Navbar
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 50) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }
}, 100));