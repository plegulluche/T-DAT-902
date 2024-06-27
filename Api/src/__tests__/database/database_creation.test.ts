import { MongoClient } from 'mongodb'
import { initializeDatabase } from '../../config/database_init'

describe('Database Initialization', () => {
  let client: MongoClient

  beforeAll(async () => {
    // Connexion à la base de données avant tous les tests
    const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}`
    client = await MongoClient.connect(url)
  })

  afterAll(async () => {
    // Fermeture de la connexion après tous les tests
    await client.close()
  })

  it('should create the database if it does not exist', async () => {
    const dbName = 'mongo_t_dat_902'

    // Appel de la fonction à tester
    await initializeDatabase()

    // Vérification que la base de données a été créée
    const dbList = await client.db().admin().listDatabases()
    const dbExists = dbList.databases.some(db => db.name === dbName)
    expect(dbExists).toBe(true)

    // Vérification que la base de données est accessible
    const db = client.db(dbName)
    expect(db).toBeDefined()

    // Optionnel : vérification de la création d'une collection test
    const collections = await db.listCollections().toArray()
    const testCollectionExists = collections.some(
      col => col.name === 'test_collection'
    )
    expect(testCollectionExists).toBe(true)
  })

  it('should not throw an error if the database already exists', async () => {
    // Appel de la fonction à tester une seconde fois
    await expect(initializeDatabase()).resolves.not.toThrow()
  })
})
