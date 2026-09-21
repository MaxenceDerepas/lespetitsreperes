import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { isEmailConfigured } from '@/lib/email';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { LoginForm } from '@/components/LoginForm';
import { DownloadIcon, FileIcon, LockIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Connexion à votre espace client',
  description:
    'Accédez à vos commandes, vos factures et vos téléchargements Les Petits Repères.',
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  const email = await getSessionEmail();
  if (email) redirect('/compte');

  return (
    <>
      <PageBanner
        compact
        title="Retrouver mes fichiers"
        subtitle="Vos achats restent accessibles à vie : connectez-vous pour retrouver vos commandes, vos factures et vos liens de téléchargement."
        crumbs={[{ label: 'Connexion' }]}
        scene={<BannerScene variant="compte" />}
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:py-16">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <LoginForm emailConfigured={isEmailConfigured()} />
        </div>

        <aside className="mx-auto w-full max-w-md lg:mx-0">
          <h2 className="title text-display-sm">Ce que vous y trouverez</h2>
          <ul className="mt-5 space-y-4">
            {[
              {
                Icon: DownloadIcon,
                title: 'Mes téléchargements',
                text: 'Tous vos PDF, avec un lien neuf généré à chaque visite — un lien expiré ne bloque jamais l’accès.',
              },
              {
                Icon: FileIcon,
                title: 'Mes commandes et factures',
                text: 'L’historique complet de vos achats, avec la facture de chaque commande.',
              },
              {
                Icon: LockIcon,
                title: 'Aucun mot de passe',
                text: 'Un lien signé envoyé par email, valable vingt minutes. Rien à retenir, rien à faire fuiter.',
              },
            ].map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-pale/60 text-sage-dark">
                  <Icon size={19} />
                </span>
                <span>
                  <span className="block text-[0.92rem] font-semibold text-ink">{title}</span>
                  <span className="mt-0.5 block text-[0.86rem] leading-relaxed text-ink-soft">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[0.86rem] leading-relaxed text-muted">
            Pas encore de commande ?{' '}
            <Link href="/boutique" className="text-terracotta-deep underline underline-offset-2">
              Découvrez la boutique
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
