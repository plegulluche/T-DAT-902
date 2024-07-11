import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import { PrismaClient } from '@prisma/client'
import userRoutes from './routes/user.routes'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(helmet())
app.use(express.json())

// ROUTES SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ROUTES API
app.use('/api/users', userRoutes)

// Gracefully shuting down Prisma connection
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit()
})

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// // Connexion à la base de données
// connectToDatabase()
//   .then(() => {
//     console.log('Database connected')
//   })
//   .catch(error => {
//     console.error('Database connection failed', error)
//     process.exit(1)
//   })
// // Creation de la database
// initializeDatabase()
//   .then(() => {
//     console.log('Database created')
//   })
//   .catch(error => {
//     console.error('Database connection failed', error)
//     process.exit(1)
//   })

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
