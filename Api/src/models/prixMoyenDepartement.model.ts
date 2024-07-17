import mongoose from 'mongoose'

const prixMoyenDepartementSchema = new mongoose.Schema({
  lastUpdated: { type: Date, default: Date.now },
  data: [
    {
      annee: Number,
      code_departement: String,
      prix_moyen_m2: String
    }
  ]
})

export const PrixMoyenDepartement = mongoose.model(
  'PrixMoyenDepartement',
  prixMoyenDepartementSchema
)
