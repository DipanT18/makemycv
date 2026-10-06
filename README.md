# MakeCV

React + Vite + Tailwind 4 + React Router. CV builder with **separate renderers per output**:
HTML preview (`Preview.jsx`) and PDF (`Pdf.jsx`, @react-pdf/renderer) so neither is squeezed to match the other.

```bash
npm install && npm run dev
```

## Structure
```
src/
  app/        router + providers
  config/     routes, paper sizes, fonts
  context/    CvContext (state, localStorage persistence)
  data/       default CV + settings
  features/   editor (form, toolbar) · preview · export
  pages/      Landing, Templates, Editor, NotFound
  templates/  one folder per template (auto-registered)
  lib/        text + download helpers
```

## Add a template (no other file changes)
1. Copy `src/templates/modern` to `src/templates/<id>`.
2. Edit `Preview.jsx` + CSS (screen) and `Pdf.jsx` (PDF). Keep `index.js` exporting `{ id, name, order, accents, Preview, Pdf }`.
It appears in the gallery, editor and every export automatically (`import.meta.glob`).

## Add an export format
Create `src/features/export/exporters/<id>.js(x)` exporting `{ id, label, hint, ext, run({cv,settings,template}) => Blob }`, then add it to `exporters/index.js`.

## Add a page / feature
Add the path in `config/routes.js`, the page in `pages/`, and the route in `app/router.jsx`. New CV fields: extend `data/defaultCv.js`, `features/editor/steps.js`, then render them in templates.

## Notes
- PDF fonts: built-ins (Helvetica/Times). For custom fonts call `Font.register` in `config/fonts.js`.
- PNG/JPG capture the preview sheet as one image; the PDF paginates automatically.
