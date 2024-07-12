import { PriceEvolutionItem, SaleItem } from '../types/dvf.types'

function convertBigIntToNumber(value: bigint | number): number {
  return typeof value === 'bigint' ? Number(value) : value
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertPriceEvolution(data: any[]): PriceEvolutionItem[] {
  return data.map(item => ({
    month: new Date(item.month),
    average_price: convertBigIntToNumber(item.average_price),
    sales_count: Number(item.sales_count)
  }))
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertLastSales(data: any[]): SaleItem[] {
  return data.map(item => ({
    date_mutation: new Date(item.date_mutation),
    valeur_fonciere: convertBigIntToNumber(item.valeur_fonciere),
    nombre_pieces_principales: Number(item.nombre_pieces_principales),
    surface_reelle_bati: Number(item.surface_reelle_bati),
    type_local: String(item.type_local)
  }))
}
