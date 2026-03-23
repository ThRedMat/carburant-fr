# Carburant FR

Carburant FR est une application web progressive (PWA) permettant de consulter en temps reel les prix des carburants en France. L'application exploite les donnees ouvertes du gouvernement pour offrir une interface moderne, rapide et axee sur l'economie au quotidien.

## Fonctionnalites

- **Recherche multicritere** : Recherche par ville, code postal ou via geolocalisation (Autour de moi).
- **Carte Interactive** : Visualisation des stations sur une carte Leaflet avec zoom automatique.
- **Gestion des Favoris** : Onglet dedie pour sauvegarder ses stations habituelles avec stockage local (localStorage).
- **Navigation Intelligente** : Choix de l'itineraire entre Google Maps et Waze directement depuis l'application.
- **Indicateur de Fiabilite** : Alerte visuelle pour les prix n'ayant pas ete mis a jour depuis plus de 48 heures.
- **Mode Sombre** : Interface optimisee pour une utilisation de jour comme de nuit.
- **Experience PWA** : Installable sur iOS et Android pour une utilisation plein ecran comme une application native.

## Technologies utilisees

- **React (Vite)** : Framework frontend principal.
- **Vite PWA Plugin** : Gestion des Service Workers et du fichier Manifest.
- **Leaflet** : Bibliotheque de cartographie interactive.
- **API Prix des carburants** : Flux instantane de data.economie.gouv.fr.
- **API Adresse** : Service de geocodage inverse de data.gouv.fr.

## Installation et Developpement

Pour installer le projet localement :

1. Cloner le depot :
   ```bash
   git clone [https://github.com/TON-PSEUDO/carburant-fr.git](https://github.com/ThRedMat/carburant-fr.git)
   ```
2. Installer les dependances :

   ```bash
    npm install
   ```

3. Lancer le serveur de developpement :

   ```bash
    npm run dev
   ```

## Construction et Déploiement

Pour générer les fichiers de production :

```bash
 npm run build
```

Pour deployer l'application sur GitHub Pages :

```bash
 npm run deploy
```

## Configuration PWA

L'application est configurée pour fonctionner hors connexion après la première visite grâce au plugin VitePWA.
Les icones, le manifest et les assets statiques se trouvent dans le dossier /public. La propriété base dans vite.config.js est definie pour correspondre au sous-repertoire du deploiement sur GitHub Pages.
