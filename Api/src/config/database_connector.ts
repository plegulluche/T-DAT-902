import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'test') {
  dotenv.config()
}

const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'defaultuser'
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'defaultpass'
const port = process.env.MONGO_PORT || '27017'

const url = `mongodb://${username}:${password}@localhost:${port}`
console.log('url', url)

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url)
    console.log('Connected successfully to MongoDB')
    return client.db()
  } catch (error) {
    console.error('Could not connect to MongoDB', error)
    throw error
  }
}
