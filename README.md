# GestionBudget Frontend

Ce répertoire contient le frontend de l'application GestionBudget, développé en utilisant React et configuré avec Vite pour une configuration simplifiée et un développement rapide. L'application interagit avec le backend pour gérer les transactions financières.

## Technologies Utilisées

- **React** : Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- **Vite** : Un build tool qui fournit un environnement de développement rapide.
- **Axios** : Utilisé pour réaliser des appels API HTTP.
- **TailwindCSS** : Un framework CSS utilitaire pour styliser l'application.

## Fonctionnalités

- Affichage d'une liste de transactions financières personnelles.
- Formulaire pour ajouter de nouvelles transactions.
- Modification et suppression des transactions existantes.
- Affichage du solde total des transactions.

## Prérequis

- Node.js (version 20 ou plus récente recommandée)
- npm ou yarn (gestionnaire de paquets)

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/gestionbudget/frontend.git
   ```

2. **Installer les dépendances :**
   Accédez au répertoire du projet et installez les dépendances :
   ```bash
   cd gestionbudget-frontend
   npm install
   # ou avec yarn
   yarn install
   ```

## Configuration

1. **Configurer le Proxy (si nécessaire) :**
   Si votre backend tourne sur un port différent (par exemple, 3000), configurez le proxy dans `vite.config.js` :
   ```javascript
   export default {
     server: {
       proxy: {
         '/transactions': 'http://localhost:3000',
       },
     },
   };
   ```

## Lancement du Projet

Pour démarrer le projet en mode développement :

```bash
npm run dev
# ou avec yarn
yarn dev
```

Accédez à `http://localhost:3000` (ou le port spécifié par Vite) pour voir l'application en action.

## Build pour la Production

Pour créer une version de production de l'application :

```bash
npm run build
# ou avec yarn
yarn build
```

Les fichiers de production seront générés dans le répertoire `dist`.

## Structure du Projet

- `src/App.jsx`: Composant principal gérant l'ensemble de la logique et l'affichage.
- `src/index.css`: Chargement et configuration de TailwindCSS.
- `tailwind.config.js`: Configuration de TailwindCSS.
- `vite.config.js`: Configuration de Vite, incluant les paramètres de proxy.

## Style et Design

L'application utilise TailwindCSS pour styliser les composants d'interface utilisateur, ce qui permet un développement rapide et maintenable grâce à l'approche utilitaire de Tailwind.

---

N'hésitez pas à ajouter d'autres détails spécifiques à votre application ou à l'organiser différemment si besoin.


 http://localhost:3000
