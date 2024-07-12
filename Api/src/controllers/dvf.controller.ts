import { Request, Response } from 'express'
import { getDvfData as getDvfDataService } from '../services/dvf.service'

export const getDvfData = async (req: Request, res: Response) => {
  try {
    const { postalCode, pieces, budget } = req.query

    // Vérification et conversion des paramètres
    if (!postalCode || !pieces || !budget) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    const postalCodeStr = String(postalCode)
    const piecesArr = (pieces as string).split(',').map(Number)
    const budgetArr = (budget as string).split(',').map(Number)

    if (piecesArr.length !== 2 || budgetArr.length !== 2) {
      return res
        .status(400)
        .json({ error: 'Invalid format for pieces or budget' })
    }

    const result = await getDvfDataService(postalCodeStr, piecesArr, budgetArr)
    res.json(result)
  } catch (error) {
    console.error('Error in getDvfData:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing the request' })
  }
}
