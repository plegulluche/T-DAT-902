import { MongoClient } from 'mongodb'
import { initializeDatabase } from '../../config/database_init'

describe('Database Initialization', () => {
  let client: MongoClient | null = null

  beforeAll(async () => {
    const url = 'mongodb://testuser:testpass@localhost:27017'
    try {
      client = await MongoClient.connect(url)
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
    }
  })

  afterAll(async () => {
    if (client) {
      await client.close()
    }
  })

  beforeEach(async () => {
    if (client) {
      try {
        await client.db('mongo_t_dat_902').dropDatabase()
      } catch (error) {
        console.error('Error dropping database:', error)
      }
    }
  })

  it('should create the database if it does not exist', async () => {
    expect(client).not.toBeNull()
    if (!client) {
      throw new Error('MongoDB client is not initialized')
    }

    const result = await initializeDatabase()
    expect(result).toBe('Database created successfully')

    const dbList = await client.db().admin().listDatabases()
    const dbExists = dbList.databases.some(db => db.name === 'mongo_t_dat_902')
    expect(dbExists).toBe(true)
  })

  it('should return a message if the database already exists', async () => {
    expect(client).not.toBeNull()
    if (!client) {
      throw new Error('MongoDB client is not initialized')
    }

    await initializeDatabase()
    const result = await initializeDatabase()
    expect(result).toBe('Database already exists')
  })

  it('should not create any collections in the database', async () => {
    expect(client).not.toBeNull()
    if (!client) {
      throw new Error('MongoDB client is not initialized')
    }

    await initializeDatabase()
    const db = client.db('mongo_t_dat_902')
    const collections = await db.listCollections().toArray()
    expect(collections.length).toBe(0)
  })
})
