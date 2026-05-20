// src/components/navbar.js
export function createNavbarHTML() {
    return `
    <nav class="navbar" id="navbar">
        <div class="navbar-left">
            <div class="logo-container" id="logo-animated" role="button" aria-label="Retour à l'accueil" onclick="navigate('/')">
                <div class="logo-icon"><i class="fas fa-gem"></i></div>
                <span class="logo-text">Boutique <span class="logo-highlight">COGI</span></span>
            </div>
        </div>
        <div class="navbar-right">
            <button class="navbar-item" onclick="navigate('/collection?cat=femme')"><span>Femme</span></button>
            <button class="navbar-item" onclick="navigate('/collection?cat=homme')"><span>Homme</span></button>
            <button class="navbar-item" onclick="navigate('/collection?cat=enfant')"><span>Enfant</span></button>
            <button class="navbar-item" onclick="navigate('/collection?cat=chaussure')"><span>Chaussure</span></button>
            <button class="navbar-item" onclick="navigate('/collection?cat=sac')"><span>Sac</span></button>
            <button class="navbar-item" onclick="navigate('/collection?cat=accessoire')"><span>Accessoire</span></button>
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Ouvrir le menu">
            <i class="fas fa-bars"></i>
        </button>
    </nav>

    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <span class="logo-text">Menu</span>
            <button id="desktop-sidebar-toggle" class="desktop-sidebar-toggle" aria-label="Réduire le menu">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
            </button>
            <button class="sidebar-close" id="sidebar-close" aria-label="Fermer le menu"><i class="fas fa-times"></i></button>
        </div>
        <ul class="sidebar-menu">
            <li class="sidebar-item">
                <a href="#hero" class="sidebar-link active" data-section="hero" data-tooltip="ACCUEIL">
                    <i class="fas fa-home"></i> <span>ACCUEIL</span>
                </a>
            </li>
            <li class="sidebar-item has-submenu">
                <a href="#boutique" class="sidebar-link" data-section="boutique" data-tooltip="BOUTIQUE">
                    <i class="fas fa-store"></i> <span>BOUTIQUE</span>
                    <i class="fas fa-chevron-down submenu-arrow"></i>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="#catalogue-femme"><i class="fas fa-female"></i> Habit Femme</a></li>
                    <li><a href="#catalogue-homme"><i class="fas fa-male"></i> Habit Homme</a></li>
                    <li><a href="#catalogue-enfant"><i class="fas fa-child"></i> Habit Enfant</a></li>
                    <li><a href="#catalogue-chaussure"><i class="fas fa-shoe-prints"></i> Chaussure Dame</a></li>
                    <li><a href="#catalogue-sac"><i class="fas fa-shopping-bag"></i> Sac Dame</a></li>
                    <li><a href="#catalogue-accessoire"><i class="fas fa-ring"></i> Accessoire</a></li>
                </ul>
            </li>
            <li class="sidebar-item">
                <a href="#contact" class="sidebar-link" data-section="contact" data-tooltip="CONTACT">
                    <i class="fas fa-envelope"></i> <span>CONTACT</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a href="#reseaux" class="sidebar-link" data-section="reseaux" data-tooltip="RÉSEAUX SOCIAUX">
                    <i class="fas fa-share-alt"></i> <span>RÉSEAUX</span>
                </a>
            </li>
        </ul>
        <div class="sidebar-footer">
            <p>&copy; 2026 Boutique COGI</p>
        </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;
}

export function initNavbar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const navbar = document.getElementById('navbar');

    if (!toggleBtn || !sidebar || !overlay) return;

    const toggleSidebar = () => {
        document.body.classList.toggle('sidebar-expanded');
        document.body.classList.toggle('sidebar-collapsed');
    };

    toggleBtn.addEventListener('click', toggleSidebar);
    closeBtn?.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Effet visuel au défilement optimisé (pas de throttle lourd, utilisation de requestAnimationFrame)
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbarClass = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbarClass);
            ticking = true;
        }
    }, { passive: true });
}