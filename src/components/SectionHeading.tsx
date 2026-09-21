import type { ReactNode } from 'react';

/**
 * En-tête de section.
 *
 * Sur les sections centrées, le titre est encadré de deux brindilles
 * d'eucalyptus (ou de petites étoiles), comme sur la charte. Les ornements
 * disparaissent sur mobile, où la place manque.
 */

function TwigLeft({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 40" fill="none" aria-hidden="true" className={className}>
      <path d="M92 8C68 12 44 20 22 34" stroke="#A5AE8A" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="#A5AE8A">
        <ellipse cx="80" cy="6" rx="12" ry="6.5" transform="rotate(16 80 6)" />
        <ellipse cx="58" cy="13" rx="12" ry="6.5" transform="rotate(12 58 13)" />
        <ellipse cx="36" cy="23" rx="11" ry="6" transform="rotate(20 36 23)" />
        <ellipse cx="66" cy="25" rx="11" ry="6" transform="rotate(-24 66 25)" />
        <ellipse cx="44" cy="35" rx="10" ry="5.5" transform="rotate(-18 44 35)" />
      </g>
    </svg>
  );
}

function Stars({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 34" fill="none" aria-hidden="true" className={className}>
      <path
        d="M22 4c1.6 7.4 3.2 9 10.6 10.6C25.2 16.2 23.6 17.8 22 25.2c-1.6-7.4-3.2-9-10.6-10.6C18.8 13 20.4 11.4 22 4Z"
        fill="#E8B44A"
      />
      <path
        d="M50 12c1 4.6 2 5.6 6.6 6.6-4.6 1-5.6 2-6.6 6.6-1-4.6-2-5.6-6.6-6.6 4.6-1 5.6-2 6.6-6.6Z"
        fill="#E8B44A"
        opacity="0.75"
      />
      <circle cx="62" cy="7" r="2.6" fill="#E8B44A" opacity="0.6" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  ornament = 'sprig',
  children,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'left'
  /** Décor autour du titre : brindilles, étoiles, ou rien. */
  ornament?: 'sprig' | 'stars' | 'none'
  children?: ReactNode
}) {
  const centered = align === 'center';

  const Ornament = ornament === 'stars' ? Stars : TwigLeft;
  const ornamentClass = ornament === 'stars' ? 'h-5 w-14' : 'h-6 w-20';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-2.5">{eyebrow}</p>}

      <div className={centered ? 'flex items-center justify-center gap-4' : ''}>
        {centered && ornament !== 'none' && (
          <Ornament className={`hidden shrink-0 text-sage-light sm:block ${ornamentClass}`} />
        )}

        <h2 className="text-balance title text-display-md">{title}</h2>

        {centered && ornament !== 'none' && (
          <Ornament
            className={`hidden shrink-0 -scale-x-100 text-sage-light sm:block ${ornamentClass}`}
          />
        )}
      </div>

      {intro && (
        <p
          className={`mt-3.5 text-pretty text-[0.98rem] leading-relaxed text-ink-soft ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
