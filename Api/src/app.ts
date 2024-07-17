import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import userRoutes from './routes/user.routes'
import dvfRoutes from './routes/dvf.routes'
import prixMoyenRoutes from './routes/prixMoyen.route'
import squareMeterAveragesRoutes from './routes/squareMeterAverages.routes'
import cityAverageSquareMeterRoutes from './routes/cityAveragesSquareMeter.route'
import recentResearchRoutes from './routes/recentResearch.routes'
import { PrismaClient } from '@prisma/client'
import { calculerEtCacherPrixMoyenM2 } from './services/prixMoyen.service'
import {
  closeMongoConnection,
  connectToMongoDatabase
} from './config/mongo/database.mongo.connector'
import { calculateAndCacheCityAverages } from './services/cityAvergaesSquareMeter.service'

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
app.use('/api/user/recent-search', recentResearchRoutes)
app.use('/api', prixMoyenRoutes)
app.use('/api/squaremeteraverages', squareMeterAveragesRoutes)
app.use('/api/city-averages', cityAverageSquareMeterRoutes)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('T-DAT-902 API')
})

async function startApp() {
  try {
    // Connexion à la base de données MongoDB
    await connectToMongoDatabase()

    // Connexion à la base de données PostgreSQL
    await prisma.$connect()
    console.log('Connected to PostgreSQL')

    // Mettre à jour les données en cache au démarrage
    await calculerEtCacherPrixMoyenM2()
    await calculateAndCacheCityAverages()
    console.log('Données mises en cache dans MongoDB')

    // Mettre à jour les données en cache toutes les 24 heures
    setInterval(
      async () => {
        await calculerEtCacherPrixMoyenM2()
        await calculateAndCacheCityAverages()
        console.log('Données mises à jour dans le cache MongoDB')
      },
      24 * 60 * 60 * 1000
    )

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    }
  } catch (error) {
    console.error("Erreur lors du démarrage de l'application:", error)
  }
}

startApp()

// Gracefully shuting down database connections
process.on('SIGINT', async () => {
  try {
    await closeMongoConnection()
    await prisma.$disconnect()
    console.log('Disconnected from PostgreSQL')
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL', error)
  }
  process.exit(0)
})

export default app
