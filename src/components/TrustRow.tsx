import {
  CheckIcon,
  DownloadIcon,
  FileIcon,
  HeartIcon,
  InfinityIcon,
  LockIcon,
  PrinterIcon,
} from './icons';

/**
 * Les quatre arguments affichés sous le hero : icône fine au-dessus, libellé
 * en gras, précision en dessous. Même disposition que la maquette, en quatre
 * colonnes sur grand écran et deux sur mobile.
 */
const heroArguments = [
  { Icon: FileIcon, title: 'PDF à imprimer', text: 'A4 ou A3' },
  { Icon: DownloadIcon, title: 'Téléchargement', text: 'immédiat' },
  { Icon: InfinityIcon, title: 'Utilisation', text: 'illimitée' },
  { Icon: HeartIcon, title: 'Créé avec amour', text: 'en France' },
];

export function HeroArguments({ variant = 'strip' }: { variant?: 'strip' | 'stack' }) {
  if (variant === 'stack') {
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
        {heroArguments.map(({ Icon, title, text }) => (
          <li key={title}>
            <Icon size={22} className="text-sage-dark" strokeWidth={1.3} />
            <p className="mt-2.5 text-[0.8rem] font-bold leading-snug text-ink">{title}</p>
            <p className="text-[0.78rem] leading-snug text-muted">{text}</p>
          </li>
        ))}
      </ul>
    );
  }

  // Bandeau fin pleine largeur : icône et texte sur une seule ligne,
  // les quatre arguments répartis régulièrement.
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {heroArguments.map(({ Icon, title, text }) => (
        <li key={title} className="flex items-center justify-center gap-3">
          <Icon size={20} className="shrink-0 text-sage-dark" strokeWidth={1.3} />
          <span className="leading-tight">
            <span className="block text-[0.8rem] font-bold text-ink">{title}</span>
            <span className="block text-[0.76rem] text-muted">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Bandeau de réassurance, repris sur la fiche produit et le checkout. */
export function TrustRow({ className = '' }: { className?: string }) {
  const points = [
    { Icon: DownloadIcon, label: 'Téléchargement immédiat' },
    { Icon: LockIcon, label: 'Paiement sécurisé' },
    { Icon: PrinterIcon, label: 'Imprimez à volonté' },
    { Icon: HeartIcon, label: 'Créé en France' },
  ];

  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}>
      {points.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-2 text-[0.82rem] font-medium text-sage-dark">
          <Icon size={16} className="text-sage-light" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Liste à cocher des caractéristiques d'un produit numérique. */
export function DigitalChecklist({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
          <CheckIcon size={17} className="mt-0.5 shrink-0 text-sage-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
