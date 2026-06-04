import { renderProductCard } from '../components/productcard.js';

const API_URL = '/data.json'; // Chemin vers vos données
const CACHE_KEY = 'cogi_catalogue_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

/**
 * Utilitaire de fetch avec gestion de timeout et retry
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
    const timeout = 5000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (err) {
        if (retries > 0) {
            console.warn(`Retry restant: ${retries}...`);
            return fetchWithRetry(url, options, retries - 1);
        }
        throw err;
    }
}

/**
 * Affiche les skeletons de chargement
 */
function showSkeletons(containerId, count = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const skeletons = Array(count).fill(`
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = skeletons;
}

/**
 * Affiche un message d'erreur élégant dans l'UI
 */
function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="error-container">
            <div class="error-message">
                <i class="fas fa-exclamation-circle error-icon"></i>
                <h3 class="error-title">Oups ! Quelque chose s'est mal passé</h3>
                <p class="error-description">${message}</p>
                <button class="error-button" onclick="location.reload()">Réessayer</button>
            </div>
        </div>
    `;
}

/**
 * Charge les données de la collection avec validation et cache
 */
export async function loadCollectionData(category) {
    const gridId = 'product-grid';
    showSkeletons(gridId);

    try {
        // Gestion du Cache
        const cached = localStorage.getItem(CACHE_KEY);
        const cacheData = cached ? JSON.parse(cached) : null;
        
        let data;
        if (cacheData && (Date.now() - cacheData.timestamp < CACHE_DURATION)) {
            data = cacheData.products;
        } else {
            data = await fetchWithRetry(API_URL);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                products: data
            }));
        }

        // Validation stricte du schéma
        if (!data || !data.catalogue) throw new Error("Format de données invalide");

        const products = category === 'tous' 
            ? Object.values(data.catalogue).flat()
            : data.catalogue[category.toLowerCase()] || [];

        const container = document.getElementById(gridId);
        if (products.length === 0) {
            container.innerHTML = `<p class="error-description">Aucun produit trouvé dans cette catégorie.</p>`;
            return;
        }

        // Rendu sécurisé
        container.innerHTML = products.map(p => renderProductCard(p)).join('');

    } catch (error) {
        console.error("Erreur chargement collection:", error);
        displayError(gridId, "Impossible de charger les produits. Vérifiez votre connexion.");
    }
}

/**
 * Initialise les interactions globales (Sidebar, Scroll, etc.)
 */
export function initSiteInteractions() {
    // Toggle Sidebar
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    const desktopToggle = document.querySelector('.desktop-sidebar-toggle');

    if (toggle) {
        toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }

    // Effet Navbar au scroll (Throttled pour la performance)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScroll < 50) return;
        lastScroll = now;

        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

export async function loadHomeCategoryData() { /* Implémentation similaire à loadCollectionData */ }