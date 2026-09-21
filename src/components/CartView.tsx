'use client';

import Link from 'next/link';
import { useCart } from './cart-context';
import { ProductVisual } from './ProductVisual';
import { ButtonLink } from './Button';
import { formatPrice } from '@/lib/format';
import { DownloadIcon, InfinityIcon, LockIcon, TrashIcon } from './icons';

/** Page panier détaillée. */
export function CartView() {
  const { lines, subtotalCents, remove, clear, ready } = useCart();

  if (!ready) {
    return (
      <div className="py-16 text-center text-[0.92rem] text-muted" role="status">
        Chargement de votre panier…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-14 text-center">
        <h2 className="title text-display-sm">Votre panier est vide</h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
          Douze fiches et packs vous attendent dans la boutique — activités, expériences,
          recettes, autonomie et émotions.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/boutique">Découvrir la boutique</ButtonLink>
          <ButtonLink href="/categories" variant="secondary">
            Parcourir les catégories
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div>
        <ul className="space-y-4">
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex gap-4 rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft sm:gap-5 sm:p-5"
            >
              <Link
                href={`/boutique/${line.slug}`}
                className="h-28 w-[5.5rem] shrink-0 overflow-hidden rounded-soft sm:h-32 sm:w-[6.4rem]"
              >
                <ProductVisual
                  motif={line.motif}
                  accent={line.accent}
                  title={line.name}
                  alt={`Aperçu de ${line.name}`}
                  className="h-full w-full"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sage-dark">
                  {line.type}
                </p>
                <h2 className="mt-1 font-script text-[1.42rem] leading-snug text-sage-dark">
                  <Link
                    href={`/boutique/${line.slug}`}
                    className="transition-colors hover:text-terracotta-deep"
                  >
                    {line.name}
                  </Link>
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-[0.78rem] text-muted">
                  <DownloadIcon size={14} />
                  Téléchargement immédiat après paiement
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <p className="font-serif text-[1.3rem] text-terracotta-deep">
                    {formatPrice(line.priceCents)}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(line.productId)}
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.8rem] text-muted transition-colors hover:bg-peach/35 hover:text-terracotta-deep"
                  >
                    <TrashIcon size={15} />
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/boutique"
            className="link-underline text-[0.86rem] font-semibold text-sage-dark"
          >
            Continuer mes achats
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-[0.82rem] text-muted underline underline-offset-2 hover:text-terracotta-deep"
          >
            Vider le panier
          </button>
        </div>

        <p className="mt-6 flex items-start gap-2.5 rounded-soft bg-sage-pale/35 px-4 py-3 text-[0.84rem] leading-relaxed text-sage-dark">
          <InfinityIcon size={17} className="mt-px shrink-0" />
          Un seul exemplaire par fichier suffit : vos PDF sont réimprimables autant de fois que
          vous le souhaitez, pour tous les enfants de votre famille.
        </p>
      </div>

      {/* Récapitulatif */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-sage/15 bg-white p-6 shadow-soft">
          <h2 className="title text-display-sm">Récapitulatif</h2>

          <dl className="mt-5 space-y-2.5 text-[0.92rem]">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Sous-total</dt>
              <dd className="font-semibold text-ink">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Livraison</dt>
              <dd className="text-sage-dark">Aucune — produits numériques</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-ink/10 pt-3.5">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-serif text-2xl text-terracotta-deep">
                {formatPrice(subtotalCents)}
              </dd>
            </div>
          </dl>

          <p className="mt-2 text-[0.74rem] text-muted">
            TVA non applicable, article 293 B du CGI. Un code promotionnel peut être ajouté à
            l’étape suivante.
          </p>

          <ButtonLink href="/commande" size="lg" className="mt-5 w-full">
            Passer au paiement
          </ButtonLink>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.76rem] text-muted">
            <LockIcon size={13} />
            Paiement sécurisé par Stripe
          </p>
        </div>
      </aside>
    </div>
  );
}
