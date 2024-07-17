import mongoose from 'mongoose'

const prixMoyenVilleSchema = new mongoose.Schema({
  lastUpdated: { type: Date, default: Date.now },
  data: [
    {
      insee_code: String,
      avg_price_per_sqm: String
    }
  ]
})

export const PrixMoyenVille = mongoose.model(
  'PrixMoyenVille',
  prixMoyenVilleSchema
)
