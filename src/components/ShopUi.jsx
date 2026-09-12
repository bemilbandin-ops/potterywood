import React from 'react'

const money = value => `${new Intl.NumberFormat('sv-SE').format(value)} kr`

export function ArrowIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 8.5h11l1 11h-13l1-11Z" />
      <path d="M9 9V6.7a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

export function Header({ cartCount, onCart }) {
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Jord och Ådring, startsida">
        <span className="brand-mark">JÅ</span>
        <span className="brand-name">Jord &amp; Ådring</span>
      </a>
      <nav className="nav-links" aria-label="Huvudmeny">
        <a href="#objekt">Objekt</a>
        <a href="#verkstad">Verkstad</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <button className="cart-button" type="button" onClick={onCart} aria-label={`Öppna varukorg, ${cartCount} varor`}>
        <BagIcon /><span>Varukorg</span><b>{cartCount}</b>
      </button>
    </header>
  )
}

export function ProductCard({ product, onOpen }) {
  return (
    <article className={`product-card ${product.stock === 0 ? 'is-sold' : ''}`}>
      <button className="product-photo" type="button" onClick={() => onOpen(product)} aria-label={`Visa ${product.title}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className={`stock-chip ${product.stock === 0 ? 'sold' : ''}`}>{product.stock === 0 ? 'Såld' : `${product.stock} kvar`}</span>
        <span className="product-view">Visa <ArrowIcon /></span>
      </button>
      <button className="product-meta" type="button" onClick={() => onOpen(product)}>
        <span><strong>{product.title}</strong><small>{product.material}</small></span>
        <b>{money(product.price)}</b>
      </button>
    </article>
  )
}

export function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-label={product.title} onMouseDown={event => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Stäng">×</button>
        <div className="modal-photo"><img src={product.image} alt={product.title} /></div>
        <div className="modal-copy">
          <span className="modal-material">{product.material}</span>
          <h2>{product.title}</h2>
          <p>{product.note}</p>
          <dl>
            <div><dt>Mått</dt><dd>{product.size}</dd></div>
            <div><dt>Lager</dt><dd>{product.stock ? `${product.stock} st` : 'Slutsåld'}</dd></div>
          </dl>
          <div className="modal-buy">
            <strong>{money(product.price)}</strong>
            <button type="button" disabled={!product.stock} onClick={() => onAdd(product)}>{product.stock ? 'Lägg i varukorg' : 'Slutsåld'}</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export function CartDrawer({ open, items, onClose, onRemove }) {
  const total = items.reduce((sum, product) => sum + product.price, 0)
  return (
    <>
      <button className={`drawer-shade ${open ? 'open' : ''}`} onClick={onClose} aria-label="Stäng varukorg" tabIndex={open ? 0 : -1} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div><small>Varukorg</small><strong>{items.length} {items.length === 1 ? 'vara' : 'varor'}</strong></div>
          <button type="button" onClick={onClose}>Stäng</button>
        </div>
        <div className="drawer-items">
          {!items.length && <div className="empty-cart"><span>Tomt.</span><p>Objekten du väljer hamnar här.</p></div>}
          {items.map((product, index) => (
            <div className="cart-line" key={`${product.id}-${index}`}>
              <img src={product.image} alt="" />
              <div><strong>{product.title}</strong><span>{product.material}</span></div>
              <b>{money(product.price)}</b>
              <button type="button" onClick={() => onRemove(index)} aria-label={`Ta bort ${product.title}`}>×</button>
            </div>
          ))}
        </div>
        <div className="drawer-foot">
          <div><span>Totalt</span><strong>{money(total)}</strong></div>
          <button type="button" disabled={!items.length}>Till kassan</button>
          <small>Demo — betalning är inte kopplad ännu.</small>
        </div>
      </aside>
    </>
  )
}

export function Footer() {
  return (
    <footer id="kontakt" className="site-footer">
      <div className="footer-main"><span>Jord &amp; Ådring</span><a href="mailto:hej@jordadring.se">hej@jordadring.se <ArrowIcon /></a></div>
      <div className="footer-bottom"><span>Borås · Sverige</span><span>© 2026</span><a href="/admin.html">Admin</a></div>
    </footer>
  )
}
