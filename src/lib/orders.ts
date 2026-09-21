import fs from 'node:fs';
import path from 'node:path';
import type { CartLine, Order, OrderItem, OrderStatus } from './types';
import { getProductById } from './catalog';
import { generateOrderId, generateOrderReference } from './tokens';

/**
 * Persistance des commandes.
 *
 * Implémentation par défaut : un fichier JSON dans ./.data/orders.json.
 * C'est suffisant et pratique en développement (les commandes survivent au
 * rechargement), et cela évite d'imposer une base de données pour faire
 * tourner le site.
 *
 * ---------------------------------------------------------------------------
 *  PASSAGE EN PRODUCTION
 *  Renseignez DATABASE_URL et remplacez le corps des fonctions ci-dessous par
 *  des requêtes SQL. Le schéma correspondant est documenté dans le README :
 *
 *    orders(id, reference, email, first_name, last_name, subtotal_cents,
 *           discount_cents, total_cents, promo_code, status, stripe_session_id,
 *           demo, created_at, paid_at, newsletter)
 *    order_items(order_id, product_id, slug, name, price_cents, quantity,
 *                file, downloads)
 * ---------------------------------------------------------------------------
 */

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'orders.json');

function readAll(): Order[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (error) {
    console.error('[orders] Écriture impossible :', error);
  }
}

/** Transforme un panier client en lignes de commande vérifiées côté serveur. */
export function buildOrderItems(lines: CartLine[]): OrderItem[] {
  return lines
    .map((line) => {
      // Le prix est toujours relu depuis le catalogue serveur : le panier
      // envoyé par le navigateur n'est jamais une source de vérité.
      const product = getProductById(line.productId);
      if (!product) return null;
      const item: OrderItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        priceCents: product.priceCents,
        quantity: Math.max(1, Math.min(10, Math.trunc(line.quantity) || 1)),
        file: product.file,
        downloads: 0,
      };
      return item;
    })
    .filter((item): item is OrderItem => item !== null);
}

export interface CreateOrderInput {
  email: string
  firstName?: string
  lastName?: string
  items: OrderItem[]
  discountCents?: number
  promoCode?: string
  status?: OrderStatus
  demo?: boolean
  stripeSessionId?: string
  newsletter?: boolean
}

export function createOrder(input: CreateOrderInput): Order {
  const subtotalCents = input.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const discountCents = Math.min(input.discountCents ?? 0, subtotalCents);
  const now = new Date().toISOString();

  const order: Order = {
    id: generateOrderId(),
    reference: generateOrderReference(),
    email: input.email.trim().toLowerCase(),
    firstName: input.firstName?.trim() || undefined,
    lastName: input.lastName?.trim() || undefined,
    items: input.items,
    subtotalCents,
    discountCents,
    totalCents: subtotalCents - discountCents,
    promoCode: input.promoCode,
    status: input.status ?? 'pending',
    stripeSessionId: input.stripeSessionId,
    demo: input.demo ?? false,
    createdAt: now,
    paidAt: (input.status ?? 'pending') === 'paid' ? now : undefined,
    newsletter: input.newsletter,
  };

  const orders = readAll();
  orders.push(order);
  writeAll(orders);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}

export function getOrderByReference(reference: string): Order | undefined {
  return readAll().find((o) => o.reference.toUpperCase() === reference.toUpperCase());
}

export function getOrderByStripeSession(sessionId: string): Order | undefined {
  return readAll().find((o) => o.stripeSessionId === sessionId);
}

export function getOrdersByEmail(email: string): Order[] {
  const normalized = email.trim().toLowerCase();
  return readAll()
    .filter((o) => o.email === normalized)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAllOrders(): Order[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function markOrderStatus(id: string, status: OrderStatus): Order | undefined {
  const orders = readAll();
  const order = orders.find((o) => o.id === id);
  if (!order) return undefined;
  order.status = status;
  if (status === 'paid' && !order.paidAt) order.paidAt = new Date().toISOString();
  writeAll(orders);
  return order;
}

export function attachStripeSession(id: string, sessionId: string): void {
  const orders = readAll();
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  order.stripeSessionId = sessionId;
  writeAll(orders);
}

/**
 * Incrémente le compteur de téléchargements d'une ligne de commande.
 * Renvoie false si la limite configurée est atteinte.
 */
export function registerDownload(orderId: string, productId: string, maxCount: number): boolean {
  const orders = readAll();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return false;
  const item = order.items.find((i) => i.productId === productId);
  if (!item) return false;
  if (maxCount > 0 && item.downloads >= maxCount) return false;
  item.downloads += 1;
  writeAll(orders);
  return true;
}

/** Statistiques simples pour l'espace d'administration. */
export function getOrderStats() {
  const orders = readAll();
  const paid = orders.filter((o) => o.status === 'paid');
  const revenueCents = paid.reduce((sum, o) => sum + o.totalCents, 0);
  const downloads = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.downloads, 0),
    0,
  );
  const customers = new Set(orders.map((o) => o.email)).size;

  return {
    ordersCount: orders.length,
    paidCount: paid.length,
    revenueCents,
    downloads,
    customers,
  };
}
