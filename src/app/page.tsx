import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { categories } from '@/lib/catalog';
import { site } from '@/lib/site';
import { ButtonLink } from '@/components/Button';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryIllustration } from '@/components/CategoryIcons';
import { SectionHeading } from '@/components/SectionHeading';
import { Testimonials } from '@/components/Testimonials';
import { Reveal } from '@/components/Reveal';
import { HeroBanner } from '@/components/HeroBanner';
import { TwigDecor } from '@/components/Decor';
import {
  ArrowRightIcon,
  DownloadIcon,
  FileIcon,
  HeartFilledIcon,
  PrinterIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Fiches PDF à imprimer pour les familles',
  description:
    'Routines, émotions, activités, recettes et organisation : des fiches PDF à imprimer pour accompagner le quotidien des familles. Téléchargement immédiat.',
  alternates: { canonical: '/' },
};

/**
 * Page d'accueil.
 *
 * Elle suit un parcours, et non une liste de blocs :
 *
 *   accroche → promesse de la marque → entrée dans le catalogue
 *   → preuve que c'est simple → qui est derrière → sortie.
 *
 * Chaque section a une forme différente (image pleine largeur, bandeau fin,
 * texte centré, pastilles, grille, étapes, demi-écran) et un fond qui alterne
 * ivoire / crème / sable, pour que l'œil ne lise jamais deux fois la même
 * structure.
 */

/** Les quatre engagements de la charte, en formulations courtes. */
const commitments = [
  { motif: 'heart' as const, label: 'Créé par une éducatrice de jeunes enfants' },
  { motif: 'house' as const, label: 'Testé en famille avant d’être vendu' },
  { motif: 'leaf' as const, label: 'Imprimable à volonté, pour tous vos enfants' },
  { motif: 'star' as const, label: 'À utiliser à son rythme et sans pression' },
];

const steps = [
  {
    Icon: FileIcon,
    title: 'Choisissez votre fiche',
    text: 'Douze fiches et packs classés par besoin : activités, expériences, recettes, autonomie, émotions.',
  },
  {
    Icon: DownloadIcon,
    title: 'Téléchargez aussitôt',
    text: 'Le lien apparaît dès le paiement validé, et part en même temps dans votre boîte email.',
  },
  {
    Icon: PrinterIcon,
    title: 'Imprimez et affichez',
    text: 'Format A4, imprimante domestique, réimprimable autant de fois que nécessaire.',
  },
];

export default function HomePage() {

  return (
    <>
      {/* ═══════════════ 1. ACCROCHE ═══════════════ */}
      <HeroBanner />

      {/* ═══════════════ 2. LA PROMESSE ═══════════════ */}
      <section className="relative overflow-hidden py-10 lg:py-12" aria-labelledby="promesse">
        <TwigDecor className="pointer-events-none absolute -left-2 top-16 hidden h-28 w-20 text-sage-light/45 lg:block" />
        <TwigDecor
          flip
          className="pointer-events-none absolute -right-2 bottom-16 hidden h-28 w-20 text-sage-light/45 lg:block"
        />

        <div className="shell max-w-3xl text-center">
          <p className="eyebrow">Notre promesse</p>

          <p
            id="promesse"
            className="mt-4 text-balance text-[1.45rem] leading-[1.55] text-ink sm:text-[1.78rem]"
          >
            Nous ne vendons pas une méthode de plus. Nous dessinons des supports simples,
            affichés à hauteur d’enfant, qui remplacent la consigne répétée dix fois — et
            rendent les matins{' '}
            <span className="font-semibold text-terracotta-deep">un peu plus doux</span>.
          </p>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-x-8 gap-y-5 text-left sm:grid-cols-2">
            {commitments.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <CategoryIllustration motif={item.motif} size={30} className="shrink-0" />
                <span className="text-[0.88rem] leading-snug text-ink">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ 3. LE CATALOGUE ═══════════════ */}
      <section className="bg-cream py-16 lg:py-20" aria-labelledby="categories-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Par besoin du quotidien"
            title={<span id="categories-title">Nos catégories</span>}
            intro="Commencez par celle qui vous pèse le plus aujourd’hui — une seule à la fois suffit."
          />

          <Reveal className="mt-12">
            <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {categories.map((category) => (
                <li key={category.slug}>
                  <CategoryCard category={category} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 4. COMMENT ÇA MARCHE ═══════════════ */}
      <section className="bg-[#F8F2E8] py-16 lg:py-20" aria-labelledby="etapes">
        <div className="shell">
          <SectionHeading
            ornament="none"
            eyebrow="Du clic à l’affichage"
            title={<span id="etapes">Trois minutes, et c’est sur votre mur</span>}
          />

          <ol className="relative mx-auto mt-14 grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-6">
            {/* Filet pointillé qui relie les trois étapes */}
            <span
              aria-hidden="true"
              className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-sage-light/60 sm:block"
            />

            {steps.map(({ Icon, title, text }, index) => (
              <Reveal as="li" key={title} delay={index * 90} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sage/25 bg-white text-sage-dark shadow-soft">
                  <Icon size={22} strokeWidth={1.4} />
                </span>
                {/* `lining-nums` : Cormorant dessine par défaut des chiffres
                    elzéviriens (le 1 ressemble à un I, le 3 descend sous la
                    ligne). Pour un numéro d'étape, on veut des chiffres
                    alignés. */}
                <span className="mt-3 block font-serif text-[1.6rem] font-medium leading-none text-terracotta-deep lining-nums">
                  {index + 1}
                </span>
                <h3 className="mt-2 title-editorial text-[1.55rem] leading-[1.15]">{title}</h3>
                <p className="mx-auto mt-2 max-w-[17rem] text-[0.88rem] leading-relaxed text-ink-soft">
                  {text}
                </p>
              </Reveal>
            ))}
          </ol>

          <p className="mt-12 text-center text-[0.86rem] text-muted">
            Une question sur les fichiers ou l’impression ?{' '}
            <Link href="/faq" className="text-terracotta-deeper underline underline-offset-2">
              Tout est expliqué dans la FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ═══════════════ 5. LA CONFIANCE ═══════════════ */}
      <section className="py-16 lg:py-24" aria-labelledby="story-title">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-16">
          <div className="grid items-center gap-8 sm:grid-cols-[0.78fr_1fr]">
            <Reveal className="relative mx-auto w-full max-w-[15rem]">
              <div className="absolute -left-3 -top-3 h-16 w-16 rounded-full bg-peach/50" />
              <div className="absolute -bottom-4 -right-2 h-12 w-12 rounded-full bg-sage-pale" />
              <Image
                src="/images/a-propos.png"
                alt="Une maman et sa fille en train de peindre ensemble à la table du salon"
                width={753}
                height={493}
                sizes="(min-width: 640px) 15rem, 60vw"
                className="relative h-auto w-full"
              />
            </Reveal>

            <Reveal delay={80}>
              <p className="eyebrow">Notre histoire</p>
              <h2
                id="story-title"
                className="mt-3 text-balance title text-display-md leading-tight"
              >
                Une marque pensée pour les familles
              </h2>
              <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
                Éducatrice de jeunes enfants depuis douze ans et maman de deux garçons, j’ai vu les
                mêmes difficultés revenir dans presque toutes les maisons — et à quel point un
                support affiché au bon endroit pouvait tout changer.
              </p>
              <p className="mt-4 font-script text-[1.3rem] leading-none text-terracotta-deep">
                {site.founder.name}
              </p>
              <div className="mt-6">
                <ButtonLink href="/a-propos" variant="secondary" size="sm">
                  Lire mon histoire
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <p className="eyebrow mb-3 text-center">Ce que les familles en pensent</p>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 6. LA SORTIE ═══════════════ */}
      {/* Fond crème : sans lui, cette section et celle du dessus se
          confondraient en un seul long bloc ivoire. */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="shell max-w-2xl text-center">
          <PrinterIcon size={28} className="mx-auto text-sage-light" strokeWidth={1.3} />
          <p className="mt-5 text-balance title text-display-md leading-tight">
            De petits repères pour accompagner
            <br className="hidden sm:block" /> les grandes étapes du quotidien
          </p>
          <div className="mt-8">
            <ButtonLink href="/boutique" size="lg">
              Découvrir la boutique
              <ArrowRightIcon size={18} />
            </ButtonLink>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-[0.82rem] text-muted">
            <HeartFilledIcon size={13} className="text-coral" />
            Créé en France, testé en famille
          </p>
        </div>
      </section>

      {/* Données structurées : site + recherche interne */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: site.url,
            inLanguage: 'fr-FR',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${site.url}/boutique?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
