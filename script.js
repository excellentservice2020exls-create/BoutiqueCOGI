/* ============================================
   BOUTIQUE COGI — JavaScript
   Interactions, animations & navigation
   ============================================ */
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
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });


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

    window.addEventListener('scroll', updateActiveLink, { passive: true });
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
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrolled < heroHeight) {
                const opacity = 1 - (scrolled / heroHeight);
                const translateY = scrolled * 0.3;
                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }, { passive: true });
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
// Variable globale pour stocker les liens sociaux une fois chargés
let socialDataConfig = {};

// Fonction principale pour charger le fichier JSON
async function chargerDonneesBoutique() {
    try {
        const reponse = await fetch('data.json');
        
        if (!reponse.ok) {
            throw new Error(`Erreur de chargement: ${reponse.status}`);
        }
        
        const data = await reponse.json();
        
        // 1. Initialiser la configuration des réseaux sociaux
        socialDataConfig = data.reseauxSociaux;
        
        // 2. Rendre les produits dans le DOM (Méthode Array map)
        afficherProduits(data.catalogue.habitFemme, 'grid-habit-femme');
        afficherProduits(data.catalogue.habitHomme, 'grid-habit-homme');
        afficherProduits(data.catalogue.habitEnfant, 'grid-habit-enfant');
        afficherProduits(data.catalogue.chaussureDame, 'grid-habit-chaussure');
        afficherProduits(data.catalogue.sacDame, 'grid-habit-sac');
        afficherProduits(data.catalogue.accessoire, 'grid-habit-accessoire');
        
    } catch (erreur) {
        console.error("Impossible de charger les données de la boutique:", erreur);
        // Optionnel : Afficher un message d'erreur dans l'UI pour les conteneurs de produits
    }
}
// Moteur de rendu dynamique (inchangé, mais déplacé ici pour la clarté)
function afficherProduits(produits, conteneurId) {
    const conteneur = document.getElementById(conteneurId);
    
    if (!conteneur || produits.length === 0) {
        if(conteneur) conteneur.innerHTML = `<p style="text-align:center; width:100%; color:var(--text-secondary);">Bientôt de nouveaux articles...</p>`;
        return;
    }

    const html = produits.map(produit => `
        <div class="product-card fade-in-up">
            <div class="product-image-container">
                <img src="${produit.image}" alt="${produit.nom}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${produit.nom}</h3>
                
                <div class="product-badges">
                    <span class="badge badge-size">
                        <i class="fas fa-ruler-combined"></i> ${produit.taille}
                    </span>
                    <span class="badge badge-color">
                        <i class="fas fa-palette"></i> ${produit.couleur}
                    </span>
                </div>

                <p class="product-price">${produit.prix}</p>
                
                <button class="btn-buy" 
                    data-social="whatsapp" 
                    data-message="Bonjour Boutique COGI, je souhaite commander : Cet article : ${produit.nom} (Réf: ${produit.id}) - Taille : ${produit.taille} - Couleur : ${produit.couleur} - Prix : ${produit.prix}">
                    <i class="fab fa-whatsapp"></i> Commander
                </button>
            </div>
        </div>
    `).join('');

    conteneur.innerHTML = html;
    
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
