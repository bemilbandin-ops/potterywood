import { images } from './data/assets.js'
import React, { useEffect, useMemo, useState } from 'react'
import { readProducts } from './data/products.js'

const money = value => `${new Intl.NumberFormat('sv-SE').format(value)} kr`

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`arrow arrow-${direction}`}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l1 11h-13l1-11Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>
}

function Header({ cartCount, onCart }) {
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Jord och Ådring, startsida">
        <span className="brand-main">JORD</span><span className="brand-slash">/</span><span className="brand-main">ÅDRING</span>
      </a>
      <nav className="nav-links" aria-label="Huvudmeny">
        <a href="#objekt">Objekt</a>
        <a href="#verkstad">Verkstad</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <button className="cart-button" onClick={onCart} type="button">
        <BagIcon /><span>Varukorg</span><b>{String(cartCount).padStart(2,'0')}</b>
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <h1>TRÄ<br/><span>&amp; LERA</span></h1>
        <p>Små serier och enstaka objekt.<br/>Tillverkade i Borås.</p>
        <a className="text-link" href="#objekt">Se det som finns <ArrowIcon /></a>
      </div>
      <div className="hero-image-wrap">
        <img src={images.hero} alt="Keramik och träföremål på en arbetsbänk i verkstaden" />
        <span className="image-index">01 / VERKSTAD</span>
      </div>
      <div className="hero-side-note">KERAMIK / TRÄARBETE<br/>2026</div>
    </section>
  )
}

function FilterBar({ filter, setFilter, count }) {
  const filters = [['alla','Alla'],['lera','Lera'],['tra','Trä']]
  return (
    <div className="catalog-head">
      <div>
        <span className="section-number">01</span>
        <h2>OBJEKT</h2>
      </div>
      <div className="filter-row" role="group" aria-label="Filtrera produkter">
        {filters.map(([key,label]) => <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>)}
        <span>{String(count).padStart(2,'0')} st</span>
      </div>
    </div>
  )
}

function ProductCard({ product, index, onOpen }) {
  return (
    <article className={`product-card ${product.stock === 0 ? 'sold' : ''}`} onClick={() => onOpen(product)}>
      <button className="product-image" type="button" aria-label={`Visa ${product.title}`}>
        <img src={product.image} alt={product.title} />
        <span className="product-index">{String(index + 1).padStart(2,'0')}</span>
        {product.stock === 0 && <span className="sold-mark">SÅLD</span>}
      </button>
      <div className="product-info">
        <div>
          <h3>{product.title}</h3>
          <p>{product.material}</p>
        </div>
        <strong>{money(product.price)}</strong>
      </div>
    </article>
  )
}

function ProductDialog({ product, onClose, onAdd }) {
  if (!product) return null
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="product-modal" onMouseDown={e => e.stopPropagation()} aria-modal="true" role="dialog" aria-label={product.title}>
        <button className="modal-close" onClick={onClose} aria-label="Stäng">×</button>
        <div className="modal-image"><img src={product.image} alt={product.title}/></div>
        <div className="modal-copy">
          <span className="modal-material">{product.material}</span>
          <h2>{product.title}</h2>
          <p className="modal-note">{product.note}</p>
          <dl>
            <div><dt>Mått</dt><dd>{product.size}</dd></div>
            <div><dt>Lager</dt><dd>{product.stock ? `${product.stock} st` : 'Slutsåld'}</dd></div>
          </dl>
          <div className="modal-buy"><strong>{money(product.price)}</strong><button disabled={!product.stock} onClick={() => onAdd(product)}>{product.stock ? 'Lägg i varukorg' : 'Slutsåld'}</button></div>
        </div>
      </section>
    </div>
  )
}

function CartDrawer({ open, items, onClose, onRemove }) {
  const total = items.reduce((sum,p) => sum + p.price, 0)
  return <>
    <div className={`drawer-shade ${open ? 'open' : ''}`} onClick={onClose}/>
    <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-head"><span>VARUKORG / {String(items.length).padStart(2,'0')}</span><button onClick={onClose}>Stäng</button></div>
      <div className="drawer-items">
        {!items.length && <p className="empty-cart">Tomt här.</p>}
        {items.map((p,i) => <div className="cart-line" key={`${p.id}-${i}`}><img src={p.image} alt=""/><div><strong>{p.title}</strong><span>{p.material}</span></div><b>{money(p.price)}</b><button aria-label={`Ta bort ${p.title}`} onClick={() => onRemove(i)}>×</button></div>)}
      </div>
      <div className="drawer-foot"><div><span>Totalt</span><strong>{money(total)}</strong></div><button disabled={!items.length}>Till kassan</button><small>Demo — ingen betalning är kopplad ännu.</small></div>
    </aside>
  </>
}

function Workshop() {
  return (
    <section className="workshop" id="verkstad">
      <div className="workshop-label"><span>02</span><span>VERKSTAD</span></div>
      <div className="statement">
        <p>FORMEN FÅR<br/>VARA LITE SKEV.</p>
        <p>ÅDRINGEN FÅR<br/>SYNAS.</p>
      </div>
      <div className="workshop-body">
        <div className="workshop-photo"><img src={images.hero} alt="Arbetsbänk med keramik och trä"/></div>
        <div className="workshop-text"><p>Jag gör få exemplar åt gången. Ibland blir det fem, ibland ett. Det som ligger här är det som faktiskt finns.</p><span>— BORÅS, VÄSTERGÖTLAND</span></div>
      </div>
    </section>
  )
}

function Footer() {
  const [sent, setSent] = useState(false)
  return (
    <footer id="kontakt">
      <div className="footer-top"><h2>HÖR AV DIG</h2><a href="mailto:hej@jordadring.se">hej@jordadring.se <ArrowIcon /></a></div>
      <div className="newsletter"><span>Nya objekt, sällan.</span><form onSubmit={e => {e.preventDefault(); setSent(true)}}><input type="email" aria-label="E-post" required placeholder={sent ? 'Tack.' : 'din@epost.se'} disabled={sent}/><button aria-label="Skicka"><ArrowIcon /></button></form></div>
      <div className="footer-bottom"><span>JORD / ÅDRING</span><span>BORÅS · SVERIGE</span><a href="/admin.html">ADMIN</a><span>© 2026</span></div>
    </footer>
  )
}

export default function App() {
  const [products, setProducts] = useState(readProducts)
  const [filter, setFilter] = useState('alla')
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const refresh = () => setProducts(readProducts())
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected || cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected, cartOpen])

  const visible = useMemo(() => filter === 'alla' ? products : products.filter(p => p.category === filter), [products, filter])
  const addToCart = product => { setCart(x => [...x, product]); setSelected(null); setCartOpen(true) }

  return <>
    <Header cartCount={cart.length} onCart={() => setCartOpen(true)} />
    <main>
      <Hero />
      <section className="catalog" id="objekt">
        <FilterBar filter={filter} setFilter={setFilter} count={visible.length}/>
        <div className="product-grid">{visible.map((p,i) => <ProductCard key={p.id} product={p} index={i} onOpen={setSelected}/>)}</div>
      </section>
      <Workshop />
    </main>
    <Footer />
    <ProductDialog product={selected} onClose={() => setSelected(null)} onAdd={addToCart}/>
    <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={i => setCart(x => x.filter((_,idx) => idx !== i))}/>
  </>
}
