import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getOrder } from '@/lib/orders';
import { site } from '@/lib/site';
import { formatDate, formatPrice } from '@/lib/format';
import { LogoMark } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Facture',
  robots: { index: false, follow: false },
};

/** Facture imprimable (Ctrl/Cmd + P donne un PDF propre). */
export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const { id } = await params;
  const order = getOrder(id);

  // Un client ne peut voir que ses propres factures.
  if (!order || order.email !== email) notFound();

  return (
    <div className="shell max-w-3xl py-10 print:py-0">
      <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
        <Link
          href="/compte/commandes"
          className="link-underline text-[0.86rem] font-semibold text-sage-dark"
        >
          ← Retour à mes commandes
        </Link>
        <p className="text-[0.8rem] text-muted">
          Utilisez l’impression de votre navigateur pour enregistrer un PDF.
        </p>
      </div>

      <article className="rounded-card border border-ink/[0.1] bg-white p-8 shadow-soft print:border-0 print:shadow-none sm:p-10">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/10 pb-6">
          <div>
            <LogoMark className="text-sage-light" size={40} />
            <p className="mt-1.5 font-serif text-xl text-sage-dark">{site.name}</p>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
              {site.legal.form}
              <br />
              SIRET {site.legal.siret}
              <br />
              {site.legal.vat}
              <br />
              {site.email}
            </p>
          </div>

          <div className="text-right">
            <h1 className="title text-display-sm">Facture</h1>
            <p className="mt-1 text-[0.86rem] text-ink">
              N° {order.reference}
              <br />
              {formatDate(order.createdAt)}
            </p>
            <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-sage-dark">
              {order.status === 'paid' ? 'Payée' : 'En attente de paiement'}
            </p>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Client
          </h2>
          <p className="mt-1.5 text-[0.9rem] text-ink">
            {[order.firstName, order.lastName].filter(Boolean).join(' ') || 'Client'}
            <br />
            {order.email}
          </p>
        </section>

        <table className="mt-8 w-full text-left text-[0.9rem]">
          <caption className="sr-only">Détail de la commande {order.reference}</caption>
          <thead>
            <tr className="border-b border-ink/12 text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="pb-2 font-semibold">
                Désignation
              </th>
              <th scope="col" className="pb-2 text-center font-semibold">
                Qté
              </th>
              <th scope="col" className="pb-2 text-right font-semibold">
                Prix
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.productId} className="border-b border-ink/[0.07]">
                <td className="py-3 text-ink">
                  {item.name}
                  <span className="block text-[0.76rem] text-muted">
                    Fichier PDF numérique à télécharger
                  </span>
                </td>
                <td className="py-3 text-center text-ink">{item.quantity}</td>
                <td className="py-3 text-right text-ink">
                  {formatPrice(item.priceCents * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="pt-3 text-right text-ink-soft">
                Sous-total
              </td>
              <td className="pt-3 text-right text-ink">{formatPrice(order.subtotalCents)}</td>
            </tr>
            {order.discountCents > 0 && (
              <tr>
                <td colSpan={2} className="pt-1.5 text-right text-ink-soft">
                  Remise {order.promoCode}
                </td>
                <td className="pt-1.5 text-right text-sage-dark">
                  −{formatPrice(order.discountCents)}
                </td>
              </tr>
            )}
            <tr>
              <td colSpan={2} className="pt-1.5 text-right text-ink-soft">
                Livraison
              </td>
              <td className="pt-1.5 text-right text-ink">—</td>
            </tr>
            <tr className="border-t border-ink/12">
              <td colSpan={2} className="pt-3 text-right font-semibold text-ink">
                Total payé
              </td>
              <td className="pt-3 text-right font-serif text-xl text-terracotta-deep">
                {formatPrice(order.totalCents)}
              </td>
            </tr>
          </tfoot>
        </table>

        <footer className="mt-8 border-t border-ink/10 pt-5 text-[0.76rem] leading-relaxed text-muted">
          <p>
            {site.legal.vat}. Produits numériques livrés immédiatement : conformément à l’article
            L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas, ce que
            le client a expressément accepté lors de la commande.
          </p>
          {order.demo && (
            <p className="mt-2 font-semibold text-ink-soft">
              Document de démonstration — aucun paiement réel n’a été encaissé.
            </p>
          )}
        </footer>
      </article>
    </div>
  );
}
