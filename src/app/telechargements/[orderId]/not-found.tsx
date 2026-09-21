import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { ButtonLink } from '@/components/Button';

export const metadata = {
  title: 'Lien de téléchargement introuvable',
  robots: { index: false, follow: false },
};

/** Affiché avec un statut 404 quand l'identifiant de commande n'existe pas. */
export default function DownloadNotFound() {
  return (
    <>
      <PageBanner
        compact
        title="Lien introuvable"
        subtitle="Ce lien ne correspond à aucune commande. Il est peut-être incomplet — certains logiciels de messagerie coupent les liens longs."
        scene={<BannerScene variant="telechargements" />}
      />

      <div className="shell max-w-lg py-12 text-center">
        <p className="text-[0.92rem] leading-relaxed text-ink-soft">
          Vos fichiers restent accessibles à tout moment depuis votre espace client, avec un lien
          neuf généré à chaque visite.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/connexion">Accéder à mon espace</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Nous écrire
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
