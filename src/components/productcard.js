// src/components/productcard.js
export function renderProductCard(product) {
  return 
    <div class="product-card fade-in-up">
      ...
    </div>;
    <main class="main-content">
          <div class="marquee-banner">
              <div class="marquee-track">
                  <span>★★★★ LIVRAISON GRATUITE A PARTIR DE 100$ D'ACHAT ★★★★ ACHAT À DOMICILE ★★★★ LIVRAISON GRATUITE A PARTIR DE 100$ D'ACHAT ★★★★ ACHAT À DOMICILE ★★★★</span>
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
                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-femme').scrollIntoView()">
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
                  
                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-homme').scrollIntoView()">
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

                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-enfant').scrollIntoView()">
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

                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-chaussure').scrollIntoView()">
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

                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-sac').scrollIntoView()">
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

                  <div class="boutique-card fade-in-up" onclick="document.getElementById('catalogue-accessoire').scrollIntoView()">
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
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">HABIT FEMME</h2><div class="title-underline"></div>
              </div>
              <div class="product-grid" id="grid-habit-femme"></div>
          </section>

          <section class="section-catalogue" id="catalogue-homme">
              <div class="section-header">
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">HABIT HOMME</h2><div class="title-underline"></div>
              </div>
              <div class="product-grid" id="grid-habit-homme"></div>
          </section>

          <section class="section-catalogue" id="catalogue-enfant">
              <div class="section-header">
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">HABIT ENFANT</h2><div class="title-underline"></div>
              </div>
              <div class="product-grid" id="grid-habit-enfant"></div>
          </section>
          
          <section class="section-catalogue" id="catalogue-chaussure">
              <div class="section-header">
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">CHAUSSURE DAME</h2><div class="title-underline"></div>
              </div>
              <div class="product-grid" id="grid-habit-chaussure"></div>
          </section>

          <section class="section-catalogue" id="catalogue-sac">
              <div class="section-header">
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">SAC DAME</h2><div class="title-underline"></div>
              </div>
              <div class="product-grid" id="grid-habit-sac"></div>
          </section>

          <section class="section-catalogue" id="catalogue-accessoire">
              <div class="section-header">
                  <span class="section-tag">Nouveautés</span><h2 class="section-title">ACCESSOIRE</h2><div class="title-underline"></div>
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

          <section class="section-contact" id="contact">
              <div class="section-header">
                  <span class="section-tag">Nous Joindre</span>
                  <h2 class="section-title">CONTACT</h2>
                  <div class="title-underline"></div>
              </div>
              <div class="contact-grid">
                  <div class="contact-card fade-in-up" id="contact-phone">
                      <div class="contact-icon turquoise"><i class="fab fa-whatsapp"></i></div>
                      <h3>Whatsapp</h3>
                      <p>Contactez-nous directement</p>
                      <a href="#" data-social="whatsapp" class="contact-link">Discuter sur WhatsApp</a>
                  </div>
                  <div class="contact-card fade-in-up" id="contact-email">
                      <div class="contact-icon rose"><i class="fas fa-envelope"></i></div>
                      <h3>E-mail</h3>
                      <p>Envoyez-nous un message</p>
                      <a href="mailto:contact@boutiquecogi.com" class="contact-link">contact@boutiquecogi.com</a>
                  </div>                   
              </div>
          </section>

          <section class="section-reseaux" id="reseaux">
              <div class="section-header">
                  <span class="section-tag">Suivez-nous</span>
                  <h2 class="section-title">RÉSEAUX SOCIAUX</h2>
                  <div class="title-underline"></div>
              </div>
              <div class="social-grid">
                  <a href="#" data-social="whatsapp" class="social-card whatsapp fade-in-up"><div class="social-icon"><i class="fab fa-whatsapp"></i></div><h3>WhatsApp</h3></a>
                  <a href="#" data-social="facebook" class="social-card facebook fade-in-up"><div class="social-icon"><i class="fab fa-facebook-f"></i></div><h3>Facebook</h3></a>
                  <a href="#" data-social="telegram" class="social-card telegram fade-in-up"><div class="social-icon"><i class="fab fa-telegram-plane"></i></div><h3>Telegram</h3></a>
                  <a href="#" data-social="tiktok" class="social-card tiktok fade-in-up"><div class="social-icon"><i class="fab fa-tiktok"></i></div><h3>TikTok</h3></a>
                  <a href="#" data-social="instagram" class="social-card instagram fade-in-up"><div class="social-icon"><i class="fab fa-instagram"></i></div><h3>Instagram</h3></a>
              </div>
          </section>
      </main>
}