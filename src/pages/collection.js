// src/pages/collection.js
export function renderCollection(category = 'femme') {
  const currentCategory = category ? category.toString().trim() : 'femme';
  const title = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).toLowerCase();

  // Le wrapper global et les composants fixes (Nav/Footer) sont gérés par le main.js
  return `
    <div class="main-wrapper" id="main-wrapper">
      <main class="main-content" style="padding-top: 100px;">
        <section class="section-catalogue">
          <div class="section-header">
            <span class="section-tag">Notre Sélection</span>
            <h2 class="section-title">COLLECTION ${title}</h2>
            <div class="title-underline"></div>
          </div>
          <div class="product-grid" id="product-grid">
            <p style="text-align:center; width:100%; color:var(--text-secondary);">Chargement des articles...</p>
          </div>
        </section>
      </main>
    </div>
  `;
}