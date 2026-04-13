/* ============================================
   BOUTIQUE COGI — JavaScript Optimisé
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Elements DOM --- */
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const desktopToggle = document.getElementById('desktop-sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const navbar = document.getElementById('navbar');

    /* ============================================
       1. SIDEBAR ET NAVIGATION
       ============================================ */
    const toggleMobileSidebar = () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    };

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMobileSidebar);

    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
            if (document.body.classList.contains('sidebar-collapsed')) {
                document.querySelectorAll('.sidebar-item.has-submenu').forEach(el => el.classList.remove('open'));
            }
        });
    }

    // Gestion des sous-menus
    document.querySelectorAll('.sidebar-item.has-submenu > .sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le saut de page si c'est juste pour ouvrir le menu
            const parent = link.parentElement;
            const isOpen = parent.classList.contains('open');
            document.querySelectorAll('.sidebar-item.has-submenu').forEach(el => el.classList.remove('open'));
            if (!isOpen) parent.classList.add('open');
        });
    });

    // Scroll Smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                window.scrollTo({
                    top: targetEl.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                    toggleMobileSidebar();
                }
            }
        });
    });

    // Navbar Scrolled Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, { passive: true });

    /* ============================================
       2. HERO CAROUSEL ROBUSTE (Images + Vidéos)
       ============================================ */
    const initCarousel = () => {
        const carousel = document.getElementById("heroCarousel");
        if(!carousel) return;
        
        const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
        const dotsContainer = carousel.querySelector(".hero-dots");
        const nextBtn = carousel.querySelector(".hero-arrow.right");
        const prevBtn = carousel.querySelector(".hero-arrow.left");
        
        let index = 0;
        let autoPlayInterval;
        const AUTO_DELAY = 6000; // 6 secondes par slide

        // Créer les indicateurs (dots)
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = "hero-dot" + (i === 0 ? " active" : "");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        // Fonctions Vidéos SÉCURISÉES (Gère le Play Promise)
        const playVideo = async (slide) => {
            if (slide.dataset.type === "video") {
                const video = slide.querySelector("video");
                if (video) {
                    video.currentTime = 0;
                    try { await video.play(); } 
                    catch (err) { console.warn("Autoplay vidéo bloqué par le navigateur", err); }
                }
            }
        };

        const stopVideo = (slide) => {
            if (slide.dataset.type === "video") {
                const video = slide.querySelector("video");
                if (video && !video.paused) {
                    video.pause();
                }
            }
        };

        // Logique de changement de Slide
        const goToSlide = (newIndex) => {
            if (newIndex === index) return;
            
            slides[index].classList.remove("active");
            dots[index].classList.remove("active");
            stopVideo(slides[index]);

            index = (newIndex + slides.length) % slides.length;

            slides[index].classList.add("active");
            dots[index].classList.add("active");
            playVideo(slides[index]);
        };

        const nextSlide = () => goToSlide(index + 1);
        const prevSlide = () => goToSlide(index - 1);

        // Autoplay Logic
        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, AUTO_DELAY);
        };
        const stopAutoPlay = () => clearInterval(autoPlayInterval);

        // Event Listeners (Clics, Hover, Swipe)
        nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
        
        // PAUSE AU SURVOL
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // SWIPE MOBILE
        let startX = 0, isDragging = false;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            // Empêche le scroll vertical accidentel si on swipe fort horizontalement
            if(!isDragging) return;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            if(!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Seuil de tolérance du swipe
                if (diff > 0) nextSlide();
                else prevSlide();
            }
            isDragging = false;
            startAutoPlay();
        }, { passive: true });

        // Initialisation du premier slide
        playVideo(slides[0]);
        startAutoPlay();
    };

    initCarousel();

    /* ============================================
       3. INTERSECTION OBSERVER (Animations au Scroll)
       ============================================ */
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    };

    /* ============================================
       4. GESTION DU CATALOGUE (Données Mockées)
       ============================================ */
    // J'utilise une partie de vos tableaux existants pour la démonstration
    const catalogue = {
        "habit-femme": [
            { id: "f1", nom: "Robe Lumineux floral", prix: "95$", taille: "42 à 48", image: "Media-p-20260218/pict09.jpeg" },
            { id: "f2", nom: "Robe Elégante Espoll", prix: "95$", taille: "42 à 48", image: "Media-p-20260218/pict14.jpeg" },
            { id: "f3", nom: "Robe Plissée Zera", prix: "65$", taille: "44 à 50", image: "Media-p-20260308/FEMME/WhatsApp Image 2026-03-08 at 11.02.31 PM (1).jpeg" }
        ],
        "habit-enfant": [
            { id: "e1", nom: "Robe Enfant Rose", prix: "30$", taille: "3 à 6 ans", image: "Media-p-20260308/ENFANT/WhatsApp Image 2026-03-08 at 11.03.24 PM.jpeg" }
        ],
        "habit-accessoire": [
            { id: "a1", nom: "Chaussettes Homme", prix: "5$", taille: "40 - 44", image: "Media-p-20260308/ACCESSOIRE/WhatsApp Image 2026-03-08 at 11.05.57 PM.jpeg" }
        ]
    };

    const renderCatalogue = (categoryId, dataArray) => {
        const container = document.getElementById(`grid-${categoryId}`);
        if (!container) return;

        if (!dataArray || dataArray.length === 0) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-secondary);">Bientôt de nouveaux articles...</p>`;
            return;
        }

        container.innerHTML = dataArray.map(item => `
            <div class="product-card fade-in-up">
                <div class="product-image-container">
                    <img src="${item.image}" alt="${item.nom}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${item.nom}</h3>
                    <p style="font-size: 0.8rem; color: #666;">Taille: ${item.taille}</p>
                    <p class="product-price">${item.prix}</p>
                    <button class="btn-buy" data-social="whatsapp" data-message="Bonjour, je souhaite commander l'article : ${item.nom} (${item.prix})">
                        <i class="fab fa-whatsapp"></i> Commander
                    </button>
                </div>
            </div>
        `).join('');
    };

    // Rendu dynamique
    renderCatalogue('habit-femme', catalogue['habit-femme']);
    renderCatalogue('habit-enfant', catalogue['habit-enfant']);
    renderCatalogue('habit-accessoire', catalogue['habit-accessoire']);
    renderCatalogue('habit-homme', []); // Test vide
    
    // Lancer l'observer après le rendu du DOM
    setTimeout(animateOnScroll, 100);

    /* ============================================
       5. LIENS SOCIAUX SECURISÉS
       ============================================ */
    const socialData = {
        'whatsapp': 'KzI0MzgxOTUzODMyNQ==',         
        'facebook': 'bW9uLnByb2ZpbC5mYWNlYm9vaw==', 
        'telegram': 'bW9uX3VzZXJuYW1lX3RlbGVncmFt', 
        'tiktok':   'QG1vbl9jb21wdGVfdGlrdG9r',     
        'instagram':'bW9uX2luc3RhX29mZmljaWVs'      
    };

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-social]');
        if (target) {
            e.preventDefault();
            const network = target.dataset.social;
            const message = target.dataset.message || '';
            
            if (socialData[network]) {
                const decoded = atob(socialData[network]).replace('+', '');
                let url = "";

                switch(network) {
                    case 'whatsapp': url = `https://wa.me/${decoded}${message ? `?text=${encodeURIComponent(message)}` : ''}`; break;
                    case 'facebook': url = `https://facebook.com/${decoded}`; break;
                    case 'telegram': url = `https://t.me/${decoded}`; break;
                    case 'tiktok': url = `https://tiktok.com/${decoded}`; break;
                    case 'instagram': url = `https://instagram.com/${decoded}`; break;
                }
                if (url) window.open(url, '_blank', 'noopener,noreferrer');
            }
        }
    });

});
