import { site } from '@/lib/site';
import { priceForSchema } from '@/lib/format';
import { priceValidUntil } from '@/lib/seo';
import type { Product } from '@/lib/types';

/**
 * Données structurées d'une liste de produits (ItemList).
 *
 * Sur une page qui affiche plusieurs fiches, cela indique aux moteurs quels
 * produits s'y trouvent et dans quel ordre — c'est ce qui permet de faire
 * remonter la page elle-même, et pas seulement les fiches produit isolées.
 */
export function ProductListSchema({ products, name }: { products: Product[]; name: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${site.url}/boutique/${product.slug}`,
        image: `${site.url}/boutique/${product.slug}/opengraph-image`,
        offers: {
          '@type': 'Offer',
          price: priceForSchema(product.priceCents),
          priceCurrency: 'EUR',
          priceValidUntil: priceValidUntil(),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
