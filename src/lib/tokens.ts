import crypto from 'node:crypto';
import { signingSecret } from './secret';

/**
 * Liens de téléchargement sécurisés.
 *
 * Un token est une chaîne signée (HMAC-SHA256) contenant l'identifiant de
 * commande, l'identifiant du produit et une date d'expiration. Conséquences :
 *
 *  - impossible à deviner (signature de 256 bits dérivée d'un secret serveur) ;
 *  - impossible à modifier (changer l'expiration invalide la signature) ;
 *  - temporaire (expiration incluse dans la charge signée) ;
 *  - lié à une commande précise (aucun accès croisé entre clients) ;
 *  - jamais lié à l'URL réelle du fichier, qui n'est jamais exposée.
 *
 * Les PDF sont stockés hors du dossier `public/` : la seule façon d'y accéder
 * est /api/download/[token], qui vérifie la signature et le compteur.
 */

const TTL_HOURS = Number(process.env.DOWNLOAD_LINK_TTL_HOURS ?? 72);

export interface DownloadPayload {
  orderId: string
  productId: string
  /**
   * Rang du fichier dans la ligne de commande, pour les produits livrés en
   * plusieurs PDF. Absent (ou 0) pour un produit à fichier unique. Comme il
   * fait partie de la charge signée, on ne peut pas le modifier pour aller
   * chercher un autre fichier.
   */
  fileIndex?: number
  expiresAt: number
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function sign(payload: string): string {
  return base64url(crypto.createHmac('sha256', signingSecret()).update(payload).digest());
}

/** Crée un token de téléchargement valable TTL_HOURS heures. */
export function createDownloadToken(
  orderId: string,
  productId: string,
  fileIndex = 0,
  ttlHours: number = TTL_HOURS,
): string {
  const payload: DownloadPayload = {
    orderId,
    productId,
    fileIndex,
    expiresAt: Date.now() + ttlHours * 3600 * 1000,
  };
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export type VerifyResult =
  | { ok: true; payload: DownloadPayload }
  | { ok: false; reason: 'malformed' | 'invalid' | 'expired' };

/** Vérifie la signature puis l'expiration, en temps constant. */
export function verifyDownloadToken(token: string): VerifyResult {
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'malformed' };

  const [body, signature] = parts;
  const expected = sign(body);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: 'invalid' };
  }

  let payload: DownloadPayload;
  try {
    payload = JSON.parse(fromBase64url(body).toString('utf8'));
  } catch {
    return { ok: false, reason: 'malformed' };
  }

  if (!payload?.orderId || !payload?.productId) return { ok: false, reason: 'malformed' };
  if (Date.now() > payload.expiresAt) return { ok: false, reason: 'expired' };

  return { ok: true, payload };
}

/** URL absolue à placer dans les emails. */
export function downloadUrl(token: string, baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/api/download/${token}`;
}

export const downloadTtlHours = TTL_HOURS;
export const downloadMaxCount = Number(process.env.DOWNLOAD_MAX_COUNT ?? 10);

/** Référence de commande lisible : LPR-260917-4F2A */
export function generateOrderReference(date = new Date()): string {
  const y = String(date.getFullYear()).slice(2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `LPR-${y}${m}${d}-${rand}`;
}

export function generateOrderId(): string {
  return `ord_${crypto.randomBytes(9).toString('hex')}`;
}
