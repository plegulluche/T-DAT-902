import express from 'express'
import {
  getPrixMoyenM2,
  getPrixMoyenM2FromMongo,
  getPrixMoyenM2ParVille
} from '../controllers/prixMoyen.controller'

const router = express.Router()
/**
 * @swagger
 * /prix-moyen-m2:
 *   get:
 *     summary: Obtenir le prix moyen au m² par département et par année
 *     description: Renvoie le prix moyen au m² pour chaque département français, calculé par année entre 2021 et 2023.
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   annee:
 *                     type: integer
 *                     description: L'année du calcul
 *                     example: 2021
 *                   code_departement:
 *                     type: string
 *                     description: Le code du département (sur 2 caractères)
 *                     example: "01"
 *                   prix_moyen_m2:
 *                     type: string
 *                     description: Le prix moyen au m² pour le département et l'année donnés
 *                     example: "2500.50"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Erreur serveur"
 */
router.get('/prix-moyen-m2', getPrixMoyenM2)
/**
 * @swagger
 * /prix-moyen-m2-par-ville:
 *   get:
 *     summary: Obtenir le prix moyen au m² par ville et par année
 *     description: Renvoie le prix moyen au m² pour chaque ville française, calculé par année entre 2021 et 2023.
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   annee:
 *                     type: integer
 *                     description: L'année du calcul
 *                     example: 2021
 *                   code_insee:
 *                     type: string
 *                     description: Le code INSEE de la ville
 *                     example: "01001"
 *                   prix_moyen_m2:
 *                     type: string
 *                     description: Le prix moyen au m² pour la ville et l'année donnés
 *                     example: "2500.50"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Erreur serveur"
 */
router.get('/prix-moyen-m2-par-ville', getPrixMoyenM2ParVille)

/**
 * @swagger
 * /mongo/prix-moyen-m2-departements:
 *   get:
 *     summary: Obtenir le prix moyen au m² par département et par année depuis le cache MongoDB
 *     description: Renvoie les données cachées du prix moyen au m² pour chaque département français, calculé par année.
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   annee:
 *                     type: integer
 *                     description: L'année du calcul
 *                     example: 2021
 *                   code_departement:
 *                     type: string
 *                     description: Le code du département (sur 2 caractères)
 *                     example: "01"
 *                   prix_moyen_m2:
 *                     type: string
 *                     description: Le prix moyen au m² pour le département et l'année donnés
 *                     example: "2500.50"
 *       404:
 *         description: Données non trouvées dans le cache
 *       500:
 *         description: Erreur serveur
 */
router.get('/mongo/prix-moyen-m2-departements', getPrixMoyenM2FromMongo)
export default router
