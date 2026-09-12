const unsplash = (photo, width) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=max&w=${width}&q=88`

export const images = {
  // High-resolution source photos. The old bundled WebP files were only ~5–6 KB
  // each, so they visibly pixelated when stretched across the storefront.
  hero: unsplash('photo-1764175761007-ae6c79e802b9', 2600),
  bricka: unsplash('photo-1672415780276-c461faa23349', 2000),
  fat: unsplash('photo-1732575886697-0ddcbce961dd', 2000),
  kanna: unsplash('photo-1622201191935-f04ccc4a51f8', 2000),
  skal: unsplash('photo-1720414574220-29403f655201', 2000),
  vas: unsplash('photo-1611078295948-10b3961e1e40', 2000)
}
