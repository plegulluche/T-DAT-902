/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { PrixMoyenDepartement } from '../models/prixMoyenDepartement.model'

const prisma = new PrismaClient()

interface ResultatPrixMoyen {
  annee: number
  code_departement: string
  prix_moyen_m2: string
}

export const calculerPrixMoyenM2 = async (): Promise<ResultatPrixMoyen[]> => {
  const resultat = await prisma.$queryRaw<ResultatPrixMoyen[]>`
    SELECT
      EXTRACT(YEAR FROM date_mutation) AS annee,
      code_departement,
      AVG(total_valeur_fonciere / NULLIF(max_surface_reelle_bati, 0)) AS prix_moyen_m2
    FROM
      dvf_treated
    WHERE
      date_mutation BETWEEN '2021-01-01' AND '2023-12-31'
      AND max_surface_reelle_bati > 0
      AND total_valeur_fonciere > 0
    GROUP BY
      EXTRACT(YEAR FROM date_mutation),
      code_departement
    ORDER BY
      annee,
      code_departement
  `

  return resultat.map(r => ({
    annee: r.annee,
    code_departement: r.code_departement.padStart(2, '0'),
    prix_moyen_m2: parseFloat(r.prix_moyen_m2).toFixed(2)
  }))
}

interface ResultatPrixMoyenVille {
  annee: number
  code_departement: number
  code_commune: number
  prix_moyen_m2: string
}

export const calculerPrixMoyenM2ParVille = async (): Promise<
  Array<{
    annee: number
    code_insee: string
    prix_moyen_m2: string
  }>
> => {
  const resultat = await prisma.$queryRaw<ResultatPrixMoyenVille[]>`
      SELECT
        EXTRACT(YEAR FROM date_mutation) AS annee,
        code_departement,
        code_commune,
        AVG(total_valeur_fonciere / NULLIF(max_surface_reelle_bati, 0)) AS prix_moyen_m2
      FROM
        dvf_treated
      WHERE
        date_mutation BETWEEN '2021-01-01' AND '2023-12-31'
        AND max_surface_reelle_bati > 0
        AND total_valeur_fonciere > 0
      GROUP BY
        EXTRACT(YEAR FROM date_mutation),
        code_departement,
        code_commune
      ORDER BY
        annee,
        code_departement,
        code_commune
    `

  return resultat.map(r => ({
    annee: r.annee,
    code_insee: `${r.code_departement.toString().padStart(2, '0')}${r.code_commune.toString().padStart(3, '0')}`,
    prix_moyen_m2: parseFloat(r.prix_moyen_m2).toFixed(2)
  }))
}

interface PrixMoyenData {
  annee: number
  code_departement: string
  prix_moyen_m2: string
}

export const getPrixMoyenM2FromCache = async (): Promise<
  PrixMoyenData[] | null
> => {
  const cachedData = await PrixMoyenDepartement.findOne()
  if (!cachedData) return null

  // Convertir et valider les données
  return cachedData.data.map((item: any) => ({
    annee: Number(item.annee),
    code_departement: String(item.code_departement),
    prix_moyen_m2: String(item.prix_moyen_m2)
  }))
}

export const calculerEtCacherPrixMoyenM2 = async (): Promise<void> => {
  try {
    // Effacer le document existant
    await PrixMoyenDepartement.deleteMany({})
    const resultat = await calculerPrixMoyenM2()

    await PrixMoyenDepartement.findOneAndUpdate(
      {}, // Filtre vide pour toujours mettre à jour le même document
      {
        lastUpdated: new Date(),
        data: resultat.map(item => ({
          annee: item.annee,
          code_departement: item.code_departement,
          prix_moyen_m2: item.prix_moyen_m2
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
