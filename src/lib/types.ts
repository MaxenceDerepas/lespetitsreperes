/**
 * Modèle de données de la boutique.
 *
 * Tous les produits sont NUMÉRIQUES : il n'y a donc ni stock physique,
 * ni poids, ni adresse de livraison dans ce modèle.
 *
 * Cette structure est volontairement proche d'un schéma SQL : elle peut
 * être reprise telle quelle dans Postgres / Supabase (voir README).
 */

export type CategorySlug =
  | 'activites'
  | 'experiences'
  | 'recettes'
  | 'routines-autonomie'
  | 'connexion-emotions';

export type AgeRange = '2-3 ans' | '3-5 ans' | '5-7 ans' | '7-10 ans' | 'Toute la famille';

export type ProductType =
  | 'Fiche PDF'
  | 'Pack PDF'
  | 'Jeu à imprimer'
  | 'Affiche'
  | 'Semainier';

/** Motifs illustrés utilisés pour générer les visuels produits en SVG. */
export type Motif = 'leaf' | 'sun' | 'heart' | 'star' | 'house' | 'palette' | 'chef' | 'tools' | 'gift';

export type AccentKey = 'sage' | 'terracotta' | 'gold' | 'peach' | 'sand' | 'sageLight';

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Phrase courte affichée sur les cartes catégories. */
  tagline: string;
  description: string;
  motif: Motif;
  accent: AccentKey;
  /** Ordre d'affichage dans la navigation et la boutique. */
  order: number;
}

export interface ProductSection {
  title: string;
  body: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Photo à utiliser comme vignette dans la boutique : celle où l'on voit
   * les fiches du pack posées sur la table. Elle est affichée en entier
   * (`object-contain`) pour qu'aucune fiche ne soit coupée. Sans ce
   * marquage, la vignette est simplement la première photo.
   */
  thumb?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Accroche courte, affichée sur les cartes produits. */
  tagline: string;
  /** Prix en centimes d'euro — évite toute erreur d'arrondi. */
  priceCents: number;
  /** Prix barré optionnel (en centimes), pour les packs à tarif avantageux. */
  compareAtCents?: number;
  category: CategorySlug;
  subcategory?: string;
  type: ProductType;
  ages: AgeRange[];
  /** Nombre de pages du PDF. */
  pages: number;
  format: string;
  description: string;
  /** Ce que contient le fichier, en points courts. */
  contents: string[];
  sections?: ProductSection[];
  faq?: ProductFaqItem[];
  motif: Motif;
  accent: AccentKey;
  /**
   * Photos du produit, dans l'ordre d'affichage — la première sert de
   * vignette dans la boutique. Sans photos, le produit garde son visuel
   * dessiné : les deux styles cohabitent le temps que le catalogue soit
   * photographié.
   */
  images?: ProductImage[];
  featured?: boolean;
  isNew?: boolean;
  /** Score utilisé pour le tri « popularité » (démo). */
  popularity: number;
  createdAt: string;
  /**
   * Nom du fichier PDF dans le stockage PRIVÉ.
   * Jamais exposé côté client : seul /api/download/[token] y accède.
   */
  file: string;
  /** Produits associés (slugs). */
  related?: string[];
}


export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  quantity: number;
  motif: Motif;
  accent: AccentKey;
  type: ProductType;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  quantity: number;
  file: string;
  /** Nombre de téléchargements déjà effectués pour cette ligne. */
  downloads: number;
}

export interface Order {
  id: string;
  /** Numéro lisible affiché au client et sur la facture. */
  reference: string;
  email: string;
  firstName?: string;
  lastName?: string;
  items: OrderItem[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  promoCode?: string;
  status: OrderStatus;
  /** Identifiant de la session Stripe Checkout, si le paiement est réel. */
  stripeSessionId?: string;
  /** Mode démonstration : aucun paiement réel n'a eu lieu. */
  demo: boolean;
  createdAt: string;
  paidAt?: string;
  /** Consentement newsletter au moment de la commande. */
  newsletter?: boolean;
}

export interface PromoCode {
  code: string;
  label: string;
  /** Remise en pourcentage (1-100) — exclusif avec amountCents. */
  percentOff?: number;
  /** Remise fixe en centimes — exclusif avec percentOff. */
  amountCents?: number;
  minSubtotalCents?: number;
  expiresAt?: string;
  active: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  author: string;
  motif: Motif;
  accent: AccentKey;
  /**
   * Photo d'illustration, optionnelle. Quand elle existe, elle remplace le
   * motif coloré sur les cartes et coiffe l'article. Sans elle, l'article
   * garde son motif dessiné : les deux styles cohabitent sans trou.
   */
  image?: { src: string; alt: string; width: number; height: number };
  /** Contenu en markdown léger (titres, paragraphes, listes). */
  body: string;
  /** Produits mis en avant en fin d'article. */
  relatedProducts?: string[];
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface FaqItem {
  question: string;
  answer: string;
  group: 'Commande et téléchargement' | 'Impression et utilisation' | 'Paiement et facturation' | 'Contact et aide';
}
