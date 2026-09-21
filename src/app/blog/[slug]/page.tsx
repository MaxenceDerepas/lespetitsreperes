import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { getProductBySlug } from '@/lib/catalog';
import { site } from '@/lib/site';
import { pageDescription, pageTitle } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import { Breadcrumbs } from '@/components/PageHeader';
import { RichText } from '@/components/RichText';
import { ProductCard } from '@/components/ProductCard';
import { accentPalette } from '@/components/ProductVisual';
import { LeafPair } from '@/components/Decor';
import { MotifIcon } from '@/components/icons';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article introuvable' };

  const description = pageDescription(post.excerpt);

  return {
    title: { absolute: pageTitle(post.title) },
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const palette = accentPalette(post.accent);
  const related = getRelatedPosts(post, 2);
  const products = (post.relatedProducts ?? [])
    .map((productSlug) => getProductBySlug(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    // La photo de l'article si elle existe, sinon la carte générée.
    image: post.image
      ? [`${site.url}${post.image.src}`, `${site.url}/blog/${post.slug}/opengraph-image`]
      : [`${site.url}/blog/${post.slug}/opengraph-image`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/marque/logo-512.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: 'fr-FR',
  };

  return (
    <>
      <div className="shell pt-6">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
      </div>

      <article>
        {/* En-tête */}
        <header className="shell max-w-prose py-8 text-center lg:py-11">
          {/* Photo ou motif dessiné : un article illustré n'a pas besoin des
              deux, sinon l'en-tête s'empile sur trois éléments décoratifs. */}
          {!post.image && (
            <span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: palette.bg, color: palette.ink }}
            >
              <MotifIcon motif={post.motif} size={30} strokeWidth={1.3} />
            </span>
          )}

          <p className={`${post.image ? '' : 'mt-5'} flex flex-wrap items-center justify-center gap-2.5 text-[0.76rem]`}>
            <Link
              href={`/blog?categorie=${encodeURIComponent(post.category)}`}
              className="rounded-full bg-sage-pale/60 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-sage-dark transition-colors hover:bg-sage-pale"
            >
              {post.category}
            </Link>
            <span className="text-muted">
              {formatDate(post.publishedAt)} · {post.readingMinutes} min de lecture
            </span>
          </p>

          <h1 className="mt-5 text-balance title-editorial text-editorial-xl">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
          <p className="mt-5 text-[0.84rem] text-muted">
            Par <span className="font-semibold text-ink">{post.author}</span>,{' '}
            {site.founder.role.toLowerCase()}
          </p>
          <LeafPair className="mx-auto mt-6 h-7 w-11 text-sage-light" />
        </header>

        {/* La photo, un peu plus large que le texte : elle respire sans
            couper la lecture. */}
        {post.image && (
          <div className="shell max-w-4xl pb-10">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority
              className="h-auto w-full rounded-xl2 object-cover shadow-soft"
            />
          </div>
        )}

        {/* Corps de l'article */}
        <div className="shell max-w-prose pb-12">
          <RichText content={post.body} />

          {/* Produits liés */}
          {products.length > 0 && (
            <aside className="mt-12 rounded-xl2 border border-terracotta/20 bg-peach/20 p-6 sm:p-8">
              <p className="eyebrow text-terracotta-deeper">Pour aller plus loin</p>
              <h2 className="mt-2 text-balance title text-display-sm">
                {products.length === 1
                  ? `Découvrez « ${products[0].name} » à imprimer`
                  : 'Les supports qui accompagnent cet article'}
              </h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                Tout ce qui est décrit ici existe en fiche prête à imprimer — de quoi passer de la
                lecture à l’application ce soir.
              </p>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} compact />
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>

      {/* Articles liés */}
      {related.length > 0 && (
        <section className="bg-cream py-14" aria-labelledby="a-lire-aussi">
          <div className="shell">
            <h2 id="a-lire-aussi" className="text-center title text-display-sm">
              À lire aussi
            </h2>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex h-full flex-col rounded-card border border-ink/[0.07] bg-white p-6 shadow-soft transition-all duration-300 ease-calm hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-sage-dark">
                      {item.category}
                    </span>
                    <span className="mt-2.5 title-editorial text-editorial-md transition-colors duration-200 group-hover:text-terracotta-deep">
                      {item.title}
                    </span>
                    <span className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
                      {item.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
