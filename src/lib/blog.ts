import type { BlogPost } from './types';

/**
 * Articles du blog.
 * Le corps utilise un markdown volontairement limité : `## titre`,
 * paragraphes séparés par une ligne vide, listes `- `, et `**gras**`.
 * Le rendu est assuré par le composant <RichText />.
 */

export const blogCategories = [
  'Parentalité',
  'Autonomie',
  'Activités enfants',
  'Organisation familiale',
  'Émotions',
  'Recettes en famille',
  'Au quotidien',
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'rituel-du-dimanche-soir-preparer-la-semaine',
    title: 'Le rituel du dimanche soir : préparer la semaine avec son enfant',
    excerpt:
      'Quelques minutes le dimanche soir pour remplir le semainier ou le tableau des missions, expliquer ce qui est prévu et répondre aux questions. Un moment simple, qui apporte de précieux repères au quotidien.',
    category: 'Organisation familiale',
    readingMinutes: 8,
    publishedAt: '2026-09-21',
    author: 'Sandrine',
    motif: 'tools',
    accent: 'sand',
    featured: true,
    relatedProducts: ['semainier-famille', 'tableau-des-petites-missions'],
    body: `Et si le dimanche soir devenait un petit rendez-vous pour regarder ensemble la semaine qui arrive ?

Quelques minutes pour remplir le semainier ou le tableau des missions, expliquer ce qui est prévu, répondre aux questions et permettre à l’enfant de savoir ce qui l’attend.

Un moment simple, mais qui peut apporter de précieux repères au quotidien.

## Préparer la semaine ensemble

Le dimanche soir, on peut s’installer quelques minutes avec l’enfant et regarder les jours qui arrivent. Sur le semainier, on inscrit ou place les différents événements de la semaine :

- école ou maison ;
- chez papa ou chez maman ;
- rendez-vous chez le médecin ;
- sport ou activité ;
- sortie ou événement particulier ;
- changement de lieu ou de rythme ;
- etc.

On peut parcourir les jours ensemble, expliquer ce qui est prévu et prendre le temps de répondre aux questions de l’enfant.

Ce moment permet aussi de parler des éventuels changements : une journée différente, un rendez-vous inhabituel ou une transition qui pourrait demander un peu plus d’anticipation.

## Et pour les missions ?

Le même rituel peut servir à remplir le tableau des missions. On choisit ensemble quelques petites missions adaptées à l’âge de l’enfant.

Certaines peuvent participer à la vie de la maison : mettre la table, ranger ses affaires, nourrir un animal, aider à préparer le repas… D’autres peuvent être des objectifs personnels : penser à préparer son sac, lire quelques pages, s’entraîner à quelque chose ou développer progressivement une nouvelle habitude.

L’idée est de définir les missions avec l’enfant, plutôt que de lui donner simplement une liste de choses à faire. On peut lui expliquer ce qui est attendu, vérifier qu’il a compris et réfléchir ensemble à la manière dont il pourra y arriver.

## Le semainier : rendre le temps visible

Pour un adulte, il est assez facile de se représenter une semaine. Pour un enfant, les notions de « demain », « mercredi prochain » ou « dans trois jours » sont beaucoup plus abstraites.

Le semainier permet de rendre le temps concret et visible. L’enfant peut y revenir chaque jour pour :

- savoir quel jour nous sommes ;
- voir ce qui est prévu ;
- anticiper une activité ou un rendez-vous ;
- repérer les journées d’école et les journées à la maison ;
- savoir quand il sera chez papa ou chez maman ;
- se préparer aux changements et aux transitions.

Le tableau devient ainsi un repère auquel l’enfant peut revenir, plutôt qu’une information qu’il doit retenir.

## Le tableau des missions : participer et progresser

Le tableau des missions permet de rendre visibles les petites responsabilités de chacun. L’enfant peut ainsi comprendre qu’il participe, à son niveau, à la vie de la maison.

Mais les missions ne sont pas uniquement des tâches du quotidien. Elles peuvent aussi accompagner ses apprentissages et son autonomie.

Une fois une mission réalisée, l’enfant peut placer une étoile dans la case correspondante. Au fil des jours, il voit les étoiles s’accumuler et peut constater concrètement tout ce qu’il a réussi à faire.

L’objectif n’est pas de remplir toutes les cases parfaitement, mais de rendre les efforts et les progrès visibles.

## Pourquoi l’afficher à hauteur d’enfant ?

Pour être réellement utile, le tableau doit être visible et accessible. Lorsque l’enfant peut le consulter seul, il peut progressivement :

- retrouver une information sans demander ;
- vérifier ce qui est prévu ;
- participer à son organisation ;
- suivre ses missions ;
- constater ses réussites.

Il ne s’agit pas de demander à l’enfant d’être autonome immédiatement. On lui donne simplement un support extérieur qui l’aide à construire progressivement ses propres repères.

## Ce que cela apporte

Ces outils ne servent donc pas uniquement à organiser la semaine. Ils accompagnent plusieurs apprentissages.

### Se repérer dans le temps

Le semainier aide l’enfant à comprendre progressivement les notions de jour, semaine, avant, après, aujourd’hui, demain… Le temps devient quelque chose qu’il peut voir et manipuler.

### Anticiper

Savoir ce qui va se passer permet de mieux se préparer. L’enfant peut regarder ce qui arrive, poser ses questions et anticiper les moments importants de sa semaine.

### Faciliter les transitions

Changer d’activité, passer de l’école à la maison ou changer de lieu peut demander beaucoup d’adaptation. Le fait de voir ces changements à l’avance peut aider l’enfant à mieux les anticiper.

### Développer l’autonomie

Lorsqu’il peut retrouver seul une information ou vérifier ce qu’il a à faire, l’enfant dépend progressivement moins des rappels permanents de l’adulte.

### Prendre conscience de ses réussites

Avec le tableau des missions, chaque étoile représente une action réalisée. L’enfant peut voir ses efforts et ses progrès plutôt que de se concentrer uniquement sur ce qu’il reste à faire.

### Participer à la vie familiale

Choisir ensemble les missions permet aussi de donner du sens aux responsabilités. L’enfant comprend qu’il ne fait pas simplement « des choses parce que papa ou maman l’a demandé » : il participe à la vie du groupe familial, à son niveau.

## Ce que ça change au quotidien

Sans support visuel, l’enfant doit garder beaucoup d’informations en tête. Avec un semainier, il peut progressivement apprendre à aller regarder par lui-même.

Au lieu de répéter « n’oublie pas ton sport mercredi », il peut retrouver l’information sur son tableau.

Au lieu de demander « qu’est-ce qu’on fait aujourd’hui ? », il peut regarder ce qui est prévu.

Et avec le tableau des missions, il peut voir ce qu’il a à faire, mais aussi tout ce qu’il a déjà réussi.

Le tableau ne remplace évidemment pas l’accompagnement de l’adulte. Il permet simplement de transformer des informations et des attentes parfois abstraites en repères concrets, visibles et accessibles.

## Un moment pour se connecter

Au-delà de l’organisation, le rituel du dimanche soir peut devenir un petit moment d’échange en famille. On regarde la semaine, on parle de ce qui va se passer, de ce qui fait envie ou de ce qui questionne.

On peut demander :

- « Qu’est-ce que tu as hâte de faire cette semaine ? »
- « Est-ce qu’il y a une journée que tu veux qu’on regarde ensemble ? »
- « Est-ce qu’il y a quelque chose que tu ne comprends pas dans le planning ? »

Quelques minutes suffisent. L’objectif n’est pas d’avoir une semaine parfaitement organisée, mais de permettre à l’enfant de savoir où il va, ce qui l’attend et quelle place il peut prendre dans cette organisation.

## Un petit outil, de grands repères

Le semainier et le tableau des missions sont avant tout des outils de repérage, d’apprentissage et d’autonomie. Ils rendent visibles le temps, les activités, les responsabilités et les réussites.

Et surtout, ils offrent à l’enfant un support auquel il peut revenir encore et encore pour comprendre, anticiper, participer et progresser à son rythme.

Parce que l’autonomie ne consiste pas seulement à « faire seul ». Elle commence aussi par savoir où l’on va, comprendre ce qui est attendu et avoir les bons repères pour y arriver.`,
  },
  {
    slug: '5-astuces-pour-faciliter-la-routine-du-matin',
    title: '5 astuces pour faciliter la routine du matin',
    excerpt:
      'Le matin, ce n’est pas toujours un problème de motivation. C’est souvent une question de repères. Cinq ajustements simples pour aider l’enfant à savoir ce qu’il doit faire, dans quel ordre et ce qui vient ensuite.',
    category: 'Autonomie',
    readingMinutes: 7,
    publishedAt: '2026-09-04',
    author: 'Sandrine',
    motif: 'house',
    accent: 'sage',
    featured: true,
    relatedProducts: ['pack-routines', 'routine-du-matin'],
    body: `Il y a des matins où tout s’enchaîne facilement… et d’autres où l’on répète onze fois « mets tes chaussures » avant 8 h 10.

Pour l’enfant, le matin demande pourtant de gérer beaucoup de choses en peu de temps : se réveiller, quitter une activité, s’habiller, déjeuner, se préparer, penser à ses affaires et finalement partir.

Quand chaque étape repose sur une nouvelle consigne de l’adulte, les rappels peuvent vite s’accumuler.

Rendre certaines étapes visibles permet progressivement à l’enfant de s’appuyer sur ses propres repères plutôt que sur les rappels permanents de l’adulte.

Voici cinq ajustements simples à tester.

## 1. Rendre la séquence visible, pas seulement orale

- « Habille-toi. »
- « Viens déjeuner. »
- « Brosse-toi les dents. »
- « Mets tes chaussures. »

Quand les consignes s’enchaînent, l’enfant doit retenir ce qu’il vient de faire et ce qu’il doit faire ensuite.

Pourquoi ne pas rendre cette séquence visible ?

Affichez les différentes étapes du matin dans l’ordre et à hauteur d’enfant, dans un endroit où il pourra facilement les consulter.

L’enfant peut ainsi regarder ce qui vient ensuite, revenir au tableau s’il ne sait plus quoi faire et progressivement apprendre à suivre la routine avec moins de rappels.

Le tableau ne remplace pas l’adulte : il devient simplement un repère extérieur sur lequel l’enfant peut s’appuyer.

## 2. Regarder ce qui peut être préparé la veille

Pour certains enfants, le matin est déjà suffisamment chargé sans avoir à prendre de nombreuses petites décisions.

Avant de chercher à accélérer la routine, regardez ce qui peut être préparé en amont :

- les vêtements ;
- le cartable ;
- la gourde ;
- les chaussures ;
- les affaires de sport ;
- le goûter.

Une petite préparation la veille peut alléger le nombre de choses à gérer le matin.

Et parfois, le meilleur moyen de faciliter une routine n’est pas de demander à l’enfant d’aller plus vite, mais de lui enlever quelques obstacles.

## 3. Donner une vraie petite décision à prendre

L’autonomie ne signifie pas que l’enfant décide de tout.

Mais pouvoir faire certains choix peut lui permettre de participer davantage à sa routine.

Plutôt que :

« Mets-toi en pyjama. »

On peut parfois proposer :

« Tu préfères mettre ton pantalon ou ton pull en premier ? »

Ou :

« Tu veux te brosser les dents avant ou après mettre ton pyjama ? »

Deux choix simples, qui restent compatibles avec ce qui doit être fait.

L’objectif n’est pas de négocier chaque étape, mais de permettre à l’enfant d’avoir une petite marge de décision dans un cadre posé par l’adulte.

## 4. Donner une forme concrète au temps

« Dépêche-toi, on va être en retard ! »

« Il te reste cinq minutes ! »

Pour un jeune enfant, ces phrases peuvent être difficiles à traduire concrètement en actions.

Plutôt que de multiplier les rappels, on peut utiliser un repère qu’il peut réellement percevoir :

- un sablier ;
- une minuterie visuelle ;
- une chanson ;
- une petite musique qui marque le moment de passer à l’étape suivante.

L’objectif n’est pas de mettre une pression supplémentaire sur l’enfant.

C’est simplement de rendre le passage du temps plus concret et de l’aider à comprendre qu’une étape va bientôt se terminer.

## 5. Terminer la matinée sur une note qui permet de recommencer

Même avec une routine bien pensée, il y aura des matins compliqués.

Un enfant peut être fatigué, avoir mal dormi, être contrarié ou simplement avoir besoin de plus de temps ce jour-là.

Et parfois, malgré tous les outils du monde, ça ne fonctionne pas.

Plutôt que de terminer systématiquement sur un reproche, on peut simplement reconnaître ce qui s’est passé :

« Ce matin, c’était difficile. On essaiera autrement demain. »

Cela ne signifie pas laisser tomber les règles ou les attentes.

C’est simplement permettre à l’enfant de comprendre qu’un matin difficile ne remet pas en cause les progrès déjà réalisés.

## Et si l’enfant ne suit pas encore la routine seul ?

C’est normal.

Mettre en place un tableau ou une nouvelle organisation ne signifie pas que l’enfant va immédiatement l’utiliser de manière autonome.

Au début, l’adulte peut avoir besoin de l’accompagner :

« Regarde ton tableau. Qu’est-ce qui vient après ? »

Puis, progressivement :

« Tu peux regarder ce qui vient ensuite. »

Et un jour, l’enfant ira consulter son tableau tout seul.

L’autonomie se construit justement dans cette progression : on montre, on accompagne, puis on laisse progressivement davantage de place à l’enfant.

Une routine peut demander plusieurs jours ou plusieurs semaines avant de devenir vraiment familière. Les oublis, les rappels et les moments où l’enfant a encore besoin d’aide font partie du processus.

## Ce que ça change au quotidien

L’objectif d’une routine visuelle n’est pas d’avoir des matins parfaitement silencieux et parfaitement chronométrés.

Il s’agit surtout de déplacer progressivement une partie des rappels de l’adulte vers un support auquel l’enfant peut se référer.

Au lieu de répéter :

« Qu’est-ce que tu dois faire maintenant ? »

on peut progressivement l’amener à regarder.

Au lieu de dire :

« Dépêche-toi, mets tes chaussures ! »

le tableau peut lui rappeler que les chaussures sont la dernière étape avant de partir.

Et petit à petit, l’enfant apprend à se repérer dans sa routine, anticiper ce qui vient et prendre davantage en charge certaines étapes.

C’est ça, l’autonomie : pas tout faire seul du jour au lendemain, mais avoir les bons repères pour pouvoir progressivement faire davantage par soi-même.

## Et si un matin tout s’écroule ?

Ce n’est pas forcément que la routine ne fonctionne pas.

C’est peut-être simplement… un mardi.

On peut accompagner, ajuster, recommencer le lendemain.

Une routine est là pour faciliter le quotidien, pas pour devenir une nouvelle source de pression.

L’important est que l’enfant puisse progressivement savoir ce qui est attendu, comprendre ce qui vient ensuite et trouver des repères sur lesquels il peut compter.`,
  },
  {
    slug: 'accueillir-la-colere-sans-la-nier',
    title: 'Accueillir la colère sans la nier (ni y céder)',
    excerpt:
      'Entre « ce n’est pas grave » et « arrête tout de suite », il existe un chemin praticable. Ce qu’on peut dire et faire quand la tempête arrive.',
    category: 'Émotions',
    readingMinutes: 7,
    publishedAt: '2026-08-21',
    author: 'Sandrine',
    motif: 'heart',
    accent: 'terracotta',
    featured: true,
    relatedProducts: ['pack-emotions-connexion-confiance', 'tableau-des-emotions'],
    body: `La colère d’un enfant met en difficulté parce qu’elle arrive sans préavis, souvent pour un motif minuscule, et généralement au pire moment. On oscille alors entre deux réflexes : minimiser (« ce n’est pas grave »), ou reprendre la main par l’autorité (« arrête ça tout de suite »).

Les deux échouent, pour la même raison : ni l’une ni l’autre ne dit à l’enfant ce qui se passe dans son corps.

## Ce qui se passe réellement

En pleine colère, un enfant n’a plus accès à la partie de son cerveau qui raisonne. Lui expliquer pourquoi il a tort à cet instant revient à lire une notice à quelqu’un qui a les mains occupées. Il faut d’abord que l’intensité redescende. Ensuite, et seulement ensuite, on peut parler.

## Trois phrases qui aident

- **« Tu as le droit d’être en colère. »** Valider l’émotion n’est pas valider le comportement. On peut être furieux et ne pas taper.
- **« Je reste là. »** L’enfant en colère se sent souvent mauvais, donc menacé d’être abandonné. Rester à côté, en silence, fait plus qu’un long discours.
- **« On en reparle quand c’est redescendu. »** Cela pose un cadre sans humilier, et cela tient la promesse d’en reparler — ce qui compte autant.

## Ce qui n’aide pas

- Demander « pourquoi tu pleures ? » au sommet de la crise : il n’en sait rien.
- Comparer avec le frère, la sœur, ou l’enfant d’à côté.
- Promettre une récompense pour arrêter : la crise devient une monnaie d’échange.

## Donner un outil, pas seulement des mots

Un tableau des émotions affiché dans l’entrée permet à un enfant de pointer sa case au lieu de chercher un mot qu’il n’a pas. Un thermomètre de la colère à colorier lui donne une échelle : « je suis à 4, pas à 10 ». Ce qui devient visible devient discutable.

Ces supports ne font pas disparaître la colère — rien ne le fait, et ce n’est pas souhaitable. Ils la rendent traversable à deux.

## Et pour vous

Il y aura des soirs où vous répondrez mal. Ce n’est pas grave et ce n’est pas rattrapable à chaud. Ce qui répare, c’est de revenir dessus plus tard : « tout à l’heure j’ai crié, je n’aurais pas dû ». Un enfant qui voit un adulte reconnaître une erreur apprend, au passage, que c’est autorisé.`,
  },
  {
    slug: 'organiser-la-semaine-en-vingt-minutes-le-dimanche',
    title: 'Organiser la semaine en vingt minutes le dimanche',
    excerpt:
      'Un rituel court, une seule page affichée dans la cuisine, et la charge mentale cesse d’être portée par une seule personne.',
    category: 'Organisation familiale',
    readingMinutes: 5,
    publishedAt: '2026-08-07',
    author: 'Sandrine',
    motif: 'tools',
    accent: 'sand',
    relatedProducts: ['semainier-famille', 'tableau-des-petites-missions'],
    body: `La charge mentale familiale n’est pas un problème de quantité de travail. C’est un problème de visibilité : tant que le planning existe uniquement dans la tête d’une seule personne, elle est la seule à pouvoir y répondre, et la seule à s’en inquiéter à 23 h.

Le remède est ennuyeux et efficace : sortir le planning de la tête et le mettre au mur.

## Le rituel du dimanche soir

Vingt minutes, toujours au même moment, idéalement avec les enfants autour de la table.

- On remplit les cases repas de la semaine — cinq dîners suffisent, personne ne tient sept.
- On note les rendez-vous, les activités, les sorties.
- On répartit ce qui doit l’être : qui emmène, qui récupère, qui fait les courses.
- Chaque enfant choisit deux missions dans la colonne qui lui revient.

Cela paraît scolaire la première fois. Au bout de trois semaines, c’est le moment le plus reposant du week-end.

## Pourquoi l’afficher plutôt que le mettre dans une application

Une application est parfaite pour deux adultes organisés. Elle est invisible pour un enfant de six ans, et elle demande un geste volontaire pour être consultée. Une feuille A4 dans la cuisine est vue quarante fois par jour, par tout le monde, sans effort.

## Ce qui change concrètement

- Les questions « on mange quoi ? » et « c’est qui qui m’emmène ? » disparaissent.
- Les enfants anticipent leur semaine, ce qui réduit les refus de dernière minute.
- La répartition devient discutable, donc négociable, donc partagée.

## Une règle pour que ça tienne

Ne remplissez jamais toutes les cases. Laissez au moins deux soirs vides. Un planning complet est un planning qu’on abandonne à la première imprévu — et les imprévus arrivent le mardi.`,
  },
  {
    slug: 'dix-activites-calmes-pour-les-fins-de-journee',
    title: 'Dix activités calmes pour les fins de journée',
    excerpt:
      'Ce moment entre le retour de l’école et le dîner où tout le monde est à bout. Dix idées sans écran, sans matériel et sans préparation.',
    category: 'Activités enfants',
    readingMinutes: 5,
    publishedAt: '2026-07-24',
    author: 'Sandrine',
    motif: 'palette',
    accent: 'sageLight',
    relatedProducts: ['cartes-activites-calmes', 'pack-activites'],
    body: `Il y a un créneau, entre 17 h et 19 h, où la fatigue de la journée se transforme en disputes. L’enfant a tenu toute la journée à l’école, vous avez tenu toute la journée ailleurs, et il reste à faire le dîner, les devoirs et le bain.

Ce n’est pas le moment d’une activité ambitieuse. C’est le moment d’une activité **calme, courte et prévisible**.

## Dix idées qui fonctionnent vraiment

- Trier : boutons, legos par couleur, chaussettes. C’est répétitif, donc apaisant.
- Découper des formes dans un vieux magazine, sans but précis.
- Écouter une histoire audio, allongé, lumière baissée.
- Arroser et observer les plantes, une par une.
- Dessiner sur un grand papier posé par terre, à plat ventre.
- Faire une pâte à modeler maison — trois ingrédients, dix minutes.
- Regarder un album d’images sans texte et raconter à deux.
- Construire une cabane avec deux chaises et une couverture.
- Coller des gommettes sur un coloriage, en silence.
- Masser les mains, avec une noisette de crème.

## Le truc du bocal

Écrivez ces idées sur des cartes, glissez-les dans un bocal, et laissez l’enfant tirer au sort. Le tirage règle deux problèmes à la fois : vous n’avez plus à trouver l’idée à 17 h, et l’enfant n’a plus à choisir — ce qui, en fin de journée, est un soulagement pour lui aussi.

## Ce qui ne marche pas à cette heure-là

Les activités qui demandent de la précision, celles qui salissent beaucoup, et celles qu’il faut interrompre pour passer à table. Gardez-les pour le week-end.`,
  },
  {
    slug: 'cuisiner-avec-un-enfant-sans-y-passer-la-soiree',
    title: 'Cuisiner avec un enfant sans y passer la soirée',
    excerpt:
      'Comment répartir les gestes selon l’âge, ce qu’on peut vraiment déléguer, et pourquoi les pictogrammes valent mieux qu’une recette écrite.',
    category: 'Recettes en famille',
    readingMinutes: 6,
    publishedAt: '2026-07-10',
    author: 'Sandrine',
    motif: 'chef',
    accent: 'peach',
    relatedProducts: ['pack-recettes', 'pack-experiences-scientifiques'],
    body: `Cuisiner avec un enfant est présenté comme un moment de complicité. Dans la vraie vie, c’est souvent trois fois plus long, deux fois plus salissant, et ça finit rarement bien quand on s’y met à 19 h 15 un jeudi.

Le problème n’est pas l’enfant. C’est le découpage des tâches.

## Ce qu’un enfant peut faire, par âge

- **2-3 ans** : verser un ingrédient déjà dosé, mélanger dans un grand saladier, écraser à la fourchette, appuyer sur un emporte-pièce.
- **3-5 ans** : casser un œuf (au-dessus d’un bol séparé), étaler, badigeonner, éplucher une banane, compter les cuillères.
- **5-7 ans** : mesurer avec un verre gradué, couper au couteau à bout rond, râper sous surveillance, suivre une fiche illustrée seul.
- **7-10 ans** : lire une recette en entier, préparer un goûter de A à Z, utiliser le four accompagné.

## Pourquoi les pictogrammes battent le texte

Une recette écrite suppose la lecture fluide et la mémoire de travail d’un adulte. Une fiche illustrée, une étape par vignette, permet à un enfant de cinq ans d’avancer sans redemander « et après ? » toutes les trente secondes. C’est le même principe qu’une routine du matin affichée : ce qui est visible n’a pas besoin d’être répété.

Indiquez aussi les quantités en cuillères et en verres, pas seulement en grammes. Une balance est un obstacle ; une cuillère à soupe, non.

## Trois règles qui sauvent la soirée

- **Une seule recette, jamais deux.** L’enthousiasme retombe après vingt minutes.
- **Le rangement fait partie de la recette.** Annoncé au début, il se négocie beaucoup mieux qu’à la fin.
- **Le résultat n’a pas besoin d’être bon.** Des sablés un peu trop cuits que l’enfant a faits seul valent mieux qu’un gâteau parfait que vous avez fait à sa place.

## Le bon créneau

Le mercredi après-midi, le samedi matin, ou un dimanche de pluie. Jamais le soir pressé — pour ça, il reste les pâtes, et ce n’est pas un échec éducatif.`,
  },
  {
    slug: 'autonomie-ce-qu-on-peut-vraiment-demander-selon-l-age',
    title: 'Autonomie : ce qu’on peut vraiment demander selon l’âge',
    excerpt:
      'Trop tôt, c’est une source de conflits. Trop tard, c’est une occasion manquée. Un repère par tranche d’âge, sans tableau culpabilisant.',
    category: 'Parentalité',
    readingMinutes: 7,
    publishedAt: '2026-06-19',
    author: 'Sandrine',
    motif: 'star',
    accent: 'gold',
    relatedProducts: ['tableau-des-petites-missions', 'pack-routines'],
    body: `« Il devrait déjà savoir faire ça. » Cette phrase est presque toujours fausse, dans un sens ou dans l’autre. On demande souvent trop tôt sur ce qui nous agace, et trop tard sur ce que nous avons pris l’habitude de faire à leur place.

Voici des repères, pas une grille d’évaluation. Un enfant qui n’y correspond pas ne présente aucun problème : les écarts de six mois sont la règle, pas l’exception.

## 2-3 ans

Mettre ses chaussures (pas forcément au bon pied), porter son assiette, jeter une couche à la poubelle, ranger les jouets dans un bac unique. À cet âge, l’autonomie est motrice avant d’être organisationnelle.

## 3-5 ans

S’habiller avec des vêtements préparés, se laver les mains seul, mettre la table avec un modèle, arroser une plante, suivre une routine illustrée de quatre à six étapes. C’est l’âge où un support visuel change réellement les choses.

## 5-7 ans

Préparer son cartable avec une liste, faire son lit approximativement, se servir à boire, débarrasser, suivre une recette illustrée, choisir ses vêtements selon la météo. L’enfant peut désormais tenir une séquence entière sans relance.

## 7-10 ans

Gérer sa douche, préparer un goûter complet, ranger sa chambre avec des critères précis, anticiper ses affaires de sport la veille, suivre un planning hebdomadaire. On passe des gestes aux responsabilités.

## Les trois erreurs classiques

- **Reprendre derrière.** Refaire le lit après lui annule tout le bénéfice, et il le voit.
- **Ajouter tout d’un coup.** Une nouvelle mission à la fois, sur deux semaines.
- **Récompenser.** Un enfant payé pour participer arrête dès que la récompense s’arrête. On participe parce qu’on fait partie de la famille — c’est une raison suffisante, et durable.

## Le vrai indicateur

Ce n’est pas la qualité du résultat. C’est la question qui disparaît : le jour où votre enfant ne demande plus « qu’est-ce que je fais maintenant ? », l’autonomie est en place. Le lit de travers, lui, s’améliorera tout seul.`,
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(limit = 2): BlogPost[] {
  const featured = blogPosts.filter((p) => p.featured);
  return (featured.length ? featured : getAllPosts()).slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const sameCategory = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}
