import Link from 'next/link';
import type { Review } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { Stars } from './Stars';
import { CheckIcon } from './icons';

/**
 * Avis laissés par les acheteurs d'un produit.
 *
 * Tous les avis affichés ici ont été relus et publiés depuis /admin, et
 * proviennent d'une commande payée : d'où la mention « achat vérifié », qui
 * n'est pas décorative.
 */
export function ProductReviews({
  reviews,
  summary,
}: {
  reviews: Review[]
  summary: { average: number; count: number } | null
}) {
  return (
    <section className="bg-white py-14 lg:py-16" aria-labelledby="avis-produit">
      <div className="shell max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="avis-produit" className="title-editorial text-editorial-lg">
              Ce que les familles en disent
            </h2>
            {summary ? (
              <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.92rem] text-ink-soft">
                <Stars value={summary.average} size={18} />
                <span className="font-semibold text-ink">{summary.average.toFixed(1)} / 5</span>
                <span className="text-muted">
                  · {summary.count} avis{summary.count > 1 ? '' : ''}
                </span>
              </p>
            ) : (
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                Ce fichier n’a pas encore d’avis. Si vous l’avez acheté, le vôtre sera le premier.
              </p>
            )}
          </div>

          <Link
            href="/compte/avis"
            className="link-underline text-[0.88rem] font-semibold text-terracotta-deep"
          >
            Donner mon avis
          </Link>
        </div>

        {reviews.length > 0 && (
          <ul className="mt-8 space-y-4">
            {reviews.map((avis) => (
              <li
                key={avis.id}
                className="rounded-card border border-ink/[0.07] bg-cream/50 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2.5">
                    <span className="text-[0.95rem] font-semibold text-ink">
                      {avis.displayName}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sage-pale/70 px-2.5 py-0.5 text-[0.7rem] font-semibold text-sage-dark">
                      <CheckIcon size={12} />
                      Achat vérifié
                    </span>
                  </p>
                  <span className="text-[0.76rem] text-muted">{formatDate(avis.createdAt)}</span>
                </div>

                <Stars value={avis.rating} className="mt-2" />

                <p className="mt-2.5 whitespace-pre-line text-[0.94rem] leading-[1.7] text-ink-soft">
                  {avis.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
