# Portfolio — Alizée Bompan

Portfolio UX/UI construit avec [Astro](https://astro.build) et [Tailwind CSS v4](https://tailwindcss.com).

## Structure du projet

```text
├── public/                     # assets statiques servis tels quels (images, vidéos, CV, favicon)
├── src/
│   ├── assets/                 # images/polices importées par le build (optimisées par Astro)
│   ├── components/             # composants Astro/React (TableOfContents.tsx est le seul island React)
│   ├── layouts/                # layouts partagés (BaseLayout, CaseStudyLayout)
│   ├── lib/                    # utilitaires (ex: cn())
│   ├── pages/
│   │   ├── index.astro         # page d'accueil
│   │   └── project-ux/         # études de cas (Initiative CRM, Bibliothèque de Bordeaux, Netflix, Reggae)
│   └── styles/global.css       # styles globaux + reset
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Commandes

Toutes les commandes s'exécutent à la racine du projet :

| Commande             | Action                                              |
| :-------------------- | :--------------------------------------------------- |
| `npm install`          | Installe les dépendances                              |
| `npm run dev`          | Démarre le serveur local sur `localhost:4321`         |
| `npm run build`        | Build de production dans `./dist/`                    |
| `npm run preview`      | Prévisualise le build localement                      |
| `npm run astro ...`    | Commandes CLI Astro (ex: `astro check`)               |

## Notes

- Pas de suite de tests automatisée : toute modification doit être vérifiée manuellement dans le navigateur, aux résolutions mobile/tablette/laptop/desktop.
- Les breakpoints Tailwind sont les valeurs par défaut (`sm/md/lg/xl/2xl`) étendues avec `laptop` (1440px) et `3xl` (1920px) pour les grands écrans.
