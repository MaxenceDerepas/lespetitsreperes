import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getAccount, passwordMinLength } from '@/lib/accounts';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { AccountNav } from '@/components/AccountNav';
import { PasswordForm } from '@/components/PasswordForm';

export const metadata: Metadata = {
  title: 'Mon mot de passe',
  robots: { index: false, follow: false },
};

export default async function SecurityPage() {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const account = getAccount(email);

  return (
    <>
      <PageBanner
        compact
        title="Mon mot de passe"
        subtitle="Vos identifiants de connexion, à changer quand vous le souhaitez."
        crumbs={[{ label: 'Mon compte', href: '/compte' }, { label: 'Mon mot de passe' }]}
        scene={<BannerScene variant="compte" />}
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-14">
        <AccountNav current="/compte/securite" email={email} />

        <div className="max-w-xl">
          <PasswordForm hasPassword={Boolean(account)} passwordMinLength={passwordMinLength} />

          <div className="mt-6 rounded-card bg-cream p-6">
            <h2 className="font-serif text-[1.2rem] text-sage-dark">Comment il est protégé</h2>
            <ul className="mt-3 space-y-2 text-[0.88rem] leading-relaxed text-ink-soft">
              <li>
                Votre mot de passe n’est jamais conservé en clair : seule une empreinte
                irréversible (scrypt) est enregistrée.
              </li>
              <li>
                Vos données bancaires ne passent pas par le site : les paiements sont traités
                directement par Stripe.
              </li>
              <li>
                Après plusieurs essais infructueux, la connexion est mise en pause quelques
                minutes pour décourager les tentatives automatiques.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
