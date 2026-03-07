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

    // On cherche TOUS les éléments qui ont l'attribut data-social
    document.querySelectorAll('[data-social]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // On récupère le nom du réseau (ex: "whatsapp")
            const network = this.getAttribute('data-social');
            
            if (socialData[network]) {
                const decoded = atob(socialData[network]);
                let finalUrl = "";

                if (network === 'whatsapp') {
                    finalUrl = `https://wa.me/${decoded.replace('+', '')}`;
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
        });
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