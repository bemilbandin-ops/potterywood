import React, { useEffect, useState } from 'react'
import { readProducts, seedProducts } from './data/products.js'

const money = v => `${new Intl.NumberFormat('sv-SE').format(v)} kr`

export default function AdminApp() {
  const [products, setProducts] = useState(readProducts)
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(null)

  useEffect(() => { localStorage.setItem('jordadring-admin-products', JSON.stringify(products)) }, [products])
  const edit = p => { setEditing(p.id); setDraft({...p}) }
  const add = () => { const p = {id:`ny-${Date.now()}`,title:'Nytt objekt',category:'tra',material:'Material',price:0,stock:1,size:'',image: seedProducts[1].image,note:''}; setProducts(x => [...x,p]); edit(p) }
  const save = () => { setProducts(x => x.map(p => p.id === editing ? draft : p)); setEditing(null); setDraft(null) }
  const remove = id => { if (window.confirm('Ta bort objektet?')) setProducts(x => x.filter(p => p.id !== id)) }
  const reset = () => { setProducts(seedProducts); localStorage.removeItem('jordadring-admin-products') }

  return <div className="admin-shell">
    <aside className="admin-rail"><a href="/" className="admin-mark">J/A</a><span>ADMIN</span><a href="/">← BUTIK</a></aside>
    <main className="admin-main">
      <header className="admin-header"><div><span>JORD / ÅDRING</span><h1>OBJEKT</h1></div><div className="admin-header-actions"><button onClick={reset}>Återställ</button><button className="admin-primary" onClick={add}>+ NYTT OBJEKT</button></div></header>
      <div className="admin-status"><span>{products.length} objekt</span><span>Data sparas lokalt i webbläsaren</span></div>
      <section className="admin-list">
        {products.map((p,i) => <article className="admin-row" key={p.id}>
          <span className="admin-index">{String(i+1).padStart(2,'0')}</span><div className="admin-thumb"><img src={p.image} alt=""/></div><div className="admin-name"><strong>{p.title}</strong><span>{p.material}</span></div><div className="admin-cell"><span>LAGER</span><b>{p.stock}</b></div><div className="admin-price">{money(p.price)}</div><div className="admin-actions"><button onClick={() => edit(p)}>REDIGERA</button><button onClick={() => remove(p.id)}>TA BORT</button></div>
        </article>)}
      </section>
    </main>
    {draft && <div className="admin-modal-wrap" onMouseDown={() => setDraft(null)}><div className="admin-modal" onMouseDown={e=>e.stopPropagation()}><div className="admin-modal-head"><h2>REDIGERA OBJEKT</h2><button onClick={()=>setDraft(null)}>×</button></div>
      <label>Namn<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label>
      <div className="admin-form-grid"><label>Pris<input type="number" value={draft.price} onChange={e=>setDraft({...draft,price:Number(e.target.value)})}/></label><label>Lager<input type="number" value={draft.stock} onChange={e=>setDraft({...draft,stock:Number(e.target.value)})}/></label></div>
      <label>Material<input value={draft.material} onChange={e=>setDraft({...draft,material:e.target.value})}/></label>
      <label>Beskrivning<textarea rows="4" value={draft.note} onChange={e=>setDraft({...draft,note:e.target.value})}/></label>
      <div className="admin-modal-actions"><button onClick={()=>setDraft(null)}>Avbryt</button><button className="admin-primary" onClick={save}>Spara</button></div>
    </div></div>}
  </div>
}
