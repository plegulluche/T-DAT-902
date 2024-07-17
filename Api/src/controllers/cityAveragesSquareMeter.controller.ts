import { Request, Response } from 'express'
import * as cityAveragesService from '../services/cityAvergaesSquareMeter.service'

export const getCityAverages = async (req: Request, res: Response) => {
  try {
    const cityAverages = await cityAveragesService.getCityAveragesFromCache()
    if (cityAverages) {
      res.json(cityAverages)
    } else {
      const calculatedCityAverages =
        await cityAveragesService.calculateCityAverages()
      res.json(calculatedCityAverages)
    }
  } catch (error) {
    console.error('Error in getCityAverages:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching city averages' })
  }
}
