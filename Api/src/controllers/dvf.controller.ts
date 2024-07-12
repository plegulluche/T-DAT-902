import { Request, Response } from 'express'

export const getDvfData = (req: Request, res: Response) => {
  const { postalCode, pieces, budget } = req.query

  // Vérification des paramètres
  if (!postalCode || !pieces || !budget) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  // Conversion et validation des paramètres
  const postalCodeStr = String(postalCode)
  const piecesArr = (pieces as string).split(',').map(Number)
  const budgetArr = (budget as string).split(',').map(Number)

  // Vérification du format des paramètres
  if (piecesArr.length !== 2 || budgetArr.length !== 2) {
    return res
      .status(400)
      .json({ error: 'Invalid format for pieces or budget' })
  }

  // Logique à implémenter plus tard
  // Pour l'instant, nous renvoyons simplement les paramètres reçus
  res.json({
    postalCode: postalCodeStr,
    pieces: piecesArr,
    budget: budgetArr,
    message: 'Parameters received successfully'
  })
}
