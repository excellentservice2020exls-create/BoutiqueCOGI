// src/pages/productdetail.js
//  import { createNavbarHTML } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';

export function renderProductDetails() {
    // Extraction de l'ID depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // En conditions réelles, tu ferais une recherche dans productsData via l'ID
    
    return `
        ${createNavbarHTML()}
        <div class="main-wrapper" id="main-wrapper">
            <main class="main-content" style="padding-top: 120px; padding-bottom: 80px;">
                <div class="product-details-container" style="max-width: 1200px; margin: 0 auto; display: flex; gap: 40px; padding: 0 40px;">
                    
                    <div class="product-gallery" style="flex: 1;">
                        <img src="Media-p-20260218/pict01.jpeg" alt="Détail Produit" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                    </div>
                    
                    <div class="product-info-full" style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                        <span class="section-tag">Référence: #${productId || '0000'}</span>
                        <h1 class="hero-title" style="color: var(--dark); font-size: 2.5rem; margin-bottom: 10px;">Robe d'Émeraude</h1>
                        <p class="product-price" style="font-size: 2rem; color: var(--rose); font-weight: 900; margin-bottom: 20px;">120.00 $</p>
                        
                        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
                            Une pièce d'exception conçue pour sublimer votre silhouette. Tissu de haute qualité, finitions faites main, parfaite pour vos soirées mondaines.
                        </p>
                        
                        <div style="display: flex; gap: 15px;">
                            <button class="hero-btn" style="flex: 1; justify-content: center;">
                                <i class="fab fa-whatsapp"></i> Commander via WhatsApp
                            </button>
                        </div>
                    </div>

                </div>
            </main>
            ${createFooter()}
        </div>
    `;
}