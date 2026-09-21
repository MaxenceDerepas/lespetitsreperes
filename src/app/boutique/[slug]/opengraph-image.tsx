import { ImageResponse } from 'next/og';
import { getAllProducts, getProductBySlug } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { OgCard, loadOgFonts, loadOgLogo, ogContentType, ogSize } from '@/lib/og';

/** Une carte de partage par produit, avec son nom et son prix. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Aperçu du produit — Les Petits Repères';

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        logo={await loadOgLogo()}
        eyebrow={product ? `${product.type} · ${product.pages} pages` : 'Fiche à imprimer'}
        title={product?.name ?? 'Les Petits Repères'}
        subtitle={product?.tagline}
        badge={product ? formatPrice(product.priceCents) : undefined}
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
