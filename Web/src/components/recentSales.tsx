import moment from "moment";

export default function RecentSales(props: {data: {date_mutation: string, total_pieces: number, total_valeur_fonciere: number}[], label: string | undefined}) {
    return (
      <div className="mt-3 overflow-y-auto h-full w-full">
        <div className="grid grid-cols-3 px-2 border-b pb-1.5">
          <p className="text-xs text-black/30 border-r mr-3">Date</p>
          <p className="text-xs text-black/30 border-r mr-3">Pieces</p>
          <p className="text-xs text-black/30">Price</p>
        </div>
        <div className="h-full overflow-y-auto">
          {props.data?.map((el, index) => (
            <div key={index} className="grid grid-cols-3 px-2 border-b py-2 text-black/60 text-xs">
              <p>{moment(el.date_mutation).format("DD/MM/YYYY")}</p>
              <p>{el.total_pieces} pieces</p>
              <p>{new Intl.NumberFormat('fr-FR').format(el.total_valeur_fonciere)} €</p>
            </div>
          ))}
        </div>
      </div>
    )
  }