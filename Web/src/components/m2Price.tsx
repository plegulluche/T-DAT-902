import axios from "axios";
import { useEffect, useState } from "react";

export default function M2Price(props: {label: string| undefined, selectedCity: string | null,  selectedDepartmentId: string | null}) {
    const [average, setAverage] = useState<any>([])

      useEffect(() => {
        if (props.selectedDepartmentId) {
            axios.get(`http://localhost:3000/api/squaremeteraverages/department/${props.selectedDepartmentId}`).then((response) => {
                setAverage(response.data.find((el:any) => el.annee === 2023)?.prix_moyen_m2)
            })
        }
      }, [props.selectedDepartmentId]);

      useEffect(() => {
        if (props.selectedCity) {
            axios.get(`http://localhost:3000/api/city-averages-by-insee/${props.selectedCity}`).then((response) => {
                setAverage(response.data?.avg_price_per_sqm.toFixed(2).toString())
            })
        }
      }, [props.selectedCity]);


    return (
        <div className="min-h-[110px] max-h-[110px] border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
            <p className="text-black/80 font-semibold text-sm">m2 price on {props.label}</p>
            <div className="mt-4">
                <p className="text-black text-3xl font-semibold">{average} €</p>
            </div>
        </div>
    )
}