'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mainNav } from '@/lib/site';
import { categories } from '@/lib/catalog';
import { useCart } from './cart-context';
import { Logo } from './Logo';
import { SearchOverlay } from './SearchOverlay';
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from './icons';

export function Header() {
  const pathname = usePathname();
  const { count, openDrawer, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  // Fermeture des panneaux à chaque changement de page.
  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/[0.07] bg-ivory/95 backdrop-blur-sm">
        <div className="shell flex items-center justify-between gap-4 py-3 lg:py-4">
          {/* Mobile : hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-1.5 rounded-full p-2 text-sage-dark transition-colors hover:bg-sage-pale/50 lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon size={22} />
          </button>

          <Logo priority />

          {/* Navigation principale */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className={item.href === '/boutique' ? 'relative' : undefined}
                  onMouseEnter={item.href === '/boutique' ? () => setShopOpen(true) : undefined}
                  onMouseLeave={item.href === '/boutique' ? () => setShopOpen(false) : undefined}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-terracotta-deep'
                        : 'text-sage-dark hover:text-terracotta-deep'
                    }`}
                  >
                    {item.label}
                    {item.href === '/boutique' && (
                      <ChevronDownIcon size={14} className="opacity-60" />
                    )}
                  </Link>

                  {/* Sous-menu catégories */}
                  {item.href === '/boutique' && shopOpen && (
                    <div className="absolute left-0 top-full w-60 pt-2">
                      <div className="card-soft overflow-hidden p-2">
                        <p className="px-3 pb-1.5 pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                          Catégories
                        </p>
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="block rounded-soft px-3 py-2 text-[0.86rem] text-ink transition-colors duration-150 hover:bg-sage-pale/40 hover:text-sage-dark"
                          >
                            {category.name}
                          </Link>
                        ))}
                        <Link
                          href="/boutique"
                          className="mt-1 block rounded-soft bg-peach/40 px-3 py-2 text-[0.84rem] font-semibold text-terracotta-deep"
                        >
                          Voir tous les produits
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-sage-dark transition-colors duration-200 hover:bg-sage-pale/50"
              aria-label="Rechercher"
            >
              <SearchIcon size={20} />
            </button>

            <Link
              href="/compte"
              className="hidden rounded-full p-2.5 text-sage-dark transition-colors duration-200 hover:bg-sage-pale/50 sm:block"
              aria-label="Mon compte"
            >
              <UserIcon size={20} />
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="relative rounded-full p-2.5 text-sage-dark transition-colors duration-200 hover:bg-sage-pale/50"
              aria-label={`Panier${ready && count > 0 ? ` — ${count} article${count > 1 ? 's' : ''}` : ''}`}
            >
              <CartIcon size={20} />
              {ready && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-terracotta-deep px-1 text-[0.66rem] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/25 animate-fade-in"
          />
          <nav
            aria-label="Navigation mobile"
            className="absolute left-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto bg-ivory px-5 pb-10 pt-5 shadow-lift"
          >
            <div className="mb-6 flex items-start justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-sand/50 hover:text-ink"
                aria-label="Fermer le menu"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block rounded-soft px-3 py-2.5 font-serif text-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-peach/35 text-terracotta-deep'
                        : 'text-sage-dark hover:bg-sage-pale/40'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 px-3">Catégories</p>
            <ul className="mt-2 space-y-0.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block rounded-soft px-3 py-2 text-[0.92rem] text-ink transition-colors hover:bg-sage-pale/40"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 px-3">Mon compte</p>
            <ul className="mt-2 space-y-0.5">
              <li>
                <Link
                  href="/compte"
                  className="block rounded-soft px-3 py-2 text-[0.92rem] text-ink transition-colors hover:bg-sage-pale/40"
                >
                  Mon espace client
                </Link>
              </li>
              <li>
                <Link
                  href="/compte/telechargements"
                  className="block rounded-soft px-3 py-2 text-[0.92rem] text-ink transition-colors hover:bg-sage-pale/40"
                >
                  Mes téléchargements
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="block rounded-soft px-3 py-2 text-[0.92rem] text-ink transition-colors hover:bg-sage-pale/40"
                >
                  Aide et FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
