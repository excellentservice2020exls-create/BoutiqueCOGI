// scr/pages/collection.js
import { createNavbarHTML } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { renderProductCard } from '../components/productcard.js';

export function renderCollection(category = "femme") {
    // Ici, tu filtrerais tes `productsData` selon la catégorie
    // Simulation d'un tableau de produits pour l'exemple
    const mockProducts = [
        { id: 1, name: 'Robe d\'Émeraude', price: '120', image: 'Media-p-20260218/pict01.jpeg' },
        { id: 2, name: 'Ensemble Tailleur', price: '250', image: 'Media-p-20260218/pict02.jpeg' }
    ];

    const productsHTML = mockProducts.map(p => renderProductCard(p)).join('');

    return `
        ${createNavbarHTML()}
        <div class="main-wrapper" id="main-wrapper">
            <main class="main-content" style="padding-top: 100px;">
                <section class="section-catalogue">
                    <div class="section-header">
                        <span class="section-tag">Notre Sélection</span>
                        <h2 class="section-title">COLLECTION ${category.toUpperCase()}</h2>
                        <div class="title-underline"></div>
                    </div>
                    <div class="product-grid">
                        ${productsHTML || '<p>Aucun article disponible pour le moment.</p>'}
                    </div>
                </section>
            </main>
            ${createFooter()}
        </div>
    `;
}