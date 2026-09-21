'use client';

import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '@/lib/testimonials';

/**
 * Témoignages : un encart rose pâle, un guillemet dessiné, la citation dans
 * la police du corps de texte et de simples pastilles de navigation. Le
 * défilement automatique
 * s'arrête dès que la souris ou le clavier entre dans la zone.
 */
export function Testimonials({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current + direction + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, [go, paused]);

  const current = testimonials[index];

  return (
    <div
      className={`rounded-xl2 bg-blush px-7 py-10 text-center sm:px-10 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <svg viewBox="0 0 44 30" className="mx-auto h-6 w-9 text-coral" fill="currentColor" aria-hidden="true">
        <path d="M15 0c-2.4 6.6-4.4 11-4.4 16.4 0 6.6 3.4 9.8 7.7 9.8s7.7-3.3 7.7-8.8-3.3-8.8-7.7-8.8c0-3.3 1.1-5.5 3.3-8.6zM37 0c-2.4 6.6-4.4 11-4.4 16.4 0 6.6 3.4 9.8 7.7 9.8s7.7-3.3 7.7-8.8-3.3-8.8-7.7-8.8c0-3.3 1.1-5.5 3.3-8.6z" />
      </svg>

      <blockquote className="mt-4" aria-live="polite" aria-atomic="true">
        {/* Police du corps de texte (Nunito Sans), droite et non italique :
            un avis se lit d'une traite, ce n'est pas un ornement. */}
        <p className="mx-auto max-w-[34rem] text-pretty font-sans text-[1.04rem] font-normal not-italic leading-[1.75] text-ink sm:text-[1.12rem]">
          «&nbsp;{current.quote}&nbsp;»
        </p>
        <footer className="mt-5 font-sans text-[0.88rem] not-italic text-ink-soft">
          — {current.author}, {current.context}
        </footer>
      </blockquote>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((item, i) => (
          <button
            key={item.author + i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-terracotta-deep' : 'w-2 bg-terracotta/30 hover:bg-terracotta/60'
            }`}
            aria-label={`Témoignage ${i + 1} sur ${total}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
