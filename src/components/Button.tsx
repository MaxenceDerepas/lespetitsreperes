import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Boutons de la marque.
 * `primary` : terracotta plein, texte blanc — réservé à l'action principale.
 * `secondary` : contour terracotta, fond transparent.
 * `ghost` : lien discret en vert sauge.
 * Hover : très légère variation de luminosité et translation de 1 px, 200 ms.
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'sage';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-calm disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta-deep text-white shadow-[0_1px_2px_rgba(102,88,75,0.08)] hover:bg-terracotta-deeper hover:-translate-y-px hover:shadow-[0_6px_18px_-8px_rgba(194,106,75,0.55)]',
  secondary:
    'border border-terracotta/60 text-terracotta-deep hover:border-terracotta hover:bg-terracotta/[0.07] hover:-translate-y-px',
  sage: 'bg-sage-dark text-white hover:bg-sage-deep hover:-translate-y-px hover:shadow-[0_6px_18px_-8px_rgba(95,107,81,0.5)]',
  ghost: 'text-sage-dark hover:text-terracotta-deep',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.82rem]',
  md: 'px-6 py-3 text-[0.9rem]',
  lg: 'px-7 py-3.5 text-[0.95rem]',
};

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  prefetch,
  ...rest
}: CommonProps & {
  href: string
  prefetch?: boolean
  target?: string
  rel?: string
  onClick?: () => void
  'aria-label'?: string
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
