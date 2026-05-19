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
            <button class="navbar-item" onclick="navigate('/collection?cat=accessoire')"><span>Accessoires</span></button>
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Ouvrir le menu">
            <i class="fas fa-bars"></i>
        </button>
    </nav>

    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <span class="logo-text">Menu</span>
            <button class="sidebar-close" id="sidebar-close"><i class="fas fa-times"></i></button>
        </div>
        <ul class="sidebar-links">
            <li><button class="sidebar-link" onclick="navigate('/')"><i class="fas fa-home"></i> Accueil</button></li>
            <li><button class="sidebar-link" onclick="navigate('/collection?cat=femme')"><i class="fas fa-female"></i> Femme</button></li>
            <li><button class="sidebar-link" onclick="navigate('/collection?cat=accessoire')"><i class="fas fa-gem"></i> Accessoires</button></li>
        </ul>
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