'use client';

import { useState } from 'react';
import { Button } from './Button';
import { CheckIcon } from './icons';

const subjects = [
  'Question avant achat',
  'Problème de téléchargement',
  'Facture ou paiement',
  'Licence professionnelle (crèche, classe, cabinet)',
  'Suggestion de fiche',
  'Autre',
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: subjects[0],
    orderReference: '',
    message: '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const update = (field: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((current) => ({ ...current, [field]: event.target.value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Envoi impossible.');
      setState('done');
      setFeedback(data.message as string);
    } catch (error) {
      setState('error');
      setFeedback(error instanceof Error ? error.message : 'Une erreur est survenue.');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-card border border-sage/20 bg-white p-7 text-center shadow-soft">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-pale/70 text-sage-dark">
          <CheckIcon size={24} />
        </span>
        <h2 className="mt-4 title text-display-sm">Message envoyé</h2>
        <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
          {feedback}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-sage/20 bg-white p-6 shadow-soft sm:p-7"
      noValidate={false}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="field-label">
              Prénom <span className="text-terracotta-deep">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              minLength={2}
              autoComplete="given-name"
              value={form.name}
              onChange={update('name')}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="field-label">
              Adresse email <span className="text-terracotta-deep">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              placeholder="votre@email.fr"
              className="field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="field-label">
            Sujet
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={update('subject')}
            className="field cursor-pointer"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-order" className="field-label">
            Numéro de commande{' '}
            <span className="font-normal text-muted">(si votre question en concerne une)</span>
          </label>
          <input
            id="contact-order"
            type="text"
            value={form.orderReference}
            onChange={update('orderReference')}
            placeholder="LPR-260917-4F2A"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="field-label">
            Votre message <span className="text-terracotta-deep">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            minLength={10}
            rows={6}
            value={form.message}
            onChange={update('message')}
            placeholder="Décrivez votre question ou votre besoin, même brièvement."
            className="field resize-y"
            aria-describedby="contact-help"
          />
          <p id="contact-help" className="mt-1.5 text-[0.76rem] text-muted">
            Nous répondons sous 24 à 48 h ouvrées. Vos données servent uniquement à vous répondre.
          </p>
        </div>
      </div>

      {state === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded-soft bg-peach/40 px-3 py-2.5 text-[0.84rem] text-terracotta-deep"
        >
          {feedback}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={state === 'loading'}>
        {state === 'loading' ? 'Envoi…' : 'Envoyer mon message'}
      </Button>
    </form>
  );
}
