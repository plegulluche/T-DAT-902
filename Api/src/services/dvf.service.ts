/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { startOfYear, endOfYear } from 'date-fns'
import { PriceEvolutionItem, SaleItem } from '../types/dvf.types'
import {
  convertLastSales,
  convertPriceEvolution
} from '../utils/data-transformers'

const prisma = new PrismaClient()

export const getDvfData = async (
  inseeCode: string,
  departementCode: string,
  pieces: number[],
  budget: number[]
): Promise<{ priceEvolution: PriceEvolutionItem[]; lastSales: SaleItem[] }> => {
  const currentDate = new Date()
  const startDate = startOfYear(new Date(2022, 0, 1)) // 1er janvier 2022
  const endDate =
    currentDate > endOfYear(new Date(2023, 0, 1))
      ? endOfYear(new Date(2023, 0, 1)) // 31 décembre 2023
      : currentDate

  let priceEvolutionRaw
  let lastSalesRaw

  if (inseeCode) {
    const codeDepartement = parseInt(inseeCode.slice(0, 2), 10)
    const codeCommune = parseInt(inseeCode.slice(2), 10)

    priceEvolutionRaw = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', date_mutation) AS month,
        AVG(total_valeur_fonciere) AS average_price,
        COUNT(*) AS sales_count
      FROM dvf_treated
      WHERE
        code_departement = ${codeDepartement.toString()}
        AND code_commune = ${codeCommune}
        AND "total_pièces" BETWEEN ${pieces[0]} AND ${pieces[1]}
        AND total_valeur_fonciere BETWEEN ${budget[0]} AND ${budget[1]}
        AND date_mutation BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE_TRUNC('month', date_mutation)
      ORDER BY month DESC
    `

    lastSalesRaw = await prisma.$queryRaw`
SELECT
  date_mutation,
  total_valeur_fonciere,
  COALESCE("total_pièces", 0) AS "total_pièces",
  COALESCE(max_surface_reelle_bati, 0) AS max_surface_reelle_bati,
  COALESCE(type_local_or_lot, 'N/A') AS type_local_or_lot
FROM dvf_treated
WHERE
  code_departement = ${codeDepartement.toString()}
  AND code_commune = ${codeCommune}
  AND COALESCE("total_pièces", 0) BETWEEN ${pieces[0]} AND ${pieces[1]}
  AND total_valeur_fonciere BETWEEN ${budget[0]} AND ${budget[1]}
  AND date_mutation BETWEEN ${startDate} AND ${endDate}
ORDER BY date_mutation DESC
LIMIT 10
`
  } else if (departementCode) {
    const codeDepartement = parseInt(departementCode, 10).toString()

    priceEvolutionRaw = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', date_mutation) AS month,
        AVG(total_valeur_fonciere) AS average_price,
        COUNT(*) AS sales_count
      FROM dvf_treated
      WHERE
        code_departement = ${codeDepartement}
        AND "total_pièces" BETWEEN ${pieces[0]} AND ${pieces[1]}
        AND total_valeur_fonciere BETWEEN ${budget[0]} AND ${budget[1]}
        AND date_mutation BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE_TRUNC('month', date_mutation)
      ORDER BY month DESC
    `

    lastSalesRaw = await prisma.$queryRaw`
SELECT
  date_mutation,
  total_valeur_fonciere,
  COALESCE("total_pièces", 0) AS "total_pièces",
  COALESCE(max_surface_reelle_bati, 0) AS max_surface_reelle_bati,
  COALESCE(type_local_or_lot, 'N/A') AS type_local_or_lot
FROM dvf_treated
WHERE
  code_departement = ${codeDepartement}
  AND COALESCE("total_pièces", 0) BETWEEN ${pieces[0]} AND ${pieces[1]}
  AND total_valeur_fonciere BETWEEN ${budget[0]} AND ${budget[1]}
  AND date_mutation BETWEEN ${startDate} AND ${endDate}
ORDER BY date_mutation DESC
LIMIT 10
`
  }

  const priceEvolution = convertPriceEvolution(priceEvolutionRaw as any[])
  console.log('Price evolution query result:', priceEvolution)

  const lastSales = convertLastSales(lastSalesRaw as any[])
  console.log('Last sales query result:', lastSales)

  return {
    priceEvolution,
    lastSales
  }
}

export const getCityOrDepartmentStats = async (
  inseeCode: string
): Promise<{ monthlyStats: any[] }> => {
  const startDate = startOfYear(new Date(2022, 0, 1)) // 1er janvier 2022
  const endDate = endOfYear(new Date(2023, 0, 1)) // 31 décembre 2023

  const codeDepartement = parseInt(inseeCode.slice(0, 2), 10)
  const codeCommune = parseInt(inseeCode.slice(2), 10)

  const stats = await prisma.$queryRaw`
    SELECT
      DATE_TRUNC('month', date_mutation) AS month,
      AVG(total_valeur_fonciere) AS average_price,
      MAX(total_valeur_fonciere) AS max_price,
      MIN(total_valeur_fonciere) AS min_price
    FROM dvf_treated
    WHERE
      code_departement = ${codeDepartement.toString()}
      AND code_commune = ${codeCommune}
      AND date_mutation BETWEEN ${startDate} AND ${endDate}
    GROUP BY DATE_TRUNC('month', date_mutation)
    ORDER BY month DESC
  `

  return {
    monthlyStats: (stats as any[]).map(stat => ({
      month: stat.month,
      averagePrice: Number(stat.average_price),
      maxPrice: Number(stat.max_price),
      minPrice: Number(stat.min_price)
    }))
  }
}
