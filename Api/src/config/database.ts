import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}`
console.log(url)
const client = new MongoClient(url)

export async function connectToDatabase() {
  try {
    await client.connect()
    console.log('Connected successfully to MongoDB')
    return client.db('yourdbname') // Remplacez 'yourdbname' par le nom de votre base de données
  } catch (error) {
    console.error('Could not connect to MongoDB', error)
    process.exit(1)
  }
}
