import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from './Button';
import {
  ArrowRightIcon,
  HeartFilledIcon,
  HeartIcon,
  LeafIcon,
  RainbowIcon,
  StarIcon,
} from './icons';

/**
 * Bandeau d'accueil.
 *
 * Reprise du visuel fourni par la cliente. Les deux photos (à gauche le coin
 * bureau, à droite l'ourson et les fiches) sont des images ; tout le reste —
 * titre, catégories, bénéfices — est du vrai texte HTML.
 *
 * Pourquoi ne pas poser simplement l'image complète ? Parce qu'un titre en
 * pixels n'est lu ni par Google, ni par un lecteur d'écran, ni par le lecteur
 * qui agrandit la page ; et parce qu'un bandeau de 2242 × 886 devient une
 * bande illisible de 90 px de haut sur un téléphone. Ici, les photos se
 * retirent sous 1024 px et le contenu se réorganise tout seul.
 *
 * Les photos sont détourées de leur texte d'origine : la pastille rose de
 * droite est volontairement vide, la phrase qu'elle portait est réécrite en
 * HTML par-dessus (voir `RESSOURCES`).
 */

const CATEGORIES = [
  { label: 'Activités', href: '/categories/activites', ink: 'text-sage-deep' },
  { label: 'Recettes', href: '/categories/recettes', ink: 'text-coral-ink' },
  { label: 'Expériences', href: '/categories/experiences', ink: 'text-mustard-ink' },
  { label: 'Routines / Autonomie', href: '/categories/routines-autonomie', ink: 'text-sage-deep' },
  { label: 'Connexion / Émotions', href: '/categories/connexion-emotions', ink: 'text-terracotta-deep' },
];

const BENEFICES = [
  { Icon: LeafIcon, titre: 'Apprendre', suite: 'en s’amusant' },
  { Icon: HeartIcon, titre: 'Stimuler', suite: 'la curiosité' },
  { Icon: StarIcon, titre: 'Gagner en', suite: 'autonomie' },
  { Icon: RainbowIcon, titre: 'Partager', suite: 'des moments précieux' },
];

const RESSOURCES = ['Des ressources', 'simples, ludiques', 'et bienveillantes', 'pour grandir', 'ensemble'];

/* ------------------------- Petits ornements ------------------------- */

function SoleilLevant({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 92 62" fill="none" aria-hidden="true" className={className}>
      <path d="M46 34a14 14 0 0 1 14 14H32a14 14 0 0 1 14-14Z" fill="#E8B44A" />
      <path
        d="M46 6v10M26 12l5 6M66 12l-5 6M10 30h9M73 30h9M14 17l7 4M78 17l-7 4"
        stroke="#E8B44A"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* Le trait d'horizon reste sous le disque, qui s'arrête à y=48 :
          il culmine à y=50,5, jamais au-dessus. */}
      <path
        d="M6 55c12-2.9 25-4.5 40-4.5s28 1.6 40 4.5"
        stroke="#C99C79"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrindilleFine({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 96" fill="none" aria-hidden="true" className={className}>
      <path d="M30 94C22 68 20 38 26 6" stroke="#A5AE8A" strokeWidth="2.2" strokeLinecap="round" />
      <g fill="#A5AE8A">
        <ellipse cx="14" cy="30" rx="11" ry="6" transform="rotate(-38 14 30)" />
        <ellipse cx="40" cy="22" rx="11" ry="6" transform="rotate(38 40 22)" />
        <ellipse cx="17" cy="56" rx="10" ry="5.5" transform="rotate(-32 17 56)" />
        <ellipse cx="41" cy="48" rx="10" ry="5.5" transform="rotate(32 41 48)" />
      </g>
    </svg>
  );
}

/** Le filet pointillé au petit cœur, sous le titre. */
function FiletCoeur({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 18" fill="none" aria-hidden="true" className={className}>
      <path d="M4 9h96" stroke="#D9C3AE" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
      <path d="M160 9h96" stroke="#D9C3AE" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
      <path
        d="M130 15c-5-3.6-9-6.6-9-10a4.6 4.6 0 0 1 9-1.7A4.6 4.6 0 0 1 139 5c0 3.4-4 6.4-9 10Z"
        fill="#A5AE8A"
      />
    </svg>
  );
}

/* ----------------------------- Bandeau ----------------------------- */

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FDF8F1]" aria-labelledby="titre-accueil">
      {/* ---- Photo de gauche ---- */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[17rem] select-none lg:block xl:w-[21rem]">
        <Image
          src="/bandeau/gauche.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 21rem, 17rem"
          className="object-cover object-[70%_center]"
        />
        {/* Fondu vers le fond, pour que la photo se fonde dans la page */}
        <span className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FDF8F1] to-transparent" />
      </div>

      {/* ---- Photo de droite ---- */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[17rem] select-none lg:block xl:w-[21rem]">
        <Image
          src="/bandeau/droite.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 21rem, 17rem"
          className="object-cover object-[30%_center]"
        />
        <span className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FDF8F1] to-transparent" />

        {/* La pastille est redessinée en CSS : elle a été effacée de la photo,
            pour que la phrase reste centrée quelle que soit la largeur. */}
        <p className="absolute left-[40%] top-[15%] flex aspect-square w-[11.5rem] -translate-x-1/2 flex-col items-center justify-center rounded-full bg-[#F7E3DC]/75 px-5 text-center font-script text-[0.98rem] leading-[1.45] text-ink xl:w-[13.5rem] xl:text-[1.14rem]">
          {RESSOURCES.map((ligne) => (
            <span key={ligne} className="block">
              {ligne}
            </span>
          ))}
        </p>
      </div>

      {/* ---- Colonne centrale ---- */}
      <div className="relative mx-auto w-full max-w-shell px-5 pt-5 sm:px-7 lg:px-[18rem] lg:pt-6 xl:px-[22rem]">
        <div className="mx-auto max-w-[46rem] text-center">
          {/* Signature de la marque. Le nom est déjà dans le logo de l'en-tête :
              il est ici décoratif, et masqué aux lecteurs d'écran. */}
          <div className="relative flex items-center justify-center" aria-hidden="true">
            <BrindilleFine className="mr-1 h-11 w-6 shrink-0 sm:h-14 sm:w-8" />
            <span className="font-script text-[clamp(1.9rem,6vw,3.1rem)] leading-[1.15] text-sage-dark sm:whitespace-nowrap">
              Les <span className="text-terracotta-deep">Petits</span> Repères
            </span>
            <SoleilLevant className="-mt-8 ml-1 h-8 w-12 shrink-0 sm:h-11 sm:w-16" />
          </div>

          <h1 id="titre-accueil" className="mt-2">
            <span className="block text-balance font-serif text-[clamp(1.15rem,2.2vw,1.6rem)] uppercase tracking-[0.11em] text-ink">
              Des outils doux et créatifs
            </span>
            <span className="mt-1 block text-balance font-script text-[clamp(1.25rem,2.5vw,1.75rem)] leading-snug text-ink-soft">
              pour accompagner le quotidien des familles{' '}
              <HeartFilledIcon size={19} className="-mt-1 inline-block text-lilac" aria-hidden="true" />
            </span>
          </h1>

          <FiletCoeur className="mx-auto mt-3 h-4 w-44" />

          {/* ---- Les familles de fiches ---- */}
          {/* La ligne déborde un peu de la colonne pour tenir sur un seul rang :
              marges négatives ÉGALES des deux côtés, sinon elle se décale. */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1.5 lg:-mx-12 xl:-mx-28">
            <li aria-hidden="true">
              <LeafIcon size={17} className="mr-1 text-sage-light" />
            </li>
            {CATEGORIES.map(({ label, href, ink }, index) => (
              <li key={label} className="flex items-center">
                {index > 0 && <span className="mx-1 text-terracotta-light" aria-hidden="true">·</span>}
                <Link
                  href={href}
                  className={`rounded-soft px-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] transition-opacity hover:opacity-70 lg:text-[0.74rem] xl:tracking-[0.13em] ${ink}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li aria-hidden="true">
              <HeartIcon size={16} className="ml-1.5 text-terracotta-light" />
            </li>
          </ul>

          {/* ---- Appel à l'action ----
              Absent du visuel fourni, mais un accueil sans porte d'entrée vers
              la boutique fait perdre des ventes : on le garde, discret. */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {/* Un cran plus petit que le bouton standard, et transparent à
                25 % pour se poser sur le bandeau sans l'écraser. Le fond part
                d'un terracotta plus profond que celui de la charte : une fois
                éclairci par le crème qui transparaît, il retombe pile sur la
                teinte voulue tout en gardant le texte blanc lisible (4,6:1,
                juste au-dessus du seuil). Au survol, le bouton redevient
                plein. */}
            <ButtonLink
              href="/boutique"
              size="md"
              className="bg-[#7A3A22]/75 hover:bg-terracotta-deeper"
            >
              Découvrir la boutique
              <ArrowRightIcon size={17} />
            </ButtonLink>
            <Link href="/a-propos" className="link-underline text-[0.88rem] font-semibold text-sage-dark">
              Notre histoire
            </Link>
          </div>

          <p className="mt-3.5 flex items-center justify-center gap-2.5 text-[0.8rem] text-muted">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {['#E8B44A', '#E8837C', '#A5AE8A'].map((couleur) => (
                <span
                  key={couleur}
                  className="h-5 w-5 rounded-full border-2 border-[#FDF8F1]"
                  style={{ backgroundColor: couleur }}
                />
              ))}
            </span>
            De nombreuses familles ont déjà imprimé nos fiches
          </p>
        </div>
      </div>

      {/* ---- Le bandeau sauge des bénéfices ---- */}
      <div className="relative mt-4 bg-sage-pale/55 lg:mt-5">
        {/* Le liseré arrondi qui donne l'effet « papier posé » du visuel */}
        <span
          aria-hidden="true"
          className="absolute -top-5 left-0 right-0 h-6 rounded-t-[50%] bg-sage-pale/55"
        />
        <ul className="relative mx-auto flex w-full max-w-shell flex-wrap justify-center gap-x-8 gap-y-3 px-5 py-3 sm:px-7 lg:gap-x-14 lg:py-3.5">
          {BENEFICES.map(({ Icon, titre, suite }, index) => (
            <li
              key={titre}
              className={`flex items-center gap-2.5 ${
                index > 0 ? 'lg:border-l lg:border-ink/10 lg:pl-14' : ''
              }`}
            >
              <Icon size={21} className="shrink-0 text-sage-deep" />
              <span className="leading-[1.3]">
                <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-sage-deep">
                  {titre}
                </span>
                <span className="block font-script text-[0.98rem] text-ink-soft">{suite}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
