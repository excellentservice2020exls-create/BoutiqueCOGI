// src/pages/productdetail.js
// Remarque l'utilisation des backticks (`) pour la multi-ligne
// Ce fichier est dédié à la page de détail d'un produit. Il extrait l'ID du produit depuis l'URL et affiche les informations correspondantes.
// En conditions réelles, tu ferais une recherche dans productsData via l'ID pour afficher les détails spécifiques du produit sélectionné.

import { createNavbarHTML } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
// Note : En conditions réelles, tu importerais également les données des produits pour afficher les détails spécifiques.
export function renderProductDetails() {
    // Extraction de l'ID depuis l'URL
    // Exemple d'URL : http://localhost:3000/product?id=123
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // En conditions réelles, tu ferais une recherche dans productsData via l'ID
    // const product = productsData.find(p => p.id === productId);
    return `
        ${createNavbarHTML()}
        <div class="main-wrapper" id="main-wrapper">
            <main class="main-content detail-page-padding" id="product-detail-content">
                <div class="product-details-container" id="detail-container">
                    
                    <div class="product-gallery skeleton-image" style="min-height: 500px;">
                        <!-- L'image sera injectée ici -->
                    </div>
                    
                    <div class="product-info-full">
                        <div class="skeleton-title" style="width: 150px; height: 20px; margin-bottom: 20px;"></div>
                        <div class="skeleton-title" style="width: 80%; height: 40px; margin-bottom: 20px;"></div>
                        <div class="skeleton-line" style="width: 100px; height: 30px; margin-bottom: 30px;"></div>
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                        <div class="action-buttons" style="margin-top: 40px;">
                            <div class="skeleton-line" style="width: 100%; height: 50px; border-radius: 30px;"></div>
                        </div>
                    </div>
                </div>
            </main>
            ${createFooter()}
        </div>
    `;
}