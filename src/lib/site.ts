/**
 * Configuration centrale de la marque et du site.
 * Un seul endroit à modifier pour les coordonnées, les réseaux et les mentions légales.
 */

export const site = {
  name: 'Les Petits Repères',
  shortName: 'Les Petits Repères',
  tagline: 'Des outils doux et concrets pour une vie de famille plus sereine',
  promise: 'Des outils doux et concrets pour une vie de famille plus sereine.',
  description:
    'Fiches et packs PDF à imprimer pour accompagner le quotidien des familles : routines, émotions, activités, recettes et outils d’organisation. Téléchargement immédiat.',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000',
  locale: 'fr_FR',
  email: 'petitsreperes@gmail.com',
  instagram: 'https://instagram.com/lespetitsreperes',
  instagramHandle: '@lespetitsreperes',
  founder: {
    name: 'Sandrine',
    role: 'Éducatrice de jeunes enfants, maman de 2 garçons',
  },
  legal: {
    company: 'Les Petits Repères',
    form: 'Entreprise individuelle (micro-entreprise)',
    siret: '000 000 000 00000',
    address: 'France',
    vat: 'TVA non applicable, art. 293 B du CGI',
    hostingProvider: 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
  },
  support: {
    responseTime: 'sous 24 à 48 h ouvrées',
  },
} as const;

export const mainNav = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const trustPoints = [
  'Téléchargement immédiat',
  'Paiement sécurisé',
  'Fichiers PDF haute qualité',
  'Imprimez à volonté',
  'Créé en France',
  'Aucun produit physique envoyé',
] as const;
