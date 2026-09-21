import Link from 'next/link';
import { getBestSellers, categories } from '@/lib/catalog';
import { ProductCard } from '@/components/ProductCard';
import { ButtonLink } from '@/components/Button';
import { LeafPair, Sprig } from '@/components/Decor';

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const suggestions = getBestSellers(3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/[0.06] bg-cream paper-texture">
        <Sprig className="pointer-events-none absolute -left-4 bottom-2 hidden h-20 w-40 text-sage-light/40 sm:block" />
        <div className="shell py-16 text-center lg:py-20">
          <LeafPair className="mx-auto h-8 w-12 text-sage-light" />
          <p className="mt-5 font-script text-[2.6rem] leading-none text-terracotta-deep">Oups</p>
          <h1 className="mt-3 text-balance title text-display-lg">
            Cette page a disparu du tableau
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-[1rem] leading-relaxed text-ink-soft">
            Le lien est peut-être ancien, ou la page a changé d’adresse. Voici par où reprendre.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/boutique" size="lg">
              Découvrir la boutique
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" size="lg">
              Retour à l’accueil
            </ButtonLink>
          </div>

          <nav aria-label="Catégories" className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="chip">
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="shell py-12">
        <h2 className="text-center title text-display-sm">
          Les fiches les plus imprimées
        </h2>
        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {suggestions.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} compact />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
