'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from './cart-context';
import { ProductVisual } from './ProductVisual';
import { ButtonLink } from './Button';
import { CartIcon, CloseIcon, DownloadIcon, LockIcon, TrashIcon } from './icons';
import { formatPrice } from '@/lib/format';

/** Tiroir panier, ouvert à l'ajout d'un produit ou depuis le header. */
export function CartDrawer() {
  const { lines, subtotalCents, drawerOpen, closeDrawer, remove } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Votre panier">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={closeDrawer}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/25 animate-fade-in"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[25rem] flex-col bg-ivory shadow-lift animate-slide-in">
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-script text-2xl text-sage-dark">
            <CartIcon size={20} className="text-sage-dark" />
            Votre panier
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-sand/50 hover:text-ink"
            aria-label="Fermer le panier"
          >
            <CloseIcon size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-pale/60 text-sage-dark">
              <CartIcon size={28} />
            </span>
            <p className="text-[0.95rem] text-ink-soft">
              Votre panier est vide pour l’instant.
            </p>
            <ButtonLink href="/boutique" variant="secondary" size="sm" onClick={closeDrawer}>
              Découvrir la boutique
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-3 rounded-card bg-white p-3 shadow-soft">
                  <Link
                    href={`/boutique/${line.slug}`}
                    onClick={closeDrawer}
                    className="h-20 w-16 shrink-0 overflow-hidden rounded-soft"
                  >
                    <ProductVisual
                      motif={line.motif}
                      accent={line.accent}
                      title={line.name}
                      alt=""
                      className="h-full w-full"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/boutique/${line.slug}`}
                      onClick={closeDrawer}
                      className="block text-[0.9rem] font-semibold leading-snug text-ink hover:text-terracotta-deep"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-0.5 text-[0.76rem] text-muted">{line.type}</p>
                    <p className="mt-1.5 text-[0.9rem] font-semibold text-terracotta-deep">
                      {formatPrice(line.priceCents)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.productId)}
                    className="self-start rounded-full p-1.5 text-muted transition-colors hover:bg-peach/40 hover:text-terracotta-deep"
                    aria-label={`Retirer ${line.name} du panier`}
                  >
                    <TrashIcon size={17} />
                  </button>
                </li>
              ))}

              <li className="flex items-start gap-2 rounded-soft bg-sage-pale/35 px-3 py-2.5 text-[0.78rem] leading-relaxed text-sage-dark">
                <DownloadIcon size={15} className="mt-px shrink-0" />
                <span>
                  Un seul exemplaire suffit : vos fichiers sont réimprimables autant de fois que
                  nécessaire.
                </span>
              </li>
            </ul>

            <footer className="border-t border-ink/10 bg-white px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.9rem] text-ink-soft">Sous-total</span>
                <span className="font-serif text-2xl text-sage-dark">
                  {formatPrice(subtotalCents)}
                </span>
              </div>
              <p className="mt-1 text-[0.76rem] text-muted">
                Produits numériques — aucun frais de livraison.
              </p>
              <div className="mt-4 grid gap-2">
                <ButtonLink href="/commande" size="lg" onClick={closeDrawer} className="w-full">
                  Passer au paiement
                </ButtonLink>
                <ButtonLink href="/panier" variant="ghost" size="sm" onClick={closeDrawer}>
                  Voir le panier en détail
                </ButtonLink>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.74rem] text-muted">
                <LockIcon size={13} />
                Paiement sécurisé — vos coordonnées bancaires ne transitent jamais par ce site.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
