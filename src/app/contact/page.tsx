import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { keyFaq } from '@/lib/faq';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Accordion } from '@/components/Accordion';
import { InstagramIcon, MailIcon, SparkleIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact — nous écrire',
  description:
    'Une question sur un fichier, un téléchargement, une facture ou une licence professionnelle ? Écrivez-nous, nous répondons sous 24 à 48 h ouvrées.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous écrire"
        title="Une question ? Écrivez-nous"
        intro="Les Petits Repères est une petite maison : chaque message est lu et traité par une vraie personne, sous 24 à 48 h ouvrées."
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:py-14">
        <ContactForm />

        <aside className="space-y-8">
          <div>
            <h2 className="title text-display-sm">Autres moyens</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3.5 rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-px hover:shadow-lift"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-pale/60 text-sage-dark">
                    <MailIcon size={19} />
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-semibold text-ink">Par email</span>
                    <span className="block text-[0.84rem] text-terracotta-deep">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-px hover:shadow-lift"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach/50 text-terracotta-deep">
                    <InstagramIcon size={19} />
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-semibold text-ink">
                      Sur Instagram
                    </span>
                    <span className="block text-[0.84rem] text-terracotta-deep">
                      {site.instagramHandle}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-card bg-cream p-6">
            <h2 className="flex items-center gap-2 font-serif text-[1.18rem] text-sage-dark">
              <SparkleIcon size={18} className="text-gold" />
              Avant d’écrire
            </h2>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
              Un lien de téléchargement expiré, un fichier introuvable, une facture à récupérer :
              la réponse est souvent déjà dans votre{' '}
              <Link href="/compte" className="text-terracotta-deep underline underline-offset-2">
                espace client
              </Link>{' '}
              ou dans la{' '}
              <Link href="/faq" className="text-terracotta-deep underline underline-offset-2">
                FAQ
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.18rem] text-sage-dark">Questions fréquentes</h2>
            <div className="mt-3.5">
              <Accordion items={keyFaq.slice(0, 3)} idPrefix="contact-faq" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
