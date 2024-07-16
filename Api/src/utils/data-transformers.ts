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
export const convertLastSales = (lastSalesRaw: any[]): SaleItem[] => {
  return lastSalesRaw.map(sale => ({
    date_mutation: sale.date_mutation,
    total_valeur_fonciere: Number(sale.total_valeur_fonciere),
    total_pieces: Number(sale.total_pièces ?? 0),
    max_surface_reelle_bati: Number(sale.max_surface_reelle_bati ?? 0),
    type_local_or_lot: sale.type_local_or_lot ?? 'N/A'
  }))
}
