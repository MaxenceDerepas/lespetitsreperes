import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Comptes clients : adresse email + mot de passe.
 *
 * ---------------------------------------------------------------------------
 *  LE MOT DE PASSE N'EST JAMAIS STOCKÉ
 *  Seule une empreinte scrypt est conservée, avec un sel aléatoire propre à
 *  chaque compte. scrypt est volontairement lent et gourmand en mémoire : même
 *  si le fichier des comptes fuitait, essayer les mots de passe un par un
 *  coûterait des années de calcul. La comparaison se fait en temps constant,
 *  pour ne pas laisser deviner l'empreinte par la durée de la réponse.
 *
 *  Rien d'autre n'est enregistré : ni le mot de passe en clair, ni une version
 *  chiffrée réversible, ni la moindre donnée bancaire (celles-ci ne transitent
 *  que par Stripe).
 * ---------------------------------------------------------------------------
 *
 *  PASSAGE EN PRODUCTION
 *  Même principe que les commandes : un fichier JSON dans ./.data/ suffit pour
 *  démarrer. Avec DATABASE_URL, remplacer le corps des fonctions ci-dessous
 *  par des requêtes SQL sur :
 *
 *    accounts(email PRIMARY KEY, password_hash, first_name, created_at,
 *             updated_at)
 * ---------------------------------------------------------------------------
 */

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'accounts.json');

/** Paramètres scrypt : ~100 ms par calcul sur un serveur modeste. */
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

export const passwordMinLength = 8;

export interface Account {
  email: string;
  /** Empreinte scrypt : `scrypt$N$r$p$sel$empreinte` — jamais le mot de passe. */
  passwordHash: string;
  firstName?: string;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------ Persistance ------------------------------ */

function readAll(): Account[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? (parsed as Account[]) : [];
  } catch {
    return [];
  }
}

function writeAll(accounts: Account[]): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    // Le fichier ne doit être lisible que par le compte qui fait tourner le
    // site : il contient les empreintes de mots de passe.
    fs.writeFileSync(DATA_FILE, JSON.stringify(accounts, null, 2), { encoding: 'utf8', mode: 0o600 });
  } catch (error) {
    console.error('[comptes] Écriture impossible :', error);
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/* ------------------------------ Mots de passe ----------------------------- */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password.normalize('NFKC'), salt, SCRYPT.keylen, SCRYPT);
  return [
    'scrypt',
    SCRYPT.N,
    SCRYPT.r,
    SCRYPT.p,
    salt.toString('base64url'),
    derived.toString('base64url'),
  ].join('$');
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [schema, n, r, p, salt, expected] = stored.split('$');
    if (schema !== 'scrypt') return false;

    const derived = crypto.scryptSync(password.normalize('NFKC'), Buffer.from(salt, 'base64url'), SCRYPT.keylen, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    const a = Buffer.from(expected, 'base64url');
    return a.length === derived.length && crypto.timingSafeEqual(a, derived);
  } catch {
    return false;
  }
}

/**
 * Règles de mot de passe : une longueur minimale, et rien d'autre.
 *
 * Les exigences du type « une majuscule, un chiffre, un caractère spécial »
 * poussent surtout à écrire « Motdepasse1! » sur un post-it. Une phrase longue
 * protège mieux — c'est aussi la recommandation de l'ANSSI et du NIST.
 */
export function passwordProblem(password: string): string | null {
  if (password.length < passwordMinLength) {
    return `Le mot de passe doit faire au moins ${passwordMinLength} caractères.`;
  }
  if (password.length > 200) {
    return 'Le mot de passe est trop long (200 caractères maximum).';
  }
  return null;
}

/* -------------------------------- Comptes -------------------------------- */

export function getAccount(email: string): Account | undefined {
  const cible = normalizeEmail(email);
  return readAll().find((account) => account.email === cible);
}

export function accountExists(email: string): boolean {
  return Boolean(getAccount(email));
}

export function createAccount(email: string, password: string, firstName?: string): Account | null {
  const accounts = readAll();
  const cible = normalizeEmail(email);
  if (accounts.some((account) => account.email === cible)) return null;

  const now = new Date().toISOString();
  const account: Account = {
    email: cible,
    passwordHash: hashPassword(password),
    ...(firstName?.trim() ? { firstName: firstName.trim() } : {}),
    createdAt: now,
    updatedAt: now,
  };
  accounts.push(account);
  writeAll(accounts);
  return account;
}

/** Vérifie un couple email / mot de passe. */
export function checkCredentials(email: string, password: string): Account | null {
  const account = getAccount(email);
  if (!account) {
    // Compte inexistant : on calcule quand même une empreinte, pour que la
    // réponse mette le même temps qu'avec un compte existant. Sans cela, la
    // durée de la réponse révélerait quelles adresses sont inscrites.
    hashPassword(password);
    return null;
  }
  return verifyPassword(password, account.passwordHash) ? account : null;
}

export function updatePassword(email: string, password: string): boolean {
  const accounts = readAll();
  const index = accounts.findIndex((account) => account.email === normalizeEmail(email));
  if (index === -1) return false;

  accounts[index] = {
    ...accounts[index],
    passwordHash: hashPassword(password),
    updatedAt: new Date().toISOString(),
  };
  writeAll(accounts);
  return true;
}

/* ---------------------------- Anti-force brute ---------------------------- */

/**
 * Compteur d'échecs en mémoire : au-delà de MAX_ATTEMPTS échecs sur une même
 * adresse en WINDOW_MINUTES, on refuse d'examiner le mot de passe.
 *
 * En mémoire donc remis à zéro au redémarrage, et propre à chaque instance —
 * c'est un ralentisseur, pas un verrou. Avec plusieurs serveurs, déplacer ce
 * compteur dans Redis ou dans la base.
 */
const MAX_ATTEMPTS = 8;
const WINDOW_MINUTES = 15;
const attempts = new Map<string, { count: number; firstAt: number }>();

export function tooManyAttempts(email: string): boolean {
  const entry = attempts.get(normalizeEmail(email));
  if (!entry) return false;
  if (Date.now() - entry.firstAt > WINDOW_MINUTES * 60 * 1000) {
    attempts.delete(normalizeEmail(email));
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function registerFailedAttempt(email: string): void {
  const cible = normalizeEmail(email);
  const entry = attempts.get(cible);
  if (!entry || Date.now() - entry.firstAt > WINDOW_MINUTES * 60 * 1000) {
    attempts.set(cible, { count: 1, firstAt: Date.now() });
    return;
  }
  entry.count += 1;
}

export function clearAttempts(email: string): void {
  attempts.delete(normalizeEmail(email));
}

export const attemptWindowMinutes = WINDOW_MINUTES;
