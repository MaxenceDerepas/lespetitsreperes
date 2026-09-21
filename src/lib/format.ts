/** Formatage des prix, dates et petits utilitaires partagés. */

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

/** 1290 → « 12,90 € » */
export function formatPrice(cents: number): string {
  return euro.format(cents / 100);
}

/** Pour les attributs de données structurées : 1290 → « 12.90 » */
export function priceForSchema(cents: number): string {
  return (cents / 100).toFixed(2);
}

const longDate = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDate = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const dateTime = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(iso: string): string {
  return longDate.format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTime.format(new Date(iso));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count > 1 ? (plural ?? `${singular}s`) : singular;
}

/** Remise en pourcentage entre un prix barré et un prix courant. */
export function discountPercent(priceCents: number, compareAtCents?: number): number | null {
  if (!compareAtCents || compareAtCents <= priceCents) return null;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
