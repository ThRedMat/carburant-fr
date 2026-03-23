## Feuille de Route : Application Essence Check

### Phase 1 : Amelioration des donnees et de l'affichage

- [ X ] Creer le dossier src/assets/ et y ajouter le fichier JSON complet des enseignes.
- [ X ] Connecter les ID de l'API au fichier JSON dans StationCard.jsx pour afficher le nom des marques (Total, Leclerc, Intermarche, etc.).
- [ X ] Gerer le cas ou l'enseigne est inconnue pour conserver un affichage propre.

### Phase 2 : Filtres dynamiques par carburant

- [ X ] Creer un composant avec des boutons pour selectionner le type de carburant (Gazole, SP95-E10, SP98, E85).
- [ X ] Connecter ces boutons a un nouvel etat (useState) dans App.jsx.
- [ ] Modifier l'URL de l'API de maniere dynamique pour que le parametre order_by utilise le carburant selectionne (ex: order_by=e10_prix ASC).

### Phase 3 : Cartographie et Geolocalisation

- [ ] Installer les dependances necessaires (react-leaflet et leaflet).
- [ ] Creer un composant Map pour afficher une carte centree sur la ville recherchee.
- [ ] Utiliser le champ geom de l'API pour placer des marqueurs pour chaque station.
- [ ] Ajouter un bouton "Autour de moi" exploitant l'API de geolocalisation du navigateur.

### Phase 4 : Transformation en Application Telechargeable (PWA)

- [ ] Installer le plugin vite-plugin-pwa pour configurer l'application.
- [ ] Creer et configurer le fichier manifest.json (nom de l'application, couleurs du theme, icones pour iOS et Android).
- [ ] Configurer un Service Worker pour gerer le cache et permettre un affichage rapide meme avec une mauvaise connexion.
- [ ] Ajouter un bouton ou une invite "Installer l'application" dans l'interface React.

### Idées de fonctionnalités

- Distance à vol d'oiseau sur les cards
- Historique des recherches récentes
- Favoris (stations épinglées)

#### Ce que je vois qui manque encore

- Sur mobile la topbar est chargée — les filtres et le tri débordent probablement

- Lien "Ouvrir dans Waze" en plus de Google Maps dans le panel détail
- Badge sur les stations mises à jour il y a plus de 48h ("prix potentiellement obsolète")
- Nombre de carburants disponibles affiché sur la card sans avoir à scroller
