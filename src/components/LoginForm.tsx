'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { login, type FormState } from '@/app/compte/actions';
import { Button } from './Button';
import { LockIcon } from './icons';

const initialState: FormState = { status: 'idle' };

/** Connexion à l'espace client : adresse email et mot de passe. */
export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="rounded-card border border-sage/20 bg-white p-6 shadow-soft sm:p-7">
      <h2 className="title-editorial text-editorial-lg">Me connecter</h2>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
        Indiquez l’adresse email et le mot de passe de votre compte.
      </p>

      <div className="mt-5">
        <label htmlFor="login-email" className="field-label">
          Adresse email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          className="field"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="login-password" className="field-label">
          Mot de passe
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'error' ? 'login-error' : undefined}
        />
      </div>

      {state.status === 'error' && (
        <p
          id="login-error"
          role="alert"
          className="mt-3 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={pending}>
        <LockIcon size={17} />
        {pending ? 'Un instant…' : 'Me connecter'}
      </Button>

      <p className="mt-4 text-center text-[0.84rem] text-muted">
        <Link href="/mot-de-passe-oublie" className="link-underline text-sage-dark">
          Mot de passe oublié ?
        </Link>
      </p>

      <p className="mt-5 border-t border-ink/[0.08] pt-5 text-center text-[0.9rem] text-ink-soft">
        Vous n’avez pas encore de compte ?{' '}
        <Link href="/creer-un-compte" className="font-semibold text-terracotta-deep link-underline">
          Créer mon compte
        </Link>
      </p>
    </form>
  );
}
