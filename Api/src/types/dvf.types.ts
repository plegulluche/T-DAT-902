export type PriceEvolutionItem = {
  month: Date
  average_price: number
  sales_count: number
}

export type SaleItem = {
  date_mutation: Date
  total_valeur_fonciere: number
  total_pieces: number
  max_surface_reelle_bati: number
  type_local_or_lot: string
}
