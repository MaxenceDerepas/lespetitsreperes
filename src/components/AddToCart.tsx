'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from './cart-context';
import { Button } from './Button';
import { CartIcon, CheckIcon, DownloadIcon } from './icons';

/** Boutons d'achat de la fiche produit : ajouter au panier, puis acheter maintenant. */
export function AddToCart({ product }: { product: Product }) {
  const { add, isInCart, openDrawer } = useCart();
  const router = useRouter();
  const [buying, setBuying] = useState(false);
  const inCart = isInCart(product.id);

  return (
    <div className="space-y-2.5">
      <Button
        size="lg"
        className="w-full"
        onClick={() => (inCart ? openDrawer() : add(product))}
      >
        {inCart ? (
          <>
            <CheckIcon size={18} />
            Dans votre panier — voir le panier
          </>
        ) : (
          <>
            <CartIcon size={18} />
            Ajouter au panier
          </>
        )}
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={buying}
        onClick={() => {
          setBuying(true);
          add(product, { openDrawer: false });
          router.push('/commande');
        }}
      >
        <DownloadIcon size={18} />
        {buying ? 'Un instant…' : 'Acheter maintenant'}
      </Button>

      <p className="pt-1 text-center text-[0.78rem] leading-relaxed text-muted">
        Produit numérique — aucun produit physique ne sera envoyé.
      </p>
    </div>
  );
}
