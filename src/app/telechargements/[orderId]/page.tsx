import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getOrder } from '@/lib/orders';
import { formatDate, formatPrice } from '@/lib/format';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { DownloadList } from '@/components/DownloadList';
import { ButtonLink } from '@/components/Button';
import { PrinterIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Télécharger mes fichiers',
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Page de téléchargement atteinte depuis l'email de commande.
 *
 * L'identifiant de commande est un jeton aléatoire de 18 caractères
 * hexadécimaux : il n'est pas devinable. Les fichiers eux-mêmes restent
 * protégés par des liens signés, régénérés à chaque affichage.
 */
export default async function OrderDownloadsPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  // Renvoie un vrai 404, avec le message dédié de not-found.tsx.
  if (!order) notFound();

  if (order.status !== 'paid') {
    return (
      <>
        <PageBanner
          compact
          title="Paiement en cours de validation"
          subtitle="Vos fichiers apparaîtront ici dès que votre paiement sera confirmé — c’est en général une question de secondes."
          crumbs={[{ label: 'Téléchargements' }]}
          scene={<BannerScene variant="telechargements" />}
        />
        <div className="shell py-12 text-center">
          <p className="text-[0.9rem] text-muted">
            Commande {order.reference} · {formatPrice(order.totalCents)}
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-6">
            Signaler un problème
          </ButtonLink>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner
        compact
        title="Vos fichiers sont prêts"
        subtitle={`Commande ${order.reference} — ${formatDate(order.createdAt)}. Téléchargez-les, imprimez-les autant de fois que nécessaire, et retrouvez-les à tout moment depuis votre espace client.`}
        crumbs={[{ label: 'Téléchargements' }]}
        scene={<BannerScene variant="telechargements" />}
      />

      <div className="shell max-w-3xl py-10 lg:py-14">
        <DownloadList order={order} />

        <div className="mt-10 rounded-card bg-cream p-6">
          <h2 className="flex items-center gap-2 font-serif text-[1.2rem] text-sage-dark">
            <PrinterIcon size={19} className="text-sage-dark" />
            Conseils d’impression
          </h2>
          <ul className="mt-3 space-y-2 text-[0.88rem] leading-relaxed text-ink-soft">
            <li>Choisissez le format A4 et l’option « taille réelle » (sans mise à l’échelle).</li>
            <li>Un papier 120 g rend mieux pour les supports destinés à être affichés.</li>
            <li>
              Plastifier les fiches n’est pas une obligation, mais c’est préférable afin qu’elles
              durent plus longtemps dans le temps. Si vous ne le pouvez pas, une simple pochette
              plastique peut fonctionner.
            </li>
          </ul>
          <p className="mt-5 text-[0.86rem] text-muted">
            Un fichier ne s’ouvre pas ?{' '}
            <Link href="/contact" className="text-terracotta-deep underline underline-offset-2">
              Écrivez-nous
            </Link>{' '}
            avec votre numéro de commande, nous réglons ça.
          </p>
        </div>
      </div>
    </>
  );
}
