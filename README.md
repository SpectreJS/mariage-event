# Maison Aurèle — Décoration événementielle

Landing page premium et immersive pour **Maison Aurèle**, atelier parisien de décoration événementielle haut de gamme (mariages, célébrations, événements professionnels, décors sur mesure).

## Technologies

- **React 19 + Vite 7** — application monopage
- **SCSS** (Dart Sass, modules `@use`) — design tokens, mixins, un fichier de style par composant
- **GSAP 3** (ScrollTrigger, SplitText, `@gsap/react`) — reveals, parallaxe, compteurs, boutons magnétiques, transitions
- **Lenis** — défilement fluide synchronisé avec le ticker GSAP
- **Three.js** — poussière dorée en shader (hero et CTA final), chargée à la demande
- **Netlify Forms** — formulaire « Demander un devis »
- **Netlify Image CDN** — toutes les photos sont servies redimensionnées en WebP

## Lancer en local

```bash
npm install
netlify dev        # recommandé : émule l'Image CDN et Netlify Forms
# ou
npm run dev        # Vite seul (les URLs /.netlify/images ne seront pas transformées)
```

## Structure

```
src/
  data/content.js      tout le contenu éditorial (textes, prestations, projets, chiffres…)
  context/UIContext    scroll fluide, transitions de page, état des modales
  components/          briques réutilisables (RevealText, RevealImage, MagneticButton, GoldDust…)
  sections/            une section de page = un .jsx + un .scss
  three/               scène Three.js vanilla
  styles/              tokens, mixins, base
public/
  img/                 photographies générées pour le projet
  __forms.html         squelette statique pour la détection Netlify Forms
```

Les demandes de devis sont consultables dans l'interface Netlify, onglet **Forms** (formulaire `devis`).
