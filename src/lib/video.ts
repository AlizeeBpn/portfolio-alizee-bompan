// Hébergeur vidéo : Cloudinary.
//
// Le "cloud name" Cloudinary N'EST PAS un secret : il apparaît dans toutes les URLs
// publiques des médias. Sa valeur par défaut est donc définie ici pour simplifier le
// déploiement. Elle peut être surchargée (optionnel) par la variable d'environnement
// PUBLIC_CLOUDINARY_CLOUD_NAME.
//
// Aucune clé API / API Secret Cloudinary ne doit figurer dans ce fichier.

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'jalpv37v';

/**
 * Transforme un chemin vidéo relatif (ex: 'videos/usertest/scena1-v1.mp4')
 * en URL Cloudinary publique.
 */
export function videoUrl(path: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${path}`;
}
