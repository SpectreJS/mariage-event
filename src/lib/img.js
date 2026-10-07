// Netlify Image CDN helper — never ship the full-resolution originals.
export const img = (file, w = 1200, q = 78) =>
  `/.netlify/images?url=/img/${file}&w=${w}&fm=webp&q=${q}`

export const srcSet = (file, widths = [640, 1024, 1600, 2200]) =>
  widths.map((w) => `${img(file, w)} ${w}w`).join(', ')
