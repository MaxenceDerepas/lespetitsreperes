import { NextResponse } from 'next/server';
import type { CartLine } from '@/lib/types';
import { buildOrderItems, createOrder, attachStripeSession } from '@/lib/orders';
import { applyPromo } from '@/lib/promo';
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe';
import { sendOrderEmail } from '@/lib/email';
import { site } from '@/lib/site';

/**
 * Création d'une commande et démarrage du paiement.
 *
 * Deux modes, choisis automatiquement :
 *
 *  1. STRIPE_SECRET_KEY renseignée → création d'une session Stripe Checkout.
 *     La commande est enregistrée en `pending` ; c'est le webhook qui la
 *     passera en `paid` et déclenchera l'email. Aucune donnée bancaire ne
 *     touche ce serveur.
 *
 *  2. Aucune clé → MODE DÉMONSTRATION : la commande est enregistrée comme
 *     payée et l'email est « envoyé » (écrit dans la console si aucune clé
 *     email n'est configurée). Le parcours complet reste testable.
 *
 * Dans les deux cas, les prix sont relus depuis le catalogue serveur : un
 * panier modifié côté navigateur ne peut pas changer le montant facturé.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: {
    email?: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    promoCode?: string
    items?: { productId: string; quantity?: number }[]
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const email = (payload.email ?? '').trim();
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Merci de renseigner une adresse email valide.' }, { status: 400 });
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ error: 'Votre panier est vide.' }, { status: 400 });
  }

  // Revalidation intégrale du panier côté serveur.
  const lines = payload.items.map(
    (item) => ({ productId: item.productId, quantity: item.quantity ?? 1 }) as CartLine,
  );
  const items = buildOrderItems(lines);

  if (items.length === 0) {
    return NextResponse.json({ error: 'Aucun produit valide dans le panier.' }, { status: 400 });
  }

  const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  // Le code promo est lui aussi revérifié côté serveur.
  let discountCents = 0;
  let promoCode: string | undefined;
  if (payload.promoCode) {
    const promo = applyPromo(payload.promoCode, subtotalCents);
    if (promo.ok) {
      discountCents = promo.discountCents;
      promoCode = promo.code;
    }
  }

  const demo = !isStripeConfigured();

  const order = createOrder({
    email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    items,
    discountCents,
    promoCode,
    newsletter: Boolean(payload.newsletter),
    status: demo ? 'paid' : 'pending',
    demo,
  });

  /* ------------------------- Mode démonstration ------------------------- */
  if (demo) {
    await sendOrderEmail(order);
    return NextResponse.json({
      orderId: order.id,
      redirectTo: `/commande/confirmation?commande=${order.id}`,
      demo: true,
    });
  }

  /* ---------------------------- Mode Stripe ---------------------------- */
  try {
    const baseUrl = site.url;
    const { url, sessionId } = await createCheckoutSession({
      orderId: order.id,
      email,
      discountCents,
      lines: items.map((item) => ({
        name: item.name,
        description: 'Fichier PDF à imprimer — produit numérique',
        priceCents: item.priceCents,
        quantity: item.quantity,
      })),
      successUrl: `${baseUrl}/commande/confirmation?commande=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/panier?paiement=annule`,
    });

    attachStripeSession(order.id, sessionId);
    return NextResponse.json({ orderId: order.id, checkoutUrl: url });
  } catch (error) {
    console.error('[checkout] Stripe a refusé la session :', error);
    return NextResponse.json(
      { error: 'Le paiement n’a pas pu être initié. Merci de réessayer dans un instant.' },
      { status: 502 },
    );
  }
}
