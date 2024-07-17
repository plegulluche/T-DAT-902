import { Request, Response } from 'express'
import * as prixMoyenService from '../services/prixMoyen.service'

export const getPrixMoyenM2 = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resultat = await prixMoyenService.calculerPrixMoyenM2()
    res.json(resultat)
  } catch (error) {
    console.error('Erreur lors du calcul du prix moyen:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

export const getPrixMoyenM2ParVille = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resultat = await prixMoyenService.calculerPrixMoyenM2ParVille()
    res.json(resultat)
  } catch (error) {
    console.error('Erreur lors du calcul du prix moyen par ville:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

export const getPrixMoyenM2FromMongo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cachedData = await prixMoyenService.getPrixMoyenM2FromCache()
    if (cachedData) {
      res.json(cachedData)
    } else {
      res.status(404).json({ message: 'Données non trouvées dans le cache' })
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données du cache:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
