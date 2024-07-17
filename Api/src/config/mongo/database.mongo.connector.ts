import mongoose from 'mongoose'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'test') {
  dotenv.config()
}

const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'epiket2024'
const port = process.env.MONGO_PORT || '27017'
const dbName = 'mongo_t_dat_902'

const url = `mongodb://${username}:${password}@localhost:${port}/${dbName}?authSource=admin`

export async function connectToMongoDatabase() {
  try {
    await mongoose.connect(url)
    console.log('Connected successfully to MongoDB using Mongoose')
  } catch (error) {
    console.error('Could not connect to MongoDB', error)
    throw error
  }
}

export async function closeMongoConnection() {
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
}
