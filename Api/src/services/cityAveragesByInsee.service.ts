/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrixMoyenVille } from '../models/prixMoyenVille.model'

export const getCityAverageByInseeCode = async (
  insee_code: string
): Promise<{ insee_code: string; avg_price_per_sqm: number } | null> => {
  const cachedData = await PrixMoyenVille.findOne()
  if (!cachedData) return null
  const cityAverage = cachedData.data.find(
    (item: any) => item.insee_code === insee_code
  )
  if (!cityAverage) return null
  return {
    insee_code: String(cityAverage.insee_code),
    avg_price_per_sqm: Number(cityAverage.avg_price_per_sqm)
  }
}
