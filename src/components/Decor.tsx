/**
 * Formes et décorations organiques, utilisées avec retenue :
 * une brindille par section au maximum, et jamais derrière du texte.
 */

export function Sprig({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        d="M4 52C26 50 50 40 68 24 78 15 90 9 116 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M40 43c-3.4-3.6-3.2-8.3.6-11.6 3.1 4 2.6 8.6-.6 11.6Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M53 36c-4.6-1.6-6.4-5.8-4.4-10.2 4.2 2.2 5.7 6.4 4.4 10.2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M66 26c-1.5-4.7.8-8.8 5.5-9.9.7 4.6-1.6 8.6-5.5 9.9Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M80 18c.6-4.5 4.1-7.1 8.8-6.4-1 4.4-4.4 6.9-8.8 6.4Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="98" cy="9.5" r="2" fill="currentColor" />
      <circle cx="107" cy="7.5" r="1.4" fill="currentColor" />
      <circle cx="26" cy="49" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function LeafPair({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M24 30V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M24 14c0-6.4 4-11.4 10.8-12.3.9 7.1-2.9 13.6-10.8 14.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M24 18.4C18.8 18 15.2 13.9 14.6 7.9c5.2.7 8.7 4.3 9.4 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Petit soulignement manuscrit, pour accentuer un mot dans un titre. */
export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 9.5c26-5.4 54-7.2 82-5.6 28 1.6 55 5 112 2.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Semis de points, pour animer une zone vide sans surcharger. */
export function DotGrid({ className = '' }: { className?: string }) {
  const dots: React.JSX.Element[] = [];
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={5 + col * 13}
          cy={5 + row * 13}
          r={1.5}
          fill="currentColor"
          opacity={0.55}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 92 66" aria-hidden="true" focusable="false" className={className}>
      {dots}
    </svg>
  );
}

/** Séparateur organique entre deux sections de couleurs différentes. */
export function WaveDivider({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-[36px] w-full sm:h-[52px] ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M0 22c168 26 336 34 520 22 184-12 296-36 470-34 174 2 290 26 450 30v16H0z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Tache organique utilisée en arrière-plan des visuels ronds. */
export function Blob({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M100 6c34 0 68 18 82 48 14 30 6 68-14 96-20 28-52 46-84 42-32-4-64-30-78-62C-8 98 0 58 22 34 44 10 66 6 100 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Branche d'eucalyptus verticale, posée en décor de part et d'autre d'une section. */
export function TwigDecor({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 70 120"
      fill="none"
      aria-hidden="true"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <path d="M8 4c18 26 30 62 34 110" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="currentColor">
        <ellipse cx="6" cy="2" rx="12" ry="6.5" transform="rotate(-28 6 2)" />
        <ellipse cx="24" cy="24" rx="13" ry="7" transform="rotate(-16 24 24)" />
        <ellipse cx="33" cy="52" rx="13" ry="7" transform="rotate(-6 33 52)" />
        <ellipse cx="40" cy="82" rx="12" ry="6.5" transform="rotate(4 40 82)" />
        <ellipse cx="4" cy="30" rx="11" ry="6" transform="rotate(30 4 30)" />
        <ellipse cx="13" cy="62" rx="11" ry="6" transform="rotate(24 13 62)" />
        <ellipse cx="22" cy="94" rx="10" ry="5.5" transform="rotate(16 22 94)" />
      </g>
    </svg>
  );
}

/** Petit tampon « nouveauté » dessiné, plutôt qu'un badge rectangulaire. */
export function NewStamp({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8A6320] ${className}`}
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
        <path d="M6 0c.4 1.9.9 2.4 2.8 2.8C6.9 3.2 6.4 3.7 6 5.6 5.6 3.7 5.1 3.2 3.2 2.8 5.1 2.4 5.6 1.9 6 0Z" />
        <path d="M9.6 6.8c.2 1 .5 1.3 1.5 1.5-1 .2-1.3.5-1.5 1.5-.2-1-.5-1.3-1.5-1.5 1-.2 1.3-.5 1.5-1.5Z" />
      </svg>
      Nouveau
    </span>
  );
}
