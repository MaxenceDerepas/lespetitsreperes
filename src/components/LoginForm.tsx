'use client';

import { useActionState } from 'react';
import { requestLogin, type LoginState } from '@/app/compte/actions';
import { Button } from './Button';
import { CheckIcon, MailIcon } from './icons';

const initialState: LoginState = { status: 'idle' };

/** Connexion à l'espace client, sans mot de passe. */
export function LoginForm({ emailConfigured }: { emailConfigured: boolean }) {
  const [state, formAction, pending] = useActionState(requestLogin, initialState);

  if (state.status === 'sent') {
    return (
      <div className="rounded-card border border-sage/20 bg-white p-6 text-center shadow-soft">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-pale/70 text-sage-dark">
          <CheckIcon size={24} />
        </span>
        <h2 className="mt-4 title text-display-sm">Regardez votre boîte</h2>
        <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
          {state.message}
        </p>
        <p className="mt-4 text-[0.8rem] text-muted">
          Rien reçu au bout de deux minutes ? Vérifiez vos spams.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-card border border-sage/20 bg-white p-6 shadow-soft sm:p-7">
      <h2 className="title text-display-sm">Accéder à mon espace</h2>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
        Indiquez l’adresse email utilisée lors de votre commande. Aucun mot de passe à retenir.
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
        <MailIcon size={17} />
        {pending ? 'Un instant…' : emailConfigured ? 'Recevoir mon lien de connexion' : 'Accéder à mon espace'}
      </Button>

      {!emailConfigured && (
        <p className="mt-3.5 rounded-soft bg-sage-pale/45 px-3 py-2.5 text-[0.78rem] leading-relaxed text-sage-dark">
          <strong className="font-semibold">Mode démonstration.</strong> Aucune clé email n’étant
          configurée, la connexion est immédiate. En production, un lien signé valable
          20&nbsp;minutes est envoyé par email.
        </p>
      )}
    </form>
  );
}
