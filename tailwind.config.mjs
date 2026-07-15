/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      // Étend les breakpoints par défaut (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536)
      // au lieu de les redéfinir, pour ne pas casser les ~150 usages existants.
      screens: {
        laptop: '1440px', // MacBook 13"-16" — remplace le "min-[1440px]" codé en dur
        '3xl': '1920px',  // écrans 27"-32"+, rien ne ciblait cette zone auparavant
      },
      maxWidth: {
        content: '1400px', // largeur max de contenu, reprend la valeur déjà répétée en dur
      },
      colors: {
        /*
          ─── BRAND / PRIMARY (violet → purple) ───
          Palette principale issue de --violet, --untitled-ui--primary*
        */
        brand: {
          lightest: '#9e77ed', // --untitled-ui--primary500
          light: '#834eff',    // --violet (teinte d'accentuation)
          DEFAULT: '#6941c6',  // --untitled-ui--primary700
          deep: '#53389e',     // --untitled-ui--primary800
        },

        /*
          ─── TEXT ───
          Hiérarchie typographique : du plus foncé (titres) au plus clair (texte secondaire)
        */
        text: {
          heading: '#101828',  // --untitled-ui--gray900 (titres principaux)
          primary: '#29213b',  // --text-purple (corps de texte sur fond clair)
          body: '#475467',     // --untitled-ui--gray600 (texte courant)
          muted: '#5f5969',    // --grey-text (texte secondaire / légendes)
          subtle: '#333333',   // --text_black (texte sur fond très clair, variante)
        },

        /*
          ─── SURFACE / BACKGROUNDS ───
          Fond de page, cartes, sections
        */
        surface: {
          page: '#f9fafb',    // --untitled-ui--gray50  (fond de page global)
          card: '#f9fafc',    // --light               (fond de carte / section claire)
          white: '#ffffff',   // --untitled-ui--white
        },

        /*
          ─── ACCENT / DECORATIVE BUCKETS ───
          Tons pastel pour badges, backgrounds de catégories, callouts
        */
        accent: {
          lavender: '#e3e4f7', // --light_lavender
          lila: '#f2d3f7',     // --light_lila
          peach: '#f9eae4',    // --light_each
          azure: '#dbf8f3',    // --light_azur
        },
      },
    },
  },
};