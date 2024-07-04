import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      "name": "May",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "June",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "July",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "September",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "October",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "November",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "December",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

  
export default function Chart() {
    return (
      <AreaChart width={370} height={210} data={data}
      margin={{ top: 20, right: 10, left: -30, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#2E2E2E" stopOpacity={0.7}/>
          <stop offset="95%" stopColor="#2E2E2E" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="name" fontSize={10} color="#BFBFBF" opacity={0.5} tickSize={1}/>
      <YAxis fontSize={8} tickSize={2} opacity={0.5}/>
      <CartesianGrid strokeDasharray="1 0" color="#DCDCDC" opacity={0.2} />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#2E2E2E" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
    )
  }
  