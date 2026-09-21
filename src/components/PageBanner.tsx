import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './PageHeader';
import { Squiggle } from './Decor';

/**
 * Bandeau de titre des pages intérieures.
 *
 * Un seul composant pour tout le site : illustration à gauche, titre
 * manuscrit et sous-titre à droite. Toutes les pages partagent donc la même
 * hauteur, les mêmes proportions et la même palette — seule l'illustration
 * change, ce qui donne à chaque page son ambiance sans casser l'unité.
 *
 * Deux façons de fournir l'illustration :
 *
 *   • `illustration` — une image (les dessins fournis par la cliente).
 *     Le cadre est au format 16/10 et l'image est recadrée sur sa partie
 *     dessinée (`fit: 'cover'`), ce qui écarte la zone crème vide sans
 *     toucher au fichier d'origine. Pour un dessin détouré qui doit rester
 *     entier, utiliser `fit: 'contain'`.
 *
 *   • `scene` — une illustration SVG (voir <BannerScene />), pour les pages
 *     qui n'ont pas encore de dessin dédié.
 *
 * Le fond reste crème uni : pas de dégradé, l'illustration porte la couleur.
 *
 * `compact` réduit l'ensemble d'un cran pour les pages fonctionnelles
 * (panier, commande, compte) où le bandeau ne doit pas retarder l'action.
 */

export interface BannerIllustration {
  src: string
  alt: string
  width: number
  height: number
  /** 'cover' recadre sur la partie dessinée, 'contain' affiche le dessin entier. */
  fit?: 'cover' | 'contain'
  /** À activer uniquement sur la première image visible de la page. */
  priority?: boolean
}

export function PageBanner({
  title,
  subtitle,
  illustration,
  scene,
  crumbs,
  compact = false,
  children,
}: {
  title: string
  subtitle?: ReactNode
  illustration?: BannerIllustration
  scene?: ReactNode
  crumbs?: Crumb[]
  compact?: boolean
  children?: ReactNode
}) {
  const contain = illustration?.fit === 'contain';

  // Le dessin est recadré sur sa partie dessinée : son bord droit est donc une
  // coupe nette. On la fait fondre dans le crème du bandeau plutôt que de poser
  // un rectangle sur le fond. Un dessin détouré (`contain`) n'en a pas besoin.
  const fade = {
    maskImage: 'linear-gradient(to right, #000 74%, transparent 99%)',
    WebkitMaskImage: 'linear-gradient(to right, #000 74%, transparent 99%)',
  } as const;

  const visual = illustration ? (
    <div
      className={`relative w-full ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
      style={contain ? undefined : fade}
    >
      <Image
        src={illustration.src}
        alt={illustration.alt}
        width={illustration.width}
        height={illustration.height}
        sizes="(min-width: 1024px) 44vw, (min-width: 640px) 26rem, 88vw"
        priority={illustration.priority}
        className={`h-full w-full ${contain ? 'object-contain' : 'object-cover object-left'}`}
      />
    </div>
  ) : scene ? (
    <div style={fade}>{scene}</div>
  ) : null;

  return (
    <header className="border-b border-ink/[0.06] bg-paper">
      <div className={`shell ${compact ? 'pb-6 pt-5 lg:pb-8 lg:pt-6' : 'pb-7 pt-5 lg:pb-12 lg:pt-7'}`}>
        {crumbs && <Breadcrumbs items={crumbs} />}

        <div
          className={`${crumbs ? 'mt-4 lg:mt-6' : ''} grid items-center gap-4 sm:gap-7 lg:gap-12 ${
            compact ? 'lg:grid-cols-[34%_1fr]' : 'lg:grid-cols-[44%_1fr]'
          }`}
        >
          {visual && (
            <div
              className={`mx-auto w-full lg:mx-0 lg:max-w-none ${
                compact ? 'max-w-[13rem] sm:max-w-[19rem]' : 'max-w-[16rem] sm:max-w-[26rem]'
              }`}
            >
              {visual}
            </div>
          )}

          <div className="text-center">
            <h1
              className={`text-balance title ${compact ? 'text-display-md' : 'text-display-lg'}`}
            >
              {title}
            </h1>

            {/* Le petit trait manuscrit du bandeau de référence. */}
            <Squiggle className="mx-auto mt-2 h-2.5 w-24 text-terracotta/75 sm:w-28" />

            {subtitle && (
              <p
                className={`mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink-soft ${
                  compact ? 'text-[0.95rem]' : 'text-[1.02rem]'
                }`}
              >
                {subtitle}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
