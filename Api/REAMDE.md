# API Utilisateur avec Node.js, Express, PostgreSQL et Prisma

Ce README vous guidera à travers le processus de configuration et de lancement de l'API en local pour le développement.

## Prérequis

- Node.js (v18 ou supérieur)
- Docker et Docker Compose
- Yarn 

## Configuration

1. Clonez le dépôt et naviguez dans le dossier du projet.

2. Copiez le fichier `.env.example` en `.env` et remplissez les variables d'environnement nécessaires :

   ```
   cp .env.example .env
   ```

   Assurez-vous que les variables suivantes sont correctement définies dans le fichier `.env` :

   ```
   POSTGRES_USER=root
   POSTGRES_PASSWORD=epiket2024
   POSTGRES_DB=mongo_t_dat_902
   POSTGRES_PORT=5432

   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
   ```

## Lancement des services

1. Voici le contenu du README que vous pouvez directement coller dans votre fichier README.md :

```markdown
# MongoDB Docker Setup

Ce guide explique comment configurer et utiliser le conteneur Docker MongoDB pour notre projet.

## Prérequis

- Docker installé sur votre machine
- Docker Compose installé sur votre machine

## Configuration

1. Assurez-vous d'avoir un fichier `.env` à la racine du projet avec les variables suivantes :

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=epiket2024
MONGO_PORT=27017
```

2. Vérifiez que le fichier `docker-compose.mongo.yml` est présent dans le répertoire du projet.

## Construction et démarrage du conteneur

Pour construire et démarrer le conteneur MongoDB, exécutez la commande suivante dans le terminal :

```bash
docker-compose -f docker-compose.mongo.yml up -d
```

Cette commande lancera le conteneur MongoDB en arrière-plan.

## Vérification de l'état du conteneur

Pour vérifier que le conteneur est en cours d'exécution, utilisez :

```bash
docker-compose -f docker-compose.mongo.yml ps
```

## Connexion à la console MongoDB

Pour se connecter à la console MongoDB, suivez ces étapes :

1. Accédez au shell du conteneur :

```bash
docker exec -it mongodb mongo
```

2. Connectez-vous à la base de données admin :

```
use admin
```

3. Authentifiez-vous avec les identifiants root :

```
db.auth("root", "epiket2024")
```

## Utilisation de Mongo Express (interface web)

Si Mongo Express est configuré dans votre `docker-compose.mongo.yml`, vous pouvez y accéder via un navigateur web :

1. Ouvrez votre navigateur et allez à `http://localhost:8081`

2. Utilisez les identifiants suivants :
   - Nom d'utilisateur : `root`
   - Mot de passe : `epiket2024`

## Arrêt du conteneur

Pour arrêter le conteneur MongoDB, utilisez :

```bash
docker-compose -f docker-compose.mongo.yml down
```

## Problèmes courants

- Si vous ne pouvez pas vous connecter, vérifiez que les variables d'environnement dans `.env` correspondent à celles utilisées dans `docker-compose.mongo.yml`.
- Assurez-vous que le port 27017 n'est pas déjà utilisé sur votre machine.

Pour plus d'informations, consultez les logs du conteneur :

```bash
docker-compose -f docker-compose.mongo.yml logs
```
```

Vous pouvez copier ce contenu directement dans votre fichier README.md. Il fournira aux utilisateurs de votre projet toutes les informations nécessaires pour configurer et utiliser le conteneur MongoDB Docker.

2. Installez les dépendances du projet :

   ```
   yarn install
   ```

3. Appliquez les migrations Prisma et générez le client Prisma :

   ```
   npx prisma migrate dev
   npx prisma generate
   ```

4. Lancez le serveur de développement :

   ```
   yarn dev
   ```

   Le serveur devrait maintenant être accessible à l'adresse `http://localhost:3000`.

## Tester l'API

Vous pouvez utiliser Thunder Client, Postman ou curl pour tester l'API. Voici quelques exemples de requêtes :

### Créer un utilisateur

```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "firebase_id": "firebase_123456",
  "email": "user@example.com"
}
```

### Récupérer un utilisateur par ID

```
GET http://localhost:3000/api/users/{id}
```
Remplacez `{id}` par l'ID réel de l'utilisateur.

### Mettre à jour un utilisateur

```
PUT http://localhost:3000/api/users/{id}
Content-Type: application/json

{
  "name": "John",
  "firstname": "Doe"
}
```
Remplacez `{id}` par l'ID réel de l'utilisateur.

## Documentation de l'API

Une documentation Swagger de l'API est disponible à l'adresse `http://localhost:3000/api-docs` lorsque le serveur est en cours d'exécution.

## Commandes utiles

- `yarn dev` : Lance le serveur de développement
- `yarn test` : Exécute les tests
- `yarn build` : Compile le projet
- `yarn start` : Lance le serveur en mode production
- `npx prisma studio` : Ouvre une interface graphique pour explorer et modifier les données de la base de données


## Commandes Prisma 

- npx prisma db pull
npx prisma migrate dev --name add_recent_research
npx prisma migrate deploy
npx prisma generate

# TODO :

- check la route de moyenne , cacher les veleurs pour les villes et tester les endpoints apres le cache . 