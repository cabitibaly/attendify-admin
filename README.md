# Attendify Admin 📋

Application mobile de gestion des présences à destination des **administrateurs**, construite avec **React Native** et **Expo**. Elle constitue le pendant admin d'un système plus large de suivi des présences (Attendify).

---

## Fonctionnalités

- 🔐 **Authentification** — connexion sécurisée avec gestion de session persistante (Expo Secure Store)
- 🔔 **Notifications push** — envoi et réception de notifications via Expo Notifications + Firebase (FCM)
- 📅 **Calendrier** — visualisation et gestion des présences par date (React Native Calendars)
- 📎 **Import de documents** — sélection et upload de fichiers (Expo Document Picker)
- 🗂 **Bottom Sheet** — interfaces contextuelles fluides (@gorhom/bottom-sheet)
- 📋 **Presse-papiers** — copie rapide de données (Expo Clipboard)
- 🌗 **Thème clair / sombre** — support automatique selon les préférences système

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) ~54 |
| Langage | TypeScript ~5.9 |
| Navigation | [Expo Router](https://expo.github.io/router/) (file-based routing) |
| Data fetching | [TanStack React Query](https://tanstack.com/query) v5 + Axios |
| UI / Styles | [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS pour RN) |
| Auth & Session | Expo Secure Store + AsyncStorage + Context API |
| Notifications | Expo Notifications + Firebase Cloud Messaging (FCM) |
| Animations | React Native Reanimated v4 |
| Build / Deploy | [EAS Build](https://docs.expo.dev/build/introduction/) |

---

## Structure du projet

```
attendify-admin/
├── app/                      # Routes Expo Router (file-based)
├── components/               # Composants réutilisables
├── contexts/
│   └── authContext/          # Contexte d'authentification
├── hooks/
│   └── notification-push/    # Hook de gestion des notifications push
├── interfaces/               # Types et interfaces TypeScript
├── configs/                  # Configuration (API base URL, constantes...)
├── utils/                    # Fonctions utilitaires
├── assets/                   # Images, icônes, splash screen
├── google-services.json      # Config Firebase (Android)
├── app.json                  # Configuration Expo
└── package.json
```

---

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Expo Go](https://expo.dev/go) ou un **development build** (requis pour les notifications push et le stockage sécurisé)
- Un émulateur Android / simulateur iOS — ou un appareil physique

> ⚠️ Les fonctionnalités natives (notifications, secure store) ne fonctionnent pas dans Expo Go standard. Un **development build** est nécessaire.

---

## Installation

```bash
# Cloner le projet
git clone https://github.com/cabitibaly/attendify-admin.git
cd attendify-admin

# Installer les dépendances
npm install
```

### Configurer les variables d'environnement

Crée un fichier `.env` à la racine (ou configure `configs/`) avec l'URL de ton API backend :

```env
API_BASE_URL=https://ton-api.exemple.com
```

### Lancer l'application

```bash
# Démarrer le serveur Expo
npx expo start

# Ou directement sur un appareil / émulateur
npm run android
npm run ios
```

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm start` | Lance le serveur Expo |
| `npm run android` | Ouvre sur émulateur Android |
| `npm run ios` | Ouvre sur simulateur iOS |
| `npm run web` | Lance en mode web |
| `npm run lint` | Vérifie le code avec ESLint |

---

## Architecture notable

Ce projet illustre plusieurs patterns avancés pour une app React Native de niveau professionnel :

- **Authentification persistante** via `expo-secure-store` + `AuthContext`, avec rehydratation au démarrage
- **Notifications push** configurées côté client avec un hook dédié et intégration Firebase FCM
- **Interfaces TypeScript** centralisées dans `/interfaces` pour typer les réponses API et les modèles de données
- **React Query** pour la gestion du cache, des états de chargement et des mutations API
- **Expo Router** pour un routing déclaratif basé sur la structure de fichiers (inspiré de Next.js)

---

## Lien avec l'écosystème Attendify

Ce repo est la **partie admin** du système Attendify. Il s'appuie sur une API backend dédiée pour gérer les utilisateurs, les sessions de présence et les notifications.

---

## Auteur

**cabitibaly** — [GitHub](https://github.com/cabitibaly)