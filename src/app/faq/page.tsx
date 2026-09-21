import Link from 'next/link';
import type { Metadata } from 'next';
import { faqGroups, faqItems } from '@/lib/faq';
import { PageHeader } from '@/components/PageHeader';
import { Accordion } from '@/components/Accordion';
import { ButtonLink } from '@/components/Button';
import { TrustRow } from '@/components/TrustRow';

export const metadata: Metadata = {
  title: 'FAQ — questions fréquentes',
  description:
    'Comment recevoir votre fichier, combien de fois l’imprimer, l’utiliser avec plusieurs enfants, récupérer un lien expiré ou une facture : toutes les réponses.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="Aide"
        title="Questions fréquentes"
        intro="Tout ce qu’il faut savoir sur les commandes, les téléchargements, l’impression et les licences."
        crumbs={[{ label: 'FAQ' }]}
      >
        <TrustRow className="mt-6" />
      </PageHeader>

      <div className="shell max-w-3xl py-12 lg:py-14">
        {/* Sommaire */}
        <nav aria-label="Sommaire de la FAQ" className="flex flex-wrap gap-2">
          {faqGroups.map((group) => (
            <a
              key={group}
              href={`#${encodeURIComponent(group.toLowerCase().replace(/\s+/g, '-'))}`}
              className="chip"
            >
              {group}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {faqGroups.map((group) => {
            const items = faqItems.filter((item) => item.group === group);
            const id = encodeURIComponent(group.toLowerCase().replace(/\s+/g, '-'));
            return (
              <section key={group} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
                <h2 id={`${id}-title`} className="title text-display-sm">
                  {group}
                </h2>
                <div className="mt-5">
                  <Accordion items={items} idPrefix={id} />
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14 rounded-xl2 bg-cream p-7 text-center sm:p-9">
          <h2 className="title text-display-sm">
            Votre question n’est pas là ?
          </h2>
          <p className="mx-auto mt-2.5 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
            Écrivez-nous, nous répondons sous 24 à 48 h ouvrées. Et si vous rencontrez un souci
            avec un fichier, précisez votre numéro de commande : c’est plus rapide.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Nous écrire</ButtonLink>
            <ButtonLink href="/compte" variant="secondary">
              Mon espace client
            </ButtonLink>
          </div>
          <p className="mt-5 text-[0.82rem] text-muted">
            Voir aussi les{' '}
            <Link href="/cgv" className="underline underline-offset-2 hover:text-terracotta-deep">
              conditions générales de vente
            </Link>
            .
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
