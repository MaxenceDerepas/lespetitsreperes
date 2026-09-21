import { StarFilledIcon } from './icons';

/** Étoiles de notation, accessibles (le texte est lu, pas les icônes). */
export function Rating({
  value,
  count,
  size = 14,
  showValue = false,
  className = '',
}: {
  value: number
  count?: number
  size?: number
  showValue?: boolean
  className?: string
}) {
  const rounded = Math.round(value);

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFilledIcon
            key={star}
            size={size}
            className={star <= rounded ? 'text-gold' : 'text-sand'}
          />
        ))}
      </span>
      <span className="sr-only">
        Note de {value.toString().replace('.', ',')} sur 5
        {count ? `, ${count} avis` : ''}
      </span>
      {showValue && (
        <span className="text-[0.8rem] font-semibold text-ink-soft" aria-hidden="true">
          {value.toString().replace('.', ',')}
          {count ? <span className="font-normal text-muted"> ({count})</span> : null}
        </span>
      )}
    </span>
  );
}
