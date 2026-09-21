import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getOrdersByEmail } from '@/lib/orders';
import { formatDate, formatPrice, pluralize } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { AccountNav } from '@/components/AccountNav';
import { ButtonLink } from '@/components/Button';
import { ArrowRightIcon, DownloadIcon, FileIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Mon compte',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const orders = getOrdersByEmail(email);
  const paid = orders.filter((order) => order.status === 'paid');
  const filesCount = paid.reduce((sum, order) => sum + order.items.length, 0);
  const spentCents = paid.reduce((sum, order) => sum + order.totalCents, 0);

  return (
    <>
      <PageHeader
        eyebrow="Espace client"
        title="Mon compte"
        intro="Vos commandes, vos factures et vos fichiers, réunis au même endroit."
        crumbs={[{ label: 'Mon compte' }]}
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-14">
        <AccountNav current="/compte" email={email} />

        <div>
          {/* Chiffres clés */}
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: pluralize(paid.length, 'Commande'), value: String(paid.length) },
              { label: pluralize(filesCount, 'Fichier'), value: String(filesCount) },
              { label: 'Total réglé', value: formatPrice(spentCents) },
            ].map((stat) => (
              <li key={stat.label} className="rounded-card border border-sage/15 bg-white p-4 text-center">
                <p className="font-serif text-2xl text-sage-dark">{stat.value}</p>
                <p className="mt-0.5 text-[0.76rem] text-muted">{stat.label}</p>
              </li>
            ))}
          </ul>

          {orders.length === 0 ? (
            <div className="mt-8 rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-12 text-center">
              <h2 className="title text-display-sm">
                Aucune commande pour l’instant
              </h2>
              <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
                Dès votre premier achat, vos fichiers apparaîtront ici, accessibles à tout moment.
              </p>
              <ButtonLink href="/boutique" className="mt-6">
                Découvrir la boutique
              </ButtonLink>
            </div>
          ) : (
            <>
              <section className="mt-9" aria-labelledby="dernieres-commandes">
                <div className="flex items-center justify-between gap-4">
                  <h2 id="dernieres-commandes" className="title text-display-sm">
                    Dernières commandes
                  </h2>
                  <Link
                    href="/compte/commandes"
                    className="link-underline text-[0.84rem] font-semibold text-terracotta-deep"
                  >
                    Tout voir
                  </Link>
                </div>

                <ul className="mt-5 space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <li
                      key={order.id}
                      className="flex flex-wrap items-center gap-4 rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-pale/60 text-sage-dark">
                        <FileIcon size={19} />
                      </span>
                      <span className="min-w-[9rem] flex-1">
                        <span className="block text-[0.9rem] font-semibold text-ink">
                          {order.reference}
                        </span>
                        <span className="block text-[0.78rem] text-muted">
                          {formatDate(order.createdAt)} · {order.items.length}{' '}
                          {pluralize(order.items.length, 'fichier')}
                        </span>
                      </span>
                      <span className="text-[0.9rem] font-semibold text-terracotta-deep">
                        {formatPrice(order.totalCents)}
                      </span>
                      <Link
                        href={`/telechargements/${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/50 px-4 py-2 text-[0.82rem] font-semibold text-terracotta-deep transition-colors hover:bg-terracotta-deep hover:text-white"
                      >
                        <DownloadIcon size={15} />
                        Fichiers
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10 rounded-card bg-cream p-6" aria-labelledby="raccourcis">
                <h2 id="raccourcis" className="font-serif text-[1.2rem] text-sage-dark">
                  Accès rapide
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <ButtonLink href="/compte/telechargements" size="sm">
                    Mes téléchargements
                    <ArrowRightIcon size={15} />
                  </ButtonLink>
                  <ButtonLink href="/compte/commandes" size="sm" variant="secondary">
                    Mes factures
                  </ButtonLink>
                  <ButtonLink href="/contact" size="sm" variant="ghost">
                    Besoin d’aide ?
                  </ButtonLink>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
