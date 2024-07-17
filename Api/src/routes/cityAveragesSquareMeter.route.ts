import express from 'express'
import { getCityAverages } from '../controllers/cityAveragesSquareMeter.controller'
const router = express.Router()
router.get('/', getCityAverages)
export default router
