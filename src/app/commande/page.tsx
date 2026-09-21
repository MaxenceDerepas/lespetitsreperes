import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CheckoutForm } from '@/components/CheckoutForm';
import { isStripeConfigured } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Paiement',
  description: 'Réglez votre commande de fichiers PDF en quelques secondes.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dernière étape"
        title="Paiement"
        intro="Une adresse email, un paiement, et vos fichiers sont à vous. Rien d’autre à remplir."
        crumbs={[{ label: 'Panier', href: '/panier' }, { label: 'Paiement' }]}
      />

      <div className="shell py-10 lg:py-14">
        <CheckoutForm stripeReady={isStripeConfigured()} />
      </div>
    </>
  );
}
