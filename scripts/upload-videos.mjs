// Upload des vidéos locales vers Cloudinary.
// Usage : node scripts/upload-videos.mjs
// Lit PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET depuis le fichier .env
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

// Chargement manuel de .env (aucune dépendance supplémentaire).
const envPath = join(root, '.env');
if (existsSync(envPath)) {
  for (const raw of readFileSync(envPath, 'utf8').split('\n')) {
    const line = raw.trim();
    const eq = line.indexOf('=');
    if (eq > 0 && line[0] !== '#') {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Erreur : renseignez ces 3 variables dans le fichier .env :');
  console.error('  PUBLIC_CLOUDINARY_CLOUD_NAME');
  console.error('  CLOUDINARY_API_KEY');
  console.error('  CLOUDINARY_API_SECRET');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const videosDir = join(root, 'public', 'videos');

function listMp4(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMp4(p));
    else if (extname(entry.name).toLowerCase() === '.mp4') out.push(p);
  }
  return out;
}

const files = listMp4(videosDir).sort();

for (const file of files) {
  // ex: public/videos/usertest/scena1-v1.mp4 -> videos/usertest/scena1-v1
  const rel = relative(root, file).replaceAll('\\', '/');
  const publicId = rel.slice('public/'.length, rel.lastIndexOf('.'));
  process.stdout.write('Upload ' + publicId + ' ... ');
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'video',
    public_id: publicId,
    overwrite: true,
  });
  console.log('OK ' + res.secure_url);
}

console.log('\nTerminé : ' + files.length + ' vidéos uploadées.');
