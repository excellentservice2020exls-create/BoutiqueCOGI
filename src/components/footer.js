// src/components/footer.js
export function createFooter() {
    return `
    <footer class="footer" id="footer">
        <div class="footer-top">
            <div class="footer-col footer-brand">
                <div class="footer-logo"><i class="fas fa-gem"></i><span>Boutique <strong>COGI</strong></span></div>
                <p>Votre vitrine de luxe exclusive. Découvrez nos sélections haut de gamme et profitez d'une livraison soignée à domicile.</p>
            </div>
            <div class="footer-col">
                <h4>BOUTIQUE</h4>
                <ul>
                    <li><button class="footer-link-btn" onclick="navigate('/collection?cat=femme')">FEMME</button></li>
                    <li><button class="footer-link-btn" onclick="navigate('/collection?cat=homme')">HOMME</button></li>
                    <li><button class="footer-link-btn" onclick="navigate('/collection?cat=enfant')">ENFANT</button></li>
                    <li><button class="footer-link-btn" onclick="navigate('/collection?cat=sac')">SAC</button></li>
                    <li><button class="footer-link-btn" onclick="navigate('/collection?cat=accessoire')">ACCESSOIRE</button></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>CONTACT</h4>
                <ul>
                    <li><i class="fas fa-envelope"></i> contact@boutiquecogi.com</li>
                    <li><i class="fab fa-whatsapp"></i> +243 819...</li>
                    <li><i class="fas fa-map-marker-alt"></i> République Démocratique du Congo</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Boutique COGI — Tous droits réservés.</p>
        </div>
    </footer>
    `;
}