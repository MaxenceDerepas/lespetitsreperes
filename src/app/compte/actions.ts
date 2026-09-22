'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  adminCookieName,
  cookieOptions,
  createAdminValue,
  createLoginToken,
  createSessionValue,
  loginTtlMinutes,
  sessionCookieName,
  verifyLoginToken,
} from '@/lib/auth';
import {
  accountExists,
  attemptWindowMinutes,
  checkCredentials,
  clearAttempts,
  createAccount,
  getAccount,
  passwordProblem,
  registerFailedAttempt,
  tooManyAttempts,
  updatePassword,
  verifyPassword,
} from '@/lib/accounts';
import { getSessionEmail } from '@/lib/auth';
import { isEmailConfigured, sendLoginEmail } from '@/lib/email';
import { site } from '@/lib/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface FormState {
  status: 'idle' | 'error' | 'sent' | 'done'
  message?: string
}

/* --------------------------------- Connexion -------------------------------- */

/**
 * Connexion à l'espace client : adresse email + mot de passe.
 *
 * Le message d'erreur est volontairement le même que le compte n'existe pas ou
 * que le mot de passe soit faux : sinon, le formulaire permettrait de savoir
 * qui est client de la boutique simplement en essayant des adresses.
 */
export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!emailPattern.test(email) || !password) {
    return { status: 'error', message: 'Merci d’indiquer votre adresse email et votre mot de passe.' };
  }

  if (tooManyAttempts(email)) {
    return {
      status: 'error',
      message: `Trop de tentatives. Patientez ${attemptWindowMinutes} minutes, ou utilisez « mot de passe oublié ».`,
    };
  }

  const account = checkCredentials(email, password);
  if (!account) {
    registerFailedAttempt(email);
    return { status: 'error', message: 'Adresse email ou mot de passe incorrect.' };
  }

  clearAttempts(email);
  const store = await cookies();
  store.set(sessionCookieName, createSessionValue(account.email), cookieOptions);
  redirect('/compte');
}

/* -------------------------------- Inscription ------------------------------- */

export async function register(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const confirmation = String(formData.get('confirmation') ?? '');
  const firstName = String(formData.get('firstName') ?? '');

  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Merci d’indiquer une adresse email valide.' };
  }

  const probleme = passwordProblem(password);
  if (probleme) return { status: 'error', message: probleme };

  if (password !== confirmation) {
    return { status: 'error', message: 'Les deux mots de passe ne sont pas identiques.' };
  }

  if (accountExists(email)) {
    return {
      status: 'error',
      message: 'Un compte existe déjà avec cette adresse. Connectez-vous, ou utilisez « mot de passe oublié ».',
    };
  }

  const account = createAccount(email, password, firstName);
  if (!account) {
    return { status: 'error', message: 'La création du compte a échoué. Réessayez dans un instant.' };
  }

  const store = await cookies();
  store.set(sessionCookieName, createSessionValue(account.email), cookieOptions);
  redirect('/compte');
}

/* ----------------------------- Mot de passe oublié --------------------------- */

/**
 * Envoie un lien de réinitialisation, valable vingt minutes.
 *
 * La réponse est la même que l'adresse soit connue ou non : c'est ce qui
 * empêche de se servir de ce formulaire pour deviner qui a un compte.
 */
export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Merci d’indiquer une adresse email valide.' };
  }

  const reponse: FormState = {
    status: 'sent',
    message: `Si un compte existe pour ${email}, un lien de réinitialisation vient de partir. Il est valable ${loginTtlMinutes} minutes.`,
  };

  if (!getAccount(email)) return reponse;

  if (!isEmailConfigured()) {
    return {
      status: 'error',
      message:
        'L’envoi d’emails n’est pas encore configuré : la réinitialisation par email ne peut pas fonctionner. Renseignez EMAIL_API_KEY dans .env.local.',
    };
  }

  const token = createLoginToken(email);
  await sendLoginEmail(email, `${site.url}/connexion/verifier?token=${token}`);
  return reponse;
}

/** Ouvre la session depuis le lien reçu par email. */
export async function completeLogin(token: string): Promise<boolean> {
  const email = verifyLoginToken(token);
  if (!email) return false;

  const store = await cookies();
  store.set(sessionCookieName, createSessionValue(email), cookieOptions);
  return true;
}

/* --------------------------- Changement de mot de passe ---------------------- */

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const actuel = String(formData.get('current') ?? '');
  const nouveau = String(formData.get('password') ?? '');
  const confirmation = String(formData.get('confirmation') ?? '');

  const account = getAccount(email);
  if (!account) {
    return {
      status: 'error',
      message: 'Aucun mot de passe n’est encore défini pour cette adresse. Créez votre compte pour en choisir un.',
    };
  }

  // On redemande le mot de passe actuel : sans cela, quelqu'un qui passerait
  // devant un ordinateur resté ouvert pourrait s'approprier le compte.
  if (!verifyPassword(actuel, account.passwordHash)) {
    return { status: 'error', message: 'Le mot de passe actuel est incorrect.' };
  }

  const probleme = passwordProblem(nouveau);
  if (probleme) return { status: 'error', message: probleme };

  if (nouveau !== confirmation) {
    return { status: 'error', message: 'Les deux mots de passe ne sont pas identiques.' };
  }

  updatePassword(email, nouveau);
  return { status: 'done', message: 'Votre mot de passe a bien été modifié.' };
}

/** Choix d'un mot de passe après une connexion par lien email. */
export async function definePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const nouveau = String(formData.get('password') ?? '');
  const confirmation = String(formData.get('confirmation') ?? '');

  const probleme = passwordProblem(nouveau);
  if (probleme) return { status: 'error', message: probleme };

  if (nouveau !== confirmation) {
    return { status: 'error', message: 'Les deux mots de passe ne sont pas identiques.' };
  }

  if (getAccount(email)) {
    updatePassword(email, nouveau);
  } else {
    createAccount(email, nouveau);
  }
  return { status: 'done', message: 'Votre mot de passe a bien été enregistré.' };
}

export async function logout() {
  const store = await cookies();
  store.delete(sessionCookieName);
  redirect('/connexion');
}

/* ----------------------------- Administration ---------------------------- */

export interface AdminState {
  status: 'idle' | 'error'
  message?: string
}

export async function adminLogin(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const password = String(formData.get('password') ?? '');

  if (!process.env.ADMIN_PASSWORD) {
    return {
      status: 'error',
      message: 'Aucun mot de passe d’administration n’est configuré. Renseignez ADMIN_PASSWORD dans .env.local.',
    };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { status: 'error', message: 'Mot de passe incorrect.' };
  }

  const store = await cookies();
  store.set(adminCookieName, createAdminValue(), { ...cookieOptions, maxAge: 12 * 3600 });
  redirect('/admin');
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(adminCookieName);
  redirect('/admin');
}
