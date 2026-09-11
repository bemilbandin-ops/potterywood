# JORD / ÅDRING

Vite + React storefront prototype for a small Swedish pottery and woodworking shop.

## Start

```powershell
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

## Production build

```powershell
npm run build
```

## Admin

Open `/admin.html`. Product edits are saved to `localStorage` and use the same product data shape as the storefront, so the storage layer can later be replaced with authenticated backend/API calls.

## Images

The current hero and product photography is original generated placeholder imagery matched to each listed object. The optimized WebP files live under `public/assets/`. Replace those files with real shop photography later without changing the storefront components or product model.
