import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RichText } from '@/components/RichText';
import { LegalNotice } from '@/components/LegalNotice';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Quelles données Les Petits Repères collecte, pourquoi, combien de temps elles sont conservées, et comment exercer vos droits.',
  alternates: { canonical: '/confidentialite' },
};

const content = `${site.name} attache de l’importance à la protection de vos données. Cette page explique, sans jargon, ce qui est collecté, pourquoi, pendant combien de temps, et ce que vous pouvez exiger.

## Responsable du traitement

${site.name} — ${site.legal.form}, SIRET ${site.legal.siret}.
Contact : ${site.email}

## Données collectées

**Lors d’une commande** : adresse email (indispensable pour recevoir vos fichiers), prénom et nom si vous les renseignez, contenu et montant de la commande, date, identifiant de transaction du prestataire de paiement.

**Lors d’une inscription à la lettre d’information** : adresse email uniquement.

**Lors d’un message via le formulaire de contact** : prénom, adresse email, sujet, contenu du message, et numéro de commande si vous l’indiquez.

**Lors de la navigation** : un cookie technique de session (panier, connexion à l’espace client). Aucun cookie publicitaire, aucun traceur tiers, aucun profilage.

Nous ne collectons **jamais** vos coordonnées bancaires : elles sont saisies directement sur les pages sécurisées de Stripe et ne transitent pas par nos serveurs.

## Finalités et bases légales

- **Traiter votre commande et vous livrer vos fichiers** — exécution du contrat.
- **Émettre et conserver les factures** — obligation légale (dix ans).
- **Répondre à vos messages** — intérêt légitime.
- **Vous envoyer la lettre d’information** — votre consentement, révocable à tout moment.
- **Assurer la sécurité des téléchargements** (compteurs, liens signés) — intérêt légitime.

## Durées de conservation

- Données de commande et factures : **10 ans** (obligation comptable).
- Données de compte client : tant que le compte est actif, puis 3 ans après le dernier achat.
- Messages de contact : 3 ans après le dernier échange.
- Inscription à la lettre d’information : jusqu’à votre désinscription.
- Cookies techniques : 30 jours au maximum.

## Sous-traitants

Vos données peuvent être traitées par les prestataires suivants, dans la seule mesure nécessaire :

- **Stripe Payments Europe, Ltd.** (Irlande) — paiement.
- **Resend** — envoi des emails transactionnels.
- **Vercel Inc.** — hébergement du site.

Ces prestataires sont engagés contractuellement à ne traiter vos données que pour les besoins du service. Lorsqu’un transfert hors Union européenne a lieu, il est encadré par les clauses contractuelles types de la Commission européenne.

Vos données ne sont **jamais vendues, louées ni cédées** à des fins publicitaires.

## Vos droits

Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données.

Pour les exercer, écrivez à ${site.email} : nous répondons sous un mois au maximum, et généralement ${site.support.responseTime}.

À noter : les données strictement nécessaires à la facturation ne peuvent être supprimées avant l’expiration du délai légal de conservation.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la **CNIL** (cnil.fr).

## Cookies

Le site n’utilise que des cookies techniques, indispensables à son fonctionnement :

- un cookie de session pour votre espace client ;
- un stockage local de votre panier dans votre navigateur.

Ces éléments ne nécessitent pas de consentement préalable et ne permettent aucun suivi publicitaire. Aucun outil de mesure d’audience tiers n’est installé à ce jour ; si cela devait changer, un bandeau de consentement serait mis en place.

## Sécurité

Les fichiers PDF sont stockés sur un espace privé, jamais accessible publiquement. Chaque téléchargement passe par un lien signé cryptographiquement, lié à une commande, à durée de validité limitée et impossible à deviner. Les échanges avec le site sont chiffrés (HTTPS).

## Modification

Cette politique peut être mise à jour. Toute modification substantielle vous serait signalée par email si vous êtes client ou inscrit à la lettre d’information.`;

export default function PrivacyPage() {
  return (
    <>
      <PageBanner
        compact
        title="Confidentialité"
        subtitle="Ce que nous collectons, pourquoi, et comment exercer vos droits."
        crumbs={[{ label: 'Confidentialité' }]}
        scene={<BannerScene variant="legal" />}
      />

      <div className="shell max-w-prose py-10 lg:py-14">
        <LegalNotice />
        <RichText content={content} className="mt-8" />
      </div>
    </>
  );
}
