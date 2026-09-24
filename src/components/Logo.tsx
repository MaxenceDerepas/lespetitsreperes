import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Identité de la marque.
 *
 * Le nom est composé en vraie typographie (Cormorant Garamond) plutôt qu'en
 * tracés vectorisés : il reste net à toutes les tailles, sélectionnable,
 * lisible par les moteurs de recherche, et il s'aligne parfaitement avec le
 * reste des titres du site. Les ornements — soleil, brindille d'eucalyptus,
 * points, cœur, cadre ovale — sont des SVG dessinés à la main.
 *
 * Trois couleurs, comme sur la charte : « Les » brun profond, « Petits » vert
 * sauge, « Repères » terracotta.
 *
 * Deux variantes, volontairement différentes :
 *
 *  - `header` : le nom composé, à l'horizontale. Dans une barre de navigation
 *    de 80 px de haut, le médaillon rond devient un petit rond illisible et
 *    écrase la navigation — le nom écrit reste net et se lit d'un coup d'œil.
 *  - `large`  : le médaillon original (`public/marque/logo.png`), là où il a la
 *    place de s'exprimer — pied de page, pages éditoriales.
 *
 * Le médaillon reste le logo de référence partout ailleurs : favicon, cartes
 * de partage, données structurées.
 */

/* ----------------------------- Ornements ----------------------------- */

function Sun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 44" fill="none" aria-hidden="true" className={className}>
      <path d="M12 38a20 20 0 0 1 40 0z" fill="#E8B44A" />
      <path
        d="M32 2v7M14.5 8.5l4.4 5.2M49.5 8.5l-4.4 5.2M2 26h6.5M55.5 26H62"
        stroke="#E8B44A"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Le trait d'horizon passe SOUS le disque : le demi-soleil repose
          dessus, il ne le traverse jamais. Le disque s'arrête à y=38, le
          sommet du trait est à y=40 — un peu en dessous, comme sur le
          médaillon d'origine. */}
      <path
        d="M4 43c12-1.9 22-2.7 28-2.7s16 .8 28 2.7"
        stroke="#C9A78C"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EucalyptusSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 8c22 10 44 26 62 48"
        stroke="#A5AE8A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="#A5AE8A">
        <ellipse cx="18" cy="6" rx="12" ry="7" transform="rotate(-24 18 6)" />
        <ellipse cx="41" cy="16" rx="13" ry="7.5" transform="rotate(-18 41 16)" />
        <ellipse cx="62" cy="31" rx="13" ry="7.5" transform="rotate(-8 62 31)" />
        <ellipse cx="24" cy="27" rx="11" ry="6.5" transform="rotate(26 24 27)" />
        <ellipse cx="46" cy="44" rx="12" ry="7" transform="rotate(34 46 44)" />
        <ellipse cx="70" cy="56" rx="11" ry="6.5" transform="rotate(16 70 56)" />
      </g>
    </svg>
  );
}

/** Petite marque seule — favicon, facture, email. */
export function LogoMark({ className = '', size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 40a14 14 0 0 1 28 0z" fill="#E8B44A" />
      <path
        d="M32 12v5M19 18l3 3.6M45 18l-3 3.6M10 31h4.6M49.4 31H54"
        stroke="#E8B44A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Idem : le disque s'arrête à y=40, le trait culmine à y=42,6. */}
      <path
        d="M8 46c10-2.4 18-3.4 24-3.4s14 1 24 3.4"
        stroke="#C9A78C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="#A5AE8A">
        <ellipse cx="14" cy="52" rx="8" ry="4.6" transform="rotate(-20 14 52)" />
        <ellipse cx="28" cy="57" rx="8" ry="4.6" transform="rotate(10 28 57)" />
      </g>
      <path
        d="M48 60s-6-3.6-6-7a3 3 0 0 1 6-1.2A3 3 0 0 1 54 53c0 3.4-6 7-6 7Z"
        fill="#C4694A"
      />
    </svg>
  );
}

/* ------------------------------- Logo -------------------------------- */

interface LogoProps {
  /** `header` pour la barre de navigation, `large` pour le footer et les pages. */
  variant?: 'header' | 'large'
  className?: string
  asStatic?: boolean
  /** Passe en `priority` pour le logo visible dès le premier écran. */
  priority?: boolean
}

function Wordmark({ large }: { large: boolean }) {
  return (
    <span className={`relative flex flex-col ${large ? 'items-center' : 'items-start'}`}>
      {/* Brindille, en haut à gauche du nom */}
      <EucalyptusSprig
        className={`absolute text-sage-light ${
          large ? '-left-14 -top-5 h-14 w-24' : '-left-10 -top-7 h-8 w-14'
        }`}
      />

      <span className="relative flex items-end gap-1.5 leading-[0.92]">
        <span
          className={`font-serif font-medium tracking-[0.01em] text-ink ${
            large ? 'text-[2.1rem]' : 'text-[1.14rem]'
          }`}
        >
          Les
        </span>
        <span
          className={`font-serif font-medium tracking-[0.01em] text-sage-dark ${
            large ? 'text-[2.6rem]' : 'text-[1.44rem]'
          }`}
        >
          Petits
        </span>
        <Sun className={large ? 'mb-1 h-6 w-9' : 'mb-1 h-3.5 w-[1.3rem]'} />
      </span>

      <span
        className={`font-serif font-medium tracking-[0.01em] text-terracotta-deep ${
          large ? '-mt-1 text-[2.7rem]' : 'text-[1.5rem] leading-[1.02]'
        }`}
      >
        Repères
      </span>

      {/* La baseline disparaît sur très petit écran, où elle passerait sur
          deux lignes et alourdirait le bandeau. */}
      <span
        className={`mt-1 uppercase text-muted ${
          large
            ? 'text-[0.62rem] tracking-[0.26em]'
            : 'hidden text-[0.5rem] tracking-[0.19em] sm:block'
        }`}
      >
        Des outils doux pour grandir en confiance
      </span>
    </span>
  );
}

export function Logo({
  variant = 'header',
  className = '',
  asStatic = false,
  priority = false,
}: LogoProps) {
  const large = variant === 'large';

  const content = large ? (
    // Le médaillon original, tel quel : jamais redessiné, jamais recoloré.
    <Image
      src="/marque/logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={260}
      height={260}
      priority={priority}
      sizes="260px"
      className={`h-auto w-[13rem] sm:w-[15rem] ${className}`}
    />
  ) : (
    // La brindille remonte au-dessus du nom : cette marge lui laisse la place,
    // maintenant qu'il n'y a plus de bandeau au-dessus de l'en-tête.
    <span className={`inline-flex pl-7 pt-5 ${className}`}>
      <Wordmark large={false} />
    </span>
  );

  if (asStatic) return content;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — retour à l’accueil`}
      className="inline-flex rounded-soft transition-opacity duration-200 hover:opacity-85"
    >
      {content}
    </Link>
  );
}

export { EucalyptusSprig, Sun as LogoSun };
