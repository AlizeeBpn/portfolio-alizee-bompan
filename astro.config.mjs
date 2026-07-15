// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alizeebompan.vercel.app',
  integrations: [sitemap(), react()],

  // Pphatton est chargée via @font-face dans src/styles/global.css : les templates
  // référencent la police par son nom littéral (font-['Pphatton',...]), incompatible
  // avec l'API `fonts` native d'Astro qui génère un nom de famille hashé unique.

  vite: {
    plugins: [tailwindcss()],
  },
});