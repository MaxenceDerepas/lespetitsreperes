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
  title: 'À propos',
  description:
    'Les Petits Repères, une marque créée par Sandrine, éducatrice de jeunes enfants, pour accompagner les familles avec des outils simples, concrets et accessibles.',
  alternates: { canonical: '/a-propos' },
};

export default function AboutPage() {

  return (
    <>
      <PageBanner
        title="Les Petits Repères"
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

      {/* Le récit de la marque */}
      <section className="shell py-12 lg:py-16">
        <Reveal className="prose-lpr mx-auto max-w-prose">
          <p className="text-[1.08rem] leading-[1.75] text-ink">
            Les Petits Repères, c’est une marque créée pour accompagner les familles avec des
            outils simples, concrets et accessibles.
          </p>
          <p>
            Des outils pour aider les enfants à savoir ce qui va se passer, participer, gagner
            progressivement en autonomie, mettre des mots sur ce qu’ils vivent et trouver leur
            place dans la vie de famille.
          </p>
          <p>Pas pour que tout soit parfait.</p>
          <p>
            Mais pour que le quotidien soit parfois un peu plus simple, un peu plus prévisible et
            un peu plus serein.
          </p>

          <p>
            Je m’appelle {site.founder.name}. Je suis éducatrice de jeunes enfants depuis douze ans
            et maman de deux garçons.
          </p>
          <p>
            Et être professionnelle de la petite enfance ne m’a évidemment pas épargné les matins
            compliqués, les «&nbsp;mais pourquoi&nbsp;?!&nbsp;», les négociations interminables ou
            les moments où tout le monde aurait simplement besoin que la journée recommence depuis
            le début.
          </p>
          <p>
            C’est justement ce mélange entre mon expérience professionnelle et ma vie de maman qui
            a donné naissance aux Petits Repères.
          </p>

          <h2>L’idée de départ</h2>
          <p>
            Au fil de mes années auprès des enfants et des familles, j’ai retrouvé les mêmes
            petites difficultés encore et encore :
          </p>
          <ul>
            <li>un matin où chacun cherche ses affaires ;</li>
            <li>une transition qui devient compliquée ;</li>
            <li>un enfant qui ne sait pas quoi faire ensuite ;</li>
            <li>une émotion qui déborde ;</li>
            <li>
              une consigne répétée tellement de fois qu’on finit soi-même par ne plus vouloir
              l’entendre.
            </li>
          </ul>
          <p>Et souvent, la solution ne nécessitait pas quelque chose de compliqué.</p>
          <p>Parfois, il suffisait de rendre les choses visibles.</p>
          <ul>
            <li>une routine en images ;</li>
            <li>un semainier ;</li>
            <li>un tableau de missions ;</li>
            <li>quelques cartes pour parler des émotions ;</li>
            <li>une fiche pour accompagner une activité.</li>
          </ul>
          <p>
            Un petit support qui permet à l’enfant de comprendre, d’anticiper et de participer
            davantage. C’est cette idée qui est au cœur des Petits Repères.
          </p>

          <h2>Pourquoi «&nbsp;Les Petits Repères&nbsp;» ?</h2>
          <p>
            Parce que les enfants n’ont pas toujours besoin qu’on fasse à leur place. Ils ont
            souvent besoin de savoir :
          </p>
          <ul>
            <li>qu’est-ce qui va se passer ?</li>
            <li>qu’est-ce qu’on attend de moi ?</li>
            <li>par quoi je commence ?</li>
            <li>qu’est-ce qui vient après ?</li>
            <li>que puis-je faire quand c’est difficile ?</li>
          </ul>
          <p>Un repère ne fait pas disparaître toutes les difficultés.</p>
          <p>
            Mais il peut donner à l’enfant un point d’appui pour avancer. Et parfois, c’est déjà
            beaucoup.
          </p>

          <h2>Des outils pour accompagner, pas pour imposer</h2>
          <p>Chaque outil est pensé à partir d’une situation concrète du quotidien.</p>
          <p>
            L’objectif n’est pas de proposer une méthode à appliquer à la lettre, ni de donner aux
            parents une nouvelle liste de choses à faire parfaitement. Au contraire.
          </p>
          <p>Les outils sont là pour être adaptés à votre famille.</p>
          <p>
            Un enfant peut avoir besoin d’un support très visuel. Un autre préférera quelques mots.
            Une famille l’utilisera tous les jours. Une autre seulement dans certaines périodes.
          </p>
          <p>
            Il n’y a pas une seule bonne façon de faire. L’important est de trouver le repère qui
            aide votre enfant, dans votre quotidien, à votre manière.
          </p>

          <h2>Pourquoi des outils concrets ?</h2>
          <p>Parce qu’en théorie, beaucoup de choses paraissent simples.</p>
          <p>
            Mais à 7 h 42, avec un enfant qui ne veut pas s’habiller, un autre qui cherche ses
            chaussures et un parent qui regarde l’heure pour la quatrième fois… on n’a pas
            forcément besoin d’un long mode d’emploi.
          </p>
          <p>On a besoin de quelque chose de clair, visible et facile à utiliser.</p>
          <p>
            C’est pour cela que les outils des Petits Repères sont conçus pour pouvoir trouver leur
            place dans la vraie vie :
          </p>
          <ul>
            <li>sur un mur ;</li>
            <li>sur le frigo ;</li>
            <li>dans une chambre ;</li>
            <li>sur la table de la cuisine ;</li>
            <li>ou simplement à portée de main quand on en a besoin.</li>
          </ul>

          <h2>Et derrière chaque fiche ?</h2>
          <p>
            Une idée simple : aider l’enfant à faire progressivement par lui-même, sans demander au
            parent de tout porter.
          </p>
          <p>
            Les outils peuvent accompagner les routines, l’autonomie, les émotions, les activités,
            les moments de connexion en famille ou encore les petits apprentissages du quotidien.
          </p>
          <p>
            Ils ne remplacent ni la relation, ni la présence de l’adulte. Ils peuvent simplement
            servir de support entre l’enfant et l’adulte, pour rendre certaines choses plus
            compréhensibles et plus accessibles.
          </p>

          <h2>Une marque qui évolue avec les familles</h2>
          <p>
            Les Petits Repères sont aussi construits au fil des besoins rencontrés, des idées qui
            émergent et de vos retours.
          </p>
          <p>
            Une question, une difficulté que vous rencontrez souvent, une idée d’outil que vous
            aimeriez trouver… Vos retours peuvent donner naissance aux prochains Petits Repères.
          </p>
          <p>
            Alors si vous avez une question, une idée ou simplement envie de me partager votre
            expérience avec un outil, <Link href="/contact">écrivez-moi</Link>. Je lis vos messages
            avec attention.
          </p>
          <p>
            Parce que derrière chaque fiche, il y a surtout une envie : créer des outils qui
            trouvent réellement leur place dans les familles.
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
