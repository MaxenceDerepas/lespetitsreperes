'use client';

import { useState } from 'react';
import { Button } from './Button';
import { CheckIcon } from './icons';

/**
 * Inscription à la lettre d'information.
 * Le point d'entrée /api/newsletter est prêt à être branché sur votre
 * outil d'emailing (Resend Audiences, Brevo, Mailchimp…).
 */
export function NewsletterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Inscription impossible pour le moment.');
      setState('done');
      setMessage(data.message as string);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
    }
  }

  if (state === 'done') {
    return (
      <p className="flex items-start gap-2 rounded-soft bg-white/80 px-4 py-3 text-[0.88rem] leading-relaxed text-sage-dark">
        <CheckIcon size={17} className="mt-0.5 shrink-0" />
        {message || 'Merci ! Votre fiche offerte arrive dans votre boîte email.'}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="sm:w-36">
          <label htmlFor="newsletter-firstname" className="sr-only">
            Votre prénom
          </label>
          <input
            id="newsletter-firstname"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Prénom"
            className="field w-full"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Votre adresse email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="field w-full"
            aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
            aria-invalid={state === 'error'}
          />
        </div>

        <Button type="submit" disabled={state === 'loading'} className="shrink-0">
          {state === 'loading' ? 'Un instant…' : 'Je m’inscris'}
        </Button>
      </div>

      {state === 'error' && (
        <p id="newsletter-error" role="alert" className="mt-2 text-[0.8rem] text-terracotta-deep">
          {message}
        </p>
      )}
      <p className="mt-2.5 text-[0.74rem] leading-relaxed text-muted">
        Désinscription en un clic. Votre adresse ne sera jamais cédée à un tiers.
      </p>
    </form>
  );
}
