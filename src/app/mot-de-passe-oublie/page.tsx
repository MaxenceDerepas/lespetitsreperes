import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  const email = await getSessionEmail();
  if (email) redirect('/compte');

  return (
    <>
      <PageBanner
        compact
        title="Mot de passe oublié"
        subtitle="Nous vous envoyons un lien pour vous reconnecter et choisir un nouveau mot de passe."
        crumbs={[{ label: 'Connexion', href: '/connexion' }, { label: 'Mot de passe oublié' }]}
        scene={<BannerScene variant="compte" />}
      />

      <div className="shell max-w-md py-12 lg:py-16">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
