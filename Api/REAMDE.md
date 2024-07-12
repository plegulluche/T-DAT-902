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

1. Démarrez le conteneur Docker PostgreSQL :

   ```
   docker-compose up -d
   ```

   Cette commande lancera le service PostgreSQL en arrière-plan.

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