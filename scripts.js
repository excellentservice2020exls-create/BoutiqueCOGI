/* ============================================
   BOUTIQUE COGI — JavaScript (V2 - High Performance)
   ============================================ */

/**
 * 1. CONFIGURATION ET CACHE DU DOM
 * Centralisation pour éviter les accès répétitifs coûteux au DOM.
 */
const DOM = {
    navbar: null,
    sidebar: null,
    sidebarToggle: null,
    sidebarOverlay: null,
    submenuItems: [],
    allSections: [],
    grids: {
        habitFemme: null,
        habitHomme: null,
        habitEnfant: null,
        chaussure: null,
        sac: null,
        accessoire: null
    }
};

const DATA_CONFIG = {
    JSON_URL: 'data-product.json',
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    CACHE_TTL: 86400000, // 24h
    CACHE_KEY: 'boutique_cogi_data',
    TIMEOUT: 5000
};

let socialDataConfig = {};
let fadeObserver;

/**
 * 2. UTILITAIRES DE PERFORMANCE
 */
const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
};

/**
 * 3. VALIDATION DE SCHÉMA RIGOUREUSE
 * Vérifie non seulement la structure mais l'intégrité des objets produits.
 */
function validateBoutiqueData(data) {
    if (!data?.reseauxSociaux || !data?.catalogue) {
        throw new Error('Structure JSON incomplète.');
    }

    const categories = Object.keys(data.catalogue);
    const requiredProps = ['id', 'nom', 'prix', 'image', 'taille', 'couleur'];

    categories.forEach(cat => {
        if (!Array.isArray(data.catalogue[cat])) {
            throw new Error(`La catégorie ${cat} doit être un tableau.`);
        }
        data.catalogue[cat].forEach((item, index) => {
            requiredProps.forEach(prop => {
                if (!(prop in item)) {
                    throw new Error(`Produit invalide dans ${cat} à l'index ${index} : propriété '${prop}' manquante.`);
                }
            });
        });
    });
    return true;
}

/**
 * 4. GESTION DU STOCKAGE (LocalStorage avec Try/Catch)
 */
function getCachedData() {
    try {
        const cached = localStorage.getItem(DATA_CONFIG.CACHE_KEY);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        return (Date.now() - timestamp < DATA_CONFIG.CACHE_TTL) ? data : null;
    } catch {
        return null;
    }
}

function setCachedData(data) {
    try {
        localStorage.setItem(DATA_CONFIG.CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Quota LocalStorage dépassé ou désactivé.');
    }
}

/**
 * 5. MOTEUR DE RENDU (Optimisation CLS & Fragments)
 */
function renderProducts(products, containerId) {
    const container = DOM.grids[containerId] || document.getElementById(containerId);
    if (!container) return;

    if (!products.length) {
        container.innerHTML = `<p class="empty-msg">Nouveaux articles bientôt disponibles...</p>`;
        return;
    }

    // Utilisation d'un DocumentFragment pour minimiser les reflows
    const fragment = document.createDocumentFragment();
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in-up';
        
        // Sécurisation et dimensions fixes (Anti-CLS)
        const sanitizedNom = DOMPurify.sanitize(p.nom);
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${DOMPurify.sanitize(p.image)}" 
                     alt="${sanitizedNom}" 
                     width="300" height="400" 
                     loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${sanitizedNom}</h3>
                <div class="product-badges">
                    <span class="badge"><i class="fas fa-ruler"></i> ${DOMPurify.sanitize(p.taille)}</span>
                    <span class="badge"><i class="fas fa-palette"></i> ${DOMPurify.sanitize(p.couleur)}</span>
                </div>
                <p class="product-price">${DOMPurify.sanitize(p.prix)}</p>
                <button class="btn-buy" data-social="whatsapp" data-msg="Cmd: ${sanitizedNom} (${p.id})">
                    <i class="fab fa-whatsapp"></i> Commander
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    // Ré-observer les nouveaux éléments
    container.querySelectorAll('.fade-in-up').forEach(el => fadeObserver?.observe(el));
}

/**
 * 6. INITIALISATION ET GESTIONNAIRES D'ÉVÉNEMENTS
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Cache des références DOM
    DOM.navbar = document.getElementById('navbar');
    DOM.sidebar = document.getElementById('sidebar');
    DOM.grids.habitFemme = document.getElementById('grid-habit-femme');
    // ... initialiser les autres références ici
    
    // Init IntersectionObserver
    fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    // Chargement des données
    try {
        let data = getCachedData();
        if (!data) {
            const response = await fetch(DATA_CONFIG.JSON_URL);
            if (!response.ok) throw new Error('Erreur réseau');
            data = await response.json();
            validateBoutiqueData(data);
            setCachedData(data);
        }

        socialDataConfig = data.reseauxSociaux;
        
        // Rendu parallèle
        Object.keys(data.catalogue).forEach(cat => {
            // Mapping catégorie JSON -> ID Grille DOM
            const gridMap = {
                habitFemme: 'habitFemme',
                habitHomme: 'habitHomme',
                habitEnfant: 'habitEnfant'
                // ...
            };
            if (gridMap[cat]) renderProducts(data.catalogue[cat], gridMap[cat]);
        });

    } catch (err) {
        console.error('Initialisation échouée:', err);
    }
});

// Event Delegation pour les réseaux sociaux (Performance)
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-social]');
    if (!btn) return;

    const network = btn.dataset.social;
    const msg = btn.dataset.msg;
    
    if (socialDataConfig[network]) {
        const phone = atob(socialDataConfig[network]).replace('+', '');
        const url = network === 'whatsapp' 
            ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
            : `https://${network}.com/${phone}`;
        window.open(url, '_blank');
    }
});