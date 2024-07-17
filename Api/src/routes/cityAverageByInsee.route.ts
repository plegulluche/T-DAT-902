import express from 'express'
import { getCityAverageByInseeCode } from '../controllers/cityAveragesByInsee.controller'
const router = express.Router()
/**
 * @swagger
 * /api/city-averages-by-insee/{insee_code}:
 *   get:
 *     summary: Récupérer le prix moyen au mètre carré pour une ville par code INSEE
 *     description: Renvoie le prix moyen au mètre carré pour une ville spécifiée par son code INSEE à partir des données mises en cache dans MongoDB.
 *     tags:
 *       - Moyennes des villes
 *     parameters:
 *       - in: path
 *         name: insee_code
 *         required: true
 *         description: Code INSEE de la ville
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insee_code:
 *                   type: string
 *                   description: Code INSEE de la ville
 *                 avg_price_per_sqm:
 *                   type: number
 *                   description: Prix moyen au mètre carré pour la ville
 *       '404':
 *         description: Ville non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 */
router.get('/:insee_code', getCityAverageByInseeCode)
export default router
