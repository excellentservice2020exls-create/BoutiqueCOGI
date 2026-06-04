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
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('tous')">
                            <img src="Media-p-20260218/pict01.webp" alt="Tout voir" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Voir Tout</h3>
                                <p>Explorez l'intégralité de nos collections en un seul coup d'œil.</p>
                                <span class="card-link">Tout découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('Femme')">
                            <img src="Media-p-20260218/pict01.webp" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Habit Femme</h3>
                                <p>Robes élégantes, ensembles raffinés pour la femme moderne.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('Homme')">
                            <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Habit Homme</h3>
                                <p>Costumes impeccables, chemises et looks décontractés.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('Enfant')">
                            <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Habit Enfant</h3>
                                <p>Mode adorable et confortable pour les petits.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('chaussure')">
                            <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Chaussure Dame</h3>
                                <p>Escarpins, sandales, et bottines pour chaque tenue.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('sac')">
                            <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Sac Dame</h3>
                                <p>Sacs à main, pochettes et cabas de luxe.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="handleCategoryAction('accessoire')">
                            <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                            <div class="card-body">
                                <h3>Accessoire</h3>
                                <p>Bijoux, montres, lunettes et autres pour sublimer votre style.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
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