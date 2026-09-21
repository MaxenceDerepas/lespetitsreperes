'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product } from '@/lib/types';

/**
 * Panier client.
 *
 * Particularité des produits numériques : un même fichier n'a aucune raison
 * d'être acheté deux fois — il est réimprimable à volonté. La quantité est
 * donc toujours de 1 par produit, et ajouter un produit déjà présent ne fait
 * qu'ouvrir le panier.
 *
 * Le panier est conservé dans le stockage local du navigateur pour survivre
 * à un rechargement. Les prix sont toujours revérifiés côté serveur au moment
 * du paiement : le contenu du panier n'est jamais une source de vérité.
 */

const STORAGE_KEY = 'lpr_cart_v1';

interface CartContextValue {
  lines: CartLine[]
  /** `true` dès que le panier a été relu depuis le navigateur. */
  ready: boolean
  count: number
  subtotalCents: number
  isInCart: (productId: string) => boolean
  add: (product: Product, options?: { openDrawer?: boolean }) => void
  remove: (productId: string) => void
  clear: () => void
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null);

function toLine(product: Product): CartLine {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    priceCents: product.priceCents,
    quantity: 1,
    motif: product.motif,
    accent: product.accent,
    type: product.type,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Relecture du panier après le montage, pour éviter toute différence
  // entre le rendu serveur et le rendu client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed as CartLine[]);
      }
    } catch {
      // Stockage indisponible (navigation privée, réglages restrictifs) :
      // le panier fonctionne alors le temps de la visite.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignoré volontairement */
    }
  }, [lines, ready]);

  // Fermeture du tiroir avec la touche Échap.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const add = useCallback((product: Product, options?: { openDrawer?: boolean }) => {
    setLines((current) =>
      current.some((line) => line.productId === product.id)
        ? current
        : [...current, toLine(product)],
    );
    if (options?.openDrawer !== false) setDrawerOpen(true);
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotalCents = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
    return {
      lines,
      ready,
      count: lines.length,
      subtotalCents,
      isInCart: (productId: string) => lines.some((line) => line.productId === productId),
      add,
      remove,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [lines, ready, drawerOpen, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart doit être utilisé à l’intérieur de <CartProvider>.');
  return context;
}
