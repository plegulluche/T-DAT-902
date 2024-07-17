import moment from "moment";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

  
export default function Chart(props: {data: {month: any, average_price: string}[]}) {
  const [formatted, setFormatted] = useState<any>()

  useEffect(() => {
    if (props.data) {
      const tmp = props.data?.map(el => ({month: moment(el.month).format("MM/YY"), average_price: el.average_price}))
      const sorted = tmp.sort((a, b) => moment(a.month).get("date") - moment(b.month).get("date"))
      setFormatted(sorted)
    }
  }, [props.data])

  if (!formatted) return <></>
  return (
      <AreaChart width={370} height={210} data={formatted}
      margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#2E2E2E" stopOpacity={0.7}/>
          <stop offset="95%" stopColor="#2E2E2E" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="month" fontSize={10} color="#BFBFBF" opacity={0.5} tickSize={1}/>
      <YAxis fontSize={7} tickSize={2} opacity={0.5}/>
      <CartesianGrid strokeDasharray="1 0" color="#DCDCDC" opacity={0.2} />
      <Tooltip />
      <Area type="monotone" dataKey="average_price" stroke="#2E2E2E" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
    )
  }
  