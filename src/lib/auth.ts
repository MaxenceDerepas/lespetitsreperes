import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { signingSecret } from './secret';

/**
 * Authentification de l'espace client.
 *
 * Implémentation volontairement minimale et sans dépendance : un cookie
 * httpOnly signé (HMAC-SHA256) contenant l'email du client et une date
 * d'expiration. C'est suffisant pour une boutique de produits numériques où
 * l'« identité » utile est l'adresse email de la commande.
 *
 * ---------------------------------------------------------------------------
 *  POUR ALLER PLUS LOIN
 *  Remplacer par Auth.js (next-auth) ou Supabase Auth ne demande que de
 *  réécrire `getSessionEmail()` : tout le reste du site passe par cette
 *  fonction et par elle seule.
 * ---------------------------------------------------------------------------
 */

const COOKIE_NAME = 'lpr_session';

const SESSION_DAYS = 30;

const ADMIN_COOKIE = 'lpr_admin';

function sign(value: string): string {
  return crypto.createHmac('sha256', signingSecret()).update(value).digest('base64url');
}

export function createSessionValue(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      email: email.trim().toLowerCase(),
      expiresAt: Date.now() + SESSION_DAYS * 86400 * 1000,
    }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readSessionValue(value: string): string | null {
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!parsed?.email || Date.now() > parsed.expiresAt) return null;
    return parsed.email as string;
  } catch {
    return null;
  }
}

/** Email du client connecté, ou null. */
export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  return readSessionValue(cookie.value);
}

export const sessionCookieName = COOKIE_NAME;
export const sessionMaxAge = SESSION_DAYS * 86400;

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DAYS * 86400,
};

/* ------------------------- Lien de connexion ------------------------- */

const LOGIN_TTL_MINUTES = 20;

/** Jeton à usage unique dans le temps, envoyé par email pour se connecter. */
export function createLoginToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      email: email.trim().toLowerCase(),
      expiresAt: Date.now() + LOGIN_TTL_MINUTES * 60 * 1000,
      purpose: 'login',
    }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyLoginToken(token: string): string | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (parsed?.purpose !== 'login') return null;
    if (Date.now() > parsed.expiresAt) return null;
    return parsed.email as string;
  } catch {
    return null;
  }
}

export const loginTtlMinutes = LOGIN_TTL_MINUTES;

/* --------------------------- Administration --------------------------- */

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function createAdminValue(): string {
  const payload = Buffer.from(
    JSON.stringify({ role: 'admin', expiresAt: Date.now() + 12 * 3600 * 1000 }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE);
  if (!cookie?.value) return false;

  const [payload, signature] = cookie.value.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return parsed?.role === 'admin' && Date.now() < parsed.expiresAt;
  } catch {
    return false;
  }
}

export const adminCookieName = ADMIN_COOKIE;
