import { products as seed } from './products.js';
const key = 'jordadring-admin-products';
let products = JSON.parse(localStorage.getItem(key) || 'null') || structuredClone(seed);
const list = document.querySelector('#adminList');
const editor = document.querySelector('#editor');
const form = document.querySelector('#editorForm');
let editingId = null;
const money = new Intl.NumberFormat('sv-SE', { style:'currency', currency:'SEK', maximumFractionDigits:0 });

function save(){ localStorage.setItem(key, JSON.stringify(products)); render(); }
function render(){
  list.innerHTML = products.map((p,i)=>`<article class="admin-row"><span class="row-index">${String(i+1).padStart(2,'0')}</span><div class="row-thumb"><img src="${p.image}" alt=""></div><div class="row-name"><strong>${p.title}</strong><span>${p.material}</span></div><div class="row-stock"><span>LAGER</span><strong>${p.stock}</strong></div><div class="row-price">${money.format(p.price)}</div><div class="row-actions"><button data-edit="${p.id}" type="button">REDIGERA</button><button data-delete="${p.id}" type="button">TA BORT</button></div></article>`).join('');
}
function openEditor(id){
  const p = products.find(x=>x.id===id); editingId=id;
  form.elements.title.value=p.title; form.elements.price.value=p.price; form.elements.stock.value=p.stock; form.elements.material.value=p.material; form.elements.note.value=p.note || '';
  editor.showModal();
}
document.addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit]'); const del=e.target.closest('[data-delete]');
  if(edit) openEditor(edit.dataset.edit);
  if(del){ products=products.filter(p=>p.id!==del.dataset.delete); save(); }
});
document.querySelector('#newProduct').addEventListener('click',()=>{
  const id=`objekt-${Date.now()}`; products.unshift({id,title:'Nytt objekt',category:'lera',material:'Stengods',price:0,stock:1,size:'',image:'./assets/products/kanna.svg',note:''}); save(); openEditor(id);
});
form.addEventListener('submit',e=>{
  if(e.submitter?.value==='cancel') return;
  e.preventDefault(); const p=products.find(x=>x.id===editingId); if(!p)return;
  p.title=form.elements.title.value; p.price=Number(form.elements.price.value); p.stock=Number(form.elements.stock.value); p.material=form.elements.material.value; p.note=form.elements.note.value; save(); editor.close();
});
render();
