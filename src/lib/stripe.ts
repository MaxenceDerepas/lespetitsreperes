import Stripe from 'stripe';

/**
 * Intégration Stripe.
 *
 * Aucune donnée bancaire ne transite ni n'est stockée sur ce site : le client
 * est redirigé vers Stripe Checkout, page hébergée par Stripe.
 *
 * Tant que STRIPE_SECRET_KEY n'est pas renseignée, le site bascule
 * automatiquement en MODE DÉMO : le tunnel fonctionne de bout en bout
 * (commande enregistrée, email, liens de téléchargement) sans paiement réel.
 */

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY manquante : le site est en mode démonstration.');
  }
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Épinglée pour éviter toute surprise lors d'une mise à jour du SDK.
      apiVersion: '2025-08-27.basil',
      typescript: true,
      appInfo: { name: 'Les Petits Repères' },
    });
  }
  return cached;
}

export interface CheckoutLine {
  name: string
  description: string
  priceCents: number
  quantity: number
}

/**
 * Crée une session Stripe Checkout pour des produits numériques :
 * aucune collecte d'adresse de livraison, uniquement l'email.
 */
export async function createCheckoutSession(params: {
  orderId: string
  email: string
  lines: CheckoutLine[]
  discountCents: number
  successUrl: string
  cancelUrl: string
}): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: params.email,
    // Produits numériques : rien à expédier, donc aucune adresse demandée.
    billing_address_collection: 'auto',
    line_items: params.lines.map((line) => ({
      quantity: line.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: line.priceCents,
        product_data: {
          name: line.name,
          description: line.description,
        },
      },
    })),
    ...(params.discountCents > 0
      ? {
          discounts: [
            {
              coupon: (
                await stripe.coupons.create({
                  amount_off: params.discountCents,
                  currency: 'eur',
                  duration: 'once',
                  name: 'Code promotionnel',
                })
              ).id,
            },
          ],
        }
      : {}),
    metadata: { orderId: params.orderId },
    payment_intent_data: {
      metadata: { orderId: params.orderId },
      description: `Commande ${params.orderId} — Les Petits Repères`,
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    // Facturation automatique côté Stripe (optionnel mais pratique).
    invoice_creation: { enabled: true },
    locale: 'fr',
  });

  if (!session.url) throw new Error('Stripe n’a pas renvoyé d’URL de paiement.');
  return { url: session.url, sessionId: session.id };
}
