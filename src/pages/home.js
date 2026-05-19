// src/pages/home.js
import { createNavbarHTML } from '../components/navbar.js';
import { createHeroCarouselHTML } from '../components/herocarousel.js';
import { renderSocialSection } from '../components/social.js';
import { createFooter } from '../components/footer.js';

export function renderHome() {
    // Configuration stricte des données du Carrousel d'accueil
    const homeSlides = [
        { type: 'video', src: '/videos/hero-collection.mp4' },
        { type: 'image', src: '/images/pict01.jpeg' },
        { type: 'image', src: '/images/pict02.jpeg' }
    ];

    return `
        ${createNavbarHTML()}
        <div class="main-wrapper" id="main-wrapper">
            ${createHeroCarouselHTML(homeSlides)}
            <main class="main-content">
                <div class="marquee-banner">
                    <div class="marquee-track">
                        <span>★★★★ LIVRAISON GRATUITE À PARTIR DE 100$ D'ACHAT ★★★★ ACHAT À DOMICILE ★★★★ LIVRAISON GRATUITE À PARTIR DE 100$ D'ACHAT ★★★★ ACHAT À DOMICILE ★★★★</span>
                    </div>
                </div>

                <section class="section-boutique" id="boutique">
                    <div class="section-header">
                        <span class="section-tag">Notre Univers</span>
                        <h2 class="section-title">LA BOUTIQUE</h2>
                        <p class="section-desc">Explorez nos catégories haut de gamme conçues pour l'élégance au féminin.</p>
                        <div class="title-underline"></div>
                    </div>

                    <div class="boutique-grid">
                        <div class="boutique-card context-glow" onclick="navigate('/collection?cat=femme')">
                            <div class="card-image" style="background: linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%);">
                                <div class="card-icon"><i class="fas fa-female"></i></div>
                                <div class="card-overlay">
                                    <h3>Prêt-à-porter Femme</h3>
                                    <p>Robes, tailleurs et ensembles exclusifs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                ${renderSocialSection()}
            </main>
            ${createFooter()}
        </div>
    `;
}