'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { discountPercent, formatPrice } from '@/lib/format';
import { useCart } from './cart-context';
import { ProductVisual } from './ProductVisual';
import { NewStamp } from './Decor';
import { CartIcon, CheckIcon } from './icons';

/**
 * Carte produit.
 *
 * Le visuel occupe la majorité de la surface, le texte est centré dessous —
 * nom, type de fichier, prix — comme sur la maquette. Le bouton d'ajout rapide
 * reste visible en permanence (et non au survol seulement) pour rester
 * utilisable au clavier et sur mobile ; il se pose en bas à droite du visuel.
 *
 * Toute la carte est cliquable grâce au lien du titre étendu en `after:` :
 * il n'existe donc qu'un seul lien par carte.
 */
export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add, isInCart, openDrawer } = useCart();
  const inCart = isInCart(product.id);
  const discount = discountPercent(product.priceCents, product.compareAtCents);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-ink/[0.07] bg-white shadow-soft transition-all duration-300 ease-calm hover:-translate-y-1 hover:shadow-lift">
      <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
        {/* Photo si le produit en a une, sinon le visuel dessiné.
            `object-contain` : une photo carrée ou paysage ne doit pas être
            rognée dans un cadre portrait — on préfère un peu de crème autour
            qu'un titre coupé. */}
        {product.images?.[0] ? (
          <Image
            src={product.images[0].src}
            alt=""
            width={product.images[0].width}
            height={product.images[0].height}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 50vw"
            className="h-full w-full object-contain transition-transform duration-500 ease-calm group-hover:scale-[1.035]"
          />
        ) : (
          <ProductVisual
            motif={product.motif}
            accent={product.accent}
            title={product.name}
            alt=""
            className="h-full w-full transition-transform duration-500 ease-calm group-hover:scale-[1.035]"
          />
        )}

        <button
          type="button"
          onClick={() => (inCart ? openDrawer() : add(product))}
          className={`absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-soft transition-all duration-200 ease-calm ${
            inCart
              ? 'bg-sage-dark text-white hover:bg-sage-deep'
              : 'bg-white text-terracotta-deep hover:bg-terracotta-deep hover:text-white'
          }`}
          aria-label={
            inCart
              ? `${product.name} est déjà dans le panier — ouvrir le panier`
              : `Ajouter ${product.name} au panier`
          }
        >
          {inCart ? <CheckIcon size={18} /> : <CartIcon size={18} />}
        </button>
      </span>

      <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
        {product.isNew && <NewStamp />}
        {discount && (
          <span className="rounded-full bg-terracotta-deep px-2.5 py-1 text-[0.68rem] font-bold text-white">
            −{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center px-4 py-4 text-center sm:px-5 sm:py-5">
        <h3 className="font-script text-[1.36rem] leading-snug text-sage-dark">
          <Link
            href={`/boutique/${product.slug}`}
            className="transition-colors duration-200 after:absolute after:inset-0 after:z-0 after:content-[''] hover:text-terracotta-deep"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-[0.78rem] text-muted">
          {product.type}
          {!compact && ` · ${product.pages} pages`}
        </p>

        <p className="mt-auto flex items-baseline justify-center gap-2 pt-3">
          <span className="font-serif text-[1.3rem] text-terracotta-deep">
            {formatPrice(product.priceCents)}
          </span>
          {product.compareAtCents && (
            <span className="text-[0.8rem] text-muted line-through">
              {formatPrice(product.compareAtCents)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
