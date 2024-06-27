import { MongoClient } from 'mongodb'

export async function initializeDatabase() {
  const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}`
  const client = new MongoClient(url)

  try {
    await client.connect()
    const dbName = 'mongo_t_dat_902'
    const db = client.db(dbName)

    // Création d'une collection de test pour s'assurer que la base de données est initialisée
    await db.createCollection('test_collection')

    console.log(`Database ${dbName} initialized successfully.`)
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  } finally {
    await client.close()
  }
}
