import express from 'express'
import { getDvfData } from '../controllers/dvf.controller'

const router = express.Router()

router.get('/price-evolution', getDvfData)

export default router
