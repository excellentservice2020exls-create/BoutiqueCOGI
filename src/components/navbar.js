// src/components/navbar.js
import { throttle } from '../utils/helpers.js';

/**
 * Retourne le code HTML de la navbar + sidebar + overlay.
 * @returns {string}
 */
export function createNavbarHTML() {
  return `
    <nav class="navbar" id="navbar">
      <div class="navbar-left">
        <div class="logo-container" id="logo-animated" aria-label="Retour à l'accueil">
          <div class="logo-icon"><i class="fas fa-gem"></i></div>
          <span class="logo-text">Boutique <span class="logo-highlight">COGI</span></span>
        </div>
      </div>
      <div class="navbar-right">
        <div class="navbar-item"><span>Femme</span></div>
        <div class="navbar-item"><span>Homme</span></div>
        <div class="navbar-item"><span>Enfant</span></div>
        <div class="navbar-item"><span>Chaussure</span></div>
        <div class="navbar-item"><span>Sac</span></div>
        <div class="navbar-item"><span>Accessoire</span></div>
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

/**
 * Initialise toutes les interactions de la navbar et de la sidebar.
 * À appeler après l'insertion du HTML dans le DOM.
 */
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const desktopToggle = document.getElementById('desktop-sidebar-toggle');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const submenuItems = document.querySelectorAll('.sidebar-item.has-submenu');
  const allSections = document.querySelectorAll('section[id]');

  if (!navbar || !sidebar) return;

  // ---------- Sidebar mobile (burger) ----------
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

  sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  sidebarOverlay?.addEventListener('click', closeSidebar);

  // ---------- Desktop : réduire/agrandir via le bouton dédié ----------
  desktopToggle?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-collapsed');
    // Fermer les sous-menus ouverts quand on réduit
    if (document.body.classList.contains('sidebar-collapsed')) {
      submenuItems.forEach(item => item.classList.remove('open'));
    }
  });

  // ---------- Ouverture au survol sur desktop (>992px) ----------
  sidebar.addEventListener('mouseenter', () => {
    if (window.innerWidth > 992) {
      document.body.classList.remove('sidebar-collapsed');
    }
  });

  sidebar.addEventListener('mouseleave', () => {
    if (window.innerWidth > 992) {
      document.body.classList.add('sidebar-collapsed');
    }
  });

  // ---------- Sous‑menus ----------
  submenuItems.forEach(item => {
    const link = item.querySelector('.sidebar-link');
    link?.addEventListener('click', (e) => {
      const isOpen = item.classList.contains('open');
      // Fermer tous les autres
      submenuItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      // Bascule
      item.classList.toggle('open', !isOpen);
    });
  });

  // Fermer le sidebar mobile quand on clique sur un lien d'un sous‑menu
  document.querySelectorAll('.sidebar-submenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // ---------- Scroll fluide pour les ancres # ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        if (window.innerWidth <= 768) closeSidebar();
      }
    });
  });

  // ---------- Effet scroll sur la navbar ----------
  const handleNavbarScroll = throttle(() => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 50);
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ---------- Lien actif au scroll ----------
  function updateActiveLink() {
    const scrollPos = window.pageYOffset + 150;
    allSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
  const throttledUpdateActiveLink = throttle(updateActiveLink, 100);
  window.addEventListener('scroll', throttledUpdateActiveLink, { passive: true });

  // ---------- Retour en haut via le logo ----------
  document.getElementById('logo-animated')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Nettoyage au redimensionnement (fermeture du mobile)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) closeSidebar();
    }, 150);
  });
}