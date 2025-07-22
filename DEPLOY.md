# 🚀 Déploiement GitHub Pages

Ce guide explique comment déployer le portfolio sur GitHub Pages.

## 📋 Prérequis

- Repository GitHub créé
- Projet buildé localement

## 🛠️ Étapes de déploiement

### 1. Build du projet
```bash
yarn deploy
```
Cette commande :
- Build le projet avec `next build`
- Crée le dossier `out/` avec les fichiers statiques
- Ajoute le fichier `.nojekyll` pour GitHub Pages

### 2. Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit: Portfolio Mylan Atlani"
```

### 3. Ajouter le remote GitHub
```bash
git remote add origin https://github.com/atlani-mylan/portfolio.git
git branch -M main
git push -u origin main
```

### 4. Configurer GitHub Pages

1. Aller sur votre repository GitHub
2. **Settings** → **Pages**
3. **Source** : Deploy from a branch
4. **Branch** : `main`
5. **Folder** : `/root` (garder root, pas /docs)

### 5. Déploiement du dossier `out/`

**Option A: Subtree (recommandée)**
```bash
# Créer une branche gh-pages avec le contenu du dossier out
git subtree push --prefix out origin gh-pages
```

**Option B: Workflow GitHub Actions**
Créer `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
          
      - name: Install dependencies
        run: yarn install --frozen-lockfile
        
      - name: Build
        run: yarn deploy
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 6. Configurer Pages pour gh-pages
1. **Settings** → **Pages**
2. **Source** : Deploy from a branch
3. **Branch** : `gh-pages`
4. **Folder** : `/root`

## 🌐 URL finale
Votre site sera disponible à :
`https://atlani-mylan.github.io/portfolio/`

## 🔧 Scripts disponibles

- `yarn dev` - Développement local
- `yarn build` - Build de production
- `yarn deploy` - Build + préparation GitHub Pages
- `yarn clean` - Nettoie les dossiers build

## 📝 Notes importantes

- Le site est configuré pour l'export statique
- Les images sont non-optimisées (requis pour export statique)
- Le fichier `.nojekyll` est nécessaire pour les dossiers `_next`
- L'internationalisation (FR/EN) fonctionne avec routes statiques

## 🔄 Mise à jour

Pour mettre à jour le site :
```bash
# 1. Faire vos changements
git add .
git commit -m "Update: description des changements"
git push origin main

# 2. Rebuilder et redéployer
yarn deploy
git subtree push --prefix out origin gh-pages
```

## 🚨 Dépannage

**Site vide / erreur 404 :**
- Vérifier que la branche `gh-pages` existe
- Vérifier la configuration Pages (branche + dossier)
- Attendre 5-10 minutes pour la propagation

**Assets manquants :**
- Vérifier que `.nojekyll` est présent dans `out/`
- Vérifier que `unoptimized: true` est dans `next.config.ts`

**Liens brisés :**
- Vérifier les chemins absolus vs relatifs
- Vérifier la configuration `trailingSlash: true` 