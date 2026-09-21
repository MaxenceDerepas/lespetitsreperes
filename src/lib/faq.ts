import type { FaqItem } from './types';

export const faqItems: FaqItem[] = [
  {
    group: 'Commande et téléchargement',
    question: 'Comment vais-je recevoir mon fichier ?',
    answer:
      'Dès que votre paiement est validé, deux choses arrivent en même temps : la page de confirmation affiche vos boutons de téléchargement, et un email part vers votre boîte avec les mêmes liens. Vos fichiers restent également disponibles à tout moment dans votre espace client, rubrique « Mes téléchargements ».',
  },
  {
    group: 'Commande et téléchargement',
    question: 'Est-ce que les fichiers sont envoyés par courrier ?',
    answer:
      'Non, jamais. Tous nos produits sont des fichiers PDF numériques : rien n’est imprimé, emballé ni expédié. C’est aussi pourquoi nous ne vous demandons pas d’adresse de livraison au moment du paiement.',
  },
  {
    group: 'Commande et téléchargement',
    question: 'Que faire si je ne reçois pas mon lien de téléchargement ?',
    answer:
      'Commencez par vérifier vos spams et vos onglets « promotions » : c’est la cause dans la grande majorité des cas. Vos fichiers sont de toute façon accessibles depuis votre espace client. Si le problème persiste, écrivez-nous en indiquant votre numéro de commande et nous vous renvoyons un lien neuf.',
  },
  {
    group: 'Commande et téléchargement',
    question: 'Mon lien de téléchargement a expiré, tout est perdu ?',
    answer:
      'Pas du tout. Les liens envoyés par email sont volontairement temporaires, pour votre sécurité. Connectez-vous à votre espace client : un lien neuf est généré à chaque fois que vous en avez besoin.',
  },
  {
    group: 'Impression et utilisation',
    question: 'Puis-je imprimer plusieurs fois mon PDF ?',
    answer:
      'Oui, autant de fois que vous le souhaitez. Un enfant qui déchire sa routine du matin, une fiche tachée de chocolat, un deuxième exemplaire pour chez les grands-parents : réimprimez sans compter, c’est prévu pour.',
  },
  {
    group: 'Impression et utilisation',
    question: 'Puis-je utiliser le fichier avec plusieurs enfants ?',
    answer:
      'Bien sûr, pour tous les enfants de votre famille. La licence couvre un usage personnel et familial. En revanche, un usage en classe, en crèche ou en cabinet nécessite une licence professionnelle : écrivez-nous, nous la proposons à un tarif adapté.',
  },
  {
    group: 'Impression et utilisation',
    question: 'De quoi ai-je besoin pour imprimer ?',
    answer:
      'D’une imprimante domestique et de papier A4 classique. Tous les fichiers sont conçus pour rendre correctement en noir et blanc comme en couleur, et les marges sont pensées pour les imprimantes grand public. Un papier un peu épais (120 g) donne un résultat plus agréable pour les supports affichés.',
  },
  {
    group: 'Impression et utilisation',
    question: 'Faut-il plastifier les fiches ?',
    answer:
      'Ce n’est pas nécessaire. Une pochette plastique transparente et un feutre effaçable suffisent pour réutiliser la même fiche pendant des mois, sans machine spécifique.',
  },
  {
    group: 'Impression et utilisation',
    question: 'Puis-je ouvrir les fichiers sur tablette ou téléphone ?',
    answer:
      'Oui, ce sont des PDF standards. Ils s’ouvrent sur ordinateur, tablette et téléphone. Les supports de routine et d’organisation gagnent quand même beaucoup à être imprimés et affichés.',
  },
  {
    group: 'Paiement et facturation',
    question: 'Le paiement est-il sécurisé ?',
    answer:
      'Entièrement. Le paiement est traité par Stripe, un prestataire agréé utilisé par des millions de sites. Vos coordonnées bancaires ne transitent jamais par notre site et n’y sont jamais stockées.',
  },
  {
    group: 'Paiement et facturation',
    question: 'Puis-je obtenir une facture ?',
    answer:
      'Oui. Une facture est générée pour chaque commande et reste disponible dans votre espace client, rubrique « Mes commandes ».',
  },
  {
    group: 'Paiement et facturation',
    question: 'Puis-je être remboursé ?',
    answer:
      'Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux contenus numériques fournis immédiatement, ce que vous acceptez au moment de l’achat. Cela dit, si un fichier ne s’ouvre pas ou ne correspond pas à sa description, écrivez-nous : nous trouvons une solution.',
  },
  {
    group: 'Contact et aide',
    question: 'Proposez-vous des créations sur mesure ?',
    answer:
      'Ponctuellement, oui, pour des associations ou des professionnels de la petite enfance. Décrivez-nous votre besoin par email et nous verrons ensemble si c’est réalisable.',
  },
  {
    group: 'Contact et aide',
    question: 'Sous quel délai répondez-vous ?',
    answer:
      'Sous 24 à 48 h ouvrées. Les Petits Repères est une petite maison : chaque message est lu et traité par une vraie personne.',
  },
];

export const faqGroups = [
  'Commande et téléchargement',
  'Impression et utilisation',
  'Paiement et facturation',
  'Contact et aide',
] as const;

/** Les cinq questions clés reprises sur les fiches produits et la page d'accueil. */
export const keyFaqQuestions = [
  'Comment vais-je recevoir mon fichier ?',
  'Puis-je imprimer plusieurs fois mon PDF ?',
  'Puis-je utiliser le fichier avec plusieurs enfants ?',
  'Est-ce que les fichiers sont envoyés par courrier ?',
  'Que faire si je ne reçois pas mon lien de téléchargement ?',
];

export const keyFaq = keyFaqQuestions
  .map((q) => faqItems.find((item) => item.question === q))
  .filter((item): item is FaqItem => Boolean(item));
