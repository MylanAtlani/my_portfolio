# 🚀 Portfolio Personnel - Next.js 15.4

Un site portfolio moderne et performant construit avec Next.js 15.4, featuring App Router, internationalisation, et thèmes sombre/clair.

## ✨ Fonctionnalités

- **⚡ Next.js 15.4** avec App Router pour des performances optimales
- **🌍 Multilingue** - Support français et anglais
- **🌓 Thèmes** - Mode sombre et clair avec transition fluide
- **📱 Responsive** - Design adaptatif pour tous les appareils
- **🎨 Design moderne** - Interface élégante avec Tailwind CSS
- **🔧 TypeScript** - Code typé pour une meilleure maintenabilité
- **⚙️ Architecture 2025** - Meilleures pratiques et structure moderne

## 🛠️ Stack technique

- **Framework:** Next.js 15.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Internationalisation:** next-intl
- **Thèmes:** next-themes
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Package Manager:** Yarn

## 📁 Structure du projet

```
my_portfolio/
├── app/
│   ├── [locale]/              # Routes avec locale
│   │   ├── layout.tsx         # Layout avec i18n
│   │   └── page.tsx           # Page d'accueil
│   ├── globals.css            # Styles globaux
│   └── layout.tsx             # Layout racine
├── components/
│   ├── ui/                    # Composants UI réutilisables
│   │   └── button.tsx
│   └── layout/                # Composants de layout
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── theme-toggle.tsx
│       └── language-toggle.tsx
├── lib/
│   ├── i18n.ts               # Configuration i18n
│   └── utils.ts              # Utilitaires
├── messages/
│   ├── fr.json               # Traductions françaises
│   └── en.json               # Traductions anglaises
├── providers/
│   └── theme-provider.tsx    # Provider pour les thèmes
└── middleware.ts             # Middleware Next.js
```

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18.17+ 
- Yarn (recommandé) ou npm

### Installation

1. **Cloner le repository**
   ```bash
   git clone <your-repo-url>
   cd my_portfolio
   ```

2. **Installer les dépendances**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📜 Scripts disponibles

- `yarn dev` - Serveur de développement
- `yarn build` - Build de production
- `yarn start` - Serveur de production
- `yarn lint` - Linter ESLint
- `yarn type-check` - Vérification TypeScript

## 🌐 Internationalisation

Le site supporte automatiquement le français et l'anglais :

- **URL par défaut :** `/` (français)
- **URL anglaise :** `/en`
- **Toggle de langue :** Bouton dans la navigation

### Ajouter une traduction

1. Modifier `messages/fr.json` et `messages/en.json`
2. Utiliser dans un composant :
   ```tsx
   import { useTranslations } from 'next-intl';
   
   function MyComponent() {
     const t = useTranslations('section');
     return <h1>{t('title')}</h1>;
   }
   ```

## 🎨 Personnalisation des thèmes

Les couleurs et thèmes sont configurés dans :

- `app/globals.css` - Variables CSS
- `tailwind.config.ts` - Configuration Tailwind
- `components/layout/theme-toggle.tsx` - Toggle des thèmes

### Modifier les couleurs

Éditer les variables CSS dans `globals.css` :

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... */
}

.dark {
  --primary: 217.2 91.2% 59.8%;
  --background: 222.2 84% 4.9%;
  /* ... */
}
```

## 📱 Composants UI

Le projet utilise une approche modulaire avec des composants réutilisables basés sur shadcn/ui :

- **Button** - Boutons avec variants
- **ThemeToggle** - Basculer entre thèmes
- **LanguageToggle** - Changer de langue
- **Navbar** - Navigation responsive
- **Footer** - Pied de page avec liens sociaux

## 🚀 Déploiement

### Vercel (Recommandé)

1. Pusher le code sur GitHub
2. Connecter le repository à Vercel
3. Déploiement automatique !

### Autres plateformes

```bash
# Build de production
yarn build

# Démarrer le serveur
yarn start
```

## 🏗️ Architecture moderne

Ce projet suit les meilleures pratiques 2025 de Next.js :

- **App Router** - Nouvelle architecture de routing
- **Server Components** - Rendu côté serveur optimisé
- **Streaming** - Chargement progressif
- **Code splitting** - Optimisation automatique
- **Image optimization** - Formats modernes (WebP, AVIF)
- **Font optimization** - Chargement optimisé des polices

## 🔧 Configuration avancée

### Variables d'environnement

Créer un fichier `.env.local` :

```env
# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact form (optionnel)
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_TEMPLATE_ID=your-template-id
EMAILJS_PUBLIC_KEY=your-public-key
```

### Optimisations

- **Images** : Utilisez `next/image` pour l'optimisation automatique
- **Fonts** : Police Google Fonts optimisée
- **Bundle** : Analyse avec `yarn build:analyze`
- **Performance** : Lighthouse score > 95

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Radix UI](https://www.radix-ui.com/)

## 📄 Licence

MIT - Utilisez et modifiez librement !

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Forker le projet
2. Créer une branche feature
3. Commit vos changements
4. Pusher et créer une Pull Request

---

**Construit avec ❤️ et Next.js 15.4**
