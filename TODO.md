# 📋 TODO - Portfolio Mylan Atlani (Version Réaliste)

## ✅ Déjà Fait
- [X] Refactoriser `page.tsx` en composants modulaires
- [X] Lazy loading pour les images optimisé
- [X] Fonts optimisées avec `font-display: swap`
- [X] Structure de types TypeScript
- [X] Données externalisées

## 🎯 Phase 1 - Essentiel (Cette semaine)

### Performance Basique
- [X] Compression gzip dans `next.config.ts`
- [X] Optimiser les imports de `framer-motion` (tree-shaking)
- [X] Vérifier les Core Web Vitals sur PageSpeed Insights

### Accessibilité Minimum
- [X] Vérifier les `alt` sur toutes les images
- [X] Tester la navigation au clavier (Tab, Enter, Escape)
- [X] Ajouter `aria-label` sur les boutons d'action
- [ ] Vérifier les contrastes critiques

### Sécurité Basique
- [X] Headers de sécurité dans `vercel.json` (déjà partiellement fait)
- [X] Rate limiting plus strict sur l'API contact (3→2 req/min)
- [X] Validation côté serveur renforcée

## 🚀 Phase 2 - SEO & Visibilité (2 semaines)

### SEO Essentiel
- [ ] `manifest.json` basique pour PWA
- [ ] Données structurées JSON-LD (Person, Organization)
- [ ] Optimiser `robots.txt` et `sitemap.xml`
- [ ] Meta tags Open Graph et Twitter Card
- [ ] Schema markup pour les projets

### Analytics Simple
- [ ] Améliorer GTM pour track les conversions importantes
- [ ] Événements : clics CTA, téléchargements, contact
- [ ] Core Web Vitals tracking
- [ ] Pages vues par section

## 🎨 Phase 3 - UX & Polish (1 semaine)

### Micro-interactions
- [ ] Loading states pour le formulaire de contact
- [ ] Scroll progress indicator
- [ ] Smooth scroll amélioré
- [ ] Hover effects sur les project cards
- [ ] `useReducedMotion` pour respecter les préférences

### Composants Manquants
- [ ] Composant `Toast` pour les notifications
- [ ] `LoadingSkeleton` pour les états de chargement
- [ ] `ErrorBoundary` simple pour rattraper les erreurs React

## 📝 Phase 4 - Contenu (Optionnel)

### Blog Simple
- [ ] Structure `app/[locale]/blog/` basique
- [ ] Support MDX pour 2-3 articles techniques
- [ ] Navigation simple entre articles
- [ ] Meta tags pour chaque article

### Contenu Additionnel
- [ ] Page "À propos" plus détaillée
- [ ] Timeline de carrière interactive
- [ ] Case studies des projets principaux (2-3)

## 🔧 Phase 5 - Maintenance (Optionnel)

### DevOps Minimal
- [ ] GitHub Action simple pour vérifier le build
- [ ] Script de mise à jour des dépendances
- [ ] Backup automatique du contenu

### Tests Basiques (si vraiment nécessaire)
- [ ] Tests unitaires des utilitaires (image-utils, font-utils)
- [ ] Test e2e du formulaire de contact uniquement
- [ ] Validation des liens internes

---

## ❌ Supprimé (Overkill pour un portfolio)

### Trop Complexe
- ~~Sentry monitoring~~ → Console.log suffit
- ~~Storybook~~ → Pas nécessaire
- ~~Couverture de code 80%~~ → Overkill
- ~~Tests Playwright complets~~ → Trop lourd
- ~~Design system complet~~ → Les composants actuels suffisent
- ~~CI/CD complexe~~ → Build Vercel suffit
- ~~Chat en direct~~ → Email suffit
- ~~CRM~~ → Pas nécessaire
- ~~Analytics avancées~~ → GTM basique suffit
- ~~Service worker complexe~~ → Next.js s'en occupe
- ~~Système de commentaires~~ → Pas nécessaire
- ~~Newsletter~~ → Peut-être plus tard
- ~~API GitHub/LinkedIn~~ → Liens externes suffisent

---

## 🎯 Priorités Réalistes

### Cette Semaine (2-3h) ✅ TERMINÉ
1. ✅ Performance : compression + optimisations
2. ✅ Accessibilité : navigation clavier + contrastes (sauf contrastes à vérifier)
3. ✅ Sécurité : rate limiting renforcé

### Ce Mois (5-6h)
1. SEO : manifest + structured data
2. Analytics : événements essentiels
3. UX : micro-interactions

### Plus Tard (si motivation)
1. Blog simple avec 2-3 articles
2. Page "À propos" détaillée
3. Case studies

---

## 📊 Métriques Simples

- [X] Lighthouse Score > 90 (au lieu de 95) - À tester
- [X] PageSpeed Insights "Bon" sur mobile et desktop - À tester
- [X] Pas d'erreurs dans la console
- [X] Formulaire de contact fonctionne
- [X] Site rapide sur 3G

**Temps estimé réaliste :** 2-3 semaines maximum
**Focus :** Efficacité plutôt que perfection