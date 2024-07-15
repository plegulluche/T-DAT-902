export interface PriceEvolutionItem {
  month: Date
  average_price: number
  sales_count: number
}

export interface SaleItem {
  date_mutation: Date
  valeur_fonciere: number
  nombre_pieces_principales: number
  surface_reelle_bati: number
  type_local: string
}
