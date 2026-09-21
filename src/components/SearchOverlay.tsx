'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, searchProducts } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { ProductVisual } from './ProductVisual';
import { CloseIcon, SearchIcon } from './icons';

/** Recherche en surimpression, ouverte depuis le header. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(query), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Recherche">
      <button
        type="button"
        aria-label="Fermer la recherche"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/25 backdrop-blur-[2px] animate-fade-in"
      />
      <div className="relative mx-auto mt-0 max-h-full w-full overflow-y-auto bg-ivory shadow-lift animate-fade-in sm:mt-4 sm:max-w-2xl sm:rounded-card">
        <div className="sticky top-0 flex items-center gap-3 border-b border-ink/10 bg-ivory px-5 py-4">
          <SearchIcon className="shrink-0 text-sage-dark" size={20} />
          <label htmlFor="site-search" className="sr-only">
            Rechercher un produit
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une routine, une émotion, une activité…"
            className="w-full bg-transparent text-[0.98rem] text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-sand/50 hover:text-ink"
            aria-label="Fermer la recherche"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="px-5 py-5">
          {query.trim().length === 0 && (
            <div>
              <p className="eyebrow mb-3">Parcourir par catégorie</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    onClick={onClose}
                    className="chip"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-[0.86rem] leading-relaxed text-muted">
                Essayez « routine du matin », « émotions », « semainier » ou « recettes ».
              </p>
            </div>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <p className="py-6 text-center text-[0.92rem] text-muted">
              Aucun résultat pour «&nbsp;{query}&nbsp;».{' '}
              <Link href="/boutique" onClick={onClose} className="text-terracotta-deep underline">
                Voir toute la boutique
              </Link>
            </p>
          )}

          {results.length > 0 && (
            <ul className="space-y-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/boutique/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-soft p-2 transition-colors duration-200 hover:bg-white"
                  >
                    <span className="h-14 w-14 shrink-0 overflow-hidden rounded-soft">
                      <ProductVisual
                        motif={product.motif}
                        accent={product.accent}
                        title={product.name}
                        alt=""
                        className="h-full w-full"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.92rem] font-semibold text-ink">
                        {product.name}
                      </span>
                      <span className="block truncate text-[0.8rem] text-muted">{product.tagline}</span>
                    </span>
                    <span className="shrink-0 text-[0.9rem] font-semibold text-terracotta-deep">
                      {formatPrice(product.priceCents)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
