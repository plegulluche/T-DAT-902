import { Request, Response } from 'express'
import { getCityOrDepartmentStats } from '../services/dvf.service'

export const getCityOrDepartmentStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { inseeCode } = req.params
    if (!inseeCode) {
      return res.status(400).json({ error: 'INSEE code parameter is required' })
    }
    const result = await getCityOrDepartmentStats(inseeCode)
    res.json(result)
  } catch (error) {
    console.error('Error in getCityOrDepartmentStats:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing the request' })
  }
}
