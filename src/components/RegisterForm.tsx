'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { register, type FormState } from '@/app/compte/actions';
import { Button } from './Button';
import { CheckIcon } from './icons';

const initialState: FormState = { status: 'idle' };

/** Création d'un compte client : email, mot de passe, prénom facultatif. */
export function RegisterForm({ passwordMinLength }: { passwordMinLength: number }) {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <form action={formAction} className="rounded-card border border-sage/20 bg-white p-6 shadow-soft sm:p-7">
      <h2 className="title-editorial text-editorial-lg">Créer mon compte</h2>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
        Utilisez de préférence l’adresse email de vos commandes : vous retrouverez
        immédiatement vos achats et vos téléchargements.
      </p>

      <div className="mt-5">
        <label htmlFor="register-firstname" className="field-label">
          Prénom <span className="font-normal text-muted">(facultatif)</span>
        </label>
        <input
          id="register-firstname"
          name="firstName"
          type="text"
          autoComplete="given-name"
          className="field"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="register-email" className="field-label">
          Adresse email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          className="field"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="register-password" className="field-label">
          Mot de passe
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          minLength={passwordMinLength}
          autoComplete="new-password"
          className="field"
          aria-describedby="register-password-aide"
        />
        <p id="register-password-aide" className="mt-1.5 text-[0.78rem] text-muted">
          {passwordMinLength} caractères minimum. Une phrase dont vous vous souvenez fait un
          excellent mot de passe.
        </p>
      </div>

      <div className="mt-4">
        <label htmlFor="register-confirmation" className="field-label">
          Confirmer le mot de passe
        </label>
        <input
          id="register-confirmation"
          name="confirmation"
          type="password"
          required
          minLength={passwordMinLength}
          autoComplete="new-password"
          className="field"
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'error' ? 'register-error' : undefined}
        />
      </div>

      {state.status === 'error' && (
        <p
          id="register-error"
          role="alert"
          className="mt-4 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={pending}>
        <CheckIcon size={17} />
        {pending ? 'Un instant…' : 'Créer mon compte'}
      </Button>

      <p className="mt-5 border-t border-ink/[0.08] pt-5 text-center text-[0.9rem] text-ink-soft">
        Vous avez déjà un compte ?{' '}
        <Link href="/connexion" className="font-semibold text-terracotta-deep link-underline">
          Me connecter
        </Link>
      </p>
    </form>
  );
}
