'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './icons';

/**
 * Flèche « retour en haut ».
 *
 * Présente sur toutes les pages, mais discrète : elle n'apparaît qu'une fois
 * la première hauteur d'écran dépassée — inutile de proposer de remonter à
 * quelqu'un qui est déjà en haut.
 *
 * Elle se place au-dessus du pied de page, jamais sur du contenu à lire, et
 * respecte le réglage « réduire les animations » du système : dans ce cas le
 * retour est instantané au lieu d'être fluide.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const remonter = () => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduit ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={remonter}
      aria-label="Revenir en haut de la page"
      // `hidden` plutôt qu'une simple opacité : invisible, le bouton ne doit
      // pas non plus être atteignable au clavier ni lu par un lecteur d'écran.
      className={`fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-sage/25 bg-white text-sage-dark shadow-soft transition-all duration-300 ease-calm hover:-translate-y-0.5 hover:border-sage/45 hover:text-terracotta-deep hover:shadow-lift sm:bottom-7 sm:right-6 sm:h-12 sm:w-12 ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUpIcon size={19} strokeWidth={1.6} />
    </button>
  );
}
