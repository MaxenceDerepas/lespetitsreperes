import { isAdmin } from '@/lib/auth';
import { getAllOrders } from '@/lib/orders';
import { site } from '@/lib/site';

/**
 * Export comptable des factures, au format CSV.
 *
 * Réservé à l'espace d'administration : sans le cookie, la route répond 404
 * — et non 403, pour ne pas confirmer qu'elle existe.
 *
 * Deux détails qui évitent des heures perdues dans un tableur français :
 * le séparateur est le point-virgule, et le fichier commence par un BOM
 * UTF-8, sans lequel Excel massacre les accents.
 */
export async function GET() {
  if (!(await isAdmin())) {
    return new Response('Not found', { status: 404 });
  }

  const orders = getAllOrders().filter((order) => order.status === 'paid');

  const entete = [
    'Numéro',
    'Date',
    'Client',
    'Email',
    'Articles',
    'Sous-total (€)',
    'Remise (€)',
    'Total payé (€)',
    'Code promo',
    'Paiement',
    'Session Stripe',
  ];

  const euros = (cents: number) => (cents / 100).toFixed(2).replace('.', ',');
  const champ = (valeur: string) => `"${valeur.replace(/"/g, '""')}"`;

  const lignes = orders.map((order) =>
    [
      order.reference,
      new Date(order.createdAt).toLocaleDateString('fr-FR'),
      [order.firstName, order.lastName].filter(Boolean).join(' '),
      order.email,
      order.items.map((item) => `${item.quantity} × ${item.name}`).join(' + '),
      euros(order.subtotalCents),
      euros(order.discountCents),
      euros(order.totalCents),
      order.promoCode ?? '',
      order.demo ? 'démonstration' : 'Stripe',
      order.stripeSessionId ?? '',
    ]
      .map(champ)
      .join(';'),
  );

  const csv = '﻿' + [entete.map(champ).join(';'), ...lignes].join('\r\n') + '\r\n';
  const nom = `factures-${site.shortName.toLowerCase().replace(/\s+/g, '-')}-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${nom}"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
