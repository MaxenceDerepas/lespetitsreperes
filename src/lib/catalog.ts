import type { AgeRange, Category, CategorySlug, Product, ProductType } from './types';

/* =====================================================================
 *  CATÉGORIES
 * =================================================================== */

export const categories: Category[] = [
  {
    slug: 'activites',
    name: 'Activités',
    tagline: 'Des idées prêtes à imprimer',
    description:
      'Activités créatives, jeux et cartes à imprimer pour occuper un après-midi de pluie ou prolonger un week-end en douceur.',
    motif: 'palette',
    accent: 'sageLight',
    order: 1,
  },
  {
    slug: 'experiences',
    name: 'Expériences',
    tagline: 'Comprendre en expérimentant',
    description:
      'Des expériences simples à faire à la maison, avec ce qu’on a déjà dans les placards — et de quoi expliquer ce qui se passe, avec des mots d’enfant.',
    motif: 'star',
    accent: 'gold',
    order: 3,
  },
  {
    slug: 'recettes',
    name: 'Recettes',
    tagline: 'Cuisiner ensemble, simplement',
    description:
      'Des fiches recettes illustrées, pensées pour être suivies par un enfant : peu d’ingrédients, des étapes courtes, et le plaisir de faire soi-même.',
    motif: 'chef',
    accent: 'peach',
    order: 2,
  },
  {
    slug: 'routines-autonomie',
    name: 'Routines / Autonomie',
    tagline: 'Des matins et des soirs plus doux',
    description:
      'Routines illustrées, semainiers et tableaux de missions : des repères visuels qui rendent le quotidien évident et font grandir l’autonomie, sans rappels ni tensions.',
    motif: 'house',
    accent: 'sage',
    order: 4,
  },
  {
    slug: 'connexion-emotions',
    name: 'Connexion / Émotions',
    tagline: 'Mettre des mots sur ce qui se passe',
    description:
      'Tableaux, roues et rituels du soir pour aider les enfants à reconnaître ce qu’ils ressentent — et pour garder, chaque jour, un vrai moment ensemble.',
    motif: 'heart',
    accent: 'terracotta',
    order: 5,
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

/* =====================================================================
 *  FILTRES
 * =================================================================== */

export const ageRanges: AgeRange[] = ['2-3 ans', '3-5 ans', '5-7 ans', '7-10 ans', 'Toute la famille'];

export const productTypes: ProductType[] = [
  'Fiche PDF',
  'Pack PDF',
  'Jeu à imprimer',
  'Affiche',
  'Semainier',
];

export const priceBrackets = [
  { id: 'lt5', label: 'Moins de 5 €', min: 0, max: 499 },
  { id: '5to10', label: '5 € à 10 €', min: 500, max: 1000 },
  { id: '10to20', label: '10 € à 20 €', min: 1001, max: 2000 },
  { id: 'gt20', label: 'Plus de 20 €', min: 2001, max: Number.MAX_SAFE_INTEGER },
] as const;

/* =====================================================================
 *  PRODUITS
 *  Pour ajouter un produit : dupliquer un bloc, changer le slug,
 *  déposer le PDF dans `private/files/` et renseigner `file`.
 * =================================================================== */

const includedInFullPack = [
  'Le pack routines du matin et du soir (24 pages)',
  'Le pack émotions, connexion et confiance (18 pages)',
  'Le pack activités créatives (20 pages)',
  'Le pack expériences scientifiques (16 pages)',
  'Le pack recettes en famille (14 pages)',
  'Notre semainier famille et le tableau des petites missions',
];

export const products: Product[] = [
  {
    id: 'prd_routines',
    slug: 'pack-routines',
    name: 'Pack routines',
    tagline: 'Des matins sans course et des soirs qui s’apaisent',
    priceCents: 1290,
    category: 'routines-autonomie',
    subcategory: 'Matin et soir',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 30,
    format: 'A4 — portrait et paysage',
    description:
      'Le pack le plus demandé de la boutique. Trente pages pour installer, une fois pour toutes, une routine du matin et un rituel du soir que votre enfant peut suivre seul. Les étapes sont illustrées, dans un ordre logique, avec de la place pour cocher, déplacer ou colorier — parce qu’un enfant qui voit ce qui l’attend n’a plus besoin qu’on le lui répète six fois.',
    contents: [
      'Deux tableaux de routine du matin (version illustrée et version à compléter)',
      'Deux tableaux de rituel du soir, dont une version « temps calme »',
      'Des cartes-étapes à découper pour composer votre propre routine',
      'Un tableau de suivi hebdomadaire avec gommettes à colorier',
      'Une page de conseils pour installer la routine en une semaine',
      'Deux affiches « Je suis prêt » et « Bonne nuit » format A4',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne',
        body: 'Un enfant de 3 à 7 ans n’a pas encore la capacité de se représenter une suite d’actions dans le temps. Rendre la séquence visible, à hauteur d’yeux, remplace la consigne orale — et fait tomber la plupart des conflits du matin.',
      },
      {
        title: 'Comment l’utiliser',
        body: 'Imprimez le tableau, affichez-le à hauteur d’enfant dans la salle de bain ou l’entrée, et laissez votre enfant cocher lui-même. Vous pouvez glisser la feuille dans une pochette plastique pour l’utiliser au feutre effaçable pendant des mois.',
      },
    ],
    faq: [
      {
        question: 'Faut-il plastifier les fiches ?',
        answer:
          'Ce n’est pas obligatoire, mais une simple pochette transparente et un feutre effaçable permettent de réutiliser le même tableau chaque jour pendant des mois.',
      },
      {
        question: 'Mon enfant ne sait pas encore lire, est-ce adapté ?',
        answer:
          'Oui. Chaque étape est illustrée et le texte reste secondaire : la version illustrée est justement conçue pour les enfants qui ne lisent pas encore.',
      },
    ],
    images: [
      {
        src: '/produits/pack-routines/tableau-du-jour.jpg',
        alt: 'Une maman et ses deux enfants devant le tableau du jour affiché au mur de la cuisine',
        width: 1200,
        height: 1097,
      },
      {
        src: '/produits/pack-routines/routine-au-mur.jpg',
        alt: 'Un garçon déplace une étiquette sur sa routine du matin affichée à hauteur d’enfant',
        width: 1200,
        height: 1097,
      },
      {
        src: '/produits/pack-routines/couverture.jpg',
        alt: 'Couverture du pack routines, semainiers, pictos et rituels',
        width: 1200,
        height: 1197,
      },
      {
        src: '/produits/pack-routines/les-fiches.jpg',
        alt: 'Les fiches imprimées étalées sur une table : ma routine, mon tableau du jour, mes missions de la semaine, mon semainier, je prépare mon cartable',
        width: 1200,
        height: 800,
        thumb: true,
      },
      {
        src: '/produits/pack-routines/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1204,
      },
    ],
    motif: 'house',
    accent: 'sage',
    featured: true,
    popularity: 98,
    createdAt: '2026-02-11',
    file: 'pack-routines.pdf',
    related: ['pack-emotions-connexion-confiance', 'semainier-famille', 'rituel-du-soir'],
  },
  {
    id: 'prd_emotions',
    slug: 'pack-emotions-connexion-confiance',
    name: 'Pack émotions, connexion et confiance',
    tagline: 'Des mots simples pour les grandes tempêtes',
    priceCents: 990,
    category: 'connexion-emotions',
    subcategory: 'Émotions et confiance',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 24,
    format: 'A4 — portrait',
    description:
      'Vingt-quatre pages pour traverser les émotions sans les subir. Une roue des émotions, un tableau à afficher, des cartes « de quoi j’ai besoin » et des supports de connexion à utiliser le soir. L’idée n’est pas de faire disparaître la colère, mais de donner à votre enfant — et à vous — un vocabulaire commun pour la nommer.',
    contents: [
      'La roue des émotions à assembler (deux tailles)',
      'Un tableau des émotions à afficher, version fille et garçon neutres',
      'Douze cartes « de quoi j’ai besoin là, maintenant »',
      'Le thermomètre de la colère à colorier',
      'Un support « mes trois fiertés du jour »',
      'Un guide parent de 3 pages : quoi dire, quoi éviter',
    ],
    sections: [
      {
        title: 'Un vocabulaire partagé',
        body: 'Nommer une émotion, c’est déjà en reprendre un peu le contrôle. Les cartes servent autant à l’enfant qui n’arrive pas à parler qu’au parent qui cherche la bonne phrase au mauvais moment.',
      },
    ],
    images: [
      {
        src: '/produits/pack-emotions/thermometre-en-famille.jpg',
        alt: 'Une famille attablée utilise le thermomètre des émotions et les cartes « quand je me sens débordé »',
        width: 1200,
        height: 800,
      },
      {
        src: '/produits/pack-emotions/defis-en-famille.jpg',
        alt: 'Des enfants et leur maman jouent aux cartes défis en famille dans le salon',
        width: 1200,
        height: 1097,
      },
      {
        src: '/produits/pack-emotions/couverture.jpg',
        alt: 'Couverture du pack : 30 fiches de connexion et partage en famille',
        width: 1200,
        height: 1201,
      },
      {
        src: '/produits/pack-emotions/les-fiches.jpg',
        alt: 'Les fiches imprimées étalées sur une table : thermomètre des émotions, cartes de discussion, cartes respiration, boîte à souvenirs',
        width: 1200,
        height: 1014,
        thumb: true,
      },
      {
        src: '/produits/pack-emotions/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1199,
      },
    ],
    motif: 'heart',
    accent: 'terracotta',
    featured: true,
    isNew: true,
    popularity: 94,
    createdAt: '2026-08-02',
    file: 'pack-emotions.pdf',
    related: ['tableau-des-emotions', 'pack-routines', 'rituel-du-soir'],
  },
  {
    id: 'prd_sciences',
    slug: 'pack-experiences-scientifiques',
    name: 'Pack expériences scientifiques',
    tagline: 'Douze expériences avec ce que vous avez déjà chez vous',
    priceCents: 790,
    category: 'experiences',
    subcategory: 'Expériences',
    type: 'Pack PDF',
    ages: ['5-7 ans', '7-10 ans'],
    pages: 19,
    format: 'A4 — portrait',
    description:
      'Douze expériences testées à la maison, à faire avec du bicarbonate, un verre d’eau, du papier et un peu de patience. Chaque fiche tient sur une page : le matériel, les étapes illustrées, et une explication écrite pour que vous puissiez répondre à la question qui arrive toujours — « mais pourquoi ? ».',
    contents: [
      'Douze fiches expériences, une par page',
      'La liste du matériel, tout se trouve dans la cuisine',
      'Une explication simple du phénomène pour chaque expérience',
      'Un carnet d’observation à imprimer pour noter les résultats',
      'Un diplôme de petit scientifique à remplir',
    ],
    images: [
      {
        src: '/produits/pack-experiences/experience-en-famille.jpg',
        alt: 'Une maman et ses deux enfants réalisent une expérience avec de l’huile et des colorants, la fiche posée sur la table',
        width: 1200,
        height: 1019,
      },
      {
        src: '/produits/pack-experiences/les-fiches.jpg',
        alt: 'Des enfants penchés sur les fiches imprimées : les cristaux de sel, les glaçons surprise, les couleurs qui marchent, le dessin secret',
        width: 1200,
        height: 1024,
        thumb: true,
      },
      {
        src: '/produits/pack-experiences/couverture.jpg',
        alt: 'Couverture du pack : 30 fiches d’expériences scientifiques simples et fascinantes',
        width: 1200,
        height: 1187,
      },
      {
        src: '/produits/pack-experiences/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1203,
      },
    ],
    motif: 'star',
    accent: 'sageLight',
    isNew: true,
    popularity: 81,
    createdAt: '2026-07-14',
    file: 'pack-experiences-scientifiques.pdf',
    related: ['pack-activites', 'cartes-activites-calmes', 'pack-recettes'],
  },
  {
    id: 'prd_recettes',
    slug: 'pack-recettes',
    name: 'Pack recettes en famille',
    tagline: 'Des recettes qu’un enfant peut suivre seul',
    priceCents: 790,
    category: 'recettes',
    subcategory: 'Cuisine en famille',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans', 'Toute la famille'],
    pages: 18,
    format: 'A4 — portrait',
    description:
      'Dix recettes illustrées étape par étape, avec des pictogrammes plutôt que des paragraphes : un enfant de quatre ans peut suivre la fiche des sablés, un enfant de huit ans peut préparer le goûter tout seul. Les quantités sont indiquées en cuillères et en verres, pas seulement en grammes.',
    contents: [
      'Dix fiches recettes illustrées, du petit-déjeuner au goûter',
      'Des quantités en cuillères et en verres, lisibles sans balance',
      'Une fiche « je mets la table » et une fiche « je range après »',
      'Un tableau des ustensiles à découper',
      'Deux pages de recettes vierges pour ajouter les vôtres',
    ],
    images: [
      {
        src: '/produits/pack-recettes/cuisiner-en-famille.jpg',
        alt: 'Une maman et ses deux enfants versent la farine dans un saladier, la fiche recette posée sur la table',
        width: 1200,
        height: 1097,
      },
      {
        src: '/produits/pack-recettes/les-fiches.jpg',
        alt: 'Les fiches recettes imprimées étalées sur le plan de travail : mini quiches, tartines rigolotes, pâte à pizza, moelleux au chocolat, cookie géant',
        width: 1200,
        height: 1097,
        thumb: true,
      },
      {
        src: '/produits/pack-recettes/couverture.jpg',
        alt: 'Couverture du pack : 30 fiches de recettes de cuisine simples, gourmandes et ludiques',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/pack-recettes/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1199,
      },
    ],
    motif: 'chef',
    accent: 'peach',
    popularity: 76,
    createdAt: '2026-05-06',
    file: 'pack-recettes.pdf',
    related: ['pack-activites', 'semainier-famille', 'pack-experiences-scientifiques'],
  },
  {
    id: 'prd_activites',
    slug: 'pack-activites',
    name: 'Pack activités créatives',
    tagline: 'Dix-huit pages pour les après-midi de pluie',
    priceCents: 790,
    category: 'activites',
    subcategory: 'Créatif',
    type: 'Pack PDF',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans'],
    pages: 18,
    format: 'A4 — portrait et paysage',
    description:
      'Coloriages doux, découpages, graphisme, labyrinthes, dessins à compléter et petits bricolages à monter avec trois feuilles et une paire de ciseaux. Dix-huit pages qui ne demandent ni matériel spécifique, ni préparation, et qui tiennent dans une pochette pour le train ou le restaurant.',
    contents: [
      'Six coloriages aux motifs végétaux',
      'Quatre pages de graphisme et de tracés préparatoires à l’écriture',
      'Trois découpages faciles avec gabarits',
      'Deux labyrinthes et deux jeux d’observation',
      'Trois modèles de petits bricolages en papier',
    ],
    images: [
      {
        src: '/produits/pack-activites/peinture-en-famille.jpg',
        alt: 'Deux enfants peignent à l’aquarelle à côté de leur maman, les fiches d’activités posées sur la table',
        width: 1200,
        height: 800,
      },
      {
        src: '/produits/pack-activites/decoupage-en-famille.jpg',
        alt: 'Un petit garçon montre fièrement le poisson qu’il vient de découper, pendant que son frère colorie',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/pack-activites/couverture.jpg',
        alt: 'Couverture du pack : 30 fiches activités créatives et ludiques',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/pack-activites/les-fiches.jpg',
        alt: 'Les fiches imprimées étalées sur une table : l’éléphant, le théâtre d’ombres, l’origami facile, l’escargot, le tri de textures',
        width: 1200,
        height: 1200,
        thumb: true,
      },
    ],
    motif: 'palette',
    accent: 'sageLight',
    popularity: 84,
    createdAt: '2026-04-02',
    file: 'pack-activites.pdf',
    related: ['cartes-activites-calmes', 'pack-experiences-scientifiques', 'pack-recettes'],
  },
  {
    id: 'prd_pack_complet',
    slug: 'pack-complet-famille-sereine',
    name: 'Pack complet famille sereine',
    tagline: 'Tous nos essentiels réunis, à tarif doux',
    priceCents: 2990,
    compareAtCents: 4650,
    category: 'routines-autonomie',
    subcategory: 'Ensemble complet',
    type: 'Pack PDF',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans', '7-10 ans', 'Toute la famille'],
    pages: 96,
    format: 'A4 — portrait et paysage',
    description:
      'L’ensemble de la boutique en un seul fichier : routines, émotions, activités, expériences, recettes et outils d’organisation. Quatre-vingt-seize pages qui couvrent le quotidien d’une famille pendant plusieurs années, avec une économie de plus de 35 % par rapport aux packs achetés séparément.',
    contents: includedInFullPack,
    sections: [
      {
        title: 'Ce que vous économisez',
        body: 'Achetés séparément, ces packs représentent 46,50 €. Réunis, ils sont à 29,90 € — et vous n’avez qu’un seul fichier à retrouver dans votre espace client.',
      },
      {
        title: 'Par où commencer',
        body: 'Le pack s’ouvre sur un sommaire cliquable et une page « par où commencer » : un sujet à la fois, sur deux semaines, plutôt que tout afficher le premier jour.',
      },
    ],
    motif: 'gift',
    accent: 'gold',
    featured: true,
    popularity: 91,
    createdAt: '2026-03-18',
    file: 'pack-complet-famille-sereine.pdf',
    related: ['pack-routines', 'pack-emotions-connexion-confiance', 'semainier-famille'],
  },
  {
    id: 'prd_routine_matin',
    slug: 'routine-du-matin',
    name: 'Ma routine du matin',
    tagline: 'La fiche qui remplace les dix rappels',
    priceCents: 490,
    category: 'routines-autonomie',
    subcategory: 'Matin',
    type: 'Fiche PDF',
    ages: ['3-5 ans', '5-7 ans'],
    pages: 4,
    format: 'A4 — portrait',
    description:
      'Une fiche, quatre versions : illustrée, à compléter, avec cases à cocher et en bandeau horizontal pour la porte d’entrée. Le minimum pour tester l’effet d’une routine visuelle avant d’investir dans le pack complet.',
    contents: [
      'La routine illustrée prête à afficher',
      'Une version à compléter avec vos propres étapes',
      'Une version à cocher pour la semaine',
      'Un bandeau horizontal pour la porte ou le frigo',
    ],
    motif: 'house',
    accent: 'sage',
    popularity: 88,
    createdAt: '2026-01-20',
    file: 'routine-du-matin.pdf',
    related: ['pack-routines', 'rituel-du-soir', 'tableau-des-petites-missions'],
  },
  {
    id: 'prd_tableau_emotions',
    slug: 'tableau-des-emotions',
    name: 'Mon tableau des émotions',
    tagline: 'À afficher à hauteur d’enfant',
    priceCents: 490,
    category: 'connexion-emotions',
    subcategory: 'Affichage',
    type: 'Affiche',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans'],
    pages: 3,
    format: 'A4 et A3 — portrait',
    description:
      'Huit émotions illustrées avec douceur, sans visages caricaturaux : joie, colère, tristesse, peur, fatigue, jalousie, fierté, calme. Une flèche à déplacer permet à l’enfant de montrer où il en est, même quand il n’a pas les mots.',
    contents: [
      'L’affiche des huit émotions, format A4',
      'La même affiche en A3 pour un mur d’entrée',
      'La flèche et les gommettes à découper',
    ],
    motif: 'heart',
    accent: 'terracotta',
    popularity: 79,
    createdAt: '2026-02-28',
    file: 'tableau-des-emotions.pdf',
    related: ['pack-emotions-connexion-confiance', 'rituel-du-soir', 'pack-routines'],
  },
  {
    id: 'prd_semainier',
    slug: 'semainier-famille',
    name: 'Notre semainier famille',
    tagline: 'La semaine entière sur une page',
    priceCents: 590,
    category: 'routines-autonomie',
    subcategory: 'Organisation',
    type: 'Semainier',
    ages: ['Toute la famille'],
    pages: 6,
    format: 'A4 et A3 — paysage',
    description:
      'Repas, activités, rendez-vous, qui fait quoi : tout tient sur une page à afficher dans la cuisine. Six variantes selon la configuration de votre famille, dont une version vierge à remplir entièrement à la main.',
    contents: [
      'Le semainier complet avec colonnes repas et activités',
      'Une version simplifiée pour les semaines chargées',
      'Une version « qui fait quoi » pour répartir les tâches',
      'Un planning de menus détachable',
      'Deux versions vierges, A4 et A3',
    ],
    motif: 'tools',
    accent: 'sand',
    popularity: 74,
    createdAt: '2026-03-05',
    file: 'semainier-famille.pdf',
    related: ['tableau-des-petites-missions', 'pack-routines', 'pack-recettes'],
  },
  {
    id: 'prd_rituel_soir',
    slug: 'rituel-du-soir',
    name: 'Notre rituel du soir',
    tagline: 'Redescendre en douceur avant le coucher',
    priceCents: 490,
    category: 'connexion-emotions',
    subcategory: 'Soir',
    type: 'Fiche PDF',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans'],
    pages: 5,
    format: 'A4 — portrait',
    description:
      'Cinq pages pour installer un rituel du soir qui tient : les étapes illustrées, la météo des humeurs, les trois gratitudes, et une fiche de respiration guidée à faire ensemble sous la couette.',
    contents: [
      'Le rituel du soir illustré en six étapes',
      'La météo des humeurs à cocher chaque soir',
      'La fiche des trois gratitudes',
      'Un exercice de respiration à faire à deux',
      'Une affiche « bonne nuit » à colorier',
    ],
    motif: 'star',
    accent: 'gold',
    popularity: 83,
    createdAt: '2026-04-22',
    file: 'rituel-du-soir.pdf',
    related: ['pack-routines', 'pack-emotions-connexion-confiance', 'tableau-des-emotions'],
  },
  {
    id: 'prd_cartes_activites',
    slug: 'cartes-activites-calmes',
    name: 'Cartes d’activités calmes',
    tagline: 'Trente idées à tirer au hasard',
    priceCents: 690,
    category: 'activites',
    subcategory: 'Cartes',
    type: 'Jeu à imprimer',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 8,
    format: 'A4 — cartes à découper',
    description:
      'Trente cartes à découper, à glisser dans un bocal : une idée d’activité calme par carte, sans écran et sans matériel compliqué. Parfait pour le moment creux de 17 h ou le dimanche qui n’en finit pas.',
    contents: [
      'Trente cartes activités à découper',
      'Six cartes vierges pour vos propres idées',
      'L’étiquette du bocal à imprimer',
      'Un guide d’utilisation d’une page',
    ],
    motif: 'palette',
    accent: 'sageLight',
    isNew: true,
    popularity: 72,
    createdAt: '2026-08-26',
    file: 'cartes-activites-calmes.pdf',
    related: ['pack-activites', 'pack-experiences-scientifiques', 'rituel-du-soir'],
  },
  {
    id: 'prd_missions',
    slug: 'tableau-des-petites-missions',
    name: 'Le tableau des petites missions',
    tagline: 'Participer à la maison, avec fierté',
    priceCents: 590,
    category: 'routines-autonomie',
    subcategory: 'Autonomie',
    type: 'Fiche PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 7,
    format: 'A4 — portrait',
    description:
      'Un tableau de missions domestiques adaptées à l’âge, sans système de récompense ni chantage : on participe parce qu’on fait partie de la famille. Les cartes-missions se déplacent d’une semaine à l’autre pour éviter la lassitude.',
    contents: [
      'Le tableau de missions hebdomadaire',
      'Trente-six cartes-missions par tranche d’âge',
      'Une version pour deux enfants ou plus',
      'Une page de conseils pour éviter le piège des récompenses',
    ],
    motif: 'tools',
    accent: 'sand',
    popularity: 69,
    createdAt: '2026-05-30',
    file: 'tableau-des-petites-missions.pdf',
    related: ['semainier-famille', 'pack-routines', 'routine-du-matin'],
  },
];

/* =====================================================================
 *  ACCÈS AUX DONNÉES
 *  Ces fonctions sont le seul point d'entrée du catalogue : les remplacer
 *  par des requêtes SQL suffit pour passer sur une base de données.
 * =================================================================== */

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewProducts(limit = 4): Product[] {
  return [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getBestSellers(limit = 4): Product[] {
  return [...products].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const explicit = (product.related ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const fallback = products.filter(
    (p) => p.id !== product.id && p.category === product.category && !explicit.includes(p),
  );

  return [...explicit, ...fallback].slice(0, limit);
}

export function countProductsInCategory(slug: CategorySlug): number {
  return products.filter((p) => p.category === slug).length;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const haystack = (p: Product) =>
    [p.name, p.tagline, p.description, p.category, p.subcategory ?? '', p.type, ...p.contents]
      .join(' ')
      .toLowerCase();

  return products.filter((p) => haystack(p).includes(q)).slice(0, 8);
}

