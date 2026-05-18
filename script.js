/* ============================================
   BOUTIQUE COGI — JavaScript
   Interactions, animations & navigation
   ============================================ */

// ===== UTILITAIRES (T2.1 - Throttle/Debounce) =====
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// 1. Déclaration GLOBALE de l'observateur pour le rendre accessible aux données injectées
let fadeObserver;
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};
document.addEventListener('DOMContentLoaded', () => {

    /* ---- Element References ---- */
    const navbar        = document.getElementById('navbar');
    const sidebar       = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay= document.getElementById('sidebar-overlay');
    const mainWrapper   = document.getElementById('main-wrapper');
    const sidebarLinks  = document.querySelectorAll('.sidebar-link');
    const submenuItems  = document.querySelectorAll('.sidebar-item.has-submenu');
    const boutiqueCards = document.querySelectorAll('.boutique-card');
    const allSections   = document.querySelectorAll('section[id]');

/* ============================================\n       OUVERTURE AU SURVOL (HOVER) - DESKTOP\n       ============================================ */
    sidebar.addEventListener('mouseenter', () => {
        // On ne l'applique que sur les écrans d'ordinateur (ex: plus de 992px)
        // pour ne pas créer de bugs sur la version mobile tactille
        if (window.innerWidth > 992) {
            document.body.classList.remove('sidebar-collapsed');
        }
    });

    sidebar.addEventListener('mouseleave', () => {
        // On réduit le menu dès que la souris le quitte
        if (window.innerWidth > 992) {
            document.body.classList.add('sidebar-collapsed');
        }
    });
    /* ============================================
       1. SIDEBAR TOGGLE (mobile)
       ============================================ */
    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    /* ============================================
       1.5 SIDEBAR COLLAPSE (Desktop)
       ============================================ */
    const desktopToggle = document.getElementById('desktop-sidebar-toggle');
    
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
            
            // Ferme tous les sous-menus siverts lors de la réduction
            if (document.body.classList.contains('sidebar-collapsed')) {
                submenuItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    /* ============================================
       2. SIDEBAR SUBMENU TOGGLE
       ============================================ */
    submenuItems.forEach(item => {
        const link = item.querySelector('.sidebar-link');
        link.addEventListener('click', (e) => {
            // Allow navigation but also toggle submenu
            const isOpen = item.classList.contains('open');

            // Close all other submenus
            submenuItems.forEach(other => {
                if (other !== item) other.classList.remove('open');
            });

            // Toggle current
            item.classList.toggle('open', !isOpen);
        });
    });

    // Close sidebar on submenu link click (mobile)
    document.querySelectorAll('.sidebar-submenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });


    /* ============================================
       3. SMOOTH SCROLL
       ============================================ */
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

                // Close sidebar on mobile after clicking a link
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            }
        });
    });


    /* ============================================
       4. NAVBAR SCROLL EFFECT
       ============================================ */
    // Fonction throttled pour navbar scroll effect
    const handleNavbarScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 50); // Max 1 appel par 50ms
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    /* ============================================
       5. ACTIVE SIDEBAR LINK ON SCROLL
       ============================================ */
    function updateActiveLink() {
        const scrollPos = window.pageYOffset + 150;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active from all
                sidebarLinks.forEach(link => link.classList.remove('active'));

                // Add active to matching link
                const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Appliquer throttle au updateActiveLink (T2.1)
    const throttledUpdateActiveLink = throttle(updateActiveLink, 100); // Max 1 appel par 100ms
    window.addEventListener('scroll', throttledUpdateActiveLink, { passive: true });
/* ============================================
       6. SCROLL REVEAL ANIMATIONS
       ============================================ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const siblings = Array.from(card.parentElement.children);
                const cardIndex = siblings.indexOf(card);

                setTimeout(() => {
                    card.classList.add('visible');
                }, cardIndex * 100);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Observe boutique cards statiques
    boutiqueCards.forEach(card => observer.observe(card));
    document.querySelectorAll('.contact-card, .social-card').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // 2. Initialisation de fadeObserver SANS "const" (il utilise la variable globale)
    fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const siblings = Array.from(el.parentElement.children);
                // On s'assure que elIndex n'est pas négatif si l'élément n'a pas de parent direct clair
                const elIndex = Math.max(0, siblings.indexOf(el));

                setTimeout(() => {
                    el.classList.add('visible');
                }, elIndex * 120);

                fadeObserver.unobserve(el);
            }
        });
    }, observerOptions);

    // Observe les éléments avec .fade-in-up déjà présents dans le HTML au chargement
    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    /* ============================================
       7. BOUTIQUE CARD HOVER PARALLAX EFFECT
       ============================================ */
    boutiqueCards.forEach(card => {
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


    /* ============================================
       8. HERO PARALLAX EFFECT
       ============================================ */
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Fonction throttled pour parallax (T2.1)
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
        }, 50); // Max 1 appel par 50ms
        
        window.addEventListener('scroll', handleHeroParallax, { passive: true });
    }


    /* ============================================
       9. COUNTER ANIMATION (on scroll)
       ============================================ */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }


    /* ============================================
       10. BACK TO TOP (via logo click)
       ============================================ */
    const logoAnimated = document.getElementById('logo-animated');
    if (logoAnimated) {
        logoAnimated.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ============================================
       11. AUTO-OPEN "BOUTIQUE" SUBMENU ON LOAD
       ============================================ */
    /* const boutiqueSubmenu = document.querySelector('.sidebar-item.has-submenu');
    if (boutiqueSubmenu) {
        boutiqueSubmenu.classList.add('open');
    }
    */


    /* ============================================
       12. RESPONSIVE CHECK ON RESIZE
       ============================================ */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        }, 150);
    });

});
/* ============================================
   13. GESTION DE HERO
   ============================================ */
const track = document.querySelector(".carousel-track");
const slides = [...document.querySelectorAll(".slide")];
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let interval;
let startX = 0;
let isHovering = false;

/* Dots */
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = [...dotsContainer.children];

function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

/* Slide logic */
function goToSlide(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  handleVideos();
  updateDots();
}

/* Auto play */
function startAuto() {
  interval = setInterval(() => goToSlide(index + 1), 5000);
}

function stopAuto() {
  clearInterval(interval);
}

/* Videos play only when visible */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (!video) return;
      entry.isIntersecting ? video.play() : video.pause();
    });
  },
  { threshold: 0.6 }
);

slides.forEach(slide => observer.observe(slide));

function handleVideos() {
  slides.forEach((slide, i) => {
    const video = slide.querySelector("video");
    if (!video) return;
    i === index ? video.play() : video.pause();
  });
}

/* Controls */
prevBtn.onclick = () => goToSlide(index - 1);
nextBtn.onclick = () => goToSlide(index + 1);

/* Hover pause */
track.addEventListener("mouseenter", () => {
  isHovering = true;
  stopAuto();
});

track.addEventListener("mouseleave", () => {
  isHovering = false;
  startAuto();
});

/* Swipe mobile */
track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) goToSlide(index - 1);
  if (diff < -50) goToSlide(index + 1);
});

/* Init */
goToSlide(0);
startAuto();

/* ============================================
   14. GESTION DES DONNÉES (FETCH JSON) ET RENDU
   ============================================ */

// ===== CONFIG & CONSTANTES =====
const DATA_CONFIG = {
    JSON_URL: 'data.json',
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // ms
    CACHE_TTL: 24 * 60 * 60 * 1000, // 24h en ms
    CACHE_KEY: 'boutique_cogi_data',
    TIMEOUT: 5000 // 5 secondes
};

// Variable globale pour stocker les liens sociaux une fois chargés
let socialDataConfig = {};

// ===== VALIDATION DE SCHÉMA (T1.2) =====
function validateBoutiqueData(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Données invalides: structure non trouvée');
    }
    
    // Vérifier reseauxSociaux
    if (!data.reseauxSociaux || typeof data.reseauxSociaux !== 'object') {
        throw new Error('Données invalides: reseauxSociaux manquant');
    }
    
    // Vérifier catalogue
    if (!data.catalogue || typeof data.catalogue !== 'object') {
        throw new Error('Données invalides: catalogue manquant');
    }
    
    const requiredCategories = ['habitFemme', 'habitHomme', 'habitEnfant', 'chaussureDame', 'sacDame', 'accessoire'];
    for (const category of requiredCategories) {
        if (!Array.isArray(data.catalogue[category])) {
            throw new Error(`Données invalides: catalogue.${category} n'est pas un tableau`);
        }
    }
    
    return true;
}

// ===== GESTION CACHE LOCALSTORAGE (T2.2 Preview) =====
function getCachedData() {
    try {
        const cached = localStorage.getItem(DATA_CONFIG.CACHE_KEY);
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age > DATA_CONFIG.CACHE_TTL) {
            localStorage.removeItem(DATA_CONFIG.CACHE_KEY);
            return null;
        }
        
        console.log('✓ Données chargées depuis cache (age: ' + Math.floor(age / 1000) + 's)');
        return data;
    } catch (e) {
        console.warn('⚠ Erreur cache:', e.message);
        return null;
    }
}

function setCachedData(data) {
    try {
        localStorage.setItem(DATA_CONFIG.CACHE_KEY, JSON.stringify({
            data: data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('⚠ Impossible de cacher les données:', e.message);
    }
}

// ===== FETCH AVEC RETRY & TIMEOUT (T1.1) =====
async function fetchWithRetry(url, retries = DATA_CONFIG.MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), DATA_CONFIG.TIMEOUT);
            
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeout);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeout);
            
            if (attempt < retries) {
                const delay = DATA_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
                console.warn(`⚠ Tentative ${attempt}/${retries} échouée. Retry dans ${delay}ms...`, error.message);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

// ===== AFFICHAGE MESSAGE ERREUR (T1.1) =====
function afficherErreurChargement(message) {
    const conteneurs = [
        'grid-habit-femme', 'grid-habit-homme', 'grid-habit-enfant',
        'grid-habit-chaussure', 'grid-habit-sac', 'grid-habit-accessoire'
    ];
    
    const html = `
        <div style="
            grid-column: 1 / -1;
            padding: 40px 20px;
            text-align: center;
            background: rgba(232, 72, 127, 0.08);
            border-radius: 12px;
            border-left: 4px solid rgb(232, 72, 127);
        ">
            <div style="margin-bottom: 10px;">
                <i class="fas fa-exclamation-circle" style="font-size: 24px; color: rgb(232, 72, 127);"></i>
            </div>
            <h3 style="color: var(--text-primary); margin-bottom: 8px;">Oops! Erreur de chargement</h3>
            <p style="color: var(--text-secondary); margin-bottom: 12px;">${message}</p>
            <button onclick="location.reload()" style="
                padding: 8px 20px;
                background: rgb(232, 72, 127);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
            ">Réessayer</button>
        </div>
    `;
    
    conteneurs.forEach(id => {
        const conteneur = document.getElementById(id);
        if (conteneur) {
            conteneur.innerHTML = html;
            conteneur.style.display = 'grid';
        }
    });
}

// ===== AFFICHAGE SKELETON LOADERS (T1.4) =====
function afficherSkeletonLoaders() {
    const skeleton = `
        <div class="skeleton-card fade-in-up">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `;
    
    const conteneurs = [
        'grid-habit-femme', 'grid-habit-homme', 'grid-habit-enfant',
        'grid-habit-chaussure', 'grid-habit-sac', 'grid-habit-accessoire'
    ];
    
    conteneurs.forEach(id => {
        const conteneur = document.getElementById(id);
        if (conteneur) {
            conteneur.innerHTML = skeleton.repeat(4);
            conteneur.style.display = 'grid';
        }
    });
}

// ===== FONCTION PRINCIPALE (T1.1 - Améliorée) =====
async function chargerDonneesBoutique() {
    try {
        // Afficher skeleton loaders pendant le chargement
        afficherSkeletonLoaders();
        
        // Essayer charger depuis cache d'abord
        let data = getCachedData();
        
        // Si pas en cache, fetch depuis serveur avec retry
        if (!data) {
            console.log('📡 Chargement données depuis serveur...');
            data = await fetchWithRetry(DATA_CONFIG.JSON_URL);
            
            // Valider les données (T1.2)
            validateBoutiqueData(data);
            
            // Cacher pour prochaine fois
            setCachedData(data);
        }
        
        // 1. Initialiser la configuration des réseaux sociaux
        socialDataConfig = data.reseauxSociaux;
        
        // 2. Rendre les produits dans le DOM
        afficherProduits(data.catalogue.habitFemme, 'grid-habit-femme');
        afficherProduits(data.catalogue.habitHomme, 'grid-habit-homme');
        afficherProduits(data.catalogue.habitEnfant, 'grid-habit-enfant');
        afficherProduits(data.catalogue.chaussureDame, 'grid-habit-chaussure');
        afficherProduits(data.catalogue.sacDame, 'grid-habit-sac');
        afficherProduits(data.catalogue.accessoire, 'grid-habit-accessoire');
        
        console.log('✓ Données boutique chargées avec succès');
        
    } catch (erreur) {
        console.error('❌ Impossible de charger les données:', erreur);
        afficherErreurChargement(
            erreur.message || 'Une erreur s\'est produite lors du chargement des produits. Veuillez réessayer.'
        );
    }
}
// ===== PROTECTION XSS (T1.3) =====
function sanitizeHTML(html) {
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(html);
    }
    console.warn('⚠ DOMPurify non chargé, retour HTML brut');
    return html;
}

function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Moteur de rendu dynamique (Amélioré avec XSS protection - T1.3)
function afficherProduits(produits, conteneurId) {
    const conteneur = document.getElementById(conteneurId);
    
    if (!conteneur || produits.length === 0) {
        if(conteneur) conteneur.innerHTML = `<p style="text-align:center; width:100%; color:var(--text-secondary);">Bientôt de nouveaux articles...</p>`;
        return;
    }

    const html = produits.map(produit => `
        <div class="product-card fade-in-up">
            <div class="product-image-container">
                <img src="${sanitizeText(produit.image)}" alt="${sanitizeText(produit.nom)}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${sanitizeText(produit.nom)}</h3>
                
                <div class="product-badges">
                    <span class="badge badge-size">
                        <i class="fas fa-ruler-combined"></i> ${sanitizeText(produit.taille)}
                    </span>
                    <span class="badge badge-color">
                        <i class="fas fa-palette"></i> ${sanitizeText(produit.couleur)}
                    </span>
                </div>

                <p class="product-price">${sanitizeText(produit.prix)}</p>
                
                <button class="btn-buy" 
                    data-social="whatsapp" 
                    data-message="Bonjour Boutique COGI, je souhaite commander : Cet article : ${sanitizeText(produit.nom)} (Réf: ${sanitizeText(produit.id)}) - Taille : ${sanitizeText(produit.taille)} - Couleur : ${sanitizeText(produit.couleur)} - Prix : ${sanitizeText(produit.prix)}">
                    <i class="fab fa-whatsapp"></i> Commander
                </button>
            </div>
        </div>
    `).join('');

    // Utiliser innerHTML avec sanitization
    conteneur.innerHTML = sanitizeHTML(html);
    
    if (typeof fadeObserver !== 'undefined') {
        document.querySelectorAll(`#${conteneurId} .fade-in-up`).forEach(el => fadeObserver.observe(el));
    }
}

// Lancement du chargement au démarrage
document.addEventListener('DOMContentLoaded', () => {
    chargerDonneesBoutique();
});
/* ============================================
   15. GESTION DES CLICS SUR LES RESAUX SOCIAUX
   ============================================ */
document.body.addEventListener('click', function(e) {
    const target = e.target.closest('[data-social]');
    
    if (target) {
        e.preventDefault();
        const network = target.getAttribute('data-social');
        const customMessage = target.getAttribute('data-message') || '';
        
        // Utilisation de socialDataConfig alimenté par le JSON
        if (socialDataConfig[network]) {
            const decoded = atob(socialDataConfig[network]);
            let finalUrl = "";

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
        }
    }
});
