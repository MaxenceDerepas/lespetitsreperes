import type { Metadata } from 'next';
import { categories } from '@/lib/catalog';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { CategoryPanel } from '@/components/CategoryCard';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Catégories — trouver le bon support',
  description:
    'Activités, recettes, expériences, routines et émotions : parcourez les cinq catégories pour trouver la fiche PDF à imprimer qui vous manque.',
  alternates: { canonical: '/categories' },
};

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        title="Nos catégories"
        subtitle="Chaque catégorie répond à un besoin précis du quotidien. Commencez par celle qui vous pèse le plus aujourd’hui — une seule à la fois suffit."
        crumbs={[{ label: 'Catégories' }]}
        scene={<BannerScene variant="categories" />}
      />

      <div className="shell py-12 lg:py-14">
        <ul className="grid gap-5 lg:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal as="li" key={category.slug} delay={index * 60}>
              <CategoryPanel category={category} />
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
