'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  adminCookieName,
  cookieOptions,
  createAdminValue,
  createLoginToken,
  createSessionValue,
  sessionCookieName,
  verifyLoginToken,
} from '@/lib/auth';
import { isEmailConfigured, sendLoginEmail } from '@/lib/email';
import { site } from '@/lib/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface LoginState {
  status: 'idle' | 'sent' | 'error'
  message?: string
}

/**
 * Connexion à l'espace client par lien email (« lien magique »).
 *
 * Avec une clé email configurée, un lien signé valable 20 minutes est envoyé :
 * aucun mot de passe à créer ni à stocker, ce qui est à la fois plus simple
 * pour la cliente et plus sûr pour la boutique.
 *
 * Sans clé email (développement), la connexion est immédiate — c'est écrit
 * noir sur blanc dans l'interface.
 */
export async function requestLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Merci d’indiquer une adresse email valide.' };
  }

  if (!isEmailConfigured()) {
    const store = await cookies();
    store.set(sessionCookieName, createSessionValue(email), cookieOptions);
    redirect('/compte');
  }

  const token = createLoginToken(email);
  await sendLoginEmail(email, `${site.url}/connexion/verifier?token=${token}`);

  return {
    status: 'sent',
    message: `Un lien de connexion vient de partir vers ${email}. Il est valable 20 minutes.`,
  };
}

/** Ouvre la session depuis un lien reçu par email. */
export async function completeLogin(token: string): Promise<boolean> {
  const email = verifyLoginToken(token);
  if (!email) return false;

  const store = await cookies();
  store.set(sessionCookieName, createSessionValue(email), cookieOptions);
  return true;
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
