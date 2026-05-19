export function createNavbar() {
  // Retourne le HTML de la navbar + sidebar (sans les événements)
  return `
    <nav class="navbar" id="navbar">
        <div class="navbar-left">
            <div class="logo-container" id="logo-animated" aria-label="Retour à l'accueil">
                <div class="logo-icon"><i class="fas fa-gem"></i></div>
                <span class="logo-text">Boutique <span class="logo-highlight">COGI</span></span>
            </div>
        </div>
        <div class="navbar-right">
            <div class="navbar-item">
                <span>Femme</span>
            </div>
            <div class="navbar-item">
                <span>Homme</span>
            </div>
            <div class="navbar-item">
                <span>Enfant</span>
            </div>
             <div class="navbar-item">
                <span>Chaussure</span>
            </div>
            <div class="navbar-item">
                <span>Sac</span>
            </div>
            <div class="navbar-item">
                <span>Accessoire</span>
            </div>
            <!--
            <div class="navbar-item">
                <i class="fas fa-shopping-bag"></i> <span>Achat à Domicile</span>
            </div>
            <div class="navbar-item">
                <i class="fas fa-truck"></i> <span>Livraison à Domicile</span>
            </div>
            -->
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Ouvrir le menu">
            <i class="fas fa-bars"></i>
        </button>
    </nav>

    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <span class="logo-text-sidebar">Menu</span>
            </div>
            <button id="desktop-sidebar-toggle" class="desktop-sidebar-toggle" aria-label="Réduire le menu">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
            </button>
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
            <li class="sidebar-item has-submenu">
                <a href="#contact" class="sidebar-link" data-section="contact" data-tooltip="CONTACT">
                    <i class="fas fa-envelope"></i> <span>CONTACT</span>
                    <i class="fas fa-chevron-down submenu-arrow"></i>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="#contact-email"><i class="fas fa-at"></i> E-mail</a></li>
                    <li><a href="#contact-phone"><i class="fab fa-whatsapp"></i> Whatsapp</a></li>
                </ul>
            </li>
            <li class="sidebar-item has-submenu">
                <a href="#reseaux" class="sidebar-link" data-section="reseaux" data-tooltip="RÉSEAUX SOCIAUX">
                    <i class="fas fa-share-alt"></i> <span>RÉSEAUX SOCIAUX</span>
                    <i class="fas fa-chevron-down submenu-arrow"></i>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="#" data-social="whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>
                    <li><a href="#" data-social="facebook"><i class="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#" data-social="telegram"><i class="fab fa-telegram"></i> Telegram</a></li>
                    <li><a href="#" data-social="tiktok"><i class="fab fa-tiktok"></i> TikTok</a></li>
                    <li><a href="#" data-social="instagram"><i class="fab fa-instagram"></i> Instagram</a></li>
                </ul>
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
  // Attacher les écouteurs d’événements (toggle, scroll, active link, sous-menus…)
  // utilise throttle/debounce importés ou définis ici
}