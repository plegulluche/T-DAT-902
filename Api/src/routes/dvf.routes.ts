import express from 'express'
import { getDvfData } from '../controllers/dvf.controller'
import { getCityOrDepartmentStatsController } from '../controllers/stats.controller'

const router = express.Router()

router.get('/price-evolution', getDvfData)
router.get('/stats/:location', getCityOrDepartmentStatsController)

export default router
