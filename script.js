/* ============================================
   BOUTIQUE COGI — JavaScript
   Interactions, animations & navigation
   ============================================ */

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
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay based on index within parent
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

    // Observe boutique cards
    boutiqueCards.forEach(card => observer.observe(card));

    // Observe other animated elements
    document.querySelectorAll('.contact-card, .social-card').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Reuse the "visible" class for fade-in-up elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const siblings = Array.from(el.parentElement.children);
                const elIndex = siblings.indexOf(el);

                setTimeout(() => {
                    el.classList.add('visible');
                }, elIndex * 120);

                fadeObserver.unobserve(el);
            }
        });
    }, observerOptions);

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
       13. GESTION SÉCURISÉE DES RÉSEAUX SOCIAUX
       ============================================ */
    const socialData = {
        'whatsapp':  'KzI0MzgxOTUzODMyNQ==',         // +243819538325
        'facebook':  'bW9uLnByb2ZpbC5mYWNlYm9vaw==', //Boutique COGI
        'telegram':  'bW9uX3VzZXJuYW1lX3RlbGVncmFt', //BoutiqueCOGI
        'tiktok':    'QG1vbl9jb21wdGVfdGlrdG9r',   //@boutique_cogi  
        'instagram': 'bW9uX2luc3RhX29mZmljaWVs'     //@boutique_cogi
    };
    document.body.addEventListener('click', function(e) {
        // Cherche si l'élément cliqué (ou un de ses parents) possède l'attribut data-social
        const target = e.target.closest('[data-social]');
        
        if (target) {
            e.preventDefault();
            const network = target.getAttribute('data-social');
            const customMessage = target.getAttribute('data-message') || '';
            
            if (socialData[network]) {
                const decoded = atob(socialData[network]);
                let finalUrl = "";

                if (network === 'whatsapp') {
                    // Ajout de l'encodage du message personnalisé s'il existe
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
    
    /* ============================================
   ALTERNANCE DES VIDÉOS HERO
   ============================================ */
function setupVideoSwitch() {
    const v1 = document.getElementById('vid1');
    const v2 = document.getElementById('vid2');
    
    // On définit l'intervalle (ex: 27000ms = 27 secondes)
    setInterval(() => {
        if (v1.classList.contains('active')) {
            v1.classList.remove('active');
            v2.classList.add('active');
            v2.play(); // On s'assure qu'elle joue
        } else {
            v2.classList.remove('active');
            v1.classList.add('active');
            v1.play();
        }
    }, 27000); 
}

// Lancer la fonction une fois que le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    setupVideoSwitch();
});
/* ============================================
       14. GESTION DU CATALOGUE (Méthode Array)
       ============================================ */
    
    // 1. Définition des sources de données (Arrays)
       const produitsHabitFemme = [
        { 
            id: "f1", 
            nom: "Robe Lumineux à motif floral brillant", 
            prix: "95$", 
            taille: "42 à 48", 
            couleur: "Jaune-Vert vif", 
            image: "Media-p-20260218/pict09.jpeg" 
        },
        { 
            id: "f2", 
            nom: "Robe Elégante Espoll", 
            prix: "95$", 
            taille: "42 à 48", 
            couleur: "Noir avec paillette", 
            image: "Media-p-20260218/pict14.jpeg" 
        },
        { 
            id: "f3", 
            nom: "Robe Elégante à motif floral foncé", 
            prix: "95$", 
            taille: "42 à 48", 
            couleur: "Brun-Marron", 
            image: "Media-p-20260218/pict12.jpeg" 
        },
        { 
            id: "f4", 
            nom: "Robe Elégante Espoll ", 
            prix: "95$", 
            taille: "42 à 48", 
            couleur: "Rouge avec paillette", 
            image: "Media-p-20260218/pict15.jpeg" 
        },
        { 
            id: "f5", 
            nom: "Robe Plissée Zera à Ceinture Rouge", 
            prix: "65$", 
            taille: "44 à 50", 
            couleur: "Rouge sang", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.31 PM (1).jpeg" 
        },
        { 
            id: "f6", 
            nom: "Complet pantalon et gilet lovelf Bras Cassé Bleu  ", 
            prix: "75$", 
            taille: "36 à 42", 
            couleur: "Bleu", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.31 PM (2).jpeg" 
        },
        { 
            id: "f7", 
            nom: "Robe Plissée Zera à Ceinture Noire", 
            prix: "65$", 
            taille: "44 à 50", 
            couleur: "Noir - Blanc", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.31 PM.jpeg" 
        },
        { 
            id: "f8", 
            nom: "Blouse blanche Unique avec boutons décoratifs ", 
            prix: "35$", 
            taille: "36 à 50", 
            couleur: "Blanc", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.32 PM (1).jpeg" 
        },
        { 
            id: "f9", 
            nom: "Blouse Rouge Unique", 
            prix: "95$", 
            taille: "36 à 50", 
            couleur: "Rouge", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.32 PM (2).jpeg" 
        },
        { 
            id: "f10", 
            nom: "Complet pantalon gilet lovelf bras cassé", 
            prix: "75$", 
            taille: "36 à 42", 
            couleur: "Vert clair", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.32 PM.jpeg" 
        },
        { 
            id: "f11", 
            nom: "Robe foulard Soft à Ceinture Orange", 
            prix: "75$", 
            taille: "42 à 48", 
            couleur: "Bleue fleurie", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.33 PM (1).jpeg" 
        },
        { 
            id: "f12", 
            nom: "Pantalon Jeans Zara ", 
            prix: "40$", 
            taille: "42 à 52", 
            couleur: "Bleue ciel - Bleu foncé", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.33 PM.jpeg" 
        },
        { 
            id: "f13", 
            nom: "Robe dentelle Davina ", 
            prix: "65$", 
            taille: "36 à 42", 
            couleur: "Bleue turquoise", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.34 PM (1).jpeg" 
        },
        { 
            id: "f14", 
            nom: "Robe droite Marchesa grande taille", 
            prix: "60$", 
            taille: "50 à 56", 
            couleur: "Rouge bordeau", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.34 PM (2).jpeg" 
        },
        { 
            id: "f15", 
            nom: "Robe foulard Soft fleurie", 
            prix: "65$", 
            taille: "42 à 48", 
            couleur: "Jaune", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.34 PM.jpeg" 
        },
        { 
            id: "f16", 
            nom: "Complet pantalon + Blousette + Veste pour Enfant", 
            prix: "45$", 
            taille: "8 à 15 ans", 
            couleur: "Orange avec raillure", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.03.26 PM.jpeg" 
        },
        { 
            id: "f17", 
            nom: "Robe chic avec ceinture ", 
            prix: "75$", 
            taille: "42 à 48", 
            couleur: "Noir - Mauve - Vert", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.05.11 PM (1).jpeg" 
        },
        { 
            id: "f18", 
            nom: "Tailleur dame jupe et veste Melorin", 
            prix: "85$", 
            taille: "42 à 48", 
            couleur: "Bleu de nuit", 
            image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.05.11 PM.jpeg" 
        }
    ];

    const produitsHabitHomme = [
         // Ajoutez vos objets ici
    ];

    const produitsHabitEnfant = [
        { 
            id: "e1", 
            nom: "Robe Enfant Rose (Rouge, Bleu)", 
            prix: "30$", 
            taille: "3 à 6 ans", 
            couleur: "Rose", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.24 PM.jpeg" 
        },
        { 
            id: "e2", 
            nom: "Complet vest Enfant Rouge", 
            prix: "45$", 
            taille: "7, 9 et 10 ans", 
            couleur: "Rouge", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.25 PM.jpeg" 
        },
        { 
            id: "e3", 
            nom: "Chemise Enfant Garçon (Blanc)", 
            prix: "30$", 
            taille: "2 à 10 ans", 
            couleur: "Blanc", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.24 PM (2).jpeg" 
        },
        { 
            id: "e4", 
            nom: "Blousette Pantalon Enfant Rose", 
            prix: "35$", 
            taille: "2, 5, 6 et 7 ans", 
            couleur: "Rose-pink", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.26 PM.jpeg" 
        },
        { 
            id: "e5", 
            nom: "Robe Enfant Manche longue", 
            prix: "30$", 
            taille: "4 à 7 ans", 
            couleur: "Brun-Marron", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.27 PM.jpeg" 
        },
        { 
            id: "e6", 
            nom: "Chemise Enfant Garçon (Brun)", 
            prix: "30$", 
            taille: "2 à 10 ans", 
            couleur: "Brun-Marron", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.23 PM.jpeg" 
        },
        { 
            id: "e7", 
            nom: "Robe 2Temps pour Enfant", 
            prix: "30$", 
            taille: "2 à 5 ans", 
            couleur: "Rouge-Blanc", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.28 PM.jpeg" 
        },
        { 
            id: "e8", 
            nom: "Chemise Enfant Garçon (Gris)", 
            prix: "30$", 
            taille: "2 à 10 ans", 
            couleur: "Gris", 
            image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.24 PM (3).jpeg" 
        },
        
    ];

    const produitsChaussure = [
        // Ajoutez vos objets ici
    ];

    const produitsSac = [
        // Ajoutez vos objets ici
    ];

    const produitsAccessoire = [
        { 
            id: "a1", 
            nom: "Chaussettes Homme Bleu Nuit", 
            prix: "5$", 
            taille: "40 - 44", 
            couleur: "Noir", 
            image: "Media-p-20260308/ACCESSOIRE/WhatsApp Image 2026-03-08 at 11.05.57 PM.jpeg" 
        },
        { 
            id: "a2", 
            nom: "SINGLET Coton (Blanc - Noir - Gris)", 
            prix: "5$", 
            taille: "S, M, L, XL, 2XL",
            couleur: "Blanc", 
            image: "Media-p-20260308/ACCESSOIRE/WhatsApp Image 2026-03-08 at 11.05.56 PM (1).jpeg" 
        },
        { 
            id: "a3", 
            nom: "Chaussettes Coton Blanc", 
            prix: "5$", 
            taille: "40 - 44", 
            couleur: "Gris", 
            image: "Media-p-20260308/ACCESSOIRE/WhatsApp Image 2026-03-08 at 11.05.56 PM.jpeg" 
        }
    ];
// 2. Moteur de rendu dynamique
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
                        data-message="Bonjour Boutique COGI, je souhaite commander :Cet article : ${produit.nom} (Réf: ${produit.id}) - Taille : ${produit.taille} - Couleur : ${produit.couleur} - Prix : ${produit.prix}">
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

    // 3. Exécution globale
    afficherProduits(produitsHabitFemme, 'grid-habit-femme');
    afficherProduits(produitsHabitHomme, 'grid-habit-homme');
    afficherProduits(produitsHabitEnfant, 'grid-habit-enfant');
    afficherProduits(produitsChaussure, 'grid-habit-chaussure');
    afficherProduits(produitsSac, 'grid-habit-sac');
    afficherProduits(produitsAccessoire, 'grid-habit-accessoire');
