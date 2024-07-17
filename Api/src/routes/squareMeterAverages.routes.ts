import express from 'express'
import * as squareMeterAveragesController from '../controllers/squareMeterAverages.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: SquareMeterAverages
 *     description: Opérations liées aux prix moyens au m²
 *
 * components:
 *   schemas:
 *     SquareMeterAverage:
 *       type: object
 *       properties:
 *         annee:
 *           type: integer
 *           description: L'année du calcul
 *         code_departement:
 *           type: string
 *           description: Le code du département
 *         prix_moyen_m2:
 *           type: string
 *           description: Le prix moyen au m²
 *         _id:
 *           type: string
 *           description: L'identifiant unique de l'enregistrement
 */

/**
 * @swagger
 * /squaremeteraverages/year/{year}/department/{departmentCode}:
 *   get:
 *     summary: Obtenir le prix moyen au m² pour une année et un département
 *     tags: [SquareMeterAverages]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Année (ex 2021)
 *       - in: path
 *         name: departmentCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Code du département (ex 77)
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SquareMeterAverage'
 *       '404':
 *         description: Données non trouvées
 *       '500':
 *         description: Erreur serveur
 */
router.get(
  '/year/:year/department/:departmentCode',
  squareMeterAveragesController.getAverageByYearAndDepartment
)

/**
 * @swagger
 * /squaremeteraverages/year/{year}:
 *   get:
 *     summary: Obtenir les prix moyens au m² pour une année
 *     tags: [SquareMeterAverages]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Année (ex 2022)
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SquareMeterAverage'
 *       '404':
 *         description: Données non trouvées
 *       '500':
 *         description: Erreur serveur
 */
router.get('/year/:year', squareMeterAveragesController.getAveragesByYear)

/**
 * @swagger
 * /squaremeteraverages/department/{departmentCode}:
 *   get:
 *     summary: Obtenir les prix moyens au m² pour un département
 *     tags: [SquareMeterAverages]
 *     parameters:
 *       - in: path
 *         name: departmentCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Code du département (ex 77)
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SquareMeterAverage'
 *       '404':
 *         description: Données non trouvées
 *       '500':
 *         description: Erreur serveur
 */
router.get(
  '/department/:departmentCode',
  squareMeterAveragesController.getAveragesByDepartment
)

export default router
