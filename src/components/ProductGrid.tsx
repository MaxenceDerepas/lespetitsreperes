import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

/**
 * Grille de produits, sans filtre ni tri.
 *
 * Le catalogue tient sur un écran : filtrer douze fiches demanderait plus
 * d'efforts au visiteur que de simplement les parcourir. La recherche reste
 * accessible depuis la loupe de l'en-tête, sur toutes les pages.
 */
export function ProductGrid({
  products,
  heading = 'Les fiches et packs à imprimer',
}: {
  products: Product[]
  heading?: string
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-12 text-center text-[0.95rem] text-ink-soft">
        Aucune fiche dans cette catégorie pour l’instant.
      </p>
    );
  }

  return (
    <>
      {/* Titre lu par les lecteurs d'écran : sans lui, on passerait du titre de
          page (h1) aux titres de fiches (h3) en sautant un niveau. */}
      <h2 className="sr-only">{heading}</h2>
      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product, index) => (
          <Reveal as="li" key={product.id} delay={Math.min(index, 7) * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
