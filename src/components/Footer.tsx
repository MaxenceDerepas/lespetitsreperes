import Link from 'next/link';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { InstagramIcon, LockIcon, MailIcon } from './icons';

const columns = [
  {
    title: 'Boutique',
    links: [
      { label: 'Activités', href: '/categories/activites' },
      { label: 'Recettes', href: '/categories/recettes' },
      { label: 'Expériences', href: '/categories/experiences' },
      { label: 'Routines / Autonomie', href: '/categories/routines-autonomie' },
      { label: 'Connexion / Émotions', href: '/categories/connexion-emotions' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Conditions générales de vente', href: '/cgv' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
    ],
  },
  {
    title: 'Mon compte',
    links: [
      { label: 'Mon compte', href: '/compte' },
      { label: 'Mes commandes', href: '/compte/commandes' },
      { label: 'Mes téléchargements', href: '/compte/telechargements' },
      { label: 'Se connecter', href: '/connexion' },
    ],
  },
];

// Seuls les réseaux réellement tenus par la marque : un compte vide fait
// plus de mal que pas de compte du tout.
const socials = [
  { label: `Instagram ${site.instagramHandle}`, href: site.instagram, Icon: InstagramIcon },
  { label: `Écrire à ${site.email}`, href: `mailto:${site.email}`, Icon: MailIcon },
];

export function Footer() {
  return (
    <footer className="bg-cream">
      {/* ------------------------------ Pied ----------------------------- */}
      <div>
        <div className="shell py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_repeat(3,0.8fr)_0.9fr] lg:gap-8">
            {/* Marque */}
            <div>
              <Logo variant="large" asStatic />
              <p className="mt-6 max-w-[16rem] text-[0.86rem] leading-relaxed text-ink-soft">
                Des fiches PDF à imprimer pour accompagner le quotidien des familles avec
                bienveillance et simplicité.
              </p>
            </div>

            {/* Colonnes de liens */}
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-script text-[1.32rem] text-sage-dark">{column.title}</h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.85rem] leading-relaxed text-ink-soft transition-colors duration-200 hover:text-terracotta-deep"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Réseaux et paiement */}
            <div>
              <h2 className="font-script text-[1.32rem] text-sage-dark">Suivez-nous</h2>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta-deep shadow-soft transition-all duration-200 hover:-translate-y-px hover:bg-terracotta-deep hover:text-white"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 flex items-center gap-1.5 text-[0.8rem] font-semibold text-sage-dark">
                <LockIcon size={14} />
                Paiement sécurisé
              </h3>
              <ul
                className="mt-2.5 flex flex-wrap gap-2"
                aria-label="Moyens de paiement acceptés"
              >
                {['Visa', 'Mastercard', 'PayPal'].map((brand) => (
                  <li
                    key={brand}
                    className="rounded-md border border-ink/[0.12] bg-white px-2.5 py-1.5 text-[0.7rem] font-semibold tracking-wide text-ink-soft"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-ink/[0.07]">
          <p className="shell py-5 text-center text-[0.78rem] text-muted">
            © {new Date().getFullYear()} {site.name} — Tous droits réservés. Créé en France avec
            soin.
          </p>
        </div>
      </div>
    </footer>
  );
}
