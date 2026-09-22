// Hébergeur vidéo : Cloudinary.
//
// Le "cloud name" Cloudinary n'est pas un secret : il est exposé côté client via la
// variable d'environnement publique PUBLIC_CLOUDINARY_CLOUD_NAME (convention Astro/Vite).
// Définissez-la dans un fichier .env à la racine du projet :
//
//   PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
//
// Aucune clé API / API Secret Cloudinary ne doit figurer dans le code frontend.

const CLOUDINARY_CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Transforme un chemin vidéo relatif (ex: 'videos/usertest/scena1-v1.mp4')
 * en URL Cloudinary publique.
 */
export function videoUrl(path: string): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error(
      'PUBLIC_CLOUDINARY_CLOUD_NAME est manquant. Définissez-le dans le fichier .env à la racine du projet (voir .env.example).'
    );
  }
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${path}`;
}
