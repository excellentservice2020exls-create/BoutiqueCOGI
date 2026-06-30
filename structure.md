Mon projet est une plateforme web e-commerce en 'REACTJS' intitulé **Boutique COGI**. Les couleurs de base et de preference du site sont "Turquoise" et "Rose".
Pas de systeme de paiement pour l'instant. La commande sera redirigée vers whatsapp. 
Les catalogues de la page d'accueil seront : 
- **Generale**
- **Nouveautées**
- **Promotions**
Les categories des produits sont : 
- **Femme**
- **Homme**
- **Enfant**
- **Chaussures**
- **Sacs**
- **Accessoires**
Les produits doivent etre identifiés par:
- **Id unique (UUID)**.
- **Référence (SKU)**
- **nom du produit**
- **Description**
Les variants de produits doivent etre identifiés par:
- **Couleur**
- **Taille**
- **Dimensions**
- **Image principale**
- **Prix**
- **Stock (Quantité disponible)**
- **Statut (En stock, Rupture, Précommande)**
Un produit doit pouvoir avoir plusieurs variants.
Un produit doit pouvoir avoir plusieurs catégories.
Un produit doit pouvoir avoir plusieurs catalogues.

Les produits seront affichés dans une carte-produit et chaque carte-produit doit contenir:
- **Image principale (Une seule image)**
- **Plusieurs images (3 au maximum)**
- **Nom**
- **Description**
- **Prix**
- **Catégorie (4 au maximum)**
- **Catalogue (3 au maximum)**
- **Statut**
Les prix seront listés, codifiés et seront repertoriés principalement en centimes de dollar.
Un produit doit pouvoir appartenir à plusieurs catalogues et plusieurs categories.
Un catalogue peut contenir plusieurs categories (filtrable par catégorie).
Les produits seront pour importés depuis une base de données et mis à jour automatiquement.

Le navbar doit contenir :
- **Logo ("Boutique COGI")** : Un lien vers la page d'accueil.
- **Liens de navigation (accueil, Categories, promotions, Nouveautées)** : Liens vers les différentes pages du site.
- **Barre de recherche (categorie, produits, catalogue, prix, )** : Barre de recherche pour trouver des produits.
- **Icône de panier + badge (nb total produits)** : Les produits et le nombre total de produits dans le panier, apparait seulement lorsque authentifié.
- **wishlist + badge (nb total produits)** : Les produits et le nombre total de produits dans le wishlist, meme si non-authentifié.
- **Icône de profile (Connexion, Inscription)** : Icône de profile pour la connexion et l'inscription.


Le sidebar doit contenir :
- **Logo (COGI)** : Un lien vers la page d'accueil.
- **Liens de navigation (Femme, Homme, Enfant, Chaussures, Sacs, Accessoires, Contact)** : Liens vers les différentes pages du site.
- **Icône de panier** : Les produits et le nombre total de produits dans le panier, apparait seulement lorsque authentifié.
- **Icône de profil** : Icône de profile pour la connexion et l'inscription.

Le footer doit contenir : 
- **Logo (COGI)** : Un lien vers la page d'accueil.
- **copiright + annee dynamique** : Les informations de copyright.
- **Liens de navigation (catalogue, categories, promotions, Nouveautées, Contact, social networks)** : Liens vers les différentes pages du site. Ces liens seront disposés en colonnes.
- **condition d'utilisation** : conditions d'utilisation du site. Un lien vers la page d'utilisation.
- **condition generales de vente** : conditions generales de vente du site. Un lien vers la page des conditions generales de vente.
- **politique de confidentialite** : politique de confidentialite du site. Un lien vers la page de politique de confidentialite.
- **Gestionnaire de cookies** : Gestionnaire de cookies du site. Un lien vers le gestionnaire de cookies.
- **reseaux sociaux** : Liens vers les réseaux sociaux du site.




## 1. Front-end (Interface Utilisateur)
- **HTML5** pour la structure des pages (Page d'accueil, Page Produit, Page Profile, Page Contact, Page Panier, Page Commande.).
- **CSS3** pour le style et la mise en page.
- **JavaScript** pour l'interactivité (Ajout au panier sans rechargement, formulaire de commande, etc.).
- **React et ReactDom** pour le développement de l'interface utilisateur.
- **React Toastify** pour les notifications.
- **React Spinner** pour les indicateurs de chargement.


## 2. Back-end (Serveur & Logique)
- **Node.js** est utilisé comme framework serveur.
- **API REST** pour communiquer entre le front-end et le back-end.
- **Formulaire d'inscription et de connexion**.
- **Gestionnaire d'utilisateur**
- **Gestionnaire de produits**
- **Gestionnaire de commandes**
- **Gestionnaire de panier**
- **Gestionnaire de catégories**
- **Gestionnaire de favoris**
- **Gestionnaire de notifications**
- **Formulaire d'ajout de produit**.
- **React Google Tag Manager** pour le suivi des événements.
- **React Yup** pour la validation des formulaires.
- **React Google reCAPTCHA** pour la validation des formulaires.
- **React Google Analytics** pour les statistiques.

## 3. Base de Données
- **Index.html** pour le point d'entree principal.
- **Bscript.js** pour l'interaction avec la base de données.
- **Supabase** est la base de données utilisée.
- **Better-Auth** est utilisé pour l'authentification.
- **Prisma** est utilisé pour l'ORM.
- **Zod** est utilisé pour la validation des données.
- **Crypto-js** est utilisé pour le chiffrement.
- ** Axios** est utilisé pour la communication avec l'API.
- **Bootstrap** est utilisé pour le style et la mise en page.
- **Zustand** est utilisé pour la gestion de l'état.

## 4. Structure des Dossiers (Typique)
Pour un projet React/Vite, la structure ressemblerait à :
```
BoutiqueCOGI/
├── public/           # Fichiers statiques (images, etc.)
├── src/
│   └── components/   # Composants React/HTML
│       ├── admin/        # Composants d'exclusivite (administration)
│       ├── auth/           # Composants d'interface utilisateur et de connexion (connexion, inscription, etc.)
│       ├── catalog/      # Composants de catalogue
│       ├── category/     # Composants de catégorie
│       ├── product/      # Composants de produit
│       ├── price-currency/        # Composants de prix (pour gerer les prix en dollar ou en franc Congolais USD)
│           ├── currency-selector/ # definir les devises (USD et CDF) ainsi que la devise par defaut (USD)
│           ├── price-list/        # Liste des prix (les prix sont definis ici et seront utiliser par tous les autres composants)
│           ├── currency-converter/  # Convertisseur de devise (par default Dollar USD et definir la relation de conversion entre le Dollar et le franc congolais (CDF))
│           ├── exchange-rates/    # La liste des taux de change horodaté (generee et mise à jour manuellement chaque jour à 08H00, 12H00 et 16H00)
│       ├── cart/         # Composants de panier (pour gerer la selection des produits pour les commandes)
│       ├── order/        # Composants de commande (commande redirigée vers whatsapp)
│       ├── wishlist/     # Composants de liste de souhaits
│       ├── notification/ # Composants de notification
│       ├── newsLetter/   # Composants de newsletter
│       ├── social/       # Composants de réseaux sociaux (facebook, instagram, twitter, tiktok)
│       ├── contact/      # Composants de contact (e-mail)
│       ├── navbar/       # Composants de navbar
│       └── footer/       # Composants de footer
│   ├── app/          # pages, layout, globals
│   ├── api/          # Routes d'API
│   ├── hooks/        # Hooks
│   ├── lib/          # Fonctions utilitaires
│   ├── store/        # Zustand store
│   ├── services/     # Services
│   └── assets/       # Images, polices, icônes, etc
├── package-lock.json # Verrouille les versions des dépendances
├── bscript.js        # Scripts de la base de données
├── index.html        # Point d'entrée principal de l'application
├── .env              # Variables d'environnement
├── .gitignore        # Fichiers à ignorer par Git
└── package.json      # Dépendances et scripts

```

## 5 Sécurité

La plateforme doit avoir toutes les bases de la cybersecurite et plus encore.

- **XSS Protection** : DOMPurify sanitisation  
- **Validation Schéma** : Structure Zod.  
- **Fetch Sécurisé** : Timeout + erreur handling  
- **Base64 Encoding** : URLs sensibles protégées
- **bscript.js** : Scripts de la base de données
- **index.html** : Point d'entrée principal de l'application
- **Crypto-js** : Chiffrement
- **rbac** (Admin, Manager, User, Guest)
- **server**
- **api**
- **db**
- **auth**
- **product**
- **order**
- **cart**
- **category**
- **favorite**
- **notification**

## 6. Pages
- **home.js** : Page d'accueil
- **productdetail.js** : Page de détail du produit
- **collection.js** : Page de collection
- **contact.js** : Page de contact
- **profile.js** : Page de profil
- **cart.js** : Page de panier
- **order.js** : Page de commande
- **notfound.js** : Page 404
