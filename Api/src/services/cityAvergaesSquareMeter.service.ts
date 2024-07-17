/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { PrixMoyenVille } from '../models/prixMoyenVille.model'
const prisma = new PrismaClient()

interface CityAverage {
  insee_code: string
  avg_price_per_sqm: number
}

export const calculateCityAverages = async (): Promise<CityAverage[]> => {
  const cityAverages = await prisma.$queryRaw`
      SELECT
        CONCAT(LPAD(code_departement::text, 2, '0'), LPAD(code_commune::text, 3, '0')) AS insee_code,
        AVG(total_valeur_fonciere::float / NULLIF(max_surface_reelle_bati, 0)) AS avg_price_per_sqm
      FROM dvf_treated
      WHERE max_surface_reelle_bati > 0
      AND total_valeur_fonciere > 0
      GROUP BY insee_code
    `
  return cityAverages as CityAverage[]
}

export const getCityAveragesFromCache = async (): Promise<
  CityAverage[] | null
> => {
  const cachedData = await PrixMoyenVille.findOne()
  if (!cachedData) return null
  return cachedData.data.map((item: any) => ({
    insee_code: String(item.insee_code),
    avg_price_per_sqm: Number(item.avg_price_per_sqm)
  }))
}

export const calculateAndCacheCityAverages = async (): Promise<void> => {
  try {
    await PrixMoyenVille.deleteMany({})
    const resultat: CityAverage[] = await calculateCityAverages()
    await PrixMoyenVille.findOneAndUpdate(
      {},
      {
        lastUpdated: new Date(),
        data: resultat.map(item => ({
          insee_code: item.insee_code,
          avg_price_per_sqm: item.avg_price_per_sqm.toString()
        }))
      },
      { upsert: true, new: true, maxTimeMS: 30000 }
    )
  } catch (error) {
    console.error(
      'Erreur lors de la mise à jour des données dans MongoDB:',
      error
    )
    throw error
  }
}
