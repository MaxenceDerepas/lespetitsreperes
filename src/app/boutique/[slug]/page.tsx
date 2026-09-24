import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  categoryBySlug,
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/catalog';
import { keyFaq } from '@/lib/faq';
import { site } from '@/lib/site';
import { pageDescription, pageTitle, priceValidUntil } from '@/lib/seo';
import { discountPercent, formatPrice, priceForSchema } from '@/lib/format';
import { Breadcrumbs } from '@/components/PageHeader';
import { ProductGallery } from '@/components/ProductGallery';
import { AddToCart } from '@/components/AddToCart';
import { ProductCard } from '@/components/ProductCard';
import { Accordion } from '@/components/Accordion';
import { DigitalChecklist, TrustRow } from '@/components/TrustRow';
import { SectionHeading } from '@/components/SectionHeading';
import { NewStamp } from '@/components/Decor';
import { MotifIcon } from '@/components/icons';

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Produit introuvable' };

  const description = pageDescription(
    `${product.tagline}.`,
    `${product.pages} pages au format ${product.format}.`,
    'Téléchargement immédiat, impression illimitée.',
  );

  return {
    title: { absolute: pageTitle(`${product.name} — ${product.type} à imprimer`) },
    description,
    alternates: { canonical: `/boutique/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} — ${site.name}`,
      description,
      url: `${site.url}/boutique/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const related = getRelatedProducts(product, 3);
  const discount = discountPercent(product.priceCents, product.compareAtCents);

  const digitalFacts = [
    'PDF numérique',
    'Téléchargement immédiat',
    'Impression à la maison',
    'Usage personnel et familial',
    `Format ${product.format}`,
    'Réimprimable autant de fois que souhaité',
  ];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: flatten(product.description),
    sku: product.id,
    image: [`${site.url}/boutique/${product.slug}/opengraph-image`],
    brand: { '@type': 'Brand', name: site.name },
    category: category?.name,
    isFamilyFriendly: true,
    offers: {
      '@type': 'Offer',
      url: `${site.url}/boutique/${product.slug}`,
      price: priceForSchema(product.priceCents),
      priceCurrency: 'EUR',
      priceValidUntil: priceValidUntil(),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: site.name },
    },
  };

  const faqItems = [...(product.faq ?? []), ...keyFaq.slice(0, 3)];

  return (
    <>
      <div className="shell pt-6">
        <Breadcrumbs
          items={[
            { label: 'Boutique', href: '/boutique' },
            ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
      </div>

      {/* ===================== BLOC ACHAT ===================== */}
      <section className="shell grid gap-9 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-12">
        <ProductGallery
          motif={product.motif}
          accent={product.accent}
          productName={product.name}
          images={product.images}
        />

        <div className="lg:pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-sage-pale/60 px-3 py-1 text-[0.74rem] font-semibold text-sage-dark transition-colors hover:bg-sage-pale"
              >
                <MotifIcon motif={category.motif} size={14} />
                {category.name}
              </Link>
            )}
            {product.isNew && <NewStamp />}
          </div>

          <h1 className="mt-4 text-balance title-editorial text-editorial-xl">
            {product.name}
          </h1>
          <p className="mt-2 font-serif text-[1.22rem] font-medium leading-snug text-terracotta-deep">
            {product.tagline}
          </p>


          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <p className="font-serif text-[2.4rem] leading-none text-terracotta-deep lining-nums">
              {formatPrice(product.priceCents)}
            </p>
            {product.compareAtCents && (
              <>
                <span className="text-[1rem] text-muted line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
                {discount && (
                  <span className="rounded-full bg-terracotta/12 px-2.5 py-1 text-[0.76rem] font-bold text-terracotta-deep">
                    Économisez {discount}%
                  </span>
                )}
              </>
            )}
          </div>
          <p className="mt-1.5 text-[0.82rem] text-muted">
            {product.type} · {product.pages} pages · TVA non applicable
          </p>

          <div className="mt-7">
            <AddToCart product={product} />
          </div>

          <dl className="mt-7 grid gap-x-6 gap-y-3 rounded-card border border-sage/15 bg-white/70 p-5 sm:grid-cols-2">
            <div>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Format
              </dt>
              <dd className="mt-0.5 text-[0.9rem] text-ink">{product.format}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Ce qui est inclus
              </dt>
              <dd className="mt-1.5">
                <DigitalChecklist items={digitalFacts} />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="shell pb-4">
        <TrustRow className="rounded-card bg-cream px-5 py-4" />
      </div>

      {/* ===================== DESCRIPTION ===================== */}
      <section className="shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <h2 className="title-editorial text-editorial-lg">Description</h2>
          <Paragraphes
            texte={product.description}
            className="mt-3.5 text-pretty text-[0.98rem] leading-[1.75] text-ink-soft"
          />

          {product.sections?.map((section) => (
            <div key={section.title} className="mt-7">
              <h3 className="title-editorial text-[1.32rem]">{section.title}</h3>
              <Paragraphes
                texte={section.body}
                className="mt-2 text-[0.95rem] leading-[1.75] text-ink-soft"
              />
            </div>
          ))}

          <p className="mt-8 rounded-soft border-l-2 border-terracotta/50 bg-peach/25 px-4 py-3 text-[0.88rem] leading-relaxed text-ink">
            Produit numérique — aucun produit physique ne sera envoyé. Vous recevez un lien de
            téléchargement immédiatement après votre paiement, ainsi qu’un email récapitulatif.
          </p>
        </div>

        <aside className="rounded-card border border-ink/[0.07] bg-white p-6 shadow-soft lg:self-start">
          <h2 className="title-editorial text-editorial-lg">Ce que contient le fichier</h2>
          <ul className="mt-4 space-y-3">
            {product.contents.map((item, index) => (
              <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-pale text-[0.68rem] font-bold text-sage-dark">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="py-14" aria-labelledby="faq-produit">
        <div className="shell max-w-3xl">
          <h2 id="faq-produit" className="title-editorial text-editorial-lg">
            Questions fréquentes sur ce produit
          </h2>
          <div className="mt-6">
            <Accordion items={faqItems} idPrefix={`faq-${product.slug}`} />
          </div>
        </div>
      </section>

      {/* ================= PRODUITS ASSOCIÉS ================= */}
      {related.length > 0 && (
        <section className="bg-cream py-14 lg:py-16" aria-labelledby="assoc">
          <div className="shell">
            <SectionHeading
              eyebrow="Souvent choisis ensemble"
              title={<span id="assoc">Vous aimerez peut-être aussi</span>}
            />
            <ul className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} compact />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

/**
 * Un texte de descriptif peut contenir plusieurs paragraphes, séparés par une
 * ligne vide — exactement comme la cliente les écrit. On les rend en autant de
 * blocs plutôt que d'un seul pavé.
 */
function Paragraphes({ texte, className }: { texte: string; className?: string }) {
  const paragraphes = texte.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  // Un conteneur porte la mise en forme : empiler `mt-3` par-dessus la classe
  // reçue donnerait deux marges Tailwind concurrentes sur le même élément.
  return (
    <div className={`${className ?? ''} space-y-3.5`}>
      {paragraphes.map((paragraphe) => (
        <p key={paragraphe.slice(0, 48)}>{paragraphe}</p>
      ))}
    </div>
  );
}

/** Version sur une seule ligne, pour les données structurées et les métadonnées. */
function flatten(texte: string): string {
  return texte.replace(/\s+/g, ' ').trim();
}
