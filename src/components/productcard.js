// src/components/productcard.js
// Remarque l'utilisation des backticks (`) pour la multi-ligne
export function renderProductCard(product) {
    // Utilisation de valeurs par défaut pour la robustesse
    const name = product?.name || 'Article Inconnu';
    const price = product?.price || '0.00';
    const image = product?.image || '/placeholder.jpg';
    const id = product?.id || '0';
    const formattedPrice = price.toString().trim();

    return `
    <div class="product-card fade-in-up" data-id="${id}">
        <div class="product-image-container">
            <img src="${image}" loading="lazy" alt="Image de ${name}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${name}</h3>
            <div class="product-badges">
                <span class="badge badge-size"><i class="fas fa-ruler"></i> Tailles variées</span>
            </div>
            <p class="product-price">${formattedPrice}</p>
            <button class="btn-buy" onclick="navigate('/product?id=${id}')">
                <i class="fas fa-shopping-bag"></i> Découvrir
            </button>
        </div>
    </div>
    `;
}