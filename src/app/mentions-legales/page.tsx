import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RichText } from '@/components/RichText';
import { LegalNotice } from '@/components/LegalNotice';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: `Mentions légales du site ${site.name} : éditeur du site, statut juridique, hébergeur, propriété intellectuelle des fichiers et contact du support.`,
  alternates: { canonical: '/mentions-legales' },
};

const content = `## Éditeur du site

**${site.legal.company}**
${site.legal.form}
SIRET : ${site.legal.siret}
Siège : ${site.legal.address}
${site.legal.vat}

Contact : ${site.email}
Responsable de la publication : ${site.founder.name}

## Hébergeur

${site.legal.hostingProvider}

## Propriété intellectuelle

L’ensemble des éléments composant ce site — textes, illustrations, mises en page, identité graphique, fichiers PDF proposés à la vente — est la propriété exclusive de ${site.legal.company} et protégé par le Code de la propriété intellectuelle.

Toute reproduction, représentation, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite et constituerait une contrefaçon sanctionnée par les articles L335-2 et suivants du Code de la propriété intellectuelle.

L’achat d’un fichier confère un droit d’usage personnel et familial, dont l’étendue exacte est décrite dans les conditions générales de vente.

## Liens hypertextes

Le site peut contenir des liens vers des sites tiers. ${site.legal.company} n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.

## Accessibilité

Ce site est conçu dans le respect des bonnes pratiques d’accessibilité : structure sémantique, contrastes suffisants, navigation complète au clavier, textes alternatifs, respect des préférences de mouvement réduit. Si vous rencontrez une difficulté d’accès à un contenu, écrivez-nous à ${site.email} : nous corrigerons.

## Signalement

Pour signaler un contenu illicite ou un dysfonctionnement : ${site.email}`;

export default function LegalPage() {
  return (
    <>
      <PageBanner
        compact
        title="Mentions légales"
        subtitle="Éditeur du site, hébergement, propriété intellectuelle et médiation."
        crumbs={[{ label: 'Mentions légales' }]}
        scene={<BannerScene variant="legal" />}
      />

      <div className="shell max-w-prose py-10 lg:py-14">
        <LegalNotice />
        <RichText content={content} className="mt-8" />
      </div>
    </>
  );
}
