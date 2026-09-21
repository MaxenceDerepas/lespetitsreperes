'use client';

import { useState } from 'react';
import type { AccentKey, Motif } from '@/lib/types';
import { ProductVisual, visualVariants, type VisualVariant } from './ProductVisual';

/** Galerie de la fiche produit : quatre vues du même fichier. */
export function ProductGallery({
  motif,
  accent,
  productName,
}: {
  motif: Motif
  accent: AccentKey
  productName: string
}) {
  const [active, setActive] = useState<VisualVariant>('sheet');
  const activeLabel = visualVariants.find((v) => v.id === active)?.label ?? '';

  return (
    <div>
      <div className="overflow-hidden rounded-xl2 border border-ink/[0.07] bg-cream shadow-soft">
        <ProductVisual
          motif={motif}
          accent={accent}
          variant={active}
          title={productName}
          alt={`${productName} — ${activeLabel.toLowerCase()}`}
          className="aspect-[4/5] w-full"
        />
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-2.5">
        {visualVariants.map((variant) => {
          const isActive = variant.id === active;
          return (
            <li key={variant.id}>
              <button
                type="button"
                onClick={() => setActive(variant.id)}
                aria-pressed={isActive}
                className={`block w-full overflow-hidden rounded-soft border transition-all duration-200 ease-calm ${
                  isActive
                    ? 'border-terracotta/70 ring-2 ring-terracotta/20'
                    : 'border-ink/10 hover:border-sage/40'
                }`}
                title={variant.label}
              >
                <ProductVisual
                  motif={motif}
                  accent={accent}
                  variant={variant.id}
                  title={productName}
                  alt={`Voir : ${variant.label}`}
                  className="aspect-[4/5] w-full"
                />
                <span className="sr-only">{variant.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 text-center text-[0.76rem] text-muted" aria-live="polite">
        {activeLabel}
      </p>
    </div>
  );
}
