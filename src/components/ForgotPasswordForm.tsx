'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { requestPasswordReset, type FormState } from '@/app/compte/actions';
import { Button } from './Button';
import { CheckIcon, MailIcon } from './icons';

const initialState: FormState = { status: 'idle' };

/** Demande d'un lien de réinitialisation du mot de passe. */
export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);

  if (state.status === 'sent') {
    return (
      <div className="rounded-card border border-sage/20 bg-white p-6 text-center shadow-soft">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-pale/70 text-sage-dark">
          <CheckIcon size={24} />
        </span>
        <h2 className="mt-4 title-editorial text-editorial-lg">Regardez votre boîte</h2>
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
      <h2 className="title-editorial text-editorial-lg">Mot de passe oublié</h2>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
        Indiquez votre adresse email : nous vous envoyons un lien pour vous reconnecter et
        choisir un nouveau mot de passe.
      </p>

      <div className="mt-5">
        <label htmlFor="forgot-email" className="field-label">
          Adresse email
        </label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          className="field"
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'error' ? 'forgot-error' : undefined}
        />
      </div>

      {state.status === 'error' && (
        <p
          id="forgot-error"
          role="alert"
          className="mt-3 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={pending}>
        <MailIcon size={17} />
        {pending ? 'Un instant…' : 'Recevoir le lien'}
      </Button>

      <p className="mt-5 border-t border-ink/[0.08] pt-5 text-center text-[0.9rem] text-ink-soft">
        <Link href="/connexion" className="font-semibold text-terracotta-deep link-underline">
          Revenir à la connexion
        </Link>
      </p>
    </form>
  );
}
