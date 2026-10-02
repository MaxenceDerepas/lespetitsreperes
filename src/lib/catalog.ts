import type { AgeRange, Category, CategorySlug, Product, ProductFile, ProductType } from './types';

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

/**
 * Les cinq packs réunis dans l'ensemble complet : les fichiers effectivement
 * livrés à l'acheteur, et le total de pages affiché sur la fiche.
 */
const fullPackFiles = [
  { name: 'pack-routines.pdf', label: 'Routines, autonomie et repères', pages: 30 },
  { name: 'pack-emotions.pdf', label: 'Émotions, connexion et confiance', pages: 27 },
  { name: 'pack-experiences-scientifiques.pdf', label: 'Expériences scientifiques', pages: 19 },
  { name: 'pack-recettes.pdf', label: 'Recettes en famille', pages: 18 },
  { name: 'pack-activites.pdf', label: 'Activités créatives', pages: 18 },
];

const fullPackPages = fullPackFiles.reduce((sum, file) => sum + file.pages, 0);

export const products: Product[] = [
  {
    id: 'prd_routines',
    slug: 'pack-routines',
    name: 'Pack routines',
    tagline: 'Des outils pour grandir en autonomie au quotidien',
    priceCents: 1290,
    category: 'routines-autonomie',
    subcategory: 'Matin et soir',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 30,
    format: 'A4 — portrait et paysage',
    description: 
      'Le Pack Routines, Autonomie & Repères accompagne l’enfant dans les petits moments du quotidien : comprendre sa semaine, suivre une routine, participer à la maison, préparer ses affaires ou encore apprendre à réaliser certaines tâches seul.\n\nGrâce aux supports visuels, aux pictogrammes et aux check-lists, l’enfant sait plus facilement ce qu’il doit faire et dans quel ordre, tout en avançant progressivement vers davantage d’autonomie.',
    contents: [
      'Le semainier',
      'Les routines',
      'Le tableau des missions + étoiles et cartes missions',
      'Des planches de pictogrammes',
      'Des check-lists d’autonomie : tenue, cartable, valise, piscine, randonnée, plantes, rangement après une activité, rangement des courses…',
      'Les fiches « Comment l’utiliser ? » pour guider les parents',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Les supports visuels rendent les consignes et le temps plus concrets et accessibles. L’enfant peut regarder, suivre les étapes, cocher ce qui est fait et constater ses progrès.\n\nPetit à petit, il dépend moins des rappels de l’adulte et développe sa confiance : « Je sais ce que j’ai à faire et je peux essayer seul. »',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Pas besoin de tout mettre en place en même temps ! Choisissez simplement l’outil qui correspond au besoin du moment : semainier, routine, missions ou check-list.\n\nDécouvrez-le d’abord ensemble, accompagnez votre enfant dans son utilisation, puis laissez-le progressivement s’y référer seul. Les pictogrammes permettent de personnaliser les supports selon votre quotidien.',
      },
    ],
    faq: [
      {
        question: 'Faut-il plastifier les fiches ?',
        answer:
          'Ce n’est pas une obligation mais c’est préférable afin qu’elles durent plus longtemps dans le temps. Si vous ne le pouvez pas, une simple pochette plastique peut fonctionner.',
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
    related: ['pack-emotions-connexion-confiance'],
  },
  {
    id: 'prd_emotions',
    slug: 'pack-emotions-connexion-confiance',
    name: 'Pack émotions, connexion et confiance',
    tagline: 'Des outils pour se comprendre, prendre confiance et créer du lien',
    priceCents: 990,
    category: 'connexion-emotions',
    subcategory: 'Émotions et confiance',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 27,
    format: 'A4 — portrait',
    description: 
      'Le Pack Connexion, Confiance & Émotions rassemble des outils ludiques et bienveillants pour aider l’enfant à mieux comprendre ce qu’il ressent, développer sa confiance en lui et renforcer les liens en famille.\n\nÀ travers des cartes, des jeux et des supports visuels, l’enfant apprend progressivement à mettre des mots sur ce qu’il vit, découvrir des moyens de retrouver son calme et mieux se connaître, tout en partageant de vrais moments de complicité avec ses parents.',
    contents: [
      'Des cartes défis en famille pour créer des moments de complicité',
      'Des cartes de discussion parents/enfants',
      'Des outils autour des émotions, du calme et de la confiance en soi',
      'Un thermomètre des émotions',
      'Un support « Quand je me sens débordé(e), je peux… »',
      'Des cartes de respiration à découvrir et expérimenter',
      'Des supports pour mieux se connaître et croire en soi',
      'Un petit questionnaire personnel à refaire au fil du temps',
      'De quoi créer une boîte à souvenirs et conserver les petits moments précieux de la famille',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Les émotions, la confiance en soi ou encore la connaissance de soi sont parfois difficiles à aborder uniquement avec des mots.\n\nLes supports permettent de rendre ces notions plus concrètes et accessibles à l’enfant. Ils ouvrent naturellement la discussion, donnent des pistes pour exprimer ses ressentis et permettent d’expérimenter différentes stratégies dans les moments calmes, afin de pouvoir progressivement les réutiliser lorsque l’enfant en a besoin.\n\nEt parce que le lien se construit aussi dans le plaisir, le pack propose des moments simplement faits pour rire, jouer, discuter et créer des souvenirs ensemble.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Il n’est pas nécessaire de tout utiliser en même temps. Choisissez un outil en fonction du moment : une carte discussion pendant un temps calme, un exercice de respiration à découvrir ensemble, le thermomètre pour apprendre à identifier l’intensité d’une émotion ou encore un défi pour partager un moment en famille.\n\nCertains supports peuvent être laissés accessibles au quotidien, tandis que d’autres peuvent devenir de petits rituels familiaux. Le questionnaire peut notamment être refait de temps en temps pour garder une trace de ce que l’enfant aime, pense et ressent, et observer son évolution au fil des années.',
      },
    ],
    images: [
      {
        src: '/produits/pack-emotions/presentation.jpg',
        alt: 'Présentation du pack connexion, émotions et confiance en soi : thermomètre des émotions, cartes respiration, cartes défis, cartes discussion, questionnaire de découverte',
        width: 1200,
        height: 1200,
      },
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
    related: ['pack-routines'],
  },
  {
    id: 'prd_sciences',
    slug: 'pack-experiences-scientifiques',
    name: 'Pack expériences scientifiques',
    tagline: 'Des expériences pour découvrir les sciences en s’amusant',
    priceCents: 790,
    category: 'experiences',
    subcategory: 'Expériences',
    type: 'Pack PDF',
    ages: ['5-7 ans', '7-10 ans'],
    pages: 19,
    format: 'A4 — portrait',
    description: 
      'Le Pack 30 fiches d’expériences scientifiques invite les enfants à observer, manipuler, tester et s’émerveiller à travers des expériences simples à réaliser à la maison.\n\nChaque fiche accompagne l’enfant étape par étape, avec du matériel généralement facile à trouver, pour découvrir de façon ludique différents phénomènes : couleurs, eau, air, réactions, densité, lumière, magnétisme et bien plus encore.',
    contents: [
      '30 fiches d’expériences scientifiques à imprimer',
      'Les infos concernant le matériel nécessaire et les étapes illustrées',
      'Une partie « Ce qu’on observe » pour comprendre le résultat',
      'Des explications simples sur « Pourquoi ça marche ? »',
      'Des astuces, variantes et défis selon les expériences',
      'Des expériences autour de l’eau, l’air, des couleurs, de la lumière, du magnétisme, des réactions et bien plus encore',
      'Un support d’observation pour adopter une démarche de petit scientifique',
      'Un diplôme du petit scientifique à imprimer et personnaliser',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Les enfants comprennent particulièrement bien lorsqu’ils peuvent voir et expérimenter par eux-mêmes.\n\nFaire une hypothèse, observer ce qui se passe puis chercher à comprendre permet de développer naturellement la curiosité, le raisonnement, le sens de l’observation et l’envie d’apprendre. L’expérience devient alors un véritable moment de découverte à partager.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Choisissez une expérience selon l’envie du moment et préparez ensemble le matériel indiqué sur la fiche.\n\nLaissez d’abord votre enfant observer, questionner et imaginer ce qui va se passer, puis réalisez l’expérience en suivant les différentes étapes. Prenez ensuite le temps d’échanger sur le résultat et sur le petit phénomène scientifique qui se cache derrière.',
      },
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
    related: ['pack-activites', 'pack-recettes'],
  },
  {
    id: 'prd_recettes',
    slug: 'pack-recettes',
    name: 'Pack recettes en famille',
    tagline: 'Des recettes pour cuisiner et partager en famille',
    priceCents: 790,
    category: 'recettes',
    subcategory: 'Cuisine en famille',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans', 'Toute la famille'],
    pages: 18,
    format: 'A4 — portrait',
    description: 
      'Le Pack 30 fiches recettes a été pensé pour faire de la cuisine un vrai moment de partage avec les enfants. Des recettes sucrées et salées, simples et gourmandes, présentées de manière claire et visuelle pour permettre à l’enfant de participer réellement à leur préparation.\n\nChaque fiche rassemble les ingrédients et les différentes étapes illustrées, pour suivre facilement la recette ensemble et encourager progressivement l’autonomie en cuisine.',
    contents: [
      '30 fiches recettes à imprimer',
      'Des recettes sucrées et salées',
      'Des idées pour les goûters, desserts, repas et petits plaisirs à partager',
      'Des ingrédients et étapes illustrés pour faciliter la compréhension',
      'Des astuces et variantes selon les recettes',
      'Un support « Ma première recette » pour imaginer ou noter sa propre création',
      'Un diplôme du petit cuisinier',
      'Un set de table ludique à imprimer',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Cuisiner permet à l’enfant d’apprendre en faisant : mesurer, verser, mélanger, découper, observer les transformations et suivre différentes étapes dans l’ordre.\n\nAu-delà du plaisir de préparer quelque chose ensemble, la cuisine favorise naturellement l’autonomie, la motricité fine, la concentration et la confiance en soi.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Choisissez ensemble une recette selon vos envies, préparez les ingrédients et installez la fiche à portée de vue.\n\nL’enfant peut suivre les étapes avec l’adulte et participer selon son âge et ses capacités. Petit à petit, il peut réaliser certaines actions de façon plus autonome, toujours sous la surveillance d’un adulte lorsque cela est nécessaire.',
      },
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
    related: ['pack-activites', 'pack-experiences-scientifiques'],
  },
  {
    id: 'prd_activites',
    slug: 'pack-activites',
    name: 'Pack activités créatives',
    tagline: 'Des activités pour créer, explorer et s’amuser',
    priceCents: 790,
    category: 'activites',
    subcategory: 'Créatif',
    type: 'Pack PDF',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans'],
    pages: 18,
    format: 'A4 — portrait et paysage',
    description: 
      'Le Pack 30 fiches d’activités propose une sélection d’activités variées à réaliser à la maison avec du matériel simple : activités créatives, sensorielles, manipulations, jeux d’observation et petites découvertes.\n\nChaque fiche guide l’adulte étape par étape, tout en laissant à l’enfant la possibilité d’expérimenter, de créer et de faire à sa manière. Une façon simple d’avoir toujours une idée d’activité sous la main, sans passer du temps à chercher quoi proposer.',
    contents: [
      '30 fiches d’activités à imprimer',
      'Des activités créatives et manuelles',
      'Des expériences sensorielles et de manipulation',
      'Des jeux d’observation, de recherche et de découverte',
      'Des activités avec du matériel simple et facile à trouver',
      'Pour chaque activité information sur : matériel, étapes et bénéfices pour l’enfant',
      'Des astuces et variantes sur de nombreuses fiches',
      'Des petits bonus, dont le diplôme du petit créateur et d’autres surprises',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Les activités permettent à l’enfant d’apprendre en faisant : toucher, observer, manipuler, découper, construire, expérimenter…\n\nSelon l’activité, il développe naturellement sa motricité fine, sa créativité, sa concentration, son imagination, ses capacités d’observation et son autonomie, tout en partageant un moment agréable avec l’adulte.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Choisissez une activité selon l’envie du moment, l’âge de votre enfant ou le matériel dont vous disposez.\n\nChaque fiche indique le matériel nécessaire, les différentes étapes et ce que l’activité apporte à l’enfant. Certaines proposent également des astuces ou des variantes pour prolonger l’expérience.\n\nPas besoin de suivre la fiche à la lettre : elle est là pour vous guider et vous donner une base, tout en laissant une vraie place à l’imagination de l’enfant.',
      },
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
    related: ['pack-experiences-scientifiques', 'pack-recettes'],
  },
  {
    id: 'prd_tableau_du_jour',
    slug: 'tableau-du-jour',
    name: 'Tableau du jour',
    tagline: 'Un repère visuel pour commencer la journée en douceur',
    priceCents: 490,
    category: 'routines-autonomie',
    subcategory: 'Repères du quotidien',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 12,
    format: 'A4 — portrait',
    description:
      'Un repère simple pour aider l’enfant à se situer dans la journée : quel jour on est, le temps qu’il fait, comment il se sent, et ce qui l’attend aujourd’hui.\n\nLe tableau se complète chaque matin en quelques minutes, en déplaçant les pictogrammes. L’enfant anticipe sa journée, met des mots sur son humeur et comprend ce qui va se passer — ce qui évite bien des « et après, on fait quoi ? ».\n\nLe pack contient le tableau, la planche des chiffres, jours, mois et météo, et plus de deux cents pictogrammes du quotidien et de missions à découper.',
    contents: [
      'Le tableau « Mon tableau du jour » à imprimer et à afficher',
      'La planche à compléter : la météo, les chiffres de 1 à 31, les jours de la semaine et les douze mois',
      'Trois planches de pictogrammes « Pour mes missions » : ranger, mettre la table, arroser les plantes, plier le linge, faire ses devoirs, nourrir l’animal…',
      'Cinq planches de pictogrammes du quotidien : repas, école, toilette, coucher, sport, activités, sorties, rendez-vous, vacances…',
      'La fiche « Comment utiliser le tableau du jour ? » pour les parents',
      'La fiche « Les pictogrammes, comment les utiliser ? » : préparer, utiliser et personnaliser les planches',
      'Des cases vierges pour ajouter vos propres pictogrammes ou vos photos',
    ],
    contentsNote:
      'Imprimé une fois et plastifié, le tableau se réutilise chaque matin : on déplace simplement les pictogrammes.',
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Un enfant n’a pas la même notion du temps qu’un adulte. « Tout à l’heure », « après l’école », « demain » restent flous tant que rien ne les rend visibles.\n\nLe tableau du jour donne une forme concrète à la journée : l’enfant voit ce qui est prévu, dans quel ordre, et peut s’y référer autant de fois qu’il en a besoin. Il anticipe au lieu de subir — et les transitions deviennent nettement plus faciles.\n\nLa partie « Comment je me sens ? » lui permet au passage de nommer son humeur du matin, parfois bien avant de savoir l’expliquer.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Imprimez le tableau et les planches de pictogrammes, découpez les étiquettes et plastifiez l’ensemble pour qu’il dure. Des pastilles auto-agrippantes ou de la patafix permettent de replacer les pictogrammes chaque jour.\n\nInstallez le tableau à hauteur d’enfant, dans un endroit de passage : la cuisine, l’entrée, sa chambre. Prenez deux ou trois minutes le matin pour le compléter ensemble — la date, la météo, l’humeur, puis les activités du jour.\n\nEt si la journée change en cours de route, modifiez simplement les pictogrammes : c’est une bonne occasion d’apprendre à s’adapter.',
      },
    ],
    faq: [
      {
        question: 'Faut-il plastifier les fiches ?',
        answer:
          'Ce n’est pas une obligation mais c’est préférable afin qu’elles durent plus longtemps dans le temps. Si vous ne le pouvez pas, une simple pochette plastique peut fonctionner.',
      },
      {
        question: 'Comment fixer les pictogrammes sur le tableau ?',
        answer:
          'Une pastille auto-agrippante (type velcro adhésif) sur chaque emplacement fonctionne très bien et permet de replacer les étiquettes autant de fois qu’on veut. Une patafix ou un scotch repositionnable font aussi l’affaire.',
      },
      {
        question: 'Et s’il manque un pictogramme qui correspond à notre quotidien ?',
        answer:
          'Des cases vierges sont prévues : vous pouvez y dessiner, y coller une petite photo ou y écrire le mot. C’est souvent ce qui rend le tableau vraiment personnel.',
      },
      {
        question: 'Ce tableau est-il déjà dans le pack routines ?',
        answer:
          'Le tableau du jour et les planches de pictogrammes font partie du Pack routines, qui contient en plus le semainier, les routines du matin et du soir, le tableau des missions et les check-lists d’autonomie. Si vous hésitez entre les deux, le pack routines est le choix le plus complet.',
      },
    ],
    images: [
      {
        src: '/produits/tableau-du-jour/en-famille.jpg',
        alt: 'Une maman et ses deux enfants devant le tableau du jour affiché au mur, l’aîné pointe une activité du doigt',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/tableau-du-jour/le-pack.jpg',
        alt: 'Le tableau du jour imprimé, avec la planche des chiffres, jours, mois et météo et une planche de pictogrammes de missions',
        width: 1200,
        height: 1200,
        thumb: true,
      },
      {
        src: '/produits/tableau-du-jour/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1199,
      },
    ],
    motif: 'sun',
    accent: 'peach',
    isNew: true,
    popularity: 76,
    createdAt: '2026-10-02',
    file: 'tableau-du-jour.pdf',
    related: ['pack-routines', 'check-lists-du-quotidien'],
  },
  {
    id: 'prd_check_lists',
    slug: 'check-lists-du-quotidien',
    name: 'Check-lists du quotidien',
    tagline: 'Dix check-lists illustrées pour faire seul, du matin au départ en vacances',
    priceCents: 290,
    category: 'routines-autonomie',
    subcategory: 'Autonomie',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 6,
    format: 'A4 — portrait',
    description:
      'Dix check-lists illustrées pour aider votre enfant à devenir autonome, à gagner en confiance et à se sentir fier de ses petites réussites, chaque jour.\n\nS’habiller, préparer son cartable, ranger sa chambre, faire sa valise, s’occuper des plantes ou de son animal : chaque check-list détaille les étapes une à une, avec une image à côté de chaque ligne et une case à cocher.\n\nL’enfant voit ce qu’il lui reste à faire, avance à son rythme et coche lui-même — sans que personne n’ait besoin de le lui rappeler.',
    contents: [
      'Je m’habille tout seul',
      'Je prépare mon cartable',
      'Je range ma chambre',
      'Je prépare ma valise',
      'Je pars en randonnée',
      'Je prépare les courses',
      'Je prépare mon sac de piscine',
      'Je m’occupe des plantes',
      'Je m’occupe de mon animal',
      'Je prépare mon anniversaire',
      'La fiche « Comment les utiliser ? » pour guider les parents',
    ],
    contentsNote:
      'Deux check-lists par page : une image par étape, une case à cocher, et une petite phrase de félicitations à la fin.',
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Une consigne orale disparaît dès qu’elle est prononcée. Une check-list reste.\n\nL’enfant peut la regarder autant de fois qu’il en a besoin, voir où il en est et constater lui-même ce qu’il a accompli. Les étapes étant illustrées, il n’a pas besoin de savoir lire pour s’en servir.\n\nPetit à petit, il dépend moins des rappels de l’adulte : il sait ce qu’il a à faire, et il peut essayer seul.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Imprimez la check-list qui correspond au besoin du moment, découvrez-la ensemble et expliquez à quoi elle sert. Accompagnez votre enfant les premières fois, puis laissez-le faire à son rythme.\n\nPlastifiée ou glissée dans une pochette plastique, elle se coche au feutre effaçable et se réutilise indéfiniment. Placez-la dans un endroit visible et accessible : la chambre, l’entrée, la salle de bain.\n\nValorisez chaque étape réalisée plutôt que le seul résultat — c’est ce qui donne envie de recommencer.',
      },
    ],
    faq: [
      {
        question: 'Faut-il plastifier les fiches ?',
        answer:
          'Ce n’est pas une obligation mais c’est préférable afin qu’elles durent plus longtemps dans le temps. Si vous ne le pouvez pas, une simple pochette plastique peut fonctionner.',
      },
      {
        question: 'Mon enfant ne sait pas encore lire, est-ce adapté ?',
        answer:
          'Oui. Chaque étape est illustrée et le texte reste secondaire : l’enfant reconnaît l’image avant de lire le mot.',
      },
      {
        question: 'Ces check-lists sont-elles déjà dans le pack routines ?',
        answer:
          'Oui. Les check-lists d’autonomie font partie du Pack routines, qui contient en plus le semainier, les routines du matin et du soir, le tableau des missions et les planches de pictogrammes. Si vous hésitez entre les deux, le pack routines est le choix le plus complet.',
      },
    ],
    images: [
      {
        src: '/produits/check-lists/presentation.jpg',
        alt: 'Quatre check-lists imprimées : je m’habille tout seul, je prépare mon cartable, je range ma chambre, je m’occupe de mon animal',
        width: 1200,
        height: 1200,
        thumb: true,
      },
      {
        src: '/produits/check-lists/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1199,
      },
    ],
    motif: 'tools',
    accent: 'sand',
    isNew: true,
    popularity: 70,
    createdAt: '2026-10-02',
    file: 'check-lists-du-quotidien.pdf',
    related: ['pack-routines', 'outils-emotions'],
  },
  {
    id: 'prd_outils_emotions',
    slug: 'outils-emotions',
    name: 'Outils émotions',
    tagline: 'Un tableau, un thermomètre et des cartes pour accueillir les émotions',
    priceCents: 390,
    category: 'connexion-emotions',
    subcategory: 'Émotions au quotidien',
    type: 'Pack PDF',
    ages: ['3-5 ans', '5-7 ans', '7-10 ans'],
    pages: 6,
    format: 'A4 — paysage',
    description:
      'Quatre outils simples et bienveillants pour aider votre enfant à identifier, comprendre et apaiser ses émotions.\n\nLe tableau des émotions permet de nommer ce que l’on ressent, le thermomètre d’en mesurer l’intensité, le visuel « Quand je me sens débordé(e), je peux… » de trouver une idée concrète dans les moments difficiles, et les cartes respiration de se recentrer en douceur.\n\nDes supports à imprimer une fois, à garder à portée de main, et à réutiliser aussi souvent que nécessaire.',
    contents: [
      'Le tableau « Mes émotions » avec son emplacement « Aujourd’hui, je me sens… »',
      'Les 8 pictogrammes émotions à découper : heureux, calme, triste, en colère, inquiet, fatigué, j’ai peur, excité',
      'Le thermomètre des émotions, de « très heureux » à « très en colère »',
      'Le visuel « Quand je me sens débordé(e), je peux… » et ses 6 idées illustrées',
      'Les 8 cartes respiration : souffle la bougie, gonfle le ballon, respire comme une tortue, senteur de fleur, l’étoile qui brille, le ballon qui dégonfle, la plume qui vole, le papillon qui se pose',
      'Une version garçon et une version fille du thermomètre et du visuel « Quand je me sens débordé(e) »',
      'La fiche « Comment les utiliser ? » pour guider les parents',
    ],
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'Une émotion est difficile à expliquer avec des mots quand on est petit — et encore plus quand elle est déjà là.\n\nCes supports la rendent visible : l’enfant montre, pointe, déplace une étiquette. Il n’a plus besoin de trouver les mots pour être compris, et il découvre peu à peu que ce qu’il ressent porte un nom, a une intensité, et finit toujours par redescendre.\n\nLes idées et les cartes respiration se découvrent dans les moments calmes, pour pouvoir y revenir naturellement le jour où c’est plus difficile.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Imprimez le tableau et les pictogrammes, découpez les étiquettes, et installez l’ensemble dans un endroit facilement accessible : la chambre, le coin calme, ou près du tableau des routines.\n\nChaque jour, l’enfant peut choisir l’étiquette qui correspond à ce qu’il ressent et la placer sur le tableau. Le thermomètre vient ensuite préciser l’intensité, et le visuel « Quand je me sens débordé(e) » propose une piste à essayer.\n\nLes cartes respiration se piochent une par une, comme un petit jeu : on choisit une carte et on suit les étapes ensemble.',
      },
    ],
    faq: [
      {
        question: 'Faut-il plastifier les fiches ?',
        answer:
          'Ce n’est pas une obligation mais c’est préférable afin qu’elles durent plus longtemps dans le temps. Si vous ne le pouvez pas, une simple pochette plastique peut fonctionner.',
      },
      {
        question: 'Mon enfant ne sait pas encore lire, est-ce adapté ?',
        answer:
          'Oui. Chaque émotion et chaque idée est illustrée : l’enfant reconnaît l’image avant de lire le mot, et vous lisez le reste avec lui.',
      },
      {
        question: 'Comment fixer les étiquettes sur le tableau ?',
        answer:
          'Une pastille auto-agrippante (type velcro adhésif) sur chaque emplacement fonctionne très bien et permet de replacer les étiquettes autant de fois qu’on veut. Une patafix ou un simple scotch repositionnable font aussi l’affaire.',
      },
    ],
    images: [
      {
        src: '/produits/outils-emotions/presentation.jpg',
        alt: 'Le tableau « Mes émotions » imprimé et posé sur une table, avec les huit étiquettes émotions découpées à côté',
        width: 1200,
        height: 1200,
        thumb: true,
      },
      {
        src: '/produits/outils-emotions/comment-ca-fonctionne.jpg',
        alt: 'Comment ça fonctionne : je télécharge, j’imprime, je découpe, je plastifie',
        width: 1200,
        height: 1199,
      },
    ],
    motif: 'heart',
    accent: 'terracotta',
    isNew: true,
    popularity: 72,
    createdAt: '2026-10-02',
    file: 'outils-emotions.pdf',
    related: ['pack-emotions-connexion-confiance', 'pack-routines'],
  },
  {
    id: 'prd_pack_complet',
    slug: 'pack-complet-famille-sereine',
    name: 'Pack complet famille sereine',
    tagline: 'La boîte à outils complète des Petits Repères pour grandir et partager en famille',
    priceCents: 2490,
    compareAtCents: 4650,
    priceNote:
      'Prix de lancement — au lieu de 46,50 € achetés séparément',
    category: 'routines-autonomie',
    subcategory: 'Ensemble complet',
    type: 'Pack PDF',
    ages: ['2-3 ans', '3-5 ans', '5-7 ans', '7-10 ans', 'Toute la famille'],
    pages: fullPackPages,
    format: 'A4 — portrait et paysage',
    description: 
      'Tout l’univers Les Petits Repères dans un seul pack.\n\nLe Pack Complet réunit les 5 grands packs Les Petits Repères pour accompagner les enfants dans leur quotidien : autonomie, émotions, confiance en soi, activités, cuisine et découvertes scientifiques.\n\nDes outils à imprimer pour faciliter certains moments du quotidien, mais aussi pour jouer, créer, expérimenter, cuisiner, échanger et partager de vrais moments en famille.\n\nUn seul pack pour avoir toujours sous la main une idée, un support ou un petit coup de pouce adapté au besoin du moment.',
    contents: [
      'Pack Routines, Autonomie & Repères : semainier, routines, missions, pictogrammes, check-lists…',
      'Pack Connexion, Confiance & Émotions : émotions, respiration, confiance en soi, discussions, défis en famille, souvenirs…',
      'Pack 30 Recettes : recettes sucrées et salées illustrées à réaliser en famille',
      'Pack 30 Activités : activités créatives, sensorielles, jeux, manipulations et découvertes',
      'Pack 30 Expériences scientifiques : expériences, explications, carnet d’observation et défis',
      'Des bonus et supports complémentaires présents dans chacun des packs',
    ],
    contentsNote:
      '5 packs réunis en un seul téléchargement, pour accompagner le quotidien, favoriser l’autonomie et multiplier les occasions de grandir, apprendre et partager ensemble.',
    sections: [
      {
        title: 'Pourquoi ça fonctionne ?',
        body: 'L’enfant apprend et grandit à travers ce qu’il vit au quotidien : en faisant seul, en manipulant, en observant, en exprimant ce qu’il ressent et surtout en partageant avec les adultes qui l’entourent.\n\nLe Pack Complet permet d’accompagner toutes ces dimensions avec des supports visuels, concrets et ludiques, pensés pour être facilement intégrés à la vie de famille.\n\nL’objectif n’est pas d’en faire toujours plus, mais d’avoir les bons outils disponibles au bon moment.',
      },
      {
        title: 'Comment l’utiliser ?',
        body: 'Inutile de tout imprimer ou de tout mettre en place dès le début !\n\nPiochez simplement dans le pack selon vos besoins et vos envies : une routine pour faciliter le matin, une activité pour un mercredi après-midi, une recette à préparer ensemble, une expérience pour satisfaire une petite curiosité ou encore un outil pour parler d’une émotion.\n\nVous imprimez uniquement ce dont vous avez besoin, au moment où vous en avez besoin.',
      },
    ],
    images: [
      {
        src: '/produits/pack-complet/presentation.jpg',
        alt: 'Présentation du pack complet : les cinq packs réunis — routines et autonomie, émotions et confiance, activités créatives, recettes en famille et expériences scientifiques',
        width: 1200,
        height: 1200,
        thumb: true,
      },
      {
        src: '/produits/pack-complet/presentation-routines.jpg',
        alt: 'Pack routines, semainiers, pictos et rituels : des repères visuels pour un quotidien plus fluide',
        width: 1200,
        height: 1197,
      },
      {
        src: '/produits/pack-complet/presentation-emotions.jpg',
        alt: 'Pack connexion, émotions et confiance en soi : des outils pour mieux se comprendre, échanger et grandir ensemble',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/pack-complet/presentation-experiences.jpg',
        alt: 'Trente fiches d’expériences scientifiques simples et fascinantes, à réaliser à la maison en famille',
        width: 1200,
        height: 1187,
      },
      {
        src: '/produits/pack-complet/presentation-activites.jpg',
        alt: 'Trente fiches d’activités créatives et ludiques, simples et amusantes à réaliser à la maison',
        width: 1200,
        height: 1200,
      },
      {
        src: '/produits/pack-complet/presentation-recettes.jpg',
        alt: 'Trente fiches de recettes de cuisine simples, gourmandes et ludiques à réaliser avec son enfant',
        width: 1200,
        height: 1200,
      },
    ],
    motif: 'gift',
    accent: 'gold',
    featured: true,
    popularity: 91,
    createdAt: '2026-03-18',
    file: fullPackFiles[0].name,
    files: fullPackFiles,
    related: ['pack-routines', 'pack-emotions-connexion-confiance'],
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


/**
 * Fichiers livrés pour un produit.
 * Un produit ordinaire n'en a qu'un ; le pack complet en a cinq.
 */
export function productFiles(product: Product): ProductFile[] {
  if (product.files?.length) return product.files;
  return [{ name: product.file, label: product.name, pages: product.pages }];
}
