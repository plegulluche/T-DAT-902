import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'test') {
  dotenv.config()
}

export async function initializeDatabase() {
  // Utilisez des valeurs par défaut pour le développement/test
  const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'testuser'
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'testpass'
  const port = process.env.MONGO_PORT || '27017'

  const url = `mongodb://${username}:${password}@localhost:${port}`
  const client = new MongoClient(url)

  try {
    await client.connect()
    const dbName = 'mongo_t_dat_902'

    // Vérifier si la base de données existe
    const dbList = await client.db().admin().listDatabases()
    const dbExists = dbList.databases.some(db => db.name === dbName)

    if (dbExists) {
      console.log(`Database ${dbName} already exists.`)
      return 'Database already exists'
    } else {
      // Créer la base de données en créant une collection temporaire
      const db = client.db(dbName)
      await db.createCollection('temp_collection')

      // Supprimer la collection temporaire
      await db.dropCollection('temp_collection')

      console.log(`Database ${dbName} created successfully.`)
      return 'Database created successfully'
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  } finally {
    await client.close()
  }
}
