import pw from '/home/claude/.npm-global/lib/node_modules/playwright/index.js';
const { chromium } = pw;
const B = 'http://localhost:3111';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, locale: 'fr-FR' });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
const ok = (label, cond) => console.log(`${cond ? '✓' : '✗'} ${label}`);

// 1. lien d'évitement au clavier
await page.goto(B + '/', { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
ok('1re tabulation = lien d’évitement', (await page.evaluate(() => document.activeElement.textContent)).includes('contenu principal'));

// 2. carte produit cliquable (les produits ne sont plus sur l'accueil)
await page.goto(B + '/boutique', { waitUntil: 'networkidle' });
await page.locator('article a', { hasText: 'Pack routines' }).first().click();
await page.waitForURL(/\/boutique\/pack-routines/, { timeout: 15000 });
ok('carte produit → fiche produit', page.url().includes('/boutique/pack-routines'));

// 3. ajout au panier depuis la fiche
await page.getByRole('button', { name: /Ajouter au panier/ }).click();
await page.waitForTimeout(500);
ok('tiroir panier ouvert', await page.getByRole('dialog', { name: /panier/i }).isVisible());
ok('sous-total affiché dans le tiroir', (await page.getByRole('dialog', { name: /panier/i }).innerText()).includes('12,90'));

// 4. deuxième produit depuis la boutique (bouton d'ajout rapide)
await page.keyboard.press('Escape');
await page.goto(B + '/boutique', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /^Ajouter Pack recettes en famille au panier/ }).click();
await page.waitForTimeout(400);
await page.keyboard.press('Escape');
const badge = await page.locator('header button[aria-label^="Panier"] span').first().innerText();
ok('compteur du panier = 2', badge.trim() === '2');

// 5. page catégorie (les filtres ont été retirés de la boutique)
await page.goto(B + '/categories/connexion-emotions', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
ok('page catégorie : 2 fiches', (await page.locator('main li a[href^="/boutique/"]').count()) >= 2);
await page.goto(B + '/boutique', { waitUntil: 'networkidle' });
ok('boutique : 12 fiches, aucun filtre',
   (await page.locator('main li a[href^="/boutique/"]').count()) === 12
   && (await page.getByRole('button', { name: /Filtrer/i }).count()) === 0);

// 6. recherche
await page.getByRole('button', { name: 'Rechercher' }).click();
await page.getByLabel('Rechercher un produit').fill('semainier');
await page.waitForTimeout(350);
ok('recherche trouve le semainier', (await page.getByRole('dialog', { name: 'Recherche' }).innerText()).includes('semainier'));
await page.keyboard.press('Escape');

// 7. tunnel de paiement complet
await page.goto(B + '/commande', { waitUntil: 'networkidle' });
await page.getByRole('textbox', { name: /Adresse email/ }).fill('test-flow@example.fr');
await page.getByRole('textbox', { name: 'Prénom', exact: true }).fill('Camille');
await page.getByRole('textbox', { name: 'Code promotionnel' }).fill('BIENVENUE10');
await page.getByRole('button', { name: 'Appliquer' }).click();
await page.getByText(/appliqué \(BIENVENUE10\)/).waitFor({ timeout: 10000 });
const summary = await page.locator('form > aside').innerText();
ok('remise appliquée', summary.includes('Remise BIENVENUE10'));
await page.locator('input[type=checkbox]').first().check();
await page.getByRole('button', { name: /Payer/ }).click();
await page.waitForURL(/confirmation/, { timeout: 15000 });
ok('confirmation atteinte', (await page.locator('h1').innerText()).includes('Merci pour votre commande'));
await page.waitForTimeout(800);
ok('panier vidé après paiement', !(await page.locator('header button[aria-label^="Panier"] span').first().isVisible().catch(() => false)));
const links = await page.locator('a[href^="/api/download/"]').count();
ok('2 liens de téléchargement', links === 2);

// 8. téléchargement effectif du PDF
const href = await page.locator('a[href^="/api/download/"]').first().getAttribute('href');
const resp = await page.request.get(B + href);
const buf = await resp.body();
ok('PDF téléchargé', resp.headers()['content-type'] === 'application/pdf' && buf.slice(0, 5).toString() === '%PDF-');

// 9. espace client (connexion en mode démo)
await page.goto(B + '/connexion', { waitUntil: 'networkidle' });
await page.getByRole('textbox', { name: 'Adresse email', exact: true }).fill('test-flow@example.fr');
await page.getByRole('button', { name: /Accéder à mon espace/ }).click();
await page.waitForURL(/\/compte/, { timeout: 15000 });
ok('espace client accessible', (await page.locator('h1').innerText()).includes('Mon compte'));
await page.goto(B + '/compte/telechargements', { waitUntil: 'networkidle' });
ok('mes téléchargements listés', (await page.locator('main').innerText()).includes('Pack routines'));
await page.goto(B + '/compte/commandes', { waitUntil: 'networkidle' });
ok('commande visible avec statut payée', (await page.locator('main').innerText()).includes('Payée'));
const invoice = await page.locator('a[href*="/facture"]').first().getAttribute('href');
await page.goto(B + invoice, { waitUntil: 'networkidle' });
ok('facture générée', (await page.locator('main').innerText()).includes('Facture'));

// 10. menu mobile
const m = await ctx.newPage();
await m.setViewportSize({ width: 390, height: 844 });
await m.goto(B + '/', { waitUntil: 'networkidle' });
await m.getByRole('button', { name: 'Ouvrir le menu' }).click();
await m.waitForTimeout(400);
ok('menu mobile ouvert', await m.getByRole('navigation', { name: 'Navigation mobile' }).isVisible());
await m.getByRole('navigation', { name: 'Navigation mobile' }).getByLabel('Fermer le menu').click();
await m.waitForTimeout(300);
ok('menu mobile fermé', !(await m.getByRole('navigation', { name: 'Navigation mobile' }).isVisible().catch(() => false)));

console.log(errs.length ? '\n✗ erreurs JS : ' + errs.slice(0, 3).join(' | ') : '\n✓ aucune erreur JS');
await browser.close();
