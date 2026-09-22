import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { passwordMinLength } from '@/lib/accounts';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RegisterForm } from '@/components/RegisterForm';
import { DownloadIcon, FileIcon, LockIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Créer mon compte',
  description:
    'Créez votre compte Les Petits Repères pour retrouver vos commandes, vos factures et vos téléchargements.',
  robots: { index: false, follow: true },
};

export default async function RegisterPage() {
  const email = await getSessionEmail();
  if (email) redirect('/compte');

  return (
    <>
      <PageBanner
        compact
        title="Créer mon compte"
        subtitle="Un compte pour retrouver vos fichiers quand vous en avez besoin, sur n’importe quel appareil."
        crumbs={[{ label: 'Connexion', href: '/connexion' }, { label: 'Créer mon compte' }]}
        scene={<BannerScene variant="compte" />}
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:py-16">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <RegisterForm passwordMinLength={passwordMinLength} />
        </div>

        <aside className="mx-auto w-full max-w-md lg:mx-0">
          <h2 className="title-editorial text-editorial-lg">À quoi sert le compte</h2>
          <ul className="mt-5 space-y-4">
            {[
              {
                Icon: DownloadIcon,
                title: 'Vos fichiers, à vie',
                text: 'Un lien de téléchargement neuf est généré à chaque visite : un lien expiré ne vous bloque jamais.',
              },
              {
                Icon: FileIcon,
                title: 'Vos commandes et factures',
                text: 'L’historique de vos achats, avec la facture de chacun.',
              },
              {
                Icon: LockIcon,
                title: 'Vos données, au minimum',
                text: 'Votre email, votre mot de passe sous forme d’empreinte, et vos commandes. Aucune donnée bancaire n’est conservée : le paiement passe par Stripe.',
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
            En créant un compte, vous acceptez nos{' '}
            <Link href="/cgv" className="text-terracotta-deep underline underline-offset-2">
              conditions de vente
            </Link>{' '}
            et notre{' '}
            <Link href="/confidentialite" className="text-terracotta-deep underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
