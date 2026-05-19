export function renderProductCard(socialBaseUrl) {
  return 
    <div class="product-card fade-in-up">
      ...
    </div>;
    <main class="main-content">
          
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