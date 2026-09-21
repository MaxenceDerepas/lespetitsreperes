'use client';

import { useEffect } from 'react';
import { useCart } from './cart-context';

/**
 * Vide le panier une fois la commande payée.
 * Placé sur la page de confirmation : le panier n'est jamais vidé avant que le
 * paiement soit réellement validé, pour ne rien perdre en cas d'abandon.
 */
export function ClearCart() {
  const { clear, ready, count } = useCart();

  useEffect(() => {
    if (ready && count > 0) clear();
  }, [ready, count, clear]);

  return null;
}
