/**
 * Suite de tests de sécurité du téléchargement.
 * Vérifie qu'aucun chemin ne permet d'obtenir un PDF sans commande payée.
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// Serveur à tester : `npm run dev` dans un autre terminal, puis `node tests/securite.mjs`.
const B = process.env.TEST_URL ?? 'http://localhost:3000';
const PROJECT = process.cwd();

/** Les scripts lancés en sous-processus doivent signer avec le même secret. */
function loadEnv() {
  const out = {};
  for (const file of ['.env.local', '.env']) {
    const full = `${PROJECT}/${file}`;
    if (!fs.existsSync(full)) continue;
    for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !out[m[1]]) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? '  OK  ' : ' ÉCHEC'} ${name}${detail ? `  (${detail})` : ''}`);
};

const status = async (url, opts) => {
  const r = await fetch(B + url, { redirect: 'manual', ...opts });
  return { code: r.status, text: r.headers.get('content-type')?.includes('json') ? await r.json() : null, headers: r.headers };
};

console.log('\n════ 1. Les PDF ne sont pas accessibles en direct ════');
for (const p of [
  '/pack-routines.pdf',
  '/private/files/pack-routines.pdf',
  '/files/pack-routines.pdf',
  '/api/download/../../private/files/pack-routines.pdf',
]) {
  const { code } = await status(p);
  check(`GET ${p}`, code === 404 || code === 403, `${code}`);
}

console.log('\n════ 2. Tokens invalides ════');
const forged = Buffer.from(JSON.stringify({ orderId: 'x', productId: 'prd_routines', expiresAt: Date.now() + 1e9 }))
  .toString('base64url');
{
  const { code } = await status(`/api/download/${forged}.SIGNATUREBIDON`);
  check('token fabriqué à la main → refusé', code === 403, `${code}`);
}
{
  const { code } = await status('/api/download/nimportequoi');
  check('token malformé → refusé', code === 403, `${code}`);
}

console.log('\n════ 3. Parcours réel ════');
// Commande de démonstration : le mode démo enregistre la commande comme payée.
const order = await (
  await fetch(`${B}/api/checkout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'test-secu@example.com', items: [{ productId: 'prd_routines' }] }),
  })
).json();
check('commande créée', Boolean(order.orderId), order.orderId ?? JSON.stringify(order));

// Récupère un lien signé depuis la page de téléchargement de la commande.
const page = await (await fetch(`${B}/telechargements/${order.orderId}`)).text();
const token = page.match(/\/api\/download\/([A-Za-z0-9_.-]+)/)?.[1];
check('lien signé présent sur la page de la commande payée', Boolean(token));

{
  const r = await fetch(`${B}/api/download/${token}`);
  const buf = Buffer.from(await r.arrayBuffer());
  check('le PDF se télécharge avec un lien valide', r.status === 200 && buf.subarray(0, 4).toString() === '%PDF', `${r.status}, ${buf.length} o`);
  check(
    'en-têtes : pas de cache, pas d’indexation',
    /no-store/.test(r.headers.get('cache-control') ?? '') && /noindex/.test(r.headers.get('x-robots-tag') ?? ''),
  );
}

// Deuxième commande, réservée aux tests « non payée ».
const pendingOrder = await (
  await fetch(`${B}/api/checkout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'test-pending@example.com', items: [{ productId: 'prd_routines' }] }),
  })
).json();
const pendingToken = (await (await fetch(`${B}/telechargements/${pendingOrder.orderId}`)).text())
  .match(/\/api\/download\/([A-Za-z0-9_.-]+)/)?.[1];

console.log('\n════ 4. Altération du token ════');
{
  const [body, sig] = token.split('.');
  const flip = (s) => s.slice(0, -2) + (s.slice(-2) === 'aa' ? 'bb' : 'aa');
  check('signature modifiée → refusé', (await status(`/api/download/${body}.${flip(sig)}`)).code === 403);
  // On change le produit dans la charge utile : la signature ne correspond plus.
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
  const other = Buffer.from(JSON.stringify({ ...payload, productId: 'prd_emotions' })).toString('base64url');
  check('produit remplacé dans la charge → refusé', (await status(`/api/download/${other}.${sig}`)).code === 403);
  // On rallonge l'expiration.
  const longer = Buffer.from(JSON.stringify({ ...payload, expiresAt: Date.now() + 1e11 })).toString('base64url');
  check('expiration rallongée → refusé', (await status(`/api/download/${longer}.${sig}`)).code === 403);
}

console.log('\n════ 5. Commande inexistante, expirée, non payée ════');
{
  // Tokens signés par le serveur lui-même (via tsx), donc parfaitement valides
  // du point de vue de la signature : seule la commande manque.
  const [unknown, expired] = execSync(
    `npx tsx -e "import{createDownloadToken}from'./src/lib/tokens';` +
      `console.log(createDownloadToken('ord_inexistant000000','prd_routines'));` +
      `console.log(createDownloadToken('ord_inexistant000000','prd_routines',-1))"`,
    { cwd: PROJECT, encoding: 'utf8', env: { ...process.env, ...loadEnv() } },
  ).trim().split('\n');
  check('signature valide mais commande inexistante → 404', (await status(`/api/download/${unknown}`)).code === 404);
  check('token expiré → 410', (await status(`/api/download/${expired}`)).code === 410);

  // Commande réelle repassée en « pending » : c'est le cas d'un paiement non abouti.
  execSync(
    `npx tsx -e "import{markOrderStatus}from'./src/lib/orders';markOrderStatus('${pendingOrder.orderId}','pending')"`,
    { cwd: PROJECT, stdio: 'ignore', env: { ...process.env, ...loadEnv() } },
  );
  check('commande non payée → PDF refusé (402)', (await status(`/api/download/${pendingToken}`)).code === 402);

  const pendingPage = await (await fetch(`${B}/telechargements/${pendingOrder.orderId}`)).text();
  check('page d’une commande non payée : aucun lien de téléchargement', !/\/api\/download\//.test(pendingPage));

  const confirmPage = await (await fetch(`${B}/commande/confirmation?commande=${pendingOrder.orderId}`)).text();
  check('page de confirmation non payée : aucun lien non plus', !/\/api\/download\//.test(confirmPage));
}

console.log('\n════ 6. Limite de téléchargements ════');
{
  let last = 200;
  for (let i = 0; i < 12 && last === 200; i += 1) {
    last = (await fetch(`${B}/api/download/${token}`)).status;
  }
  check('la limite finit par bloquer', last === 429, `code final ${last}`);
}

console.log('\n════ 7. Espace client ════');
check('compte protégé', [307, 302].includes((await status('/compte/telechargements')).code));
{
  const adminPage = await (await fetch(`${B}/admin`)).text();
  check(
    'admin sans mot de passe : formulaire, aucune donnée client',
    /mot de passe/i.test(adminPage) && !adminPage.includes('test-secu@example.com'),
  );
}

console.log('\n════ 8. robots.txt ════');
{
  const txt = await (await fetch(`${B}/robots.txt`)).text();
  check('robots.txt exclut /api/', /Disallow:.*\/api\//.test(txt));
  check('robots.txt exclut /telechargements/', /Disallow:.*\/telechargements\//.test(txt));
}

const failed = results.filter((r) => !r.pass);
console.log(`\n════════ ${results.length - failed.length}/${results.length} contrôles passés ════════`);
failed.forEach((f) => console.log('  ✗', f.name, f.detail));
process.exit(failed.length === 0 ? 0 : 1);
