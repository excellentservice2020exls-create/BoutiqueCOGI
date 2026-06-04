import productsData from '../data/data-product.json';
import socialData from '../data/data-social.json';
import { renderProductCard } from '../components/productcard.js';

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

let fadeObserver;
let isSiteInteractionsInitialized = false;
let allProductsCache = [];

const socialDataConfig = socialData?.reseauxSociaux || {};

export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

export function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeHTML(html) {
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(html);
    }
    return html;
}

function normalizeCategory(category) {
    if (!category) return 'Femme';
    const key = category.toString().trim().toLowerCase();
    const mapping = {
        femme: 'Femme',
        homme: 'Homme',
        enfant: 'Enfant',
        chaussure: 'chaussure',
        sac: 'sac',
        accessoire: 'accessoire'
    };
    return mapping[key] || 'Femme';
}

function getCurrentCategory() {
    const params = new URLSearchParams(window.location.search);
    return normalizeCategory(params.get('cat'));
}

function updateActiveLink() {
    const scrollPos = window.pageYOffset + 150;
    const allSections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function initScrollReveal() {
    const boutiqueCards = document.querySelectorAll('.boutique-card');
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    if (fadeObserver) {
        fadeObserver.disconnect();
    }

    fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const siblings = Array.from(el.parentElement?.children || []);
                const elIndex = Math.max(0, siblings.indexOf(el));
                setTimeout(() => {
                    el.classList.add('visible');
                }, elIndex * 120);
                fadeObserver.unobserve(el);
            }
        });
    }, observerOptions);

    boutiqueCards.forEach(card => fadeObserver.observe(card));
    fadeInElements.forEach(el => fadeObserver.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            }
        });
    });
}

function initHeroParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const handleHeroParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const heroElement = document.querySelector('.hero');
        if (!heroElement) return;
        const heroHeight = heroElement.offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight);
            const translateY = scrolled * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    }, 50);

    window.addEventListener('scroll', handleHeroParallax, { passive: true });
}

function initBoutiqueCardHover() {
    document.querySelectorAll('.boutique-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

function initBackToTop() {
    const logoAnimated = document.getElementById('logo-animated');
    if (!logoAnimated) return;
    logoAnimated.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function initSidebarInteractions() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const submenuItems = document.querySelectorAll('.sidebar-item.has-submenu');

    if (sidebar && window.innerWidth > 992) {
        sidebar.addEventListener('mouseenter', () => {
            document.body.classList.remove('sidebar-collapsed');
        });
        sidebar.addEventListener('mouseleave', () => {
            document.body.classList.add('sidebar-collapsed');
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar?.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    const desktopToggle = document.getElementById('desktop-sidebar-toggle');
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
            if (document.body.classList.contains('sidebar-collapsed')) {
                submenuItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    submenuItems.forEach(item => {
        const link = item.querySelector('.sidebar-link');
        if (!link) return;
        link.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            submenuItems.forEach(other => {
                if (other !== item) other.classList.remove('open');
            });
            item.classList.toggle('open', !isOpen);
        });
    });

    document.querySelectorAll('.sidebar-submenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
}

function attachGlobalListeners() {
    if (isSiteInteractionsInitialized) return;

    const throttledNavbarScroll = throttle(handleNavbarScroll, 50);
    const throttledActiveLink = throttle(updateActiveLink, 100);
    const debouncedResize = debounce(() => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    }, 150);

    window.addEventListener('scroll', throttledNavbarScroll, { passive: true });
    window.addEventListener('scroll', throttledActiveLink, { passive: true });
    window.addEventListener('resize', debouncedResize);

    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('[data-social]');
        if (!target) return;
        e.preventDefault();
        const network = target.getAttribute('data-social');
        const customMessage = target.getAttribute('data-message') || '';
        const decoded = socialDataConfig[network] ? atob(socialDataConfig[network]) : null;
        if (!decoded) return;

        let finalUrl = '';
        if (network === 'whatsapp') {
            const textParam = customMessage ? `?text=${encodeURIComponent(customMessage)}` : '';
            finalUrl = `https://wa.me/${decoded.replace('+', '')}${textParam}`;
        } else if (network === 'facebook') {
            finalUrl = `https://facebook.com/${decoded}`;
        } else if (network === 'telegram') {
            finalUrl = `https://t.me/${decoded}`;
        } else if (network === 'tiktok') {
            finalUrl = `https://tiktok.com/${decoded}`;
        } else if (network === 'instagram') {
            finalUrl = `https://instagram.com/${decoded}`;
        }

        if (finalUrl) {
            window.open(finalUrl, '_blank');
        }
    });

    isSiteInteractionsInitialized = true;
}

/**
 * Gère l'affichage exclusif des sections sur la page d'accueil
 * @param {string} categoryKey - La clé de la catégorie ou 'tous'
 */
export function filterHomeCategory(categoryKey) {
    const sections = {
        'tous': 'catalogue-tous',
        'Femme': 'catalogue-femme',
        'Homme': 'catalogue-homme',
        'Enfant': 'catalogue-enfant',
        'chaussure': 'catalogue-chaussure',
        'sac': 'catalogue-sac',
        'accessoire': 'catalogue-accessoire'
    };

    Object.entries(sections).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (key === categoryKey) {
            el.classList.remove('hidden-section');
            if (key !== 'tous') {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            el.classList.add('hidden-section');
        }
    });
    
    // Réinitialise l'observateur pour les éléments nouvellement affichés
    initScrollReveal();
}

function initSearchFilter() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        const filteredProducts = allProductsCache.filter(p => 
            (p.nom && p.nom.toLowerCase().includes(query)) || 
            (p.id && p.id.toString().includes(query))
        );
        afficherProduits(filteredProducts, 'grid-habit-tous');
    }, 300));
}

function afficherProduits(produits, conteneurId) {
    const conteneur = document.getElementById(conteneurId);
    if (!conteneur) return;

    if (!Array.isArray(produits) || produits.length === 0) {
        conteneur.innerHTML = `<p style="text-align:center; width:100%; color:var(--text-secondary);">Aucun produit trouvé pour cette catégorie.</p>`;
        return;
    }

    const html = produits.map(produit => renderProductCard({
        id: sanitizeText(produit.id),
        name: sanitizeText(produit.nom),
        price: sanitizeText(produit.prix),
        image: sanitizeText(produit.image),
    })).join('');

    conteneur.innerHTML = sanitizeHTML(html);
    initScrollReveal();
}

export function loadCollectionData(category = null) {
    const key = category ? normalizeCategory(category) : getCurrentCategory();
    const produits = productsData?.catalogue?.[key] || [];
    afficherProduits(produits, 'product-grid');
}

export function loadHomeCategoryData() {
    // 1. On récupère d'abord TOUS les produits uniques de toutes les catégories du JSON
    const allProductsMap = new Map();
    if (productsData?.catalogue) {
        Object.values(productsData.catalogue).forEach(produitsCategorie => {
            if (Array.isArray(produitsCategorie)) {
                produitsCategorie.forEach(produit => {
                    // On utilise l'ID comme clé pour éviter d'afficher deux fois le même produit 
                    // s'il est présent dans plusieurs catégories.
                    if (produit.id && !allProductsMap.has(produit.id)) {
                        allProductsMap.set(produit.id, produit);
                    }
                });
            }
        });
    }
    allProductsCache = Array.from(allProductsMap.values());
    afficherProduits(allProductsCache, 'grid-habit-tous');

    const categorySections = [
        { key: 'Femme', containerId: 'grid-habit-femme' },
        { key: 'Homme', containerId: 'grid-habit-homme' },
        { key: 'Enfant', containerId: 'grid-habit-enfant' },
        { key: 'chaussure', containerId: 'grid-habit-chaussure' },
        { key: 'sac', containerId: 'grid-habit-sac' },
        { key: 'accessoire', containerId: 'grid-habit-accessoire' }
    ];

    categorySections.forEach(({ key, containerId }) => {
        const produits = productsData?.catalogue?.[key] || [];
        afficherProduits(produits, containerId);
    });

    // Par défaut : Afficher uniquement "Toute la collection"
    filterHomeCategory('tous');
}

export function initSiteInteractions() {
    attachGlobalListeners();
    initSidebarInteractions();
    initSmoothScroll();
    initScrollReveal();
    initBoutiqueCardHover();
    initHeroParallax();
    initBackToTop();
    initSearchFilter();
}
