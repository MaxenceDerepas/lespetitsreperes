import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { PageBanner } from '@/components/PageBanner';
import { ButtonLink } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { Testimonials } from '@/components/Testimonials';
import { Sprig } from '@/components/Decor';

export const metadata: Metadata = {
  title: 'Notre histoire',
  description:
    'Les Petits Repères est née de l’envie d’accompagner les familles avec des outils simples et doux, créés par une éducatrice de jeunes enfants.',
  alternates: { canonical: '/a-propos' },
};

export default function AboutPage() {

  return (
    <>
      <PageBanner
        title="À propos"
        subtitle="Des outils pensés pour les vrais moments du quotidien."
        crumbs={[{ label: 'À propos' }]}
        illustration={{
          src: '/images/a-propos.png',
          alt: 'Une maman et sa fille en train de peindre ensemble à la table du salon',
          width: 753,
          height: 493,
          fit: 'contain',
          priority: true,
        }}
      />

      {/* Portrait et récit */}
      <section className="shell py-12 lg:py-16">
        <Reveal className="prose-lpr mx-auto max-w-prose">
          <p className="text-[1.05rem] leading-[1.75] text-ink">
            Je m’appelle {site.founder.name}. Je suis éducatrice de jeunes enfants depuis douze
            ans, et maman de deux garçons — ce qui, je vous le confirme, ne dispense d’aucun matin
            compliqué.
          </p>

          <h2>Comment est né Les Petits Repères</h2>
          <p>
            Pendant huit ans, j’ai accompagné des dizaines de familles. Les difficultés n’étaient
            presque jamais originales : le matin qui dérape, la colère qu’on ne sait pas nommer, la
            charge mentale portée par une seule personne, le sentiment de répéter la même phrase
            depuis trois ans.
          </p>
          <p>
            Et j’ai vu, très souvent, la même chose fonctionner : un support simple, affiché au bon
            endroit, à hauteur d’enfant. Pas une méthode. Pas un livre de trois cents pages. Une
            feuille A4 avec quatre dessins dans le bon ordre.
          </p>

          <h2>Pourquoi des fichiers à imprimer</h2>
          <p>
            Parce que c’est <strong>immédiat</strong>. Un besoin repéré un dimanche soir peut être
            réglé le lundi matin, sans attendre un colis. Parce que c’est{' '}
            <strong>réutilisable</strong> : le même fichier sert au grand, puis au petit, puis chez
            les grands-parents.
          </p>

          <h2>Quel est l’objectif des Petits Repères</h2>
          <p>
            Chaque fiche part d’une difficulté précise, vécue, elle est pensée et testée à la
            maison et dans notre entourage. L’objectif est de pouvoir faciliter des tâches du
            quotidien, des moments de transitions, de favoriser les échanges et la complicité au
            sein de la famille, de développer l’autonomie des enfants et de les aider à gérer leurs
            émotions de façon plus sereine.
          </p>
          <p>
            Nous ne vendons pas de recette miracle ou de méthode à appliquer au pied de la lettre,
            le but est aussi que chaque famille puisse s’approprier les outils que nous proposons
            afin de les adapter au mieux à leurs besoins.
          </p>

          <p>
            Si vous avez une question, une idée de fiche ou un retour sur un fichier existant,
            écrivez-moi : je lis tout, et c’est comme ça que la boutique avance.{' '}
            <Link href="/contact">Ma boîte est ici</Link>.
          </p>

          <p className="mt-10 text-center">
            <span className="block font-script text-[1.5rem] text-terracotta-deep">
              {site.founder.name}
            </span>
            <span className="mt-0.5 block text-[0.82rem] text-muted">{site.founder.role}</span>
          </p>
        </Reveal>
      </section>

      {/* Ce que les familles en pensent */}
      <section className="bg-cream py-14 lg:py-16" aria-labelledby="avis-apropos">
        <div className="shell">
          <SectionHeading title={<span id="avis-apropos">Ce que les familles en pensent</span>} />
          <Reveal className="mx-auto mt-9 max-w-3xl">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      <section className="py-14 lg:py-16">
        <div className="shell">
          <Reveal className="relative overflow-hidden rounded-xl2 border border-sage/20 bg-white shadow-soft px-6 py-12 text-center sm:px-12">
            <Sprig className="pointer-events-none absolute -left-4 bottom-2 h-20 w-40 text-sage-light/45" />
            <h2 className="text-balance title text-display-md">
              Des petits outils pour de grands moments
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft">
              Parcourez la boutique, ou écrivez-moi si vous cherchez un support qui n’existe pas
              encore.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/boutique" size="lg">
                Découvrir la boutique
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Me contacter
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
