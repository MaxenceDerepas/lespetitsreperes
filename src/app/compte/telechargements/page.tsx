import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getOrdersByEmail } from '@/lib/orders';
import { formatDate } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { AccountNav } from '@/components/AccountNav';
import { DownloadList } from '@/components/DownloadList';
import { ButtonLink } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Mes téléchargements',
  robots: { index: false, follow: false },
};

export default async function DownloadsPage() {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const orders = getOrdersByEmail(email).filter((order) => order.status === 'paid');

  return (
    <>
      <PageHeader
        eyebrow="Espace client"
        title="Mes téléchargements"
        intro="Tous vos fichiers, disponibles à tout moment. Un lien neuf est généré à chaque affichage de cette page."
        crumbs={[{ label: 'Mon compte', href: '/compte' }, { label: 'Mes téléchargements' }]}
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-14">
        <AccountNav current="/compte/telechargements" email={email} />

        <div>
          {orders.length === 0 ? (
            <div className="rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-12 text-center">
              <h2 className="title text-display-sm">
                Aucun fichier pour l’instant
              </h2>
              <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
                Vos PDF apparaîtront ici dès votre première commande validée.
              </p>
              <ButtonLink href="/boutique" className="mt-6">
                Découvrir la boutique
              </ButtonLink>
            </div>
          ) : (
            <div className="space-y-10">
              {orders.map((order) => (
                <section key={order.id} aria-labelledby={`cmd-${order.id}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 id={`cmd-${order.id}`} className="font-serif text-[1.2rem] text-sage-dark">
                      Commande {order.reference}
                    </h2>
                    <p className="text-[0.8rem] text-muted">
                      {formatDate(order.createdAt)} ·{' '}
                      <Link
                        href={`/compte/commandes/${order.id}/facture`}
                        className="underline underline-offset-2 hover:text-terracotta-deep"
                      >
                        Voir la facture
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <DownloadList order={order} />
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
