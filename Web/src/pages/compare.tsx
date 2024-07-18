import { useEffect, useState } from "react"
import SearchSelect, { City } from "../components/citiesSearchSelect"
import ProgressBar from "../components/progressBar"
import axios from "axios"
import RecentSales from "../components/recentSales"
import Chart2 from "../components/chart2"
import Chart3 from "../components/chart3"
import Spinner from "../components/spinner"

function Header() {
    return (
      <div className="h-10 mb-4 flex items-center gap-10">
          <p className="text-black font-semibold text-xl">Cities comparison</p>
      </div>
    )
}

function CityInfos(props: {city: City | null, setSelectedCity: (e: City| null) => void}) {
    const [average, setAverage] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [dep, setDep] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (props.city) {
            setLoading(true)
            axios.get(`http://localhost:3000/api/city-averages-by-insee/${props.city.insee}`).then((response) => {
                setAverage(response.data?.avg_price_per_sqm.toFixed(2).toString())
            })
            axios.get(`http://localhost:3000/api/dvf/price-evolution?inseeCode=${props.city.insee}&pieces=1,10&budget=0,1000000`).then((response) => {
                setData(response.data)
                setLoading(false)
            })
            axios.get(`http://localhost:3000/api/squaremeteraverages/department/${props.city.department}`).then((response) => {
                setDep(response.data)
            })
        }
    }, [props.city])

    return (
        <div className="w-[600px] h-full p-2 flex flex-col items-center">
            <SearchSelect setSelectedCity={(e) => props.setSelectedCity(e)} selectedCity={props.city}/>
            {props.city && <div className="w-full mt-5 flex flex-col items-center px-20 gap-3">
                 <div className="w-[500px] border-2 border-gray-200 rounded p-4 flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-sm font-semibold">m2 price</p>
                    <p className="font-semibold text-3xl">{average} €</p>
                </div>
                <div className="w-[500px] h-52 max-h-52 min-h-52 flex gap-0 items-center border-2 border-gray-200 rounded p-4">
                    <div className="flex flex-col w-full text-black items-center min-h-44">
                        <p className="text-sm font-semibold">Average sales price</p>
                        {!loading ? <Chart2 data={data?.priceEvolution}/> : <div className="h-full mt-8 w-full flex items-center justify-center"><Spinner /></div>}
                    </div>
                    <div className="flex flex-col w-full text-black items-center min-h-44">
                        <p className="text-sm font-semibold">m2 price evolution</p>
                        {!loading ? <Chart3 data={dep?.map((el:any) => ({month: el.annee, average_price: el.prix_moyen_m2}))}/> : <div className="h-full mt-8 w-full flex items-center justify-center"><Spinner /></div>}
                    </div>
                </div>
                <div className="flex flex-col w-[500px] text-black items-start bg-white border-2 border-gray-200 p-4 max-h-60 min-h-60 rounded">
                    <p className="text-sm font-semibold">Last sales</p>
                    <div className="w-full min-h-40 overflow-y-auto">
                        {loading ? <div className="h-full mt-8 w-full flex items-center justify-center"><Spinner /></div> :<RecentSales data={data?.lastSales} label={props.city?.name}/>}
                    </div>
                </div>
            </div>}
        </div>
    )
}


export default function ComparePage() {
    const [selectedCity1, setSelectedCity1] = useState<City | null>(null);
    const [selectedCity2, setSelectedCity2] = useState<City | null>(null);

    return (
        <div className="">
            <div className="bg-white rounded-lg p-5 flex flex-col border-2 border-gray-200" style={{height: '95dvh'}}>
                <Header />
                <div className="flex gap h-full w-full">
                    <CityInfos city={selectedCity1} setSelectedCity={(e) => setSelectedCity1(e)}/>
                    <div className="h-full w-1 bg-black/40">
                    </div>
                    <CityInfos city={selectedCity2} setSelectedCity={(e) => setSelectedCity2(e)}/>
                </div>
            </div>
        </div>
    )
}