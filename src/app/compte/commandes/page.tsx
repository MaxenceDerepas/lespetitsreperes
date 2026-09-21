import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getOrdersByEmail } from '@/lib/orders';
import { formatDateTime, formatPrice, pluralize } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { AccountNav } from '@/components/AccountNav';
import { ButtonLink } from '@/components/Button';
import { DownloadIcon, FileIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Mes commandes',
  robots: { index: false, follow: false },
};

const statusLabels = {
  paid: { label: 'Payée', className: 'bg-sage-pale/70 text-sage-dark' },
  pending: { label: 'En attente', className: 'bg-[#FAF0DF] text-[#8A6320]' },
  failed: { label: 'Échouée', className: 'bg-peach/50 text-terracotta-deep' },
  refunded: { label: 'Remboursée', className: 'bg-sand/60 text-ink-soft' },
} as const;

export default async function OrdersPage() {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const orders = getOrdersByEmail(email);

  return (
    <>
      <PageHeader
        eyebrow="Espace client"
        title="Mes commandes"
        intro="L’historique de vos achats, avec la facture et les fichiers de chaque commande."
        crumbs={[{ label: 'Mon compte', href: '/compte' }, { label: 'Mes commandes' }]}
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-14">
        <AccountNav current="/compte/commandes" email={email} />

        <div>
          {orders.length === 0 ? (
            <div className="rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-12 text-center">
              <h2 className="title text-display-sm">Aucune commande</h2>
              <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
                Votre historique s’affichera ici après votre premier achat.
              </p>
              <ButtonLink href="/boutique" className="mt-6">
                Découvrir la boutique
              </ButtonLink>
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => {
                const status = statusLabels[order.status];
                return (
                  <li
                    key={order.id}
                    className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-soft"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-2.5">
                          <span className="font-serif text-[1.2rem] text-sage-dark">
                            {order.reference}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                          {order.demo && (
                            <span className="rounded-full bg-sand/60 px-2.5 py-0.5 text-[0.7rem] text-ink-soft">
                              démonstration
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-[0.8rem] text-muted">
                          {formatDateTime(order.createdAt)} · {order.items.length}{' '}
                          {pluralize(order.items.length, 'fichier')}
                          {order.promoCode ? ` · code ${order.promoCode}` : ''}
                        </p>
                      </div>
                      <p className="font-serif text-xl text-terracotta-deep">
                        {formatPrice(order.totalCents)}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-1.5 border-t border-ink/[0.07] pt-3.5">
                      {order.items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex items-center justify-between gap-3 text-[0.88rem]"
                        >
                          <Link
                            href={`/boutique/${item.slug}`}
                            className="text-ink transition-colors hover:text-terracotta-deep"
                          >
                            {item.name}
                          </Link>
                          <span className="shrink-0 text-muted">
                            {formatPrice(item.priceCents)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {order.status === 'paid' && (
                        <Link
                          href={`/telechargements/${order.id}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-deep px-4 py-2 text-[0.82rem] font-semibold text-white transition-colors hover:bg-terracotta-deeper"
                        >
                          <DownloadIcon size={15} />
                          Télécharger mes fichiers
                        </Link>
                      )}
                      <Link
                        href={`/compte/commandes/${order.id}/facture`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-sage/35 px-4 py-2 text-[0.82rem] font-semibold text-sage-dark transition-colors hover:bg-sage-pale/40"
                      >
                        <FileIcon size={15} />
                        Facture
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
