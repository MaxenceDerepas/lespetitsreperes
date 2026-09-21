import Link from 'next/link';
import { logout } from '@/app/compte/actions';
import { CartIcon, DownloadIcon, UserIcon } from './icons';

const links = [
  { href: '/compte', label: 'Vue d’ensemble', Icon: UserIcon },
  { href: '/compte/commandes', label: 'Mes commandes', Icon: CartIcon },
  { href: '/compte/telechargements', label: 'Mes téléchargements', Icon: DownloadIcon },
];

/** Navigation de l'espace client, avec le bouton de déconnexion. */
export function AccountNav({ current, email }: { current: string; email: string }) {
  return (
    <nav aria-label="Espace client" className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-card border border-sage/15 bg-white p-5 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Connectée en tant que
        </p>
        <p className="mt-1 truncate text-[0.9rem] font-semibold text-ink" title={email}>
          {email}
        </p>

        <ul className="mt-4 space-y-1 border-t border-ink/[0.07] pt-4">
          {links.map(({ href, label, Icon }) => {
            const active = current === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2.5 rounded-soft px-3 py-2.5 text-[0.88rem] transition-colors duration-200 ${
                    active
                      ? 'bg-sage-pale/60 font-semibold text-sage-dark'
                      : 'text-ink-soft hover:bg-cream hover:text-sage-dark'
                  }`}
                >
                  <Icon size={17} className={active ? 'text-sage-dark' : 'text-muted'} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <form action={logout} className="mt-4 border-t border-ink/[0.07] pt-4">
          <button
            type="submit"
            className="text-[0.84rem] text-muted underline underline-offset-2 transition-colors hover:text-terracotta-deep"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </nav>
  );
}
