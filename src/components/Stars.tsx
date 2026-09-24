import { StarFilledIcon, StarIcon } from './icons';

/**
 * Note en étoiles, en lecture seule.
 *
 * Le nombre est repris en toutes lettres pour les lecteurs d'écran : cinq
 * icônes côte à côte ne veulent rien dire à l'oreille.
 */
export function Stars({
  value,
  size = 16,
  className = '',
}: {
  value: number
  size?: number
  className?: string
}) {
  const pleines = Math.round(value);

  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`}>
      {[1, 2, 3, 4, 5].map((n) =>
        n <= pleines ? (
          <StarFilledIcon key={n} size={size} />
        ) : (
          <StarIcon key={n} size={size} className="text-gold/35" />
        ),
      )}
      <span className="sr-only">{value} sur 5</span>
    </span>
  );
}
