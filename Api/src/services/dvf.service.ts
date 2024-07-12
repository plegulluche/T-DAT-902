/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { startOfYear, endOfYear } from 'date-fns'
import { PriceEvolutionItem, SaleItem } from '../types/dvf.types'
import {
  convertPriceEvolution,
  convertLastSales
} from '../utils/data-transformers'

const prisma = new PrismaClient()

export const getDvfData = async (
  postalCode: string,
  pieces: number[],
  budget: number[]
): Promise<{ priceEvolution: PriceEvolutionItem[]; lastSales: SaleItem[] }> => {
  const currentDate = new Date()
  const startDate = startOfYear(new Date(2022, 0, 1)) // 1er janvier 2022
  const endDate =
    currentDate > endOfYear(new Date(2023, 0, 1))
      ? endOfYear(new Date(2023, 0, 1)) // 31 décembre 2023
      : currentDate

  console.log('Query parameters:', {
    postalCode,
    pieces,
    budget,
    startDate,
    endDate
  })

  // Requête pour obtenir l'évolution du prix moyen de vente
  const priceEvolutionRaw = await prisma.$queryRaw`
    SELECT
      DATE_TRUNC('month', date_mutation) AS month,
      AVG(valeur_fonciere) AS average_price,
      COUNT(*) AS sales_count
    FROM stg_dvf
    WHERE
      code_postal = ${parseInt(postalCode)}
      AND nombre_pieces_principales BETWEEN ${pieces[0]} AND ${pieces[1]}
      AND valeur_fonciere BETWEEN ${BigInt(budget[0])} AND ${BigInt(budget[1])}
      AND date_mutation BETWEEN ${startDate} AND ${endDate}
    GROUP BY DATE_TRUNC('month', date_mutation)
    ORDER BY month DESC
  `

  const priceEvolution = convertPriceEvolution(priceEvolutionRaw as any[])
  console.log('Price evolution query result:', priceEvolution)

  // Requête pour obtenir les 10 dernières ventes
  const lastSalesRaw = await prisma.$queryRaw`
    SELECT
      date_mutation,
      valeur_fonciere,
      nombre_pieces_principales,
      surface_reelle_bati,
      type_local
    FROM stg_dvf
    WHERE
      code_postal = ${parseInt(postalCode)}
      AND nombre_pieces_principales BETWEEN ${pieces[0]} AND ${pieces[1]}
      AND valeur_fonciere BETWEEN ${BigInt(budget[0])} AND ${BigInt(budget[1])}
      AND date_mutation BETWEEN ${startDate} AND ${endDate}
    ORDER BY date_mutation DESC
    LIMIT 10
  `

  const lastSales = convertLastSales(lastSalesRaw as any[])
  console.log('Last sales query result:', lastSales)

  return {
    priceEvolution,
    lastSales
  }
}
