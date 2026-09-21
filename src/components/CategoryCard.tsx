import Link from 'next/link';
import type { Category } from '@/lib/types';
import { countProductsInCategory } from '@/lib/catalog';
import { CategoryIllustration } from './CategoryIcons';
import { pluralize } from '@/lib/format';

/**
 * Carte catégorie : une pastille ronde crème cerclée de brun clair, une
 * illustration colorée au centre, le nom en serif dessous. Au survol, la
 * pastille s'élève très légèrement et le cercle se colore — rien de plus.
 */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <span className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-[#FDF6EE] transition-all duration-300 ease-calm group-hover:-translate-y-1 sm:h-24 sm:w-24">
        <span className="absolute inset-0 rounded-full border border-[#E4D3BE] transition-colors duration-300 group-hover:border-terracotta/40" />
        <CategoryIllustration motif={category.motif} size={42} />
      </span>

      <span className="font-script text-[1.26rem] text-sage-dark transition-colors duration-200 group-hover:text-terracotta-deep">
        {category.name}
      </span>
    </Link>
  );
}

/** Variante large, utilisée sur la page « Catégories ». */
export function CategoryPanel({ category }: { category: Category }) {
  const count = countProductsInCategory(category.slug);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex gap-5 rounded-card border border-ink/[0.07] bg-white p-5 shadow-soft transition-all duration-300 ease-calm hover:-translate-y-1 hover:shadow-lift sm:p-6"
    >
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FDF6EE]">
        <span className="absolute inset-0 rounded-full border border-[#E4D3BE]" />
        <CategoryIllustration motif={category.motif} size={34} />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-2.5">
          <span className="title text-display-sm transition-colors duration-200 group-hover:text-terracotta-deep">
            {category.name}
          </span>
          <span className="text-[0.78rem] text-muted">
            {count} {pluralize(count, 'produit')}
          </span>
        </span>
        <span className="mt-1 block font-script text-[1.05rem] text-terracotta-deep">
          {category.tagline}
        </span>
        <span className="mt-2 block text-[0.88rem] leading-relaxed text-ink-soft">
          {category.description}
        </span>
      </span>
    </Link>
  );
}
