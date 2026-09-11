import { products as seedProducts } from './products.js';

const products = JSON.parse(localStorage.getItem('jordadring-admin-products') || 'null') || seedProducts;

const money = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 });
const state = { filter: 'all', cart: JSON.parse(localStorage.getItem('jordadring-cart') || '[]') };
const grid = document.querySelector('#productGrid');
const cart = document.querySelector('#cart');
const cartItems = document.querySelector('#cartItems');
const modal = document.querySelector('#productModal');
const modalContent = document.querySelector('#modalContent');

function renderProducts() {
  const visible = products.filter(p => state.filter === 'all' || p.category === state.filter);
  grid.innerHTML = visible.map((p, i) => `
    <article class="product-card ${i === 0 ? 'product-featured' : ''}" data-id="${p.id}" style="--i:${i}">
      <button class="product-visual" type="button" data-open-product="${p.id}" aria-label="Visa ${p.title}">
        <span class="product-number">${String(products.indexOf(p) + 1).padStart(2, '0')}</span>
        <img src="${p.image}" alt="${p.title}" />
        ${p.stock === 0 ? '<span class="sold-stamp">SLUT</span>' : ''}
      </button>
      <div class="product-info">
        <div><h3>${p.title}</h3><p>${p.material}</p></div>
        <div class="product-buy"><strong>${money.format(p.price)}</strong><button type="button" ${p.stock === 0 ? 'disabled' : ''} data-add="${p.id}" aria-label="Lägg ${p.title} i korgen">${p.stock === 0 ? 'SÅLD' : '+'}</button></div>
      </div>
    </article>`).join('');
}

function persistCart() {
  localStorage.setItem('jordadring-cart', JSON.stringify(state.cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product || product.stock === 0) return;
  const existing = state.cart.find(item => item.id === id);
  if (existing && existing.qty < product.stock) existing.qty += 1;
  else if (!existing) state.cart.push({ id, qty: 1 });
  persistCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  persistCart();
  renderCart();
}

function renderCart() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector('#cartCount').textContent = totalQty;
  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span>∅</span><p>Korgen är tom.</p></div>';
    document.querySelector('#cartTotal').textContent = money.format(0);
    return;
  }
  let total = 0;
  cartItems.innerHTML = state.cart.map(item => {
    const p = products.find(product => product.id === item.id);
    total += p.price * item.qty;
    return `<div class="cart-item"><img src="${p.image}" alt=""/><div><h3>${p.title}</h3><p>${item.qty} × ${money.format(p.price)}</p></div><button type="button" data-remove="${p.id}" aria-label="Ta bort ${p.title}">×</button></div>`;
  }).join('');
  document.querySelector('#cartTotal').textContent = money.format(total);
}

function openCart() { cart.classList.add('is-open'); cart.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); }
function closeCart() { cart.classList.remove('is-open'); cart.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); }

function openProduct(id) {
  const p = products.find(item => item.id === id);
  modalContent.innerHTML = `<div class="modal-layout"><div class="modal-art"><img src="${p.image}" alt="${p.title}"/></div><div class="modal-copy"><span>${p.category === 'lera' ? 'LERA' : 'TRÄ'} / ${p.stock ? `${p.stock} KVAR` : 'SLUT'}</span><h2>${p.title}</h2><p>${p.note}</p><dl><div><dt>Material</dt><dd>${p.material}</dd></div><div><dt>Mått</dt><dd>${p.size}</dd></div></dl><div class="modal-buy"><strong>${money.format(p.price)}</strong><button type="button" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'SÅLD' : 'LÄGG I KORG'}</button></div></div></div>`;
  modal.showModal();
}

document.addEventListener('click', e => {
  const filter = e.target.closest('[data-filter]');
  const add = e.target.closest('[data-add]');
  const remove = e.target.closest('[data-remove]');
  const openProductButton = e.target.closest('[data-open-product]');
  if (filter) {
    state.filter = filter.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('is-active', b === filter));
    renderProducts();
  }
  if (add) addToCart(add.dataset.add);
  if (remove) removeFromCart(remove.dataset.remove);
  if (openProductButton) openProduct(openProductButton.dataset.openProduct);
  if (e.target.closest('[data-close-cart]')) closeCart();
});

document.querySelector('#cartButton').addEventListener('click', openCart);
document.querySelector('#modalClose').addEventListener('click', () => modal.close());
document.querySelector('#checkoutButton').addEventListener('click', () => alert('Kassan kopplas till betalning när backend är på plats.'));
document.querySelector('#newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#newsletterStatus').textContent = 'Klart. Vi hör av oss när något nytt finns.';
  e.currentTarget.reset();
});
document.querySelector('#year').textContent = new Date().getFullYear();

renderProducts();
renderCart();
