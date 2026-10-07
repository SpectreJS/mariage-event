# AGENTS.md — Maison Aurèle

Landing page monopage (React + Vite + SCSS + GSAP + Three.js) pour une agence de décoration événementielle. Déployée sur Netlify (`publish = dist`).

## Architecture

- `src/App.jsx` assemble les sections dans l'ordre : Hero → Intro (#a-propos) → Services (#prestations) → Realisations (#realisations) → Expertise (#savoir-faire) → Stats → Testimonials → Process → FinalCta → Footer (#contact).
- `src/context/UIContext.jsx` est le cœur de l'interaction :
  - instancie **Lenis** et le relie à `gsap.ticker` + `ScrollTrigger.update` ;
  - bloque le scroll tant que le préchargeur n'est pas terminé ou qu'une modale est ouverte ;
  - expose `navigateTo(id)` (rideau `PageTransition` puis saut immédiat), `openQuote(preset?)`, `openProject(project, rect)` et `introDone`.
- `src/data/content.js` contient **tout** le texte. Modifier le contenu ici, jamais en dur dans les composants.
- `src/lib/gsap.js` enregistre les plugins une seule fois ; importer `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP` depuis ce module uniquement.
- `src/lib/img.js` construit les URLs Netlify Image CDN (`img(file, w)`, `srcSet(file)`). Ne jamais référencer `/img/*.png` directement : les originaux font ~2 Mo.

## Conventions

- Un composant/section = `Nom.jsx` + `Nom.scss` (BEM : `.bloc__element.is-state`). Chaque SCSS commence par `@use '../styles/tokens' as *; @use '../styles/mixins' as *;`.
- Animations : toujours dans `useGSAP` avec `scope`, et un garde `prefersReducedMotion()`. Animer `transform`, `opacity` et `clip-path` uniquement.
- `RevealText` découpe en lignes **après** `document.fonts.ready` puis `split.revert()` en fin d'animation (le texte reste responsive). Mode `manual` + `play` pour les animations déclenchées après l'intro.
- Mobile/tactile : pas de tilt 3D, pas de curseur custom, pas de magnétisme ; `GoldDust` divise ses particules par ~3 et se met en pause hors écran (IntersectionObserver).
- Les zones cliquables portant `data-cursor="Libellé"` agrandissent le curseur custom.

## Points non évidents

- Netlify Forms : le formulaire `devis` est déclaré dans `public/__forms.html` (détection au build) et soumis en AJAX vers `/__forms.html`. Tout nouveau champ doit être ajouté dans les deux fichiers.
- Les images de `public/img/` ont été générées pour le projet (Gemini via Netlify AI Gateway) ; aucun générateur n'est embarqué dans le site.
- Three.js est importé dynamiquement (`import('../three/createGoldDust')`) et isolé dans un chunk Vite (`manualChunks`).
