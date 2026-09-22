'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { AccentKey, Motif, ProductImage } from '@/lib/types';
import { ProductVisual, visualVariants, type VisualVariant } from './ProductVisual';

/**
 * Galerie de la fiche produit.
 *
 * Avec des photos : la première est affichée en grand, les autres en
 * vignettes cliquables dessous. Les photos sont posées sur un fond crème en
 * `object-contain` — une couverture ou une infographie ne doit jamais être
 * rognée, on y perdrait du texte.
 *
 * Sans photos : on garde les quatre vues dessinées du fichier, pour que les
 * produits pas encore photographiés restent présentables.
 */
export function ProductGallery({
  motif,
  accent,
  productName,
  images,
}: {
  motif: Motif
  accent: AccentKey
  productName: string
  images?: ProductImage[]
}) {
  const [active, setActive] = useState(0);
  const [activeVariant, setActiveVariant] = useState<VisualVariant>('sheet');

  if (images && images.length > 0) {
    const photo = images[Math.min(active, images.length - 1)];
    return (
      <div>
        <div className="overflow-hidden rounded-xl2 border border-ink/[0.07] bg-cream shadow-soft">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="aspect-square w-full object-contain"
          />
        </div>

        {images.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-2.5">
            {images.map((image, index) => {
              const isActive = index === active;
              return (
                <li key={image.src}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    className={`block w-full overflow-hidden rounded-soft border bg-cream transition-all duration-200 ease-calm ${
                      isActive
                        ? 'border-terracotta/70 ring-2 ring-terracotta/20'
                        : 'border-ink/10 hover:border-sage/40'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="7rem"
                      className="aspect-square w-full object-contain"
                    />
                    <span className="sr-only">Voir la photo {index + 1}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-2 text-center text-[0.76rem] text-muted" aria-live="polite">
          {photo.alt}
        </p>
      </div>
    );
  }

  const activeLabel = visualVariants.find((v) => v.id === activeVariant)?.label ?? '';

  return (
    <div>
      <div className="overflow-hidden rounded-xl2 border border-ink/[0.07] bg-cream shadow-soft">
        <ProductVisual
          motif={motif}
          accent={accent}
          variant={activeVariant}
          title={productName}
          alt={`${productName} — ${activeLabel.toLowerCase()}`}
          className="aspect-[4/5] w-full"
        />
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-2.5">
        {visualVariants.map((variant) => {
          const isActive = variant.id === activeVariant;
          return (
            <li key={variant.id}>
              <button
                type="button"
                onClick={() => setActiveVariant(variant.id)}
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
