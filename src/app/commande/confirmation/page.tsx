import Link from 'next/link';
import type { Metadata } from 'next';
import { getOrder, getOrderByStripeSession } from '@/lib/orders';
import { formatPrice } from '@/lib/format';
import { PageHeader } from '@/components/PageHeader';
import { DownloadList } from '@/components/DownloadList';
import { ClearCart } from '@/components/ClearCart';
import { ButtonLink } from '@/components/Button';
import { Sprig } from '@/components/Decor';
import { HeartIcon, MailIcon, PrinterIcon, SparkleIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Merci pour votre commande',
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ commande?: string; session_id?: string }>
}) {
  const params = await searchParams;

  const order = params.commande
    ? getOrder(params.commande)
    : params.session_id
      ? getOrderByStripeSession(params.session_id)
      : undefined;

  if (!order) {
    return (
      <>
        <PageHeader
          title="Commande introuvable"
          intro="Nous ne retrouvons pas cette commande. Si vous venez de payer, vos fichiers sont accessibles depuis votre espace client."
        />
        <div className="shell py-12 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/compte/telechargements">Mes téléchargements</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Nous écrire
            </ButtonLink>
          </div>
        </div>
      </>
    );
  }

  const paid = order.status === 'paid';

  return (
    <>
      <ClearCart />

      <section className="relative overflow-hidden border-b border-ink/[0.06] bg-cream paper-texture">
        <Sprig className="pointer-events-none absolute -left-4 bottom-2 hidden h-20 w-40 text-sage-light/40 sm:block" />
        <Sprig
          flip
          className="pointer-events-none absolute -right-4 top-4 hidden h-20 w-40 text-sage-light/40 sm:block"
        />

        <div className="shell py-12 text-center lg:py-16">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-peach/60 text-terracotta-deep">
            <HeartIcon size={30} />
          </span>
          <h1 className="mt-5 text-balance title text-display-lg">
            Merci pour votre commande ♡
          </h1>
          <p className="mx-auto mt-3.5 max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-soft">
            {paid
              ? 'Vos fichiers sont prêts à être téléchargés. Un email récapitulatif vient également de partir vers votre boîte.'
              : 'Votre paiement est en cours de confirmation. Vos fichiers apparaîtront ici dès validation, et vous recevrez un email.'}
          </p>
          <p className="mt-4 text-[0.84rem] text-muted">
            Commande <strong className="font-semibold text-ink">{order.reference}</strong> ·{' '}
            {formatPrice(order.totalCents)}
            {order.demo && ' · commande de démonstration'}
          </p>
        </div>
      </section>

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div>
          <h2 className="title text-display-sm">Vos fichiers</h2>
          <p className="mt-1.5 text-[0.9rem] text-ink-soft">
            {paid
              ? 'Cliquez pour télécharger. Vous pouvez les imprimer autant de fois que nécessaire.'
              : 'Le paiement est en cours de validation auprès de notre prestataire.'}
          </p>
          <div className="mt-6">
            <DownloadList order={order} />
          </div>

          {order.demo && (
            <p className="mt-6 rounded-soft bg-sage-pale/40 px-4 py-3 text-[0.82rem] leading-relaxed text-sage-dark">
              <strong className="font-semibold">Mode démonstration :</strong> aucun paiement réel
              n’a eu lieu et l’email n’a pas été envoyé — il est écrit dans la console du serveur.
              Renseignez <code className="font-mono text-[0.78rem]">STRIPE_SECRET_KEY</code> et{' '}
              <code className="font-mono text-[0.78rem]">EMAIL_API_KEY</code> dans{' '}
              <code className="font-mono text-[0.78rem]">.env.local</code> pour activer le
              parcours complet.
            </p>
          )}
        </div>

        <aside className="space-y-6 lg:self-start">
          <div className="rounded-card border border-sage/15 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-[1.2rem] text-sage-dark">Et maintenant ?</h2>
            <ol className="mt-4 space-y-3.5">
              {[
                {
                  Icon: MailIcon,
                  title: 'Vérifiez votre boîte email',
                  text: `Un message récapitulatif est parti vers ${order.email}. Pensez à regarder vos spams la première fois.`,
                },
                {
                  Icon: PrinterIcon,
                  title: 'Imprimez en A4',
                  text: 'Un papier légèrement épais (120 g) rend mieux pour les supports à afficher.',
                },
                {
                  Icon: SparkleIcon,
                  title: 'Commencez par un seul support',
                  text: 'Une nouveauté à la fois, sur deux semaines : c’est comme ça que ça tient.',
                },
              ].map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-pale/60 text-sage-dark">
                    <Icon size={17} />
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-semibold text-ink">{title}</span>
                    <span className="mt-0.5 block text-[0.8rem] leading-relaxed text-muted">
                      {text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-card bg-cream p-6">
            <p className="text-[0.9rem] leading-relaxed text-ink-soft">
              Vos fichiers restent disponibles à tout moment dans votre espace client.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <ButtonLink href="/compte/telechargements" size="sm">
                Mes téléchargements
              </ButtonLink>
              <ButtonLink href="/boutique" size="sm" variant="secondary">
                Continuer mes achats
              </ButtonLink>
            </div>
            <p className="mt-4 text-[0.8rem] text-muted">
              Un souci avec un fichier ?{' '}
              <Link href="/contact" className="text-terracotta-deep underline underline-offset-2">
                Écrivez-nous
              </Link>
              , nous répondons sous 24 à 48 h.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
