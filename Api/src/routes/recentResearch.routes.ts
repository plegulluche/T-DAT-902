import express from 'express'
import { RecentResearchController } from '../controllers/recentResearch.controller'
import { RecentResearchService } from '../services/recentResearch.service'

const router = express.Router()
const recentResearchService = new RecentResearchService()
const recentResearchController = new RecentResearchController(
  recentResearchService
)
/**
 * @swagger
 * /api/user/recent-search:
 *   post:
 *     summary: Créer une nouvelle recherche récente
 *     tags: [RecentResearch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecentResearchInput'
 *           example:
 *             roomMin: 2
 *             roomMax: 4
 *             priceMin: 100000
 *             priceMax: 300000
 *             department: 75
 *     responses:
 *       201:
 *         description: Recherche récente créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecentResearch'
 *       500:
 *         description: Erreur serveur
 * /api/user/recent-search/{id}:
 *   get:
 *     summary: Obtenir une recherche récente par son ID
 *     tags: [RecentResearch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recherche récente
 *     responses:
 *       200:
 *         description: Détails de la recherche récente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecentResearch'
 *       404:
 *         description: Recherche récente non trouvée
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour une recherche récente
 *     tags: [RecentResearch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recherche récente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRecentResearchInput'
 *           example:
 *             roomMin: 3
 *             roomMax: 5
 *             priceMin: 150000
 *             priceMax: 350000
 *             department: 92
 *     responses:
 *       200:
 *         description: Recherche récente mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecentResearch'
 *       404:
 *         description: Recherche récente non trouvée
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer une recherche récente
 *     tags: [RecentResearch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recherche récente
 *     responses:
 *       200:
 *         description: Recherche récente supprimée avec succès
 *       404:
 *         description: Recherche récente non trouvée
 *       500:
 *         description: Erreur serveur
 * /api/user/{userId}/recent-search:
 *   get:
 *     summary: Obtenir les recherches récentes d'un utilisateur
 *     tags: [RecentResearch]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des recherches récentes de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecentResearch'
 *       500:
 *         description: Erreur serveur
 */

router.post('/', (req, res) =>
  recentResearchController.createRecentResearch(req, res)
)
router.get('/:id', (req, res) =>
  recentResearchController.getRecentResearchById(req, res)
)
router.put('/:id', (req, res) =>
  recentResearchController.updateRecentResearch(req, res)
)
router.delete('/:id', (req, res) =>
  recentResearchController.deleteRecentResearch(req, res)
)
router.get('/user/:userId', (req, res) =>
  recentResearchController.getRecentResearchByUserId(req, res)
)

export default router
