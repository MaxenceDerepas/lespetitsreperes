import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CartView } from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Votre panier',
  description: 'Récapitulatif de votre panier — produits numériques, sans frais de livraison.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        title="Votre panier"
        intro="Aucune adresse de livraison à renseigner : vos fichiers arrivent immédiatement après le paiement."
        crumbs={[{ label: 'Panier' }]}
      />

      <div className="shell py-10 lg:py-14">
        <CartView />
      </div>
    </>
  );
}
