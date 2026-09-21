import { DownloadIcon, FamilyIcon, HeartIcon, PrinterIcon } from './icons';

/**
 * Les quatre promesses de la marque, dans leur encadré rose.
 *
 * Reprise exacte du bloc dessiné sur le bandeau fourni par la cliente :
 * quatre pastilles colorées séparées par un filet pointillé, sur un fond
 * blush arrondi. Composant à part pour pouvoir le poser où l'on veut sans le
 * redessiner — aujourd'hui sur le bandeau de la boutique.
 */

const PROMESSES = [
  { Icon: DownloadIcon, ligne1: 'Téléchargement', ligne2: 'immédiat', bg: 'bg-peach/55', ink: 'text-terracotta-deep' },
  { Icon: PrinterIcon, ligne1: 'Imprimez', ligne2: 'à volonté', bg: 'bg-sage-pale/60', ink: 'text-sage-deep' },
  { Icon: HeartIcon, ligne1: 'Créés avec amour', ligne2: 'et bienveillance', bg: 'bg-lilac-soft', ink: 'text-lilac-ink' },
  { Icon: FamilyIcon, ligne1: 'Pour petits', ligne2: 'et grands', bg: 'bg-mustard-soft/70', ink: 'text-mustard-ink' },
];

export function PromessesBand({ className = '' }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-2 gap-y-5 rounded-[2rem] bg-blush/70 px-4 py-5 sm:grid-cols-4 sm:gap-x-0 sm:px-3 sm:py-6 ${className}`}
    >
      {PROMESSES.map(({ Icon, ligne1, ligne2, bg, ink }, index) => (
        <li
          key={ligne1}
          className={`flex flex-col items-center gap-2.5 px-1 sm:px-2 ${
            index > 0 ? 'sm:border-l sm:border-dashed sm:border-ink/15' : ''
          }`}
        >
          <span className={`flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12 ${bg} ${ink}`}>
            <Icon size={23} />
          </span>
          <span className="whitespace-nowrap text-[0.6rem] font-semibold uppercase leading-[1.6] tracking-[0.07em] text-ink sm:text-[0.62rem] xl:text-[0.66rem] xl:tracking-[0.1em]">
            {ligne1}
            <br />
            {ligne2}
          </span>
        </li>
      ))}
    </ul>
  );
}
