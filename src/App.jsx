import React, { useEffect, useMemo, useState } from 'react'
import { images } from './data/assets.js'
import { readProducts } from './data/products.js'
import { ArrowIcon, CartDrawer, Footer, Header, ProductCard, ProductModal } from './components/ShopUi.jsx'

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
    const modalOpen = Boolean(selected || cartOpen)
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return
      setSelected(null)
      setCartOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selected, cartOpen])

  const visibleProducts = useMemo(
    () => filter === 'alla' ? products : products.filter(product => product.category === filter),
    [filter, products],
  )

  const addToCart = product => {
    setCart(items => [...items, product])
    setSelected(null)
    setCartOpen(true)
  }

  const secondaryImage = products.find(product => product.stock > 0)?.image || images.kanna

  return (
    <>
      <Header cartCount={cart.length} onCart={() => setCartOpen(true)} />
      <main>
        <section className="hero" id="top">
          <div className="hero-stage">
            <div className="hero-photo hero-photo-main"><img src={images.hero} alt="Arbetsyta med keramik och trä" /></div>
            <div className="hero-photo hero-photo-detail"><img src={secondaryImage} alt="Detalj av ett aktuellt objekt" /></div>
            <div className="hero-copy">
              <p>Trä + lera · Borås</p>
              <h1>Små upplagor.<br />Inget lagerberg.</h1>
              <a href="#objekt">Se objekten <ArrowIcon /></a>
            </div>
            <div className="hero-note"><span>01</span><p>Det som finns på sidan är det som finns i verkstaden.</p></div>
          </div>
        </section>

        <section className="products-section" id="objekt">
          <div className="section-head">
            <div><span>Aktuellt</span><h2>Det som finns.</h2></div>
            <div className="filters" role="group" aria-label="Filtrera produkter">
              {[
                ['alla', 'Alla'],
                ['lera', 'Lera'],
                ['tra', 'Trä'],
              ].map(([key, label]) => (
                <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="product-rail">
            {visibleProducts.map(product => <ProductCard key={product.id} product={product} onOpen={setSelected} />)}
          </div>
          <p className="rail-hint">Dra åt sidan för fler objekt</p>
        </section>

        <section className="studio" id="verkstad">
          <div className="studio-copy">
            <span>Verkstaden</span>
            <h2>Fem stycken<br />är en stor serie här.</h2>
            <p>Trä och stengods. Små upplagor, ibland bara ett exemplar.</p>
            <a href="mailto:hej@jordadring.se">Fråga om ett objekt <ArrowIcon /></a>
          </div>
          <div className="studio-photo"><img src={images.hero} alt="Verkstaden i Borås" loading="lazy" /><span>Borås · 2026</span></div>
        </section>
      </main>

      <Footer />
      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={index => setCart(items => items.filter((_, itemIndex) => itemIndex !== index))} />
    </>
  )
}
