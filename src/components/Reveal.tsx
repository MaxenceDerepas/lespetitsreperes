'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Apparition progressive au scroll : une translation de 14 px et un fondu,
 * une seule fois, puis plus rien. Si l'IntersectionObserver n'est pas
 * disponible ou si l'utilisateur préfère moins d'animations, le contenu est
 * simplement visible immédiatement.
 */

interface Props {
  children: ReactNode
  /** Décalage en millisecondes, pour faire apparaître une grille en cascade. */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

export function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      // Seuil nul : l'apparition se déclenche dès le premier pixel visible.
      { rootMargin: '0px 0px -4% 0px', threshold: 0 },
    );

    observer.observe(node);

    // Filet de sécurité : si l'observateur n'a rien signalé au bout de trois
    // secondes (défilement très rapide, onglet en arrière-plan, navigateur
    // exotique), le contenu s'affiche quand même. Rien ne doit jamais rester
    // invisible à cause d'une animation.
    const fallback = window.setTimeout(() => setVisible(true), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
      className={`transition-[opacity,transform] duration-700 ease-calm ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3.5 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
