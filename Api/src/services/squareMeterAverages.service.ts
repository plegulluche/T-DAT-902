import { PrixMoyenDepartement } from '../models/prixMoyenDepartement.model'

export const getAverageByYearAndDepartment = async (
  year: number,
  departmentCode: string
) => {
  const result = await PrixMoyenDepartement.findOne(
    {
      data: { $elemMatch: { annee: year, code_departement: departmentCode } }
    },
    { 'data.$': 1 }
  )
  return result?.data[0]
}

export const getAveragesByYear = async (year: number) => {
  const result = await PrixMoyenDepartement.findOne(
    {},
    {
      data: {
        $filter: {
          input: '$data',
          as: 'item',
          cond: { $eq: ['$$item.annee', year] }
        }
      }
    }
  )
  return result?.data
}

export const getAveragesByDepartment = async (departmentCode: string) => {
  const result = await PrixMoyenDepartement.findOne(
    {},
    {
      data: {
        $filter: {
          input: '$data',
          as: 'item',
          cond: { $eq: ['$$item.code_departement', departmentCode] }
        }
      }
    }
  )
  return result?.data
}
