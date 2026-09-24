import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { RichText } from '@/components/RichText';
import { LegalNotice } from '@/components/LegalNotice';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions de vente des fichiers numériques Les Petits Repères : commande, paiement, livraison, licence d’utilisation et droit de rétractation.',
  alternates: { canonical: '/cgv' },
};

const content = `Les présentes conditions générales de vente régissent les relations entre ${site.name}, ${site.legal.form.toLowerCase()} immatriculée sous le numéro SIRET ${site.legal.siret} (ci-après « le Vendeur »), et toute personne physique ou morale effectuant un achat sur le site ${site.url.replace(/^https?:\/\//, '')} (ci-après « le Client »).

Toute commande implique l’acceptation sans réserve des présentes conditions.

## 1. Objet

Le Vendeur commercialise exclusivement des **produits numériques** : des fichiers au format PDF, destinés à être téléchargés puis imprimés par le Client. Aucun produit physique n’est fabriqué, emballé ni expédié.

## 2. Produits et prix

Les caractéristiques essentielles de chaque produit (nombre de pages, format, tranches d’âge conseillées, contenu) sont indiquées sur sa fiche produit.

Les prix sont affichés en euros, toutes taxes comprises. ${site.legal.vat}. Le Vendeur se réserve le droit de modifier ses prix à tout moment ; le prix applicable est celui affiché au moment de la validation de la commande.

Aucun frais de livraison n’est facturé, les produits étant intégralement dématérialisés.

## 3. Commande

La commande s’effectue en ligne selon les étapes suivantes :

- sélection des produits et ajout au panier ;
- saisie de l’adresse email de réception et, le cas échéant, d’un code promotionnel ;
- acceptation des présentes conditions générales de vente ;
- paiement sécurisé ;
- confirmation de la commande et mise à disposition des fichiers.

Le Client est seul responsable de l’exactitude de l’adresse email communiquée, celle-ci conditionnant la réception des liens de téléchargement.

## 4. Paiement

Le paiement s’effectue en ligne, au comptant, par carte bancaire ou par tout autre moyen proposé par le prestataire de paiement.

Les transactions sont traitées par **Stripe Payments Europe, Ltd.**, prestataire agréé. À aucun moment les coordonnées bancaires du Client ne transitent par les serveurs du Vendeur, ni n’y sont conservées.

La commande n’est validée qu’après confirmation du paiement par le prestataire.

## 5. Livraison des fichiers

La livraison est **immédiate et dématérialisée**. Dès la confirmation du paiement :

- la page de confirmation affiche les liens de téléchargement ;
- un email récapitulatif contenant ces mêmes liens est envoyé à l’adresse indiquée ;
- les fichiers restent accessibles dans l’espace client du Client.

Les liens envoyés par email sont sécurisés, personnels et temporaires (72 heures par défaut). Leur expiration n’entraîne aucune perte : un nouveau lien est généré à chaque connexion à l’espace client.

Le nombre de téléchargements par fichier peut être limité pour des raisons techniques et de sécurité. Cette limite peut être réinitialisée sur simple demande à ${site.email}.

## 6. Licence d’utilisation

L’achat confère au Client un droit d’usage **personnel, familial et non exclusif**, incluant notamment le droit de :

- imprimer le fichier autant de fois que souhaité ;
- l’utiliser pour tous les enfants de son foyer ;
- en conserver une copie de sauvegarde.

Sont en revanche strictement interdits :

- la revente, la cession, le prêt ou le partage du fichier, à titre gratuit ou onéreux ;
- la diffusion du fichier sur Internet, un réseau social, un espace de stockage partagé ou une plateforme de partage ;
- la modification, l’extraction d’éléments graphiques ou la réutilisation dans une création destinée à la diffusion ;
- l’usage collectif en établissement (crèche, école, cabinet, association).

L’ensemble des contenus (textes, illustrations, mises en page) demeure la propriété exclusive du Vendeur et reste protégé par le droit d’auteur.

## 7. Droit de rétractation

Conformément à l’**article L221-28, 13° du Code de la consommation**, le droit de rétractation ne peut être exercé pour les contrats de fourniture d’un contenu numérique non fourni sur un support matériel dont l’exécution a commencé avec l’accord préalable exprès du consommateur.

En validant sa commande, le Client :

- demande expressément l’exécution immédiate du contrat ;
- reconnaît renoncer à son droit de rétractation dès le premier téléchargement.

Cette renonciation est recueillie par une case à cocher obligatoire au moment du paiement.

## 8. Garantie et réclamations

Le Vendeur s’engage à fournir des fichiers conformes à leur description et techniquement exploitables.

En cas de fichier corrompu, illisible, non conforme à sa description ou de lien de téléchargement défaillant, le Client contacte ${site.email} en indiquant son numéro de commande. Le Vendeur procède, selon le cas, à l’envoi d’un fichier de remplacement ou au remboursement de la commande.

Les garanties légales de conformité (articles L217-3 et suivants du Code de la consommation) s’appliquent dans les conditions prévues par la loi.

## 9. Responsabilité

Le Vendeur ne peut être tenu responsable :

- des difficultés liées au matériel du Client (imprimante, logiciel de lecture PDF, connexion) ;
- de la non-réception d’un email consécutive à une adresse erronée ou à un filtre anti-spam ;
- de l’usage fait des supports, qui relèvent d’un accompagnement éducatif et ne constituent en aucun cas un avis médical, psychologique ou paramédical.

## 10. Données personnelles

Les données collectées (adresse email, prénom, nom, historique de commandes) sont nécessaires au traitement de la commande et à la mise à disposition des fichiers. Leur traitement est détaillé dans la politique de confidentialité.

## 11. Service client

Toute question ou réclamation peut être adressée à ${site.email}. Le Vendeur s’engage à répondre ${site.support.responseTime}.

## 12. Médiation et litiges

En cas de litige, le Client est invité à contacter le Vendeur afin de rechercher une solution amiable.

Conformément aux articles L611-1 et suivants du Code de la consommation, le Client peut recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur compétent sont communiquées sur demande.

Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, les tribunaux français sont seuls compétents.

## 13. Modification des conditions

Le Vendeur peut modifier les présentes conditions à tout moment. Les conditions applicables à une commande sont celles en vigueur à la date de cette commande.`;

export default function CgvPage() {
  return (
    <>
      <PageBanner
        compact
        title="Conditions de vente"
        subtitle="Version en vigueur — produits numériques, livraison immédiate, licence d’usage familial."
        crumbs={[{ label: 'CGV' }]}
        scene={<BannerScene variant="legal" />}
      />

      <div className="shell max-w-prose py-10 lg:py-14">
        <LegalNotice />
        <RichText content={content} className="mt-8" />
      </div>
    </>
  );
}
