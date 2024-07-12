import { Request, Response } from 'express'
import { getCityOrDepartmentStats } from '../services/dvf.service'

export const getCityOrDepartmentStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { location } = req.params

    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' })
    }

    const result = await getCityOrDepartmentStats(location)
    res.json(result)
  } catch (error) {
    console.error('Error in getCityOrDepartmentStats:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing the request' })
  }
}
