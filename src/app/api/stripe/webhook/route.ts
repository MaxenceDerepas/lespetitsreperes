import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { getOrder, markOrderStatus } from '@/lib/orders';
import { sendOrderEmail } from '@/lib/email';

/**
 * Webhook Stripe — c'est LUI qui fait foi pour dire qu'une commande est payée.
 *
 * La page de retour du client n'est jamais une preuve de paiement (elle peut
 * être ouverte, rechargée ou fabriquée). On ne délivre donc les fichiers
 * qu'après vérification cryptographique de la signature Stripe.
 *
 * En développement :
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 * puis copier le `whsec_…` affiché dans STRIPE_WEBHOOK_SECRET.
 *
 * Événements traités :
 *   checkout.session.completed      → commande payée, email envoyé
 *   checkout.session.expired        → commande abandonnée
 *   payment_intent.payment_failed   → paiement refusé
 *   charge.refunded                 → remboursement
 */

export async function POST(request: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook non configuré (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET).' },
      { status: 503 },
    );
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante.' }, { status: 400 });
  }

  // La signature se vérifie sur le corps BRUT de la requête.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error('[webhook] Signature invalide :', error);
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (!orderId) break;

        const order = markOrderStatus(orderId, 'paid');
        if (order && order.status === 'paid') {
          // Les liens de téléchargement sont générés à l'envoi de l'email.
          await sendOrderEmail(order);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (orderId && getOrder(orderId)?.status === 'pending') {
          markOrderStatus(orderId, 'failed');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const orderId = intent.metadata?.orderId;
        if (orderId) markOrderStatus(orderId, 'failed');
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.orderId;
        if (orderId) markOrderStatus(orderId, 'refunded');
        break;
      }

      default:
        // Les autres événements sont acceptés sans traitement.
        break;
    }
  } catch (error) {
    // On renvoie une erreur pour que Stripe réessaie l'envoi.
    console.error('[webhook] Traitement impossible :', error);
    return NextResponse.json({ error: 'Traitement impossible.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
