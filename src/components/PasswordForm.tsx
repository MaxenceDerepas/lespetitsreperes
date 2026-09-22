'use client';

import { useActionState } from 'react';
import { changePassword, definePassword, type FormState } from '@/app/compte/actions';
import { Button } from './Button';
import { LockIcon } from './icons';

const initialState: FormState = { status: 'idle' };

/**
 * Mot de passe de l'espace client.
 *
 * Deux cas : le compte a déjà un mot de passe (on redemande l'actuel avant
 * d'en changer), ou la personne s'est connectée par lien email et n'en a pas
 * encore choisi un.
 */
export function PasswordForm({
  hasPassword,
  passwordMinLength,
}: {
  hasPassword: boolean
  passwordMinLength: number
}) {
  const [state, formAction, pending] = useActionState(
    hasPassword ? changePassword : definePassword,
    initialState,
  );

  return (
    <form
      id="form-mot-de-passe"
      action={formAction}
      className="rounded-card border border-ink/[0.07] bg-white p-6 shadow-soft"
    >
      <h2 className="title-editorial text-editorial-md">
        {hasPassword ? 'Changer mon mot de passe' : 'Choisir un mot de passe'}
      </h2>
      {!hasPassword && (
        <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
          Votre compte n’a pas encore de mot de passe. En choisir un vous permettra de vous
          connecter directement, sans passer par un lien email.
        </p>
      )}

      {hasPassword && (
        <div className="mt-4">
          <label htmlFor="pwd-current" className="field-label">
            Mot de passe actuel
          </label>
          <input
            id="pwd-current"
            name="current"
            type="password"
            required
            autoComplete="current-password"
            className="field"
          />
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="pwd-new" className="field-label">
          Nouveau mot de passe
        </label>
        <input
          id="pwd-new"
          name="password"
          type="password"
          required
          minLength={passwordMinLength}
          autoComplete="new-password"
          className="field"
          aria-describedby="pwd-aide"
        />
        <p id="pwd-aide" className="mt-1.5 text-[0.78rem] text-muted">
          {passwordMinLength} caractères minimum.
        </p>
      </div>

      <div className="mt-4">
        <label htmlFor="pwd-confirm" className="field-label">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="pwd-confirm"
          name="confirmation"
          type="password"
          required
          minLength={passwordMinLength}
          autoComplete="new-password"
          className="field"
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'idle' ? undefined : 'pwd-message'}
        />
      </div>

      {state.status !== 'idle' && state.message && (
        <p
          id="pwd-message"
          role="status"
          className={`mt-4 rounded-soft px-3 py-2.5 text-[0.84rem] ${
            state.status === 'error'
              ? 'bg-peach/40 text-terracotta-deep'
              : 'bg-sage-pale/50 text-sage-dark'
          }`}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="md" className="mt-5" disabled={pending}>
        <LockIcon size={16} />
        {pending ? 'Un instant…' : hasPassword ? 'Changer mon mot de passe' : 'Enregistrer'}
      </Button>
    </form>
  );
}
