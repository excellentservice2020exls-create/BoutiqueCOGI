// src/pages/home.js
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
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-femme').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);">
                                <div class="card-icon"><i class="fas fa-female"></i></div>
                                <div class="card-overlay"><span class="card-tag">Femme</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Habit Femme</h3>
                                <p>Robes élégantes, ensembles raffinés pour la femme moderne.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-homme').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #2EC4B6 0%, #1a9e92 100%);">
                                <div class="card-icon"><i class="fas fa-male"></i></div>
                                <div class="card-overlay"><span class="card-tag">Homme</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Habit Homme</h3>
                                <p>Costumes impeccables, chemises et looks décontractés.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-enfant').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);">
                                <div class="card-icon"><i class="fas fa-child"></i></div>
                                <div class="card-overlay"><span class="card-tag">Enfant</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Habit Enfant</h3>
                                <p>Mode adorable et confortable pour les petits.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-chaussure').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #40CFC0 0%, #2EC4B6 100%);">
                                <div class="card-icon"><i class="fas fa-shoe-prints"></i></div>
                                <div class="card-overlay"><span class="card-tag">Chaussures</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Chaussure Dame</h3>
                                <p>Escarpins, sandales, et bottines pour chaque tenue.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-sac').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #E8487F 0%, #ff6b9d 100%);">
                                <div class="card-icon"><i class="fas fa-shopping-bag"></i></div>
                                <div class="card-overlay"><span class="card-tag">Sacs</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Sac Dame</h3>
                                <p>Sacs à main, pochettes et cabas de luxe.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-accessoire').scrollIntoView({ behavior: 'smooth' })">
                            <div class="card-image" style="background: linear-gradient(135deg, #2EC4B6 0%, #ff6b9d 100%);">
                                <div class="card-icon"><i class="fas fa-ring"></i></div>
                                <div class="card-overlay"><span class="card-tag">Accessoires</span></div>
                            </div>
                            <div class="card-body">
                                <h3>Accessoire</h3>
                                <p>Bijoux, montres, lunettes et autres pour sublimer votre style.</p>
                                <span class="card-link">Découvrir <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>
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