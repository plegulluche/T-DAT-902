import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import userRoutes from './routes/user.routes'
import dvfRoutes from './routes/dvf.routes'
import { connectToMongoDatabase } from './config/mongo/database.mongo.connector'
import { initializeMongoDatabase } from './config/mongo/database.mongo.init'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)
app.use(helmet())
app.use(express.json())

// ROUTES SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ROUTES API
app.use('/api/users', userRoutes)
app.use('/api/dvf', dvfRoutes)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

async function startApp() {
  try {
    // Connexion à la base de données MongoDB
    await connectToMongoDatabase()
    console.log('Connected to MongoDB')

    // Initialisation de la base de données MongoDB
    await initializeMongoDatabase()
    console.log('MongoDB initialized')
  } catch (error) {
    console.error('Could not connect to MongoDB')
  }

  try {
    // Connexion à la base de données PostgreSQL
    await prisma.$connect()
    console.log('Connected to PostgreSQL')
  } catch (error) {
    console.error('Could not connect to PostgreSQL')
  }

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
}

startApp()

// Gracefully shuting down database connections
process.on('SIGINT', async () => {
  try {
    await prisma.$disconnect()
    console.log('Disconnected from PostgreSQL')
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL', error)
  }
  process.exit()
})

export default app
