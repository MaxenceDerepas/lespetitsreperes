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
    relatedProducts: ['pack-routines'],
    image: {
      src: '/blog/coloriage-au-salon.jpg',
      alt: 'Une petite fille allongée sur le tapis du salon colorie tranquillement, entourée de ses crayons et de ses livres',
      width: 1400,
      height: 933,
    },
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
    relatedProducts: ['pack-routines'],
    image: {
      src: '/blog/routine-du-matin.jpg',
      alt: 'Un petit garçon décroche sa veste devant l’affiche « Ma routine du matin » accrochée au mur de sa chambre',
      width: 1400,
      height: 933,
    },
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
      'Entre « ce n’est pas grave » et « arrête tout de suite », il existe un chemin praticable. Que peut-on faire et dire lorsque la colère déborde, sans minimiser ce que l’enfant ressent ni laisser passer les comportements qui dépassent les limites ?',
    category: 'Émotions',
    readingMinutes: 9,
    publishedAt: '2026-08-21',
    author: 'Sandrine',
    motif: 'heart',
    accent: 'terracotta',
    featured: true,
    relatedProducts: ['pack-emotions-connexion-confiance'],
    image: {
      src: '/blog/accueillir-la-colere.jpg',
      alt: 'Un petit garçon assis en tailleur, les mains sur la poitrine et le ventre, respire calmement devant une affiche des émotions',
      width: 1400,
      height: 933,
    },
    body: `La colère d’un enfant peut nous mettre en difficulté.

Elle arrive parfois pour une raison qui nous semble minuscule, au moment où nous sommes déjà pressés, fatigués ou à bout nous-mêmes.

Et face à cette grande émotion, on peut facilement osciller entre deux réactions : « Ce n’est pas grave. » ou, au contraire : « Ça suffit maintenant, arrête ! »

Pourtant, il existe une troisième voie : reconnaître l’émotion tout en maintenant les limites.

Un enfant a le droit d’être en colère. Cela ne signifie pas qu’il peut tout faire sous prétexte qu’il est en colère.

## Quand la colère déborde

Lorsqu’une émotion devient très intense, il peut être difficile pour un enfant de réfléchir, d’écouter une longue explication ou de trouver seul une solution.

À ce moment-là, multiplier les paroles ou chercher immédiatement à lui faire comprendre pourquoi il a tort risque surtout d’ajouter des stimulations à une situation qui en contient déjà beaucoup.

Dans le feu de la colère, on accompagne d’abord. On explique ensuite.

Cela peut vouloir dire parler moins, se rapprocher si l’enfant l’accepte, assurer sa sécurité et attendre que l’intensité redescende avant de revenir sur ce qui s’est passé.

## Trois phrases qui peuvent aider

**« Tu as le droit d’être en colère. »** Cette phrase ne signifie pas : « Tu peux faire tout ce que tu veux parce que tu es en colère. » Elle signifie simplement : « Je vois que cette émotion est là, et je ne vais pas te demander de faire semblant de ne pas la ressentir. »

On peut ensuite poser la limite : « Tu as le droit d’être très en colère. En revanche, je ne te laisserai pas taper. » L’émotion est accueillie. Le comportement, lui, peut avoir une limite claire.

**« Je suis là. »** Quand un enfant déborde, il n’a pas forcément besoin d’un long discours. Parfois, une présence calme suffit davantage. On peut rester à proximité, parler peu et rappeler simplement : « Je suis là. On va attendre que ça redescende. »

Si l’enfant devient violent, être présent ne signifie évidemment pas laisser faire. On peut éloigner un objet, empêcher un coup, créer de la distance ou accompagner l’enfant vers un endroit plus calme, tout en maintenant une limite simple : « Je ne te laisserai pas me faire mal. » Protéger n’est pas punir.

**« On en reparlera quand tu seras plus calme. »** Tout n’a pas besoin d’être réglé immédiatement. Lorsque l’enfant est encore très agité, on peut simplement lui montrer que le sujet n’est pas abandonné : « Pour l’instant, on se calme. Après, on en reparlera ensemble. »

Puis, lorsque tout le monde est disponible, on peut revenir sur ce qui s’est passé. C’est souvent à ce moment-là que l’enfant peut commencer à comprendre, mettre des mots et réfléchir à ce qui pourrait l’aider la prochaine fois.

## Ce qui aide rarement au cœur de la crise

Certaines phrases nous viennent naturellement, mais sont difficiles à recevoir lorsque l’émotion est déjà très forte.

**« Pourquoi tu fais ça ? »** Il arrive que l’enfant ne sache tout simplement pas répondre. Il peut savoir ce qui a déclenché sa colère sans être capable d’expliquer ce qui s’est passé à l’intérieur de lui. La question pourra être intéressante plus tard, une fois l’apaisement revenu.

**« Regarde ton frère, lui il y arrive. »** La comparaison n’aide généralement pas l’enfant à mieux traverser son émotion. Elle risque surtout d’ajouter de la honte ou un sentiment d’échec à ce qui est déjà difficile.

**« Si tu arrêtes de pleurer, tu auras… »** Une récompense peut parfois interrompre momentanément un comportement, mais elle ne permet pas forcément à l’enfant de comprendre ce qu’il ressent ni d’apprendre progressivement à le réguler.

L’objectif n’est pas d’apprendre à l’enfant à ne plus se mettre en colère. C’est de l’aider à reconnaître cette émotion et, petit à petit, à trouver des façons plus adaptées de la traverser.

## Les outils : surtout avant et après la tempête

Un tableau des émotions, un thermomètre de la colère, des cartes de discussion ou des petits exercices pour apprendre à souffler peuvent être de précieux supports. Mais ils ne sont pas forcément faits pour être utilisés au sommet de la crise.

Quand l’enfant est déjà complètement débordé, lui demander de choisir une carte ou de faire un exercice peut être trop difficile. Ces outils peuvent être beaucoup plus utiles en amont ou après coup.

Dans un moment calme, on peut par exemple regarder ensemble un thermomètre de la colère et demander :

- « Comment tu sais que ta colère commence à monter ? »
- « Qu’est-ce que tu sens dans ton corps ? »
- « Qu’est-ce qui pourrait t’aider quand tu sens que ça commence à devenir trop fort ? »

On peut essayer différentes possibilités : s’éloigner quelques instants, respirer, boire un verre d’eau, demander de l’aide, aller dans un endroit calme…

Puis, après une crise, on peut revenir sur ce qui s’est passé : « Tout à l’heure, ta colère était très forte. Est-ce que tu te souviens de ce que tu as ressenti avant ? »

L’objectif est de faire de l’apprentissage dans les moments où l’enfant est disponible, pour qu’il puisse progressivement retrouver ces repères lorsqu’une nouvelle situation difficile se présente.

## Rendre les émotions visibles

Pour un enfant, mettre des mots sur ce qui se passe à l’intérieur n’est pas toujours simple. Un support visuel peut alors servir de point de départ.

Une roue ou un tableau des émotions permet de montrer : « Je suis en colère. » Un thermomètre permet d’aller un peu plus loin : « Ma colère est petite, moyenne ou très forte. »

Et au fil du temps, l’enfant peut apprendre à repérer ses propres signaux : « Quand je commence à serrer les poings, je crois que ma colère monte. »

Ce travail ne fera pas disparaître les colères. Et ce n’est d’ailleurs pas le but. Les émotions font partie de la vie.

L’enjeu est plutôt d’aider l’enfant à mieux les reconnaître, à comprendre ce qui lui arrive et à découvrir progressivement ce qui peut l’aider.

## Après la colère : réparer et comprendre

Une fois le calme revenu, il peut être utile de revenir brièvement sur l’événement. Pas pour faire la morale pendant vingt minutes, mais pour mettre des mots sur ce qui s’est passé.

- « Tu étais très en colère parce que tu voulais continuer à jouer. »
- « Tu as crié très fort et tu as lancé le jouet. »
- « La prochaine fois, qu’est-ce qu’on pourrait essayer ? »

On peut aussi réparer ce qui doit l’être : ramasser un objet lancé, aller voir quelqu’un que l’on a blessé, remettre une chose en place…

Réparer ne signifie pas humilier. C’est permettre à l’enfant de comprendre qu’une émotion peut être accueillie tout en restant responsable de ses actes.

## Et pour vous ?

Il y aura des jours où vous serez calme et patient. Et d’autres où vous crierez aussi. Parce que vous êtes un parent, pas un robot.

Si vous avez dépassé votre propre limite, il est possible de revenir dessus une fois le calme revenu : « Tout à l’heure, j’ai crié très fort. J’étais énervé, mais j’aurais pu te parler autrement. Je suis désolé. »

Reconnaître son erreur ne retire pas son autorité au parent. Au contraire, cela montre à l’enfant qu’une relation peut traverser un moment difficile, se réparer et recommencer.

## La colère n’a pas besoin de disparaître

L’objectif n’est pas d’avoir un enfant qui ne se met jamais en colère. C’est impossible, et ce n’est pas souhaitable.

L’objectif est de lui permettre de découvrir progressivement :

- « Je peux être très en colère sans être seul avec cette émotion. »
- « Mon émotion a le droit d’exister, mais elle ne m’autorise pas à faire n’importe quoi. »
- « Il existe des choses que je peux apprendre à faire pour traverser ce moment. »

Et parfois, accompagner une émotion, c’est simplement rester là, poser une limite et attendre que la tempête passe.

Pas pour empêcher la colère d’exister. Pour apprendre, petit à petit, à la traverser.`,
  },
  {
    slug: 'dix-activites-calmes-pour-les-fins-de-journee',
    title: 'Dix activités calmes pour les fins de journée',
    excerpt:
      'Entre le retour de l’école et le dîner, les enfants comme les parents peuvent avoir besoin de souffler. Dix idées simples, sans écran et avec très peu de préparation, pour retrouver un rythme plus calme.',
    category: 'Activités enfants',
    readingMinutes: 7,
    publishedAt: '2026-07-24',
    author: 'Sandrine',
    motif: 'palette',
    accent: 'sageLight',
    relatedProducts: ['pack-activites', 'pack-experiences-scientifiques'],
    image: {
      src: '/blog/cette-semaine-en-famille.jpg',
      alt: 'Une maman et ses deux garçons attablés dans le salon, devant le semainier « Cette semaine » affiché au mur',
      width: 1400,
      height: 933,
    },
    body: `Il y a ce fameux moment entre le retour de l’école et le dîner où la fatigue commence à se faire sentir.

L’enfant a passé sa journée à écouter, apprendre, attendre son tour, respecter des consignes, jouer avec les autres… Et une fois rentré à la maison, il peut avoir besoin de décompresser avant de repartir dans une nouvelle activité.

De notre côté, il reste pourtant encore beaucoup de choses à faire : les devoirs, le bain, le repas, les affaires du lendemain…

Dans ce moment-là, une activité n’a pas forcément besoin d’être longue, originale ou particulièrement créative. Elle peut simplement être calme, accessible et prévisible.

Voici dix idées à garder sous la main pour les fins de journée où tout le monde a besoin de ralentir.

## Dix activités calmes à proposer

**1. Trier.** Des Lego par couleur, des boutons, des petites voitures, des chaussettes à associer… Trier est une activité simple et répétitive qui demande peu d’imagination ou de consignes. L’enfant peut simplement manipuler, classer et recommencer.

**2. Découper.** Prenez un vieux magazine ou quelques feuilles de papier et laissez l’enfant découper des formes, des images ou des morceaux de papier. Pas besoin d’avoir un objectif précis. Parfois, faire quelque chose avec ses mains suffit.

**3. Écouter une histoire.** Une histoire audio, un livre lu par un adulte ou simplement quelques pages d’un album. On peut s’installer confortablement, diminuer un peu la lumière et laisser l’enfant écouter. Un petit sas entre le rythme de la journée et celui de la soirée.

**4. S’occuper des plantes.** Arroser les plantes, enlever quelques feuilles sèches, observer une nouvelle pousse… Une petite activité du quotidien qui permet de ralentir et de prendre soin de quelque chose.

**5. Dessiner librement.** Un grand morceau de papier posé sur la table ou même au sol, quelques crayons et aucune consigne particulière. Pas besoin de demander : « Qu’est-ce que tu dessines ? » On peut simplement laisser l’enfant créer, gribouiller, recommencer ou remplir la feuille.

**6. Modeler.** Pâte à modeler, pâte autodurcissante ou pâte maison : manipuler, écraser, rouler, découper… Le plaisir peut simplement venir du fait de toucher et transformer la matière. Pour les fins de journée, choisissez de préférence une installation simple, avec peu de matériel à sortir et à ranger.

**7. Regarder un album d’images.** Prenez un album sans texte ou un livre riche en illustrations. Regardez les images ensemble et inventez une histoire. Chacun peut ajouter une phrase à tour de rôle. Une activité toute simple qui permet aussi de partager un moment ensemble.

**8. Construire une cabane.** Deux chaises, une couverture et c’est parti. La cabane peut devenir un petit espace pour lire, jouer tranquillement ou simplement s’installer quelques minutes. Et une fois construite, elle peut même rester en place le temps de la soirée.

**9. Faire des gommettes.** Un coloriage, une feuille blanche ou simplement quelques gommettes à coller. L’enfant peut créer librement, remplir une forme ou inventer son propre dessin. Une activité facile à sortir lorsque l’on cherche quelque chose de calme et sans grande préparation.

**10. Prendre soin de soi.** Masser doucement les mains avec une petite noisette de crème, se brosser les cheveux, mettre de la crème sur les mains… Ces petits gestes peuvent devenir un moment de retour au calme. Et parfois, l’enfant n’a même pas besoin d’une activité : il a simplement besoin d’un peu de proximité et de temps pour redescendre.

## Le petit bocal

Si vous avez du mal à trouver une idée au moment où vous en avez besoin, préparez un petit bocal à activités. Écrivez chaque idée sur une carte et glissez-les dans le bocal.

Lorsque l’enfant ne sait pas quoi faire ou que vous n’avez pas envie de chercher une activité, il peut tirer une carte.

L’intérêt n’est pas seulement de vous éviter de chercher une idée à 17 h 30. Le tirage offre aussi à l’enfant un choix dans un cadre simple : il sait qu’une activité calme va lui être proposée, sans avoir à décider parmi vingt possibilités.

## Faut-il toujours proposer une activité ?

Non. C’est peut-être même le plus important.

Après une journée bien remplie, certains enfants ont envie de jouer seuls. D’autres ont besoin de bouger encore un peu. D’autres recherchent davantage de proximité avec leur parent.

Il n’est donc pas nécessaire de remplir chaque minute entre le retour de l’école et le dîner. Un temps calme peut aussi être un temps sans activité.

On peut laisser l’enfant jouer librement, regarder un livre, s’allonger quelques minutes ou simplement être avec nous pendant que nous préparons le repas.

L’objectif n’est pas de trouver l’activité parfaite. C’est de proposer un environnement qui permet progressivement de passer du rythme de la journée à celui de la soirée.

## Ce qui peut être plus difficile en fin de journée

Certaines activités sont particulièrement adaptées au week-end ou aux moments où l’enfant dispose de plus de disponibilité. En fin de journée, on peut éviter autant que possible les activités :

- très longues à installer ;
- qui demandent beaucoup de concentration ;
- qui nécessitent beaucoup de matériel ;
- qui créent beaucoup de stimulation ;
- ou qu’il faudra interrompre brutalement quelques minutes plus tard pour passer à table.

Cela ne signifie pas qu’elles sont « mauvaises ». Simplement, le bon moment compte aussi. Une activité passionnante peut devenir source de frustration si l’enfant doit l’arrêter juste au moment où il commence à y entrer.

## Et si l’enfant a surtout besoin de décompresser ?

Parfois, la meilleure proposition est très simple : « Tu veux être tranquille un moment ou tu veux qu’on fasse quelque chose ensemble ? »

Cette petite question permet à l’enfant de commencer à identifier son propre besoin. Avec le temps, il pourra progressivement apprendre à reconnaître :

- « J’ai besoin de bouger. »
- « J’ai besoin d’être seul. »
- « J’ai envie d’une histoire. »
- « J’ai besoin d’être avec maman ou papa. »

C’est aussi une façon de développer son autonomie : apprendre à repérer ce qui nous fait du bien et à choisir une activité adaptée à notre état du moment.

## Pas besoin d’occuper chaque minute

Les fins de journée n’ont pas besoin d’être parfaitement organisées. Quelques crayons, une histoire, une cabane, un moment avec les plantes… ou parfois rien de particulier.

L’essentiel est de permettre à l’enfant de ralentir progressivement, de retrouver ses repères et de passer de la journée à l’école au temps en famille.

Et parfois, l’activité la plus utile de la fin de journée, c’est simplement : « Viens, on se pose cinq minutes. »`,
  },
  {
    slug: 'cuisiner-avec-un-enfant-sans-y-passer-la-soiree',
    title: 'Cuisiner avec un enfant sans y passer la soirée',
    excerpt:
      'Comment répartir les gestes, ce qu’on peut progressivement lui laisser faire, et pourquoi une recette illustrée peut être plus accessible qu’une recette écrite.',
    category: 'Recettes en famille',
    readingMinutes: 6,
    publishedAt: '2026-07-10',
    author: 'Sandrine',
    motif: 'chef',
    accent: 'peach',
    relatedProducts: ['pack-recettes'],
    image: {
      src: '/blog/cuisiner-en-famille.jpg',
      alt: 'Un papa et ses deux enfants préparent une pâte à gâteau, la fiche recette illustrée posée sur le plan de travail',
      width: 1400,
      height: 933,
    },
    body: `Cuisiner avec un enfant, c’est souvent présenté comme un joli moment de complicité.

Dans la vraie vie, c’est aussi parfois trois fois plus long, deux fois plus salissant… et ça finit rarement bien quand on commence à 19 h 15 un jeudi soir.

Le problème n’est pas forcément l’enfant. C’est souvent le moment choisi, la quantité de choses à faire et la façon dont on répartit les tâches.

L’objectif n’est donc pas de faire cuisiner l’enfant « comme un grand », mais de lui permettre de participer à son niveau, avec des gestes qu’il peut réellement prendre en charge.

## Ce qu’un enfant peut progressivement faire

Il n’existe pas une liste de compétences valable au mois près. Chaque enfant avance à son rythme, et certaines tâches dépendent aussi de son expérience et de sa capacité à respecter les consignes de sécurité.

Mais on peut progressivement proposer :

- **vers 2-3 ans** : verser un ingrédient déjà préparé, mélanger, écraser à la fourchette, utiliser un emporte-pièce ;
- **vers 3-5 ans** : casser un œuf avec l’aide de l’adulte, étaler, badigeonner, éplucher certains aliments faciles comme une banane, compter les cuillères ;
- **vers 5-7 ans** : mesurer avec un verre ou des cuillères, réaliser certaines découpes simples avec un ustensile adapté et sous surveillance, râper avec l’aide d’un adulte, suivre une fiche illustrée ;
- **vers 7-10 ans** : lire une recette, organiser plusieurs étapes, préparer une recette simple avec une autonomie qui reste adaptée à l’enfant, toujours avec un adulte pour les appareils et les gestes présentant un risque.

Et surtout : ce n’est pas parce qu’un enfant « peut » faire quelque chose qu’il doit forcément le faire seul. En cuisine, l’autonomie se construit progressivement, avec la présence de l’adulte lorsque c’est nécessaire.

## Pourquoi les pictogrammes peuvent changer la recette

Une recette écrite demande de savoir lire, de comprendre les consignes, de garder en tête l’étape précédente et de savoir ce qui vient ensuite. Pour un jeune enfant, cela fait beaucoup.

Une fiche illustrée permet au contraire de rendre la succession des étapes visible. Une image, une action. Puis la suivante.

L’enfant peut regarder sa fiche, réaliser l’étape, revenir voir ce qui vient après… sans avoir besoin de demander toutes les trente secondes : « Et maintenant, je fais quoi ? »

C’est le même principe qu’une routine affichée : quand les étapes sont visibles, l’adulte n’a pas besoin de tout répéter.

Pour les quantités, on peut aussi privilégier des repères simples lorsque la recette le permet : une cuillère, un verre, un nombre d’unités… Une balance et des grammes ne sont pas toujours nécessaires pour permettre à un enfant de participer.

## Trois petits repères qui changent l’ambiance

**Une seule recette à la fois.** Pas besoin de transformer la cuisine en atelier pédagogique de deux heures. Une recette simple, quelques étapes et un objectif réaliste suffisent largement. L’enfant participe, puis on s’arrête.

**Le rangement fait partie de l’activité.** On peut annoncer dès le départ : « Quand on a terminé, on range ensemble. » Cela permet à l’enfant de savoir que l’activité comprend aussi cette dernière étape. Et accessoirement, cela évite au parent de découvrir la cuisine après coup et de se demander qui a bien pu faire ça.

**Le résultat n’a pas besoin d’être parfait.** Des sablés un peu trop cuits que l’enfant a réellement préparés valent parfois bien plus qu’un gâteau parfait réalisé presque entièrement par l’adulte. Parce que l’objectif n’est pas uniquement de réussir la recette. C’est aussi de faire, essayer, se tromper, recommencer et constater : « Je l’ai fait. »

## Le bon créneau compte aussi

Le meilleur moment pour cuisiner avec un enfant n’est pas forcément celui où vous avez besoin de manger rapidement. Un mercredi après-midi, un samedi matin ou un dimanche pluvieux peuvent être beaucoup plus propices qu’un soir où tout le monde est fatigué.

Et si aujourd’hui, il n’y a vraiment pas le temps ? Les pâtes restent une très bonne solution.

Cuisiner ensemble n’est pas une obligation quotidienne. Ce qui compte, c’est de créer régulièrement des occasions où l’enfant peut participer à la vie familiale, dans un cadre suffisamment calme pour qu’il puisse réellement en profiter.

## Et si on veut aller un peu plus loin ?

Une fiche recette pensée pour l’enfant peut justement servir de repère entre l’envie de participer et la réalisation concrète de la recette. Les étapes sont visibles, les quantités peuvent être adaptées, et l’enfant peut progressivement prendre en charge davantage de gestes.

L’idée n’est pas de lui donner toute la responsabilité d’un coup. C’est de lui permettre de passer, petit à petit, de « je regarde » à « je fais avec toi », puis « je fais une partie seul », et enfin « je sais comment m’y prendre ».

Parce qu’en cuisine comme ailleurs, l’autonomie ne consiste pas à laisser l’enfant se débrouiller seul. Elle consiste à lui donner suffisamment de repères pour qu’il puisse progressivement faire par lui-même.`,
  },
  {
    slug: 'autonomie-ce-qu-on-peut-vraiment-demander-selon-l-age',
    title: 'Autonomie : ce qu’on peut vraiment demander selon l’âge',
    excerpt:
      'Trop tôt, cela peut créer de la frustration. Trop tard, cela peut laisser l’adulte faire à la place de l’enfant. Quelques repères pour accompagner l’autonomie sans transformer le quotidien en évaluation permanente.',
    category: 'Parentalité',
    readingMinutes: 8,
    publishedAt: '2026-06-19',
    author: 'Sandrine',
    motif: 'star',
    accent: 'gold',
    relatedProducts: ['pack-routines'],
    image: {
      src: '/blog/bien-grandir-a-son-rythme.jpg',
      alt: 'Une affiche « Bien grandir, à son rythme » accrochée dans une chambre d’enfant, au-dessus d’un tabouret avec un sac à dos et des vêtements pliés',
      width: 1400,
      height: 933,
    },
    body: `« Il devrait déjà savoir faire ça. »

Cette petite phrase, on peut facilement se la dire.

Quand l’enfant ne s’habille pas assez vite. Quand il faut encore rappeler de mettre les chaussures. Quand le cartable est toujours posé au milieu du salon. Ou quand, finalement, on fait à sa place parce que c’est plus simple.

Mais l’autonomie ne se construit pas en cochant une liste de compétences à un âge précis. Elle se construit progressivement, à travers les expériences, les habitudes, les occasions de participer et les repères que l’on donne à l’enfant.

Voici donc des points de repère, pas une grille d’évaluation.

Un enfant peut être très autonome sur certaines choses et avoir encore besoin d’aide sur d’autres. Et c’est parfaitement normal.

## 2-3 ans : « Je veux faire tout seul ! »

À cet âge, l’enfant a souvent très envie de participer, même si ses gestes restent encore maladroits.

Il peut progressivement :

- mettre ou retirer certains vêtements simples ;
- essayer de mettre ses chaussures ;
- porter son assiette jusqu’à la table ;
- jeter quelque chose à la poubelle ;
- ranger quelques jouets dans un bac ;
- participer au rangement ou à de petites tâches du quotidien.

L’objectif n’est pas que tout soit parfaitement réalisé. C’est surtout de lui permettre de faire avec ses mains et de prendre une petite part à la vie quotidienne.

Et oui, les chaussures peuvent parfois être aux mauvais pieds. Ce n’est pas grave.

## 3-5 ans : commencer à enchaîner

L’enfant peut progressivement prendre en charge davantage de petites étapes :

- s’habiller avec des vêtements préparés ;
- se laver les mains seul ;
- mettre quelques éléments sur la table ;
- arroser une plante ;
- ranger ses affaires avec un emplacement défini ;
- suivre une petite routine illustrée.

C’est aussi une période où les supports visuels peuvent être particulièrement utiles. Une suite d’images permet de voir : « Je fais ça → puis ça → puis ça. »

L’enfant n’a donc pas besoin de retenir toute la séquence uniquement grâce aux consignes de l’adulte.

## 5-7 ans : participer davantage à l’organisation

L’enfant peut progressivement prendre en charge des séquences plus longues :

- préparer une partie de son cartable avec une liste ;
- choisir ses vêtements parmi plusieurs possibilités ;
- débarrasser son assiette ;
- préparer un petit goûter simple ;
- participer à la préparation d’une recette ;
- ranger ses affaires avec des repères précis ;
- utiliser un semainier ou un planning pour savoir ce qui est prévu.

Mais « savoir faire » ne signifie pas forcément penser à le faire tout seul, à chaque fois. C’est une nuance importante.

Un enfant peut parfaitement savoir préparer son cartable et avoir encore besoin d’un rappel certains jours.

L’autonomie, ce n’est pas seulement la capacité à réaliser une tâche. C’est aussi apprendre progressivement à penser à la tâche, l’anticiper et s’organiser.

## 7-10 ans : aller vers davantage de responsabilités

À mesure que l’enfant grandit, on peut progressivement lui confier des responsabilités plus importantes, toujours adaptées à ses capacités et au contexte familial.

Par exemple :

- gérer davantage les étapes de sa routine du soir ;
- préparer certaines affaires pour le lendemain ;
- participer à la préparation d’un repas ou d’un goûter ;
- organiser ses affaires de sport ;
- ranger sa chambre avec des critères définis ensemble ;
- consulter un planning hebdomadaire ;
- commencer à repérer ce qu’il doit anticiper.

On passe peu à peu de « Fais ça. » à « Qu’est-ce que tu dois prévoir pour demain ? »

L’adulte reste présent, mais il cherche progressivement à laisser davantage de place à l’enfant pour réfléchir et agir.

## Et si mon enfant n’y arrive pas encore ?

Avant de conclure qu’il « ne veut pas », on peut se demander :

- la tâche est-elle vraiment à sa portée ?
- est-ce qu’il sait exactement ce qu’on attend de lui ?
- a-t-il les bons repères pour y arriver ?

Parfois, le problème n’est pas la capacité de l’enfant. C’est simplement que la consigne est trop large.

« Range ta chambre » peut sembler évident pour un adulte. Pour un enfant, cela peut vouloir dire : je commence par quoi ? Je range où ? Est-ce que les livres comptent ? Et les vêtements ? Et les Lego ?

Découper une tâche, montrer où vont les choses ou utiliser une liste illustrée peut alors faire une vraie différence.

## Les trois erreurs qui compliquent souvent l’autonomie

**Faire à sa place parce que c’est plus rapide.** Oui, refaire le lit prend parfois trente secondes. Mais si l’enfant n’a jamais l’occasion de le faire, il ne peut pas apprendre. Il vaut parfois mieux accepter un résultat imparfait mais réalisé par l’enfant qu’un résultat impeccable obtenu systématiquement par l’adulte.

**Tout demander en même temps.** « Maintenant tu ranges ta chambre, tu prépares ton cartable, tu mets ton pyjama et tu viens te laver les dents. » Pour nous, la liste paraît simple. Pour un enfant, cela peut rapidement devenir une montagne. Mieux vaut introduire progressivement les responsabilités et stabiliser une habitude avant d’en ajouter une autre.

**Transformer chaque tâche en récompense.** Toutes les participations à la vie familiale n’ont pas besoin d’être récompensées. Mettre son assiette sur la table, ranger ses affaires ou participer à une tâche familiale peut simplement faire partie de la vie quotidienne : « Dans cette famille, chacun participe selon ses possibilités. » Cela n’empêche évidemment pas de valoriser les efforts, de remercier ou de souligner les progrès.

## Le vrai indicateur de l’autonomie ?

Ce n’est pas forcément un lit parfaitement fait. Ni une chambre impeccable. Ni un enfant qui ne demande plus jamais d’aide.

C’est plutôt de voir apparaître progressivement cette petite capacité à se dire : « Je sais ce que j’ai à faire. » Puis : « Je sais comment m’y prendre. » Et, petit à petit : « Je peux le faire tout seul. »

L’autonomie ne consiste donc pas à retirer l’aide de l’adulte le plus vite possible. Elle consiste à donner progressivement à l’enfant les repères, les outils et les occasions dont il a besoin pour pouvoir s’en passer un peu plus.

Et le lit de travers ? Il finira probablement par s’améliorer. Ou pas. Mais au moins, ce sera son lit.`,
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
