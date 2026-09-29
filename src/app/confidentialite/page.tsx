import type { Metadata } from 'next';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RichText } from '@/components/RichText';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Quelles données Les Petits Repères collecte, pourquoi, combien de temps elles sont conservées, et comment exercer vos droits.',
  alternates: { canonical: '/confidentialite' },
};

/** Texte fourni par l'éditrice du site : à ne pas reformuler. */
const content = `POLITIQUE DE CONFIDENTIALITÉ & PROTECTION DES DONNÉES

**Dernière mise à jour : 15 juillet 2026**

## 1. Qui sommes-nous ?

La présente politique de confidentialité explique comment Les Petits Repères collecte, utilise et protège les données personnelles de ses utilisateurs.

**Éditrice du site**
Les Petits Repères — Entreprise individuelle (micro-entreprise)
Entrepreneure : Sandrine Quéméré
SIREN : 105 404 347
SIRET : 105 404 347 00012

**Adresse**
36 rue de Migneaux, 78300 Poissy — France

**E-mail**
petitsreperes@gmail.com

## 2. Quelles données sont collectées ?

Selon votre utilisation du site, nous pouvons être amenés à collecter les données suivantes.

**Lors d’un achat**

- Nom
- Prénom
- Adresse e-mail
- Adresse de facturation (si demandée)
- Pays
- Historique des commandes

**Lors de la navigation**

- Adresse IP
- Type d’appareil
- Navigateur utilisé
- Données techniques nécessaires au bon fonctionnement du site

**Lorsque vous nous contactez**

- Nom
- Adresse e-mail
- Contenu de votre message

Nous ne collectons jamais vos coordonnées bancaires. Les paiements sont entièrement sécurisés et traités par Stripe.

## 3. Pourquoi collectons-nous ces données ?

Vos données sont utilisées uniquement afin de :

- traiter vos commandes ;
- vous permettre de télécharger vos produits numériques ;
- envoyer les e-mails liés à votre achat ;
- répondre à vos demandes ;
- assurer le suivi de notre relation client ;
- respecter nos obligations légales et comptables ;
- améliorer le fonctionnement du site.

Nous ne revendons jamais vos données personnelles.

## 4. Base légale du traitement

Les traitements de données reposent notamment sur :

- l’exécution du contrat lorsque vous passez une commande ;
- votre consentement lorsque vous choisissez de recevoir des communications ;
- le respect de nos obligations légales ;
- notre intérêt légitime à assurer le bon fonctionnement du site et du service client.

## 5. Combien de temps vos données sont-elles conservées ?

Vos données sont conservées uniquement pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées.

Certaines informations, notamment les données relatives à la facturation, peuvent être conservées pendant la durée imposée par la législation française.

## 6. Avec qui vos données sont-elles partagées ?

Vos données peuvent être traitées par les prestataires nécessaires au fonctionnement de notre activité, notamment :

- Systeme.io, qui héberge la boutique et permet la gestion des commandes ;
- Stripe, qui assure le traitement sécurisé des paiements.

Ces prestataires traitent uniquement les données nécessaires à leurs missions et sont eux-mêmes soumis à leurs propres obligations en matière de protection des données.

Nous ne vendons ni ne louons vos données personnelles à des tiers.

## 7. Vos droits

Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :

- droit d’accès ;
- droit de rectification ;
- droit à l’effacement ;
- droit à la limitation du traitement ;
- droit d’opposition ;
- droit à la portabilité de vos données lorsque celui-ci est applicable.

Vous pouvez exercer ces droits à tout moment en nous contactant à l’adresse suivante : petitsreperes@gmail.com

Nous répondrons à votre demande dans les meilleurs délais et au plus tard dans le délai prévu par la réglementation.

## 8. Sécurité des données

Les Petits Repères met en œuvre des mesures raisonnables afin de protéger les données personnelles contre tout accès non autorisé, toute perte, toute divulgation ou toute modification.

Les paiements sont sécurisés par Stripe et les données bancaires ne transitent jamais par Les Petits Repères.

## 9. Cookies

Le site peut utiliser des cookies nécessaires à son bon fonctionnement.

Des cookies de mesure d’audience ou d’amélioration de l’expérience utilisateur peuvent également être utilisés si vous y consentez.

Vous pouvez modifier vos préférences à tout moment depuis les paramètres de votre navigateur ou via le gestionnaire de consentement lorsqu’il est disponible.

## 10. Modification de la politique de confidentialité

La présente politique peut être modifiée à tout moment afin de tenir compte des évolutions législatives ou des modifications apportées au site.

La version publiée sur le site est celle en vigueur à la date de votre consultation.

## 11. Contact

Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter :

Les Petits Repères — petitsreperes@gmail.com`;

export default function PrivacyPage() {
  return (
    <>
      <PageBanner
        compact
        title="Confidentialité & protection des données"
        subtitle="Ce que nous collectons, pourquoi, et comment exercer vos droits."
        crumbs={[{ label: 'Confidentialité' }]}
        scene={<BannerScene variant="legal" />}
      />

      <div className="shell max-w-prose py-10 lg:py-14">
        <RichText content={content} />
      </div>
    </>
  );
}
