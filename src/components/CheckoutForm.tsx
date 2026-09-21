'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './cart-context';
import { ProductVisual } from './ProductVisual';
import { Button, ButtonLink } from './Button';
import { formatPrice } from '@/lib/format';
import { CheckIcon, DownloadIcon, LockIcon, MailIcon } from './icons';

/**
 * Tunnel de paiement, volontairement court : produits numériques, donc aucune
 * adresse de livraison, aucun mode d'expédition, aucun champ inutile.
 * Seule l'adresse email est indispensable — c'est elle qui reçoit les fichiers.
 */
export function CheckoutForm({ stripeReady }: { stripeReady: boolean }) {
  const { lines, subtotalCents, ready } = useCart();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<{ code: string; label: string; discountCents: number } | null>(
    null,
  );
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const discountCents = promo?.discountCents ?? 0;
  const totalCents = Math.max(0, subtotalCents - discountCents);

  async function applyPromo(event: React.FormEvent) {
    event.preventDefault();
    setPromoLoading(true);
    setPromoError('');
    try {
      const response = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotalCents }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setPromo(null);
        setPromoError(data.error || 'Ce code ne semble pas valide.');
        return;
      }
      setPromo({ code: data.code, label: data.label, discountCents: data.discountCents });
      setPromoError('');
    } catch {
      setPromoError('Vérification impossible pour le moment.');
    } finally {
      setPromoLoading(false);
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          newsletter,
          promoCode: promo?.code,
          items: lines.map((line) => ({ productId: line.productId, quantity: line.quantity })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Le paiement n’a pas pu être initié.');

      // Paiement réel : redirection vers la page hébergée par Stripe.
      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl as string);
        return;
      }

      // Mode démonstration : la commande est déjà enregistrée et payée.
      router.push(data.redirectTo as string);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Une erreur est survenue. Merci de réessayer.',
      );
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <p className="py-16 text-center text-[0.92rem] text-muted" role="status">
        Chargement…
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-14 text-center">
        <h2 className="title text-display-sm">
          Il n’y a rien à régler pour l’instant
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
          Ajoutez une fiche ou un pack à votre panier, puis revenez ici.
        </p>
        <ButtonLink href="/boutique" className="mt-6">
          Découvrir la boutique
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      {/* ----------------------------- Formulaire ----------------------------- */}
      <div className="space-y-8">
        <section aria-labelledby="coordonnees">
          <h2 id="coordonnees" className="title text-display-sm">
            Où envoyer vos fichiers ?
          </h2>
          <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">
            Vos liens de téléchargement seront envoyés à cette adresse. Vérifiez-la bien.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="email" className="field-label">
                Adresse email <span className="text-terracotta-deep">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.fr"
                className="field"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="field-label">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="field-label">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="field"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="code-promo">
          <h2 id="code-promo" className="font-script text-[1.42rem] text-sage-dark">
            Vous avez un code promotionnel ?
          </h2>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="promo" className="sr-only">
              Code promotionnel
            </label>
            <input
              id="promo"
              type="text"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
              placeholder="BIENVENUE10"
              className="field flex-1 uppercase"
              aria-invalid={Boolean(promoError)}
              aria-describedby={promoError ? 'promo-error' : undefined}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={applyPromo}
              disabled={promoLoading || !promoInput}
              className="shrink-0"
            >
              {promoLoading ? 'Vérification…' : 'Appliquer'}
            </Button>
          </div>
          {promoError && (
            <p id="promo-error" role="alert" className="mt-2 text-[0.82rem] text-terracotta-deep">
              {promoError}
            </p>
          )}
          {promo && (
            <p className="mt-2 flex items-center gap-1.5 text-[0.84rem] font-semibold text-sage-dark">
              <CheckIcon size={16} />
              {promo.label} appliqué ({promo.code})
            </p>
          )}
        </section>

        <section aria-labelledby="conditions">
          <h2 id="conditions" className="sr-only">
            Conditions
          </h2>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 text-[0.87rem] leading-relaxed text-ink-soft">
              <input
                type="checkbox"
                required
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 text-terracotta-deep accent-terracotta-deep"
              />
              <span>
                J’accepte les{' '}
                <Link href="/cgv" className="text-terracotta-deep underline underline-offset-2">
                  conditions générales de vente
                </Link>{' '}
                et je reconnais que, s’agissant de fichiers numériques livrés immédiatement, je
                renonce à mon droit de rétractation.{' '}
                <span className="text-terracotta-deep">*</span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-[0.87rem] leading-relaxed text-ink-soft">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(event) => setNewsletter(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 accent-terracotta-deep"
              />
              <span>Je souhaite recevoir les nouveautés, un email par mois au maximum.</span>
            </label>
          </div>
        </section>
      </div>

      {/* ---------------------------- Récapitulatif ---------------------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-sage/15 bg-white p-6 shadow-soft">
          <h2 className="title text-display-sm">Votre commande</h2>

          <ul className="mt-5 space-y-3">
            {lines.map((line) => (
              <li key={line.productId} className="flex items-center gap-3">
                <span className="h-14 w-11 shrink-0 overflow-hidden rounded-soft">
                  <ProductVisual
                    motif={line.motif}
                    accent={line.accent}
                    title={line.name}
                    alt=""
                    className="h-full w-full"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.88rem] font-semibold text-ink">
                    {line.name}
                  </span>
                  <span className="block text-[0.76rem] text-muted">{line.type}</span>
                </span>
                <span className="shrink-0 text-[0.88rem] font-semibold text-ink">
                  {formatPrice(line.priceCents)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 text-[0.9rem]">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Sous-total</dt>
              <dd className="text-ink">{formatPrice(subtotalCents)}</dd>
            </div>
            {discountCents > 0 && (
              <div className="flex justify-between text-sage-dark">
                <dt>Remise {promo?.code}</dt>
                <dd>−{formatPrice(discountCents)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-ink-soft">Livraison</dt>
              <dd className="text-sage-dark">Aucune</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-ink/10 pt-3.5">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-serif text-2xl text-terracotta-deep">
                {formatPrice(totalCents)}
              </dd>
            </div>
          </dl>

          {error && (
            <p role="alert" className="mt-4 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting || !terms}>
            <LockIcon size={17} />
            {submitting ? 'Redirection…' : `Payer ${formatPrice(totalCents)}`}
          </Button>

          {!stripeReady && (
            <p className="mt-3 rounded-soft bg-sage-pale/45 px-3 py-2.5 text-[0.78rem] leading-relaxed text-sage-dark">
              <strong className="font-semibold">Mode démonstration.</strong> Aucune clé Stripe
              n’est configurée : la commande sera enregistrée et les téléchargements générés,
              sans débit réel.
            </p>
          )}

          <ul className="mt-4 space-y-1.5 text-[0.76rem] text-muted">
            <li className="flex items-center gap-1.5">
              <LockIcon size={13} />
              Paiement traité par Stripe — aucune donnée bancaire sur ce site
            </li>
            <li className="flex items-center gap-1.5">
              <DownloadIcon size={13} />
              Téléchargement disponible dès la validation du paiement
            </li>
            <li className="flex items-center gap-1.5">
              <MailIcon size={13} />
              Email récapitulatif avec vos liens sécurisés
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
