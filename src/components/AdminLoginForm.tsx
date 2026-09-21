'use client';

import { useActionState } from 'react';
import { adminLogin, type AdminState } from '@/app/compte/actions';
import { Button } from './Button';
import { LockIcon } from './icons';

const initialState: AdminState = { status: 'idle' };

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-sm rounded-card border border-sage/20 bg-white p-6 shadow-soft"
    >
      <h2 className="flex items-center gap-2 title text-display-sm">
        <LockIcon size={20} className="text-sage-dark" />
        Administration
      </h2>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
        Espace réservé à la gestion de la boutique.
      </p>

      <div className="mt-5">
        <label htmlFor="admin-password" className="field-label">
          Mot de passe
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
          aria-invalid={state.status === 'error'}
        />
      </div>

      {state.status === 'error' && (
        <p
          role="alert"
          className="mt-3 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={pending}>
        {pending ? 'Vérification…' : 'Entrer'}
      </Button>

      {!configured && (
        <p className="mt-4 rounded-soft bg-sage-pale/45 px-3 py-2.5 text-[0.78rem] leading-relaxed text-sage-dark">
          Définissez <code className="font-mono text-[0.75rem]">ADMIN_PASSWORD</code> dans{' '}
          <code className="font-mono text-[0.75rem]">.env.local</code> pour activer cet espace.
        </p>
      )}
    </form>
  );
}
