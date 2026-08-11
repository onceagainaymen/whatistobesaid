# WhatistobeSaid

Une plateforme de blogging full-stack à l'esthétique brutaliste affirmée. Développée dans le cadre d'un stage de 6 mois, elle va au-delà du simple CRUD en intégrant une analyse de sentiment sur les commentaires, un tableau de bord analytique pour les auteurs, et une recherche full-text — déployée sur un domaine personnel en HTTPS.

> **En ligne :** `https://<votre-domaine>.me` *(à venir — Phase 4)*

---

## Stack Technique

| Couche | Technologie |
|---|---|
| Frontend & Backend | Next.js (pages React + routes API) |
| Style | Tailwind CSS |
| Base de données | MySQL (relationnelle, indexation full-text) |
| ORM | DrizzleORM |
| Analyse de sentiment | API NLP externe (Hugging Face / Google NL) |
| Reverse proxy | Nginx (ports 80 & 443) |
| Containerisation | Docker & Docker Compose |
| Hébergement | DigitalOcean Droplet (Ubuntu) |
| Domaine | Namecheap `.me` |
| SSL | Let's Encrypt / certificat Namecheap |

---

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/) installés
- `make` disponible sur votre système
- Un fichier `.env` configuré (voir `.env.example`)

---

## Démarrage

```bash
make build
```

L'application sera accessible à `http://localhost`.

Pour peupler la base de données avec des données de démonstration réalistes (Faker.js) :

```bash
# à venir — Phase 4
npm run seed
```

---

## Commandes Makefile

| Commande | Description |
|---|---|
| `make build` | Construire et démarrer tous les conteneurs |
| `make down` | Arrêter et supprimer les conteneurs |
| `make restart` | Redémarrer tous les conteneurs |
| `make status` | Afficher les logs des conteneurs |

## Routes Disponibles

| Route | Description |
|---|---|
| `/` | Page hero | En cours |
| `/?index=true` | Index des posts (remplace être connecté) | En cours |
| `/auth` | Page d'authentification — connexion ou inscription | En cours |
| `/profile` | Page de profil utilisateur | En cours |

---

## Structure du Projet

```
.
├── webapp/                # Application Next.js (pages, composants, routes API)
├── nginx/                 # Configuration du reverse proxy
├── DrizzleORM/                # Schéma et migrations de la base de données
├── docker-compose.yml
└── Makefile
```

---

## Fonctionnalités

| Module | Description | Priorité |
|---|---|---|
| Authentification | Inscription / connexion, JWT + refresh tokens, rôles Auteur & Lecteur | Essentielle |
| Gestion du contenu | Éditeur rich text, upload d'image, états Brouillon / Publié | Essentielle |
| Commentaires | Soumission par tout utilisateur authentifié, score de sentiment NLP à la soumission | Essentielle |
| Likes | Like / unlike sur posts et commentaires, un like par utilisateur par entité | Essentielle |
| Analyse de sentiment | Appel API NLP à la soumission d'un commentaire, score (0–1) stocké en base | Importante |
| Tableau de bord analytique | Tendances de sentiment, croisement likes × sentiment, posts les plus controversés | Importante |
| Recherche avancée | Full-text search MySQL sur titres et contenus | Importante |
| Seed script | Génération de données fictives via Faker.js, spread intentionnel des sentiments, usage dev / démo uniquement | Secondaire |

---

## Pages & Routes

| Route | Description | Statut |
|---|---|---|
| `/` | Page hero (non connecté) · Index des posts (connecté) | En cours |
| `/auth` | Connexion / Inscription (bascule via état composant) | En cours |
| `/profile` | Profil utilisateur, avatar, bio et posts | En cours |
| `/posts/[id]` | Post individuel avec commentaires | Prévu |
| `/dashboard` | Analytiques auteur (tendances sentiment, likes) | Prévu |

---

## Architecture

```
CLIENT (Navigateur)
      │
      │ HTTPS
      ▼
 Nginx (ports 80/443)
      │
      ▼
 Next.js (conteneur Docker)
 ├── /api/auth
 ├── /api/posts
 ├── /api/comments
 ├── /api/likes
 ├── /api/search
 └── /api/analytics
      │                      │
      ▼ SQL                  ▼ HTTP (sortant)
   MySQL                 API NLP
 (Docker Volume)    (Hugging Face / Google NL)
```

Tous les services tournent dans des conteneurs Docker sur un seul Droplet DigitalOcean. Les données MySQL et les fichiers uploadés sont persistés via des Docker Volumes entre les redémarrages.

---

## Déploiement

L'environnement de production reflète le setup local — le même `docker-compose.yml` est utilisé dans les deux contextes.

**Étapes (manuelles, à faire une seule fois) :**

1. Créer un Droplet DigitalOcean (Ubuntu LTS) et configurer l'accès SSH
2. Installer Docker et Docker Compose sur le serveur
3. Cloner ce dépôt sur le Droplet
4. Configurer les variables d'environnement via `.env` sur le serveur
5. Lancer l'application avec `docker-compose up -d`
6. Configurer Nginx comme reverse proxy
7. Pointer le domaine Namecheap (enregistrement DNS A) vers l'IP publique du Droplet
8. Activer HTTPS — redirection HTTP → HTTPS

> Coût d'hébergement : ~6 $/mois (Droplet), entièrement couvert par les 200 $ de crédits DigitalOcean du GitHub Student Developer Pack. Domaine gratuit 1 an via Namecheap + Student Pack.

---

## Feuille de Route

### Phase 1 — Fondations *(Mois 1–2)*
- [x] Échafaudage de projet (Next.js, Docker Compose, MySQL, DrizzleORM)
- [x] Routage de base (`/`, `/auth`, `/profile`)
- [x] Authentification : JWT + refresh tokens, rôles Auteur / Lecteur
- [x] CRUD : posts et commentaires

### Phase 2 — Engagement *(Mois 2–3)*
- [x] Système de likes (posts et commentaires)
- [x] Upload d'images (stocké dans un Docker Volume)
- [x] Éditeur rich text
- [x] Recherche full-text (basique)

### Phase 3 — Sentiment & Analytiques *(Mois 3–4)*
- [x] Intégration API NLP à la soumission d'un commentaire
- [x] Stockage des scores de sentiment
- [ ] Tableau de bord auteur (tendances sentiment, croisement likes × sentiment, posts controversés)
- [x] Recherche full-text (avancée — indexation native MySQL)

### Phase 4 — Finalisation & Déploiement *(Mois 4–5)*
- [ ] Seed script (Faker.js)
- [ ] Polish UI
- [ ] Déploiement DigitalOcean + Nginx + domaine + HTTPS
- [ ] Architecture Decision Records (ADR)

---

## Variables d'Environnement

| Variable | Description |
|---|---|
| `DATABASE_URL` | Chaîne de connexion MySQL (DrizzleORM) |
| `JWT_SECRET` | Clé secrète pour la signature des JWT |
| `NLP_API_KEY` | Clé API pour le service d'analyse de sentiment |
| `NEXT_PUBLIC_BASE_URL` | URL publique de base de l'application |

Voir `.env.example` pour un modèle complet.

---

## Livrables

- Application déployée et accessible via une URL publique `.me` avec HTTPS
- Dépôt GitHub public avec historique de commits propre
- `docker-compose.yml` permettant un démarrage en une commande en local
- Ce README
- Seed script documenté pour des données de démonstration réalistes
- Architecture Decision Records (ADR)
