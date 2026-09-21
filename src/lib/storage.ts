import fs from 'node:fs';
import path from 'node:path';

/**
 * Accès au stockage PRIVÉ des fichiers PDF.
 *
 * Règle absolue : les PDF ne sont jamais placés dans `public/`.
 * Ils vivent soit dans `private/files/` (développement), soit dans un bucket
 * privé (production). Dans les deux cas, ils ne sont servis que par
 * /api/download/[token], après vérification de la signature.
 */

const LOCAL_DIR = path.join(process.cwd(), 'private', 'files');

export function isRemoteStorageConfigured(): boolean {
  return Boolean(
    process.env.STORAGE_URL && process.env.STORAGE_BUCKET && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export interface StoredFile {
  body: Uint8Array
  contentType: string
  size: number
}

/** Lit un fichier depuis le stockage local privé. */
function readLocal(fileName: string): StoredFile | null {
  // Protection contre la traversée de répertoire (../../etc/passwd)
  const safeName = path.basename(fileName);
  const fullPath = path.join(LOCAL_DIR, safeName);
  if (!fullPath.startsWith(LOCAL_DIR)) return null;
  if (!fs.existsSync(fullPath)) return null;

  const body = fs.readFileSync(fullPath);
  return {
    body: new Uint8Array(body),
    contentType: 'application/pdf',
    size: body.byteLength,
  };
}

/**
 * Lit un fichier depuis un bucket privé Supabase Storage.
 * Utilise la clé de service, qui ne quitte jamais le serveur.
 */
async function readRemote(fileName: string): Promise<StoredFile | null> {
  const base = process.env.STORAGE_URL!.replace(/\/$/, '');
  const bucket = process.env.STORAGE_BUCKET!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = `${base}/storage/v1/object/${bucket}/${encodeURIComponent(path.basename(fileName))}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${key}`, apikey: key },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('[storage] Lecture distante impossible :', response.status, fileName);
    return null;
  }

  const buffer = new Uint8Array(await response.arrayBuffer());
  return { body: buffer, contentType: 'application/pdf', size: buffer.byteLength };
}

export async function getProductFile(fileName: string): Promise<StoredFile | null> {
  if (isRemoteStorageConfigured()) {
    const remote = await readRemote(fileName);
    if (remote) return remote;
  }
  return readLocal(fileName);
}

/** Vrai si le fichier existe réellement (utilisé par /admin pour signaler un oubli). */
export function localFileExists(fileName: string): boolean {
  return fs.existsSync(path.join(LOCAL_DIR, path.basename(fileName)));
}
