import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, categoryBySlug, getProductsByCategory } from '@/lib/catalog';
import type { CategorySlug } from '@/lib/types';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { ProductGrid } from '@/components/ProductGrid';
import { pageTitle } from '@/lib/seo';
import { TrustRow } from '@/components/TrustRow';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductListSchema } from '@/components/ProductListSchema';
import { pageDescription } from '@/lib/seo';

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: 'Catégorie introuvable' };

  return {
    // Certains noms de catégorie sont longs : pageTitle n'ajoute le nom de
    // la marque que s'il reste de la place sous les 60 caractères.
    title: { absolute: pageTitle(`${category.name} — fiches à imprimer`) },
    description: pageDescription(
      category.description,
      'Téléchargement immédiat, impression illimitée.',
    ),
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug as CategorySlug);
  const others = categories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <ProductListSchema products={products} name={`${category.name} — fiches à imprimer`} />

      <PageBanner
        title={category.name}
        subtitle={category.description}
        crumbs={[{ label: 'Catégories', href: '/categories' }, { label: category.name }]}
        scene={
          <BannerScene
            variant="categories"
            motif={category.motif}
            label={`Une fiche imprimée illustrant la catégorie ${category.name}, posée près d’une plante`}
          />
        }
      >
        <TrustRow className="mt-6 justify-center" />
      </PageBanner>

      <div className="shell py-10 lg:py-14">
        <ProductGrid products={products} />
      </div>

      <section className="bg-cream py-12" aria-labelledby="autres-categories">
        <div className="shell">
          <h2
            id="autres-categories"
            className="text-center title text-display-sm"
          >
            Explorer les autres catégories
          </h2>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-5">
            {others.map((item) => (
              <li key={item.slug}>
                <CategoryCard category={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
