'use client';

import { useActionState, useState } from 'react';
import { submitReview, type ReviewState } from '@/app/compte/avis/actions';
import { Button } from './Button';
import { CheckIcon, StarFilledIcon } from './icons';

const initialState: ReviewState = { status: 'idle' };

const intitules: Record<number, string> = {
  1: 'Décevant',
  2: 'Moyen',
  3: 'Bien',
  4: 'Très bien',
  5: 'Formidable',
};

/**
 * Formulaire d'avis sur un produit acheté.
 *
 * La note est un vrai groupe de boutons radio : elle reste utilisable au
 * clavier et annonçable par un lecteur d'écran, les étoiles n'étant qu'un
 * habillage visuel posé par-dessus.
 */
export function ReviewForm({
  productId,
  productName,
  defaultName,
  bodyMinLength,
  bodyMaxLength,
}: {
  productId: string
  productName: string
  defaultName: string
  bodyMinLength: number
  bodyMaxLength: number
}) {
  const [state, formAction, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [survol, setSurvol] = useState(0);

  const pourCeProduit = state.productId === productId;

  if (pourCeProduit && state.status === 'sent') {
    return (
      <div className="rounded-card border border-sage/25 bg-sage-pale/25 p-5 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-sage-dark">
          <CheckIcon size={22} />
        </span>
        <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
          {state.message}
        </p>
      </div>
    );
  }

  const affichee = survol || rating;

  return (
    <form action={formAction} className="rounded-card border border-ink/[0.07] bg-white p-5">
      <input type="hidden" name="productId" value={productId} />

      <fieldset>
        <legend className="field-label">
          Votre note pour « {productName} »
        </legend>
        <div className="mt-1.5 flex items-center gap-3" onMouseLeave={() => setSurvol(0)}>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <label
                key={n}
                onMouseEnter={() => setSurvol(n)}
                className="cursor-pointer p-0.5 text-gold transition-transform duration-150 hover:scale-110"
              >
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  required
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="peer sr-only"
                />
                <StarFilledIcon
                  size={28}
                  className={`${n <= affichee ? 'text-gold' : 'text-gold/25'} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage-dark`}
                />
                <span className="sr-only">
                  {n} étoile{n > 1 ? 's' : ''} — {intitules[n]}
                </span>
              </label>
            ))}
          </div>
          <span aria-hidden="true" className="text-[0.84rem] text-muted">
            {affichee ? intitules[affichee] : 'Choisissez une note'}
          </span>
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor={`nom-${productId}`} className="field-label">
          Signé <span className="font-normal text-muted">(prénom ou pseudo, affiché publiquement)</span>
        </label>
        <input
          id={`nom-${productId}`}
          name="displayName"
          type="text"
          maxLength={40}
          defaultValue={defaultName}
          placeholder="Camille"
          className="field"
        />
      </div>

      <div className="mt-4">
        <label htmlFor={`avis-${productId}`} className="field-label">
          Votre avis
        </label>
        <textarea
          id={`avis-${productId}`}
          name="body"
          rows={4}
          required
          minLength={bodyMinLength}
          maxLength={bodyMaxLength}
          placeholder="Ce que vos enfants en ont fait, ce qui a changé au quotidien, ce que vous auriez aimé trouver en plus…"
          className="field resize-y"
          aria-describedby={`aide-${productId}`}
        />
        <p id={`aide-${productId}`} className="mt-1.5 text-[0.78rem] text-muted">
          {bodyMinLength} caractères minimum. Votre avis est relu avant d’apparaître sur la fiche
          du produit ; votre adresse email n’est jamais affichée.
        </p>
      </div>

      {pourCeProduit && state.status === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="md" className="mt-5" disabled={pending}>
        {pending ? 'Envoi…' : 'Envoyer mon avis'}
      </Button>
    </form>
  );
}
