import { Request, Response } from 'express'
import * as squareMeterAveragesService from '../services/squareMeterAverages.service'

export const getAverageByYearAndDepartment = async (
  req: Request,
  res: Response
) => {
  const { year, departmentCode } = req.params
  try {
    const result =
      await squareMeterAveragesService.getAverageByYearAndDepartment(
        parseInt(year),
        departmentCode
      )
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({ message: 'Données non trouvées' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

export const getAveragesByYear = async (req: Request, res: Response) => {
  const { year } = req.params
  try {
    const result = await squareMeterAveragesService.getAveragesByYear(
      parseInt(year)
    )
    if (result && result.length > 0) {
      res.json(result)
    } else {
      res.status(404).json({ message: 'Données non trouvées' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

export const getAveragesByDepartment = async (req: Request, res: Response) => {
  const { departmentCode } = req.params
  try {
    const result =
      await squareMeterAveragesService.getAveragesByDepartment(departmentCode)
    if (result && result.length > 0) {
      res.json(result)
    } else {
      res.status(404).json({ message: 'Données non trouvées' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
