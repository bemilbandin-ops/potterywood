import { images } from './assets.js'

export const seedProducts = [
  {
    id: 'kanna-01',
    title: 'Kanna 01',
    category: 'lera',
    material: 'Stengods · järnvit glasyr',
    price: 680,
    stock: 2,
    size: 'H 18 cm · ca 0,8 L',
    image: images.kanna,
    note: 'Tung fot, dragen pip och en glasyr som går tunnare över kanterna.'
  },
  {
    id: 'fat-ask',
    title: 'Fat i ask',
    category: 'tra',
    material: 'Ask · hårdvaxolja',
    price: 520,
    stock: 1,
    size: '27 × 22 × 3 cm',
    image: images.fat,
    note: 'Urfräst ur ett stycke ask med en låg, mjuk kant och synlig ådring.'
  },
  {
    id: 'skal-03',
    title: 'Skål 03',
    category: 'lera',
    material: 'Stengods · brun askglasyr',
    price: 390,
    stock: 3,
    size: 'Ø 14 cm · H 7 cm',
    image: images.skal,
    note: 'Låg form med mörkare glasyr invändigt och tydliga drejspår.'
  },
  {
    id: 'bricka-valnot',
    title: 'Serveringsbräda / valnöt',
    category: 'tra',
    material: 'Valnöt · hårdvaxolja',
    price: 590,
    stock: 1,
    size: '42 × 16 × 2 cm',
    image: images.bricka,
    note: 'Smal bräda med handtag, mjukt rundade kanter och en kraftig ådring.'
  },
  {
    id: 'vas-02',
    title: 'Vas 02',
    category: 'lera',
    material: 'Stengods · askglasyr',
    price: 760,
    stock: 0,
    size: 'H 24 cm · Ø 13 cm',
    image: images.vas,
    note: 'Smal hals och glansig askglasyr med mörka brytningar. Exemplaret är sålt.'
  }
]

export const readProducts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('jordadring-admin-products'))
    return Array.isArray(stored) && stored.length ? stored : seedProducts
  } catch {
    return seedProducts
  }
}
