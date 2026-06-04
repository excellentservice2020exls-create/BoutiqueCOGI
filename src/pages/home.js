// src/pages/home.js
// Ce fichier contient la fonction de rendu pour la page d'accueil, qui affiche le carrousel d'images et les sections de produits.
// En conditions réelles, tu pourrais également inclure une section de produits en promotion ou les meilleures ventes directement sur la page d'accueil.
// Note : Les données du carrousel sont strictement définies ici pour garantir une expérience cohérente et éviter les erreurs liées à des données dynamiques mal formatées.

import { createNavbarHTML } from '../components/navbar.js';
import { createHeroCarouselHTML } from '../components/herocarousel.js';
import { renderSocialSection } from '../components/social.js';
import { createFooter } from '../components/footer.js';

export function renderHome() {
    // Configuration stricte des données du Carrousel d'accueil
    const homeSlides = [
        { type: 'video', src: '/videos/Vids20260212at0710PM.mp4' },
        { type: 'image', src: '/images/Media-p-20260218/pict01.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict02.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict03.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict04.jpeg' },
        { type: 'video', src: '/videos/Vids20260212at0912PM.mp4' },
        { type: 'image', src: '/images/Media-p-20260218/pict10.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict11.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict12.jpeg' },
        { type: 'image', src: '/images/Media-p-20260218/pict13.jpeg' }
    ];

    const categories = [
        { id: 'tous', title: 'Voir Tout', desc: "L'intégralité de nos collections.", img: 'pict01.webp' },
        { id: 'Femme', title: 'Habit Femme', desc: "Robes élégantes et ensembles raffinés.", img: 'pict01.webp' },
        { id: 'Homme', title: 'Habit Homme', desc: "Costumes impeccables et looks décontractés.", img: 'pict01.jpeg' },
        { id: 'Enfant', title: 'Habit Enfant', desc: "Mode adorable et confortable.", img: 'pict01.jpeg' },
        { id: 'chaussure', title: 'Chaussure Dame', desc: "Escarpins et sandales pour chaque tenue.", img: 'pict01.jpeg' },
        { id: 'sac', title: 'Sac Dame', desc: "Sacs à main et pochettes de luxe.", img: 'pict01.jpeg' },
        { id: 'accessoire', title: 'Accessoire', desc: "Bijoux et montres pour sublimer votre style.", img: 'pict01.jpeg' }
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
                        <span class="section-tag">Notre Collection</span>
                        <h2 class="section-title">BOUTIQUE</h2>
                        <p class="section-desc">Explorez nos catégories pour vous offrir le meilleur de la mode.</p>
                        <div class="title-underline"></div>
                    </div>

                    <div class="boutique-grid">
                        ${categories.map(cat => `
                            <div class="boutique-card fade-in-up" data-category="${cat.id}">
                                <img src="Media-p-20260218/${cat.img}" alt="${cat.title}">
                                <div class="card-body">
                                    <h3>${cat.title}</h3>
                                    <p>${cat.desc}</p>
                                    <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="section-catalogue" id="catalogue-tous">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">TOUTE LA COLLECTION</h2>
                        <div class="title-underline"></div>
                        <div class="search-container">
                            <div class="search-wrapper">
                                <input type="text" id="product-search" class="search-input" placeholder="Rechercher par nom ou référence...">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div class="product-grid" id="grid-habit-tous"></div>
                </section>

                <section class="section-catalogue" id="catalogue-femme">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">HABIT FEMME</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-femme"></div>
                </section>

                <section class="section-catalogue" id="catalogue-homme">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">HABIT HOMME</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-homme"></div>
                </section>

                <section class="section-catalogue" id="catalogue-enfant">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">HABIT ENFANT</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-enfant"></div>
                </section>

                <section class="section-catalogue" id="catalogue-chaussure">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">CHAUSSURE DAME</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-chaussure"></div>
                </section>

                <section class="section-catalogue" id="catalogue-sac">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">SAC DAME</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-sac"></div>
                </section>

                <section class="section-catalogue" id="catalogue-accessoire">
                    <div class="section-header">
                        <span class="section-tag">Nouveautés</span>
                        <h2 class="section-title">ACCESSOIRE</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid" id="grid-habit-accessoire"></div>
                </section>

                <section class="promo-banner">
                    <div class="promo-content fade-in-up">
                        <span class="promo-tag">Service</span>
                        <h2>Achat & Livraison à Domicile</h2>
                        <p>Profitez de notre service personnalisé. Nous vous présentons une partie de nos articles. La livraison se fait directement au lieu de votre choix.</p>
                        <div class="promo-features">
                            <div class="promo-feature"><i class="fas fa-home"></i><span>Achat à Domicile</span></div>
                            <div class="promo-feature"><i class="fas fa-truck"></i><span>Livraison Rapide</span></div>
                            <div class="promo-feature"><i class="fas fa-star"></i><span>Qualité Premium</span></div>
                        </div>
                    </div>
                </section>

                ${renderSocialSection()}
            </main>
            ${createFooter()}
        </div>
    `;
}