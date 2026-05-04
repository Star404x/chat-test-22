// Простая логика каталога обуви и рендер в DOM (CommonJS module для тестирования)

function getCatalog() {
  // Пример товаров; реальная версия может подгружать с API
  return [
    { id: 1, name: 'Runner Classic', price: 79.99, image: '/assets/runner-classic.jpg' },
    { id: 2, name: 'Street Sneak', price: 99.95, image: '/assets/street-sneak.jpg' },
    { id: 3, name: 'Trail Pro', price: 129.0, image: '/assets/trail-pro.jpg' }
  ];
}

function formatPrice(p) {
  return '$' + Number(p).toFixed(2);
}

function renderCatalog(containerSelector) {
  if (!containerSelector) return;
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;

  const items = getCatalog();
  container.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'product-card';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p class="price">${formatPrice(item.price)}</p>
      <button data-id="${item.id}">Add to cart</button>
    `;
    container.appendChild(el);
  });
}

module.exports = {
  getCatalog,
  formatPrice,
  renderCatalog
};
