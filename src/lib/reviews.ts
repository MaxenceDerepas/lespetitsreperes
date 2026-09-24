import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { Review, ReviewStatus } from './types';
import { getOrdersByEmail } from './orders';

/**
 * Avis clients.
 *
 * ---------------------------------------------------------------------------
 *  DEUX RÈGLES QUI NE BOUGENT PAS
 *
 *  1. Seul quelqu'un qui a réellement acheté le produit peut le noter. La
 *     vérification se fait côté serveur, sur les commandes payées liées à
 *     l'adresse de la session — le formulaire ne transporte jamais la preuve
 *     d'achat, qui serait alors falsifiable.
 *  2. Rien ne s'affiche avant relecture. Un avis déposé est « en attente » ;
 *     il n'apparaît sur la fiche produit qu'une fois publié depuis /admin.
 *     C'est ce qui protège la boutique des messages injurieux ou des liens
 *     indésirables.
 *
 *  L'adresse email est conservée pour pouvoir répondre et pour empêcher les
 *  doublons, mais elle n'est jamais rendue publique : seul le prénom est
 *  affiché.
 * ---------------------------------------------------------------------------
 *
 *  PASSAGE EN PRODUCTION
 *  Même principe que les commandes : un fichier JSON suffit pour démarrer.
 *  Avec DATABASE_URL :
 *
 *    reviews(id PRIMARY KEY, product_id, order_id, email, display_name,
 *            rating, body, status, created_at, reviewed_at)
 * ---------------------------------------------------------------------------
 */

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'reviews.json');

export const bodyMinLength = 20;
export const bodyMaxLength = 1500;

function readAll(): Review[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

function writeAll(reviews: Review[]): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), {
      encoding: 'utf8',
      mode: 0o600,
    });
  } catch (error) {
    console.error('[reviews] Écriture impossible :', error);
  }
}

/* ------------------------------- Lecture -------------------------------- */

export function getAllReviews(): Review[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReviewsByStatus(status: ReviewStatus): Review[] {
  return getAllReviews().filter((review) => review.status === status);
}

/** Les avis visibles du public : uniquement ceux qui ont été relus. */
export function getPublishedReviews(productId: string): Review[] {
  return readAll()
    .filter((review) => review.productId === productId && review.status === 'published')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getReviewByCustomer(email: string, productId: string): Review | undefined {
  const normalized = email.trim().toLowerCase();
  return readAll().find(
    (review) => review.email === normalized && review.productId === productId,
  );
}

export function getReviewsByCustomer(email: string): Review[] {
  const normalized = email.trim().toLowerCase();
  return getAllReviews().filter((review) => review.email === normalized);
}

/** Note moyenne et nombre d'avis publiés, ou null s'il n'y en a aucun. */
export function ratingSummary(productId: string): { average: number; count: number } | null {
  const reviews = getPublishedReviews(productId);
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
}

/* ------------------------------ Vérification ----------------------------- */

/**
 * La personne a-t-elle acheté ce produit ?
 * On ne regarde que les commandes payées : une commande abandonnée au
 * paiement ne donne pas le droit de noter.
 */
export function purchasedOrderId(email: string, productId: string): string | null {
  const order = getOrdersByEmail(email).find(
    (o) => o.status === 'paid' && o.items.some((item) => item.productId === productId),
  );
  return order?.id ?? null;
}

/** Les produits qu'une personne a achetés, sans doublon, du plus récent au plus ancien. */
export function purchasedProductIds(email: string): string[] {
  const vus = new Set<string>();
  for (const order of getOrdersByEmail(email)) {
    if (order.status !== 'paid') continue;
    for (const item of order.items) vus.add(item.productId);
  }
  return [...vus];
}

/* ------------------------------- Écriture -------------------------------- */

export function bodyProblem(body: string): string | null {
  const texte = body.trim();
  if (texte.length < bodyMinLength) {
    return `Votre avis doit faire au moins ${bodyMinLength} caractères.`;
  }
  if (texte.length > bodyMaxLength) {
    return `Votre avis ne doit pas dépasser ${bodyMaxLength} caractères.`;
  }
  return null;
}

export interface NewReview {
  productId: string
  orderId: string
  email: string
  displayName: string
  rating: number
  body: string
}

export function createReview(input: NewReview): Review | null {
  const email = input.email.trim().toLowerCase();
  const reviews = readAll();

  // Un seul avis par personne et par produit.
  if (reviews.some((r) => r.email === email && r.productId === input.productId)) return null;

  const review: Review = {
    id: `rev_${crypto.randomBytes(8).toString('hex')}`,
    productId: input.productId,
    orderId: input.orderId,
    email,
    // On ne garde que des caractères imprimables : ni retours chariot exotiques,
    // ni caractères de contrôle qui pourraient perturber l'affichage.
    displayName: nettoie(input.displayName).slice(0, 40) || 'Un parent',
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    body: nettoie(input.body).slice(0, bodyMaxLength),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  writeAll(reviews);
  return review;
}

export function setReviewStatus(id: string, status: ReviewStatus): Review | undefined {
  const reviews = readAll();
  const review = reviews.find((r) => r.id === id);
  if (!review) return undefined;
  review.status = status;
  review.reviewedAt = new Date().toISOString();
  writeAll(reviews);
  return review;
}

export function deleteReview(id: string): boolean {
  const reviews = readAll();
  const reste = reviews.filter((r) => r.id !== id);
  if (reste.length === reviews.length) return false;
  writeAll(reste);
  return true;
}

/** Retire les caractères de contrôle et normalise les espaces multiples. */
function nettoie(texte: string): string {
  return texte
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function reviewStats() {
  const reviews = readAll();
  return {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    published: reviews.filter((r) => r.status === 'published').length,
  };
}
