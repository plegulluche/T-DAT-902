import express from 'express'
import { getDvfData } from '../controllers/dvf.controller'
import { getCityOrDepartmentStatsController } from '../controllers/stats.controller'

const router = express.Router()
/**
 * @swagger
 * /api/dvf/price-evolution:
 *   get:
 *     summary: Récupère l'évolution des prix et les dernières ventes pour un code INSEE ou un code département donné
 *     parameters:
 *       - name: inseeCode
 *         in: query
 *         description: Code INSEE (code département + code commune)
 *         required: false
 *         schema:
 *           type: string
 *       - name: departementCode
 *         in: query
 *         description: Code département
 *         required: false
 *         schema:
 *           type: string
 *       - name: pieces
 *         in: query
 *         description: Nombre de pièces principales (format "min,max")
 *         required: true
 *         schema:
 *           type: string
 *       - name: budget
 *         in: query
 *         description: Budget (format "min,max")
 *         required: true
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
 *                 priceEvolution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         format: date-time
 *                       average_price:
 *                         type: number
 *                       sales_count:
 *                         type: integer
 *                 lastSales:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date_mutation:
 *                         type: string
 *                         format: date-time
 *                       valeur_fonciere:
 *                         type: integer
 *                       nombre_pieces_principales:
 *                         type: integer
 *                       surface_reelle_bati:
 *                         type: integer
 *                       type_local:
 *                         type: string
 *             example:
 *               priceEvolution:
 *                 - month: '2023-09-01T00:00:00.000Z'
 *                   average_price: 500000
 *                   sales_count: 1
 *                 - month: '2023-06-01T00:00:00.000Z'
 *                   average_price: 381500
 *                   sales_count: 4
 *               lastSales:
 *                 - date_mutation: '2023-09-07T00:00:00.000Z'
 *                   valeur_fonciere: 500000
 *                   nombre_pieces_principales: 3
 *                   surface_reelle_bati: 104
 *                   type_local: 'Maison'
 *                 - date_mutation: '2023-06-09T00:00:00.000Z'
 *                   valeur_fonciere: 352000
 *                   nombre_pieces_principales: 3
 *                   surface_reelle_bati: 80
 *                   type_local: 'Maison'
 *       '400':
 *         description: Paramètres manquants ou invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/price-evolution', getDvfData)
router.get('/stats/:location', getCityOrDepartmentStatsController)

export default router
