import type { Metadata } from 'next';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RichText } from '@/components/RichText';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Éditeur, directrice de la publication, hébergeur, propriété intellectuelle et responsabilité : les informations légales du site Les Petits Repères.',
  alternates: { canonical: '/mentions-legales' },
};

/** Texte fourni par l'éditrice du site : à ne pas reformuler. */
const content = `MENTIONS LÉGALES

**Dernière mise à jour : 15 juillet 2026**

## Éditeur du site

Le présent site est édité par :

Les Petits Repères — Entreprise individuelle (micro-entreprise)
Entrepreneure : Sandrine Quéméré
SIREN : 105 404 347
SIRET : 105 404 347 00012
Code APE : 82.11Z

**Adresse**
36 rue de Migneaux, 78300 Poissy — France

**Adresse e-mail**
petitsreperes@gmail.com

**Site internet**
https://petitsreperes.systeme.io/

## Directrice de la publication

La directrice de la publication est : Sandrine Quéméré

## Hébergement

Le site est hébergé par :

ITACWT Limited (Systeme.io)
3 Cruise Park Rise, Tyrrelstown, Dublin 15 — Irlande
Site internet : https://systeme.io

## Propriété intellectuelle

L’ensemble des contenus présents sur le site Les Petits Repères est protégé par le Code de la propriété intellectuelle. Cela comprend notamment :

- les textes ;
- les illustrations ;
- les photographies ;
- les pictogrammes ;
- les graphismes ;
- les logos ;
- les mises en page ;
- les fiches d’activités ;
- les expériences ;
- les recettes ;
- les documents téléchargeables ;
- les fichiers PDF.

Toute reproduction, représentation, diffusion, adaptation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.

## Responsabilité

Les Petits Repères s’efforce de fournir des informations aussi exactes et à jour que possible. Toutefois, l’éditrice ne saurait être tenue responsable :

- d’éventuelles erreurs ou omissions ;
- d’une interruption temporaire du site ;
- d’un dysfonctionnement indépendant de sa volonté ;
- de l’utilisation qui pourrait être faite des informations proposées.

Les activités et expériences présentées sur le site sont proposées à titre éducatif et doivent toujours être réalisées sous la surveillance d’un adulte.

## Liens hypertextes

Le site peut contenir des liens vers des sites internet tiers.

Les Petits Repères ne peut être tenu responsable du contenu, des services ou des politiques de confidentialité de ces sites externes.

## Données personnelles

Les modalités de collecte et de traitement des données personnelles sont détaillées dans la Politique de confidentialité accessible sur le site.

## Cookies

Le site est susceptible d’utiliser des cookies afin d’améliorer l’expérience utilisateur, de mesurer l’audience et d’assurer le bon fonctionnement du site.

Les informations détaillées sont disponibles dans la Politique de confidentialité.

## Contact

Pour toute question concernant le site ou les produits proposés, vous pouvez contacter :

Les Petits Repères — petitsreperes@gmail.com`;

export default function LegalPage() {
  return (
    <>
      <PageBanner
        compact
        title="Mentions légales"
        subtitle="Qui édite ce site, qui l’héberge, et à qui appartiennent les contenus."
        crumbs={[{ label: 'Mentions légales' }]}
        scene={<BannerScene variant="legal" />}
      />

      <div className="shell max-w-prose py-10 lg:py-14">
        <RichText content={content} />
      </div>
    </>
  );
}
