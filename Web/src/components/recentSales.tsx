
export default function RecentSales() {
    return (
      <div className="mt-3">
        <div className="grid grid-cols-3 px-2 border-b pb-1.5">
          <p className="text-xs text-black/30 border-r mr-3">Date</p>
          <p className="text-xs text-black/30 border-r mr-3">Location</p>
          <p className="text-xs text-black/30">Price</p>
        </div>
        <div className="grid grid-cols-3 px-2 border-b py-2 text-black/60 text-xs">
          <p>11/03/2023</p>
          <p>Paris</p>
          <p>452 000 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 border-b py-2 text-black/60 text-xs">
          <p>10/03/2023</p>
          <p>Marseille</p>
          <p>145 000 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 border-b py-2 text-black/60 text-xs">
          <p>10/03/2023</p>
          <p>Dijon</p>
          <p>675 000 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 border-b py-2 text-black/60 text-xs">
          <p>09/03/2023</p>
          <p>Le Mans</p>
          <p>321 800 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 py-2 border-b text-black/60 text-xs">
          <p>08/03/2023</p>
          <p>Grenobre</p>
          <p>181 200 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 py-2 border-b text-black/60 text-xs">
          <p>07/03/2023</p>
          <p>Caen</p>
          <p>833 000 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 py-2 border-b text-black/60 text-xs">
          <p>06/03/2023</p>
          <p>Paris</p>
          <p>433 700 €</p>
        </div>
        <div className="grid grid-cols-3 px-2 py-2 border-b text-black/60 text-xs">
          <p>05/03/2023</p>
          <p>La Rochelle</p>
          <p>99 500 €</p>
        </div>
      </div>
    )
  }