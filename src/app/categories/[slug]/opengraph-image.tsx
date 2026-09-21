import { ImageResponse } from 'next/og';
import { categories, categoryBySlug, getProductsByCategory } from '@/lib/catalog';
import type { CategorySlug } from '@/lib/types';
import { OgCard, loadOgFonts, loadOgLogo, ogContentType, ogSize } from '@/lib/og';

/** Une carte de partage par catégorie. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Catégorie — Les Petits Repères';

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  const count = category ? getProductsByCategory(category.slug as CategorySlug).length : 0;

  return new ImageResponse(
    (
      <OgCard
        logo={await loadOgLogo()}
        eyebrow={category?.tagline ?? 'Nos catégories'}
        title={category?.name ?? 'Nos catégories'}
        subtitle={category?.description}
        badge={count > 1 ? `${count} fiches` : count === 1 ? '1 fiche' : undefined}
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
