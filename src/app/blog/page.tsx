import Link from 'next/link';
import type { Metadata } from 'next';
import { blogCategories, getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/format';
import { PageBanner } from '@/components/PageBanner';
import { Reveal } from '@/components/Reveal';
import { accentPalette } from '@/components/ProductVisual';
import { MotifIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Le journal de la parentalité',
  description:
    'Des articles courts et concrets sur les routines, les émotions, l’autonomie des enfants, les activités et l’organisation du quotidien familial.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>
}) {
  const params = await searchParams;
  const all = getAllPosts();
  const activeCategory = params.categorie;
  const posts = activeCategory ? all.filter((p) => p.category === activeCategory) : all;

  const [lead, ...rest] = posts;

  return (
    <>
      <PageBanner
        title="Le journal des Petits Repères"
        subtitle="Des réflexions, des idées et des outils concrets pour accompagner les enfants avec douceur, au quotidien."
        crumbs={[{ label: 'Blog' }]}
        illustration={{
          src: '/bandeaux/blog.jpg',
          alt: 'Une maman et ses deux enfants penchés sur un cahier d’activités, à la table du salon',
          width: 1042,
          height: 412,
          priority: true,
        }}
      />

      <div className="shell py-10 lg:py-14">
        {/* Filtres par catégorie */}
        <nav aria-label="Catégories du blog" className="flex flex-wrap gap-2">
          <Link href="/blog" className={`chip ${!activeCategory ? 'chip-active' : ''}`}>
            Tous les articles
          </Link>
          {blogCategories.map((category) => (
            <Link
              key={category}
              href={`/blog?categorie=${encodeURIComponent(category)}`}
              className={`chip ${activeCategory === category ? 'chip-active' : ''}`}
            >
              {category}
            </Link>
          ))}
        </nav>

        {posts.length === 0 && (
          <p className="mt-10 rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-10 text-center text-[0.92rem] text-ink-soft">
            Aucun article dans cette catégorie pour l’instant.
          </p>
        )}

        {/* Article mis en avant */}
        {lead && (
          <Reveal className="mt-9">
            <Link
              href={`/blog/${lead.slug}`}
              className="group grid overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft transition-all duration-300 ease-calm hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[0.85fr_1.15fr]"
            >
              <span
                className="flex min-h-[13rem] items-center justify-center p-8"
                style={{ backgroundColor: accentPalette(lead.accent).bg }}
              >
                <span
                  className="transition-transform duration-500 ease-calm group-hover:scale-105"
                  style={{ color: accentPalette(lead.accent).ink }}
                >
                  <MotifIcon motif={lead.motif} size={96} strokeWidth={1} />
                </span>
              </span>

              <span className="flex flex-col p-6 sm:p-9">
                <span className="flex flex-wrap items-center gap-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-sage-dark">
                  <span className="rounded-full bg-sage-pale/60 px-2.5 py-1">{lead.category}</span>
                  <span className="font-normal normal-case tracking-normal text-muted">
                    {formatDate(lead.publishedAt)} · {lead.readingMinutes} min
                  </span>
                </span>
                <span className="mt-4 title-editorial text-editorial-lg transition-colors duration-200 group-hover:text-terracotta-deep">
                  {lead.title}
                </span>
                <span className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {lead.excerpt}
                </span>
                <span className="mt-auto pt-6 text-[0.86rem] font-semibold text-terracotta-deep">
                  Lire l’article →
                </span>
              </span>
            </Link>
          </Reveal>
        )}

        {/* Autres articles */}
        {rest.length > 0 && (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={index * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-ink/[0.07] bg-white shadow-soft transition-all duration-300 ease-calm hover:-translate-y-1 hover:shadow-lift"
                >
                  <span
                    className="flex h-32 items-center justify-center"
                    style={{ backgroundColor: accentPalette(post.accent).bg }}
                  >
                    <span
                      className="transition-transform duration-500 ease-calm group-hover:scale-110"
                      style={{ color: accentPalette(post.accent).ink }}
                    >
                      <MotifIcon motif={post.motif} size={52} strokeWidth={1.1} />
                    </span>
                  </span>

                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-sage-dark">
                      {post.category}
                    </span>
                    <span className="mt-2 title-editorial text-editorial-md transition-colors duration-200 group-hover:text-terracotta-deep">
                      {post.title}
                    </span>
                    <span className="mt-2 text-[0.87rem] leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </span>
                    <span className="mt-auto pt-4 text-[0.76rem] text-muted">
                      {formatDate(post.publishedAt)} · {post.readingMinutes} min de lecture
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
