# JORD / ÅDRING

A dependency-free storefront for a small pottery and woodworking shop. The interface is built as a multi-file HTML/CSS/ES-module project with original SVG product artwork, responsive layouts, a working local cart, product detail dialog, filters, newsletter interaction and a local admin prototype.

## Run locally

```powershell
Set-Location .\potterywood
python -m http.server 4173
```

Open `http://localhost:4173`.

## Admin prototype

Open `/admin.html`. Product edits are stored in `localStorage` under `jordadring-admin-products` and are read by the storefront. This deliberately keeps the UI/data boundary simple so the storage layer can later be replaced with authenticated backend calls without redesigning the interface.

## Structure

- `index.html` — storefront shell and no-JS product fallback
- `admin.html` — local admin prototype
- `css/` — storefront and admin styles
- `js/products.js` — seed product data
- `js/app.js` — storefront state/interactions
- `js/admin.js` — local admin editing
- `assets/` — original SVG brand, workshop and product artwork
