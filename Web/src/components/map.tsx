import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlldWJsYWlzIiwiYSI6ImNrZjZneDRmdDB3bG4yeHA5ZHN5NDNsYm0ifQ.0-ZZSb86hkNjwGqMJEiF2Q';

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

function Chart() {
  return (
    <AreaChart width={370} height={210} data={data}
    margin={{ top: 20, right: 10, left: -30, bottom: 0 }}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#060512" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#060512" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="name" fontSize={10} color="#BFBFBF" opacity={0.5} tickSize={1}/>
    <YAxis fontSize={8} tickSize={2} opacity={0.5}/>
    <CartesianGrid strokeDasharray="1 1" color="#BFBFBF" />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#060512" fillOpacity={1} fill="url(#colorUv)" />
  </AreaChart>
  )
}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [2.2137, 46.2276],
        zoom: 5
      });

      map.on('load', () => {
        map.addSource('departements', {
          type: 'geojson',
          data: '/departements.geojson'
        });

        map.addSource('regions', {
          type: 'geojson',
          data: '/regions.geojson'
        });

        map.addSource('villes', {
          type: 'geojson',
          data: '/villes.geojson'
        });

        map.addLayer({
          id: 'ville-layer',
          type: 'fill',
          source: 'villes',
          layout: {},
          paint: {
            'fill-color': '#F5B17E',
            'fill-opacity': 0.1
          },
          minzoom: 8,
        });

        map.addLayer({
          id: 'ville-borders',
          type: 'line',
          source: 'villes',
          layout: {},
          paint: {
            'line-color': '#DB782F',
            'line-width': 2,
            "line-opacity": 0.7
          },
          minzoom: 8,
        });

        map.addLayer({
          id: 'departements-layer',
          type: 'fill',
          source: 'departements',
          layout: {},
          paint: {
            'fill-color': '#7EAEEA',
            'fill-opacity': 0.2
          },
          minzoom: 5.5,
          maxzoom: 8
        });
       

        map.addLayer({
          id: 'departements-borders',
          type: 'line',
          source: 'departements',
          layout: {},
          paint: {
            'line-color': '#1E5F8E',
            'line-width': 3
          },
          minzoom: 5.5,
          
        });

        map.addLayer({
          id: 'region-borders',
          type: 'line',
          source: 'regions',
          layout: {},
          paint: {
            'line-color': '#565656',
            'line-width': 2
          },
          minzoom: 3,
          maxzoom: 5.5
        });

      });

      return () => map.remove();
    }
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg p-5 flex flex-col border-2 border-gray-200" style={{height: '95dvh'}}>
        <div className="h-10 mb-4">
          <p className="text-black font-semibold text-xl">Interactiv map research</p>
        </div>
        <div className="h-full flex gap-6 overflow-hidden">
          <div ref={mapContainerRef} className="rounded-md border-2 border-gray-200 overflow-hidden w-2/3" style={{  height: '100%' }}/>
          <div className="w-1/3 rounded-lg flex flex-col justify-between gap-5">
            <div className="h-60 border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
              <p className="text-black/80 font-semibold text-sm">Price evolution</p>
              <Chart />
            </div>
            <div className="h-1/3 bg-gray-100 rounded-lg">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Map;