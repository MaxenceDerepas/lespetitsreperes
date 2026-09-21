import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/catalog';
import { PageHeader } from '@/components/PageHeader';
import { ProductGrid } from '@/components/ProductGrid';
import { SectionHeading } from '@/components/SectionHeading';
import { Testimonials } from '@/components/Testimonials';
import { Reveal } from '@/components/Reveal';
import { TrustRow } from '@/components/TrustRow';
import { ProductListSchema } from '@/components/ProductListSchema';

export const metadata: Metadata = {
  title: 'Boutique — fiches et packs PDF',
  description:
    'Toutes nos fiches et packs PDF à imprimer : activités, expériences, recettes, autonomie et émotions. Téléchargement immédiat après paiement.',
  alternates: { canonical: '/boutique' },
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        title="La boutique"
        intro="Des supports prêts à imprimer, pensés pour être utilisés dès ce soir. Chaque fichier est disponible immédiatement après l’achat et réimprimable autant de fois que nécessaire."
        crumbs={[{ label: 'Boutique' }]}
      >
        <TrustRow className="mt-6" />
      </PageHeader>

      <div className="shell py-10 lg:py-14">
        <ProductGrid products={products} />
      </div>

      {/* Ce que les familles en pensent */}
      <section className="bg-cream py-14 lg:py-16" aria-labelledby="avis-boutique">
        <div className="shell">
          <SectionHeading title={<span id="avis-boutique">Ce que les familles en pensent</span>} />
          <Reveal className="mx-auto mt-9 max-w-3xl">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      <ProductListSchema products={products} name="Toutes les fiches et packs à imprimer" />
    </>
  );
}
