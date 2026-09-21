'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { LeafPair } from '@/components/Decor';

/** Page d'erreur, volontairement rassurante et sans jargon technique. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // En production, brancher ici un service de suivi d'erreurs si souhaité.
    console.error('[erreur]', error);
  }, [error]);

  return (
    <div className="shell py-20 text-center">
      <LeafPair className="mx-auto h-8 w-12 text-sage-light" />
      <h1 className="mt-5 text-balance title text-display-md">
        Quelque chose s’est mal passé
      </h1>
      <p className="mx-auto mt-3.5 max-w-md text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
        Rien n’est perdu : votre panier et vos commandes sont intacts. Vous pouvez réessayer, ou
        nous écrire si cela se reproduit.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} size="lg">
          Réessayer
        </Button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-terracotta/60 px-7 py-3.5 text-[0.95rem] font-semibold text-terracotta-deep transition-colors hover:bg-terracotta/[0.07]"
        >
          Nous écrire
        </Link>
      </div>

      {error.digest && (
        <p className="mt-6 text-[0.76rem] text-muted">
          Référence technique : <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </div>
  );
}
