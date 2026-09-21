import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { ChevronRightIcon } from './icons';
import { LeafPair } from './Decor';

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${site.url}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <nav aria-label="Fil d’Ariane">
        <ol className="flex flex-wrap items-center gap-1 text-[0.78rem] text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-sage-dark">
              Accueil
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRightIcon size={13} className="text-sand" />
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-sage-dark">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-soft">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

/** En-tête standard des pages intérieures. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  center = true,
  decor = true,
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
  crumbs?: Crumb[]
  children?: ReactNode
  center?: boolean
  /** Le petit feuillage au-dessus du titre. */
  decor?: boolean
}) {
  return (
    <header className="border-b border-ink/[0.06] bg-cream paper-texture">
      <div className="shell py-8 lg:py-11">
        {crumbs && <Breadcrumbs items={crumbs} />}

        <div className={`${crumbs ? 'mt-6' : ''} ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
          {center && decor && <LeafPair className="mx-auto mb-3 h-7 w-11 text-sage-light" />}
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          <h1 className="text-balance title text-display-lg">{title}</h1>
          {intro && (
            <p className="mt-3.5 text-pretty text-[1rem] leading-relaxed text-ink-soft">{intro}</p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
