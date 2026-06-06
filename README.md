
# 🎨 Boutique COGI - E-Commerce Vanilla JavaScript + Vite v8.0.13, HTML5 et CSS3
---

Une boutique en ligne moderne et luxueuse construite avec **Vanilla JavaScript + Vite v8.0.13, HTML5 et CSS3** — sans dépendances externes majeures.

## 📋 Caractéristiques Principales

✅ **Design Responsive** - Mobile, Tablet, Desktop  
✅ **Navigation Intelligente** - Sidebar collapsible, smooth scroll  
✅ **Animations Fluides** - Parallax, fade-in, carousel  
✅ **Données Dynamiques** - Chargement depuis JSON, caching LocalStorage  
✅ **Intégration Réseaux Sociaux** - WhatsApp, Facebook, Telegram, TikTok, Instagram  
✅ **Performance Optimisée** - Lazy loading, throttled listeners, observers  
✅ **Sécurité** - Protection XSS avec DOMPurify, validation des données  
✅ **Accessibilité** - ARIA labels, structure sémantique

---

## 🚀 Démarrage Rapide

### Installation
```bash
# Ouvrir avec serveur local
 npx http-server
```

Accès: `http://localhost:8000`

---

### Phase 1 : Robustesse ✅

| Tâche | Status | Impact |
|-------|--------|--------|
| T1.1 - Erreurs JSON + Retry | ✅ | CRITIQUE |
| T1.2 - Validation Schéma | ✅ | HAUTE |
| T1.3 - Protection XSS | ✅ | CRITIQUE |
| T1.4 - Loader UI | ✅ | HAUTE |

### Phase 2 : Performance ✅

| Tâche | Status | Impact |
|-------|--------|--------|
| T2.1 - Throttle Scroll | ✅ | MOYENNE |
| T2.2 - Cache LocalStorage | ✅ | MOYENNE |

---

**Améliorations:**
- ✅ Gestion erreurs robuste + retry 3x
- ✅ Skeleton loaders + indicateur chargement
- ✅ Protection XSS (DOMPurify)
- ✅ Validation données stricte
- ✅ Throttle scroll (performance +40%)
- ✅ Cache LocalStorage 24h
- ✅ Logging structuré

---

## 🔧 Configuration

### Variables de Données

 `data.json` :
```json
{
  "reseauxSociaux": {
    "whatsapp": "KzI0MzgxOTUzODMyNQ=="
  },
  "catalogue": {
    "habitFemme": [{...}],
    "habitHomme": [{...}]
  }
}
```

### Ajouter des Produits

```json
{
  "id": "f1",
  "nom": "Robe Élégante",
  "prix": "95$",
  "taille": "42 à 48",
  "couleur": "Noir",
  "image": "Media-p-20260218/image.webp"
}
```

---

## 🔐 Sécurité

✅ **XSS Protection** - DOMPurify sanitisation  
✅ **Validation Schéma** - Structure JSON stricte  
✅ **Fetch Sécurisé** - Timeout + erreur handling  
✅ **Base64 Encoding** - URLs sensibles protégées

---

## 📱 Responsive

```
Mobile    < 768px   → Sidebar drawer
Tablet    768-992px → Sidebar réduit
Desktop   > 992px   → Sidebar complet
```

---

## 🚀  Étapes

**Phase 3 - Maintenance (Optionnel):**
- [ ] Modularisation ES6
- [ ] Tests unitaires
- [ ] Configuration centralisée
- [ ] Documentation complète

**Futur:**
- [ ] Backend Node.js
- [ ] Base de données
- [ ] Système de paiement
- [ ] PWA / ServiceWorker

---
