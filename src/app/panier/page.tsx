import type { Metadata } from 'next';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { CartView } from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Votre panier',
  description: 'Récapitulatif de votre panier — produits numériques, sans frais de livraison.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageBanner
        compact
        title="Votre panier"
        subtitle="Aucune adresse de livraison à renseigner : vos fichiers arrivent immédiatement après le paiement."
        crumbs={[{ label: 'Panier' }]}
        scene={<BannerScene variant="panier" />}
      />

      <div className="shell py-10 lg:py-14">
        <CartView />
      </div>
    </>
  );
}
