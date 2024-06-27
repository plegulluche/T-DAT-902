import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import { connectToDatabase } from './config/database'

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Connexion à la base de données
connectToDatabase()
  .then(() => {
    console.log('Database connected')
  })
  .catch(error => {
    console.error('Database connection failed', error)
    process.exit(1)
  })

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
