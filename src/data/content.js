// Tout le contenu éditorial de la page — modifier ici, pas dans les composants.

export const brand = {
  name: 'Maison Aurèle',
  tagline: 'Décoration événementielle',
  email: 'bonjour@maison-aurele.fr',
  phone: '+33 1 84 60 27 15',
  phoneHref: 'tel:+33184602715',
  address: ['18 rue de Charonne', '75011 Paris'],
  area: 'Paris · Provence · Côte d’Azur · Partout en France',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
}

export const nav = [
  { label: 'Accueil', id: 'accueil' },
  { label: 'Prestations', id: 'prestations' },
  { label: 'Réalisations', id: 'realisations' },
  { label: 'À propos', id: 'a-propos' },
  { label: 'Contact', id: 'contact' },
]

export const services = [
  {
    id: 'mariages',
    index: '01',
    title: 'Mariages',
    text: 'De la cérémonie au dîner, une scénographie pensée comme le prolongement de votre histoire.',
    image: 'service-mariage.png',
  },
  {
    id: 'celebrations',
    index: '02',
    title: 'Anniversaires & célébrations',
    text: 'Des décors intimes ou spectaculaires pour marquer les dates qui comptent.',
    image: 'service-anniversaire.png',
  },
  {
    id: 'professionnels',
    index: '03',
    title: 'Événements professionnels',
    text: 'Galas, lancements, séminaires : une image de marque mise en scène avec exigence.',
    image: 'service-pro.png',
  },
  {
    id: 'sur-mesure',
    index: '04',
    title: 'Décoration sur mesure',
    text: 'Installations florales, pièces uniques et univers imaginés pour un seul moment.',
    image: 'service-surmesure.png',
  },
]

export const projects = [
  {
    id: 'clara-antoine',
    title: 'Clara & Antoine',
    subtitle: 'Un mariage sous les oliviers',
    category: 'Mariage',
    place: 'Château de Lourmarin, Provence',
    year: '2025',
    guests: '180 invités',
    image: 'real-1.png',
    layout: 'tall',
    text: 'Une cour de château transformée en salle de bal à ciel ouvert : guirlandes lumineuses, longues tables en lin, bouquets sauvages d’ivoire et de sauge cueillis le matin même.',
    details: ['Scénographie de cour', 'Fleurs de saison', 'Éclairage guinguette', 'Mobilier en chêne'],
  },
  {
    id: 'lumiere-azur',
    title: 'Lumière d’Azur',
    subtitle: 'Réception au coucher du soleil',
    category: 'Mariage',
    place: 'Saint-Jean-Cap-Ferrat',
    year: '2025',
    guests: '120 invités',
    image: 'real-2.png',
    layout: 'wide',
    text: 'Une terrasse suspendue au-dessus de la Méditerranée, des voilages ivoire portés par le vent et une palette inspirée de l’heure dorée.',
    details: ['Canopée en voile de coton', 'Assises en rotin', 'Pampas & graminées', 'Coordination jour J'],
  },
  {
    id: 'pivoines-or',
    title: 'Pivoines & Or',
    subtitle: 'Dîner privé',
    category: 'Célébration',
    place: 'Paris 8e',
    year: '2024',
    guests: '40 invités',
    image: 'real-3.png',
    layout: 'square',
    text: 'Une table miroir, des pivoines par centaines et de la feuille d’or posée à la main : un dîner pensé comme une nature morte flamande.',
    details: ['Compositions florales', 'Arts de la table', 'Bougies sur mesure'],
  },
  {
    id: 'maison-ombre',
    title: 'Maison Ombre',
    subtitle: 'Lancement de collection',
    category: 'Professionnel',
    place: 'Appartement haussmannien, Paris',
    year: '2024',
    guests: '250 invités',
    image: 'real-4.png',
    layout: 'wide',
    text: 'Pour le lancement d’une maison de parfum : un bar en laque noire, une composition florale monumentale et un éclairage de galerie.',
    details: ['Scénographie de marque', 'Installation florale monumentale', 'Création lumière'],
  },
  {
    id: 'victoire',
    title: 'Les 50 ans de Victoire',
    subtitle: 'Dîner aux chandelles',
    category: 'Anniversaire',
    place: 'Caves de Beaune, Bourgogne',
    year: '2025',
    guests: '70 invités',
    image: 'real-5.png',
    layout: 'tall',
    text: 'Des voûtes de pierre centenaires, des candélabres en laiton et un camaïeu bordeaux et ivoire pour une soirée aussi chaleureuse qu’un grand cru.',
    details: ['Candélabres anciens', 'Fleurs bordeaux & ivoire', 'Table impériale'],
  },
  {
    id: 'matin-jardin',
    title: 'Un matin au jardin',
    subtitle: 'Cérémonie laïque',
    category: 'Mariage',
    place: 'Domaine de Chantilly',
    year: '2023',
    guests: '150 invités',
    image: 'real-6.png',
    layout: 'wide',
    text: 'Une arche circulaire de fleurs blanches posée au cœur d’un parc, des bancs en bois et la brume du matin comme seul voile.',
    details: ['Arche florale circulaire', 'Allée de cérémonie', 'Signalétique calligraphiée'],
  },
]

export const expertise = [
  { title: 'Conception', text: 'Planches d’ambiance, plans et maquettes pour visualiser chaque espace.' },
  { title: 'Scénographie', text: 'Mise en espace, parcours invités et points de vue soigneusement composés.' },
  { title: 'Décoration', text: 'Arts de la table, textiles et objets chinés ou fabriqués pour vous.' },
  { title: 'Fleurs', text: 'Compositions de saison réalisées dans notre atelier parisien.' },
  { title: 'Mobilier', text: 'Une collection de pièces rares, complétée par nos artisans partenaires.' },
  { title: 'Éclairage', text: 'Bougies, lustres et création lumière pour sculpter l’atmosphère.' },
  { title: 'Coordination', text: 'Une équipe présente du montage au démontage, en toute discrétion.' },
]

export const stats = [
  { value: 100, suffix: '+', label: 'événements imaginés' },
  { value: 50, suffix: '+', label: 'mariages célébrés' },
  { value: 10, suffix: '', label: 'ans d’expérience' },
  { value: 100, suffix: '%', label: 'passion' },
]

export const testimonials = [
  {
    quote: 'Nous avions une idée floue, Maison Aurèle en a fait un rêve précis. Nos invités en parlent encore, et nous aussi.',
    name: 'Clara & Antoine',
    context: 'Mariage — Provence',
  },
  {
    quote: 'Une équipe d’une rare élégance, capable de traduire l’ADN de notre marque en une soirée d’émotion pure.',
    name: 'Hélène Marchetti',
    context: 'Directrice communication — Maison Ombre',
  },
  {
    quote: 'Chaque bougie, chaque fleur avait sa place. Je n’ai eu qu’à profiter de mes cinquante ans, entourée.',
    name: 'Victoire D.',
    context: 'Anniversaire — Bourgogne',
  },
]

export const steps = [
  { index: '01', title: 'Échange', text: 'Un premier rendez-vous pour écouter votre histoire, vos envies et vos contraintes.' },
  { index: '02', title: 'Concept', text: 'Une direction artistique, des planches d’ambiance et un devis détaillé.' },
  { index: '03', title: 'Création', text: 'Fleurs, mobilier, pièces sur mesure : l’atelier donne vie au projet.' },
  { index: '04', title: 'Installation', text: 'Notre équipe installe chaque détail, au millimètre, le jour venu.' },
  { index: '05', title: 'Événement', text: 'Vous recevez. Nous veillons, en coulisses, à ce que tout soit parfait.' },
]

export const eventTypes = ['Mariage', 'Anniversaire / célébration', 'Événement professionnel', 'Décoration sur mesure', 'Autre']
