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
 * Les cinq packs réunis dans l'ensemble complet.
 * Une seule liste sert à la fois au descriptif affiché sur la fiche produit
 * et aux fichiers effectivement livrés : impossible d'annoncer un contenu
 * qui ne serait pas dans la commande.
 */
const fullPackFiles = [
  { name: 'pack-routines.pdf', label: 'Routines, autonomie et repères', pages: 30 },
  { name: 'pack-emotions.pdf', label: 'Émotions, connexion et confiance', pages: 24 },
  { name: 'pack-experiences-scientifiques.pdf', label: 'Expériences scientifiques', pages: 19 },
  { name: 'pack-recettes.pdf', label: 'Recettes en famille', pages: 18 },
  { name: 'pack-activites.pdf', label: 'Activités créatives', pages: 18 },
];

const includedInFullPack = fullPackFiles.map(
  (file) => `Le pack ${file.label.toLowerCase()} (${file.pages} pages)`,
);

const fullPackPages = fullPackFiles.reduce((sum, file) => sum + file.pages, 0);

export const products: Product[] = [
  {
    id: 'prd_routines',
    slug: 'pack-routines',
    name: 'Pack routines',
    tagline: 'Des repères pour gagner en autonomie au quotidien',
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
    related: ['pack-emotions-connexion-confiance', 'semainier-famille', 'rituel-du-soir'],
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
    pages: 24,
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
    tagline: '30 expériences pour découvrir les sciences en s’amusant',
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
    related: ['pack-activites', 'cartes-activites-calmes', 'pack-recettes'],
  },
  {
    id: 'prd_recettes',
    slug: 'pack-recettes',
    name: 'Pack recettes en famille',
    tagline: '30 recettes pour cuisiner et partager en famille',
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
    related: ['pack-activites', 'semainier-famille', 'pack-experiences-scientifiques'],
  },
  {
    id: 'prd_activites',
    slug: 'pack-activites',
    name: 'Pack activités créatives',
    tagline: '30 activités pour créer, explorer et s’amuser',
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
    pages: fullPackPages,
    format: 'A4 — portrait et paysage',
    description:
      'Les cinq packs de la boutique réunis : routines et autonomie, émotions et confiance, expériences scientifiques, recettes et activités créatives. Cent neuf pages qui couvrent le quotidien d’une famille pendant plusieurs années, avec une économie de plus de 35 % par rapport aux packs achetés séparément.',
    contents: includedInFullPack,
    sections: [
      {
        title: 'Ce que vous économisez',
        body: 'Achetés séparément, ces cinq packs représentent 46,50 €. Réunis, ils sont à 29,90 € — soit 16,60 € d’économie.',
      },
      {
        title: 'Par où commencer',
        body: 'Vous recevez les cinq packs en cinq fichiers séparés : vous imprimez le thème du moment sans avoir à chercher au milieu de cent pages. Un sujet à la fois, sur deux semaines, plutôt que tout afficher le premier jour.',
      },
    ],
    motif: 'gift',
    accent: 'gold',
    featured: true,
    popularity: 91,
    createdAt: '2026-03-18',
    file: fullPackFiles[0].name,
    files: fullPackFiles,
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


/**
 * Fichiers livrés pour un produit.
 * Un produit ordinaire n'en a qu'un ; le pack complet en a cinq.
 */
export function productFiles(product: Product): ProductFile[] {
  if (product.files?.length) return product.files;
  return [{ name: product.file, label: product.name, pages: product.pages }];
}
