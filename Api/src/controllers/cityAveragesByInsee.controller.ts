import { Request, Response } from 'express'
import * as cityAveragesByInseeService from '../services/cityAveragesByInsee.service'

export const getCityAverageByInseeCode = async (
  req: Request,
  res: Response
) => {
  try {
    const insee_code = req.params.insee_code
    const cityAverage =
      await cityAveragesByInseeService.getCityAverageByInseeCode(insee_code)
    if (cityAverage) {
      res.json(cityAverage)
    } else {
      res
        .status(404)
        .json({ error: 'City average not found for the provided INSEE code' })
    }
  } catch (error) {
    console.error('Error in getCityAverageByInseeCode:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching city average' })
  }
}
