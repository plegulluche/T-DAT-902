import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import RecentSales from "./recentSales";
import Chart from "./chart";
import axios from "axios";
import Header from "./header";
import M2Price from "./m2Price";
import Spinner from "./spinner";
import { DoubleCheck, InfoCircle, ThumbsUp, WarningTriangle } from "iconoir-react";

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlldWJsYWlzIiwiYSI6ImNrZjZneDRmdDB3bG4yeHA5ZHN5NDNsYm0ifQ.0-ZZSb86hkNjwGqMJEiF2Q';


const tab:any = [
  {"1-2": "1,2"},
  {"2-3": "2,3"},
  {"3-4": "3,4"},
  {"5-6": "5,6"},
  {"6-10": "6,10"},
  {"?": "1,20"},
]

const tab2:any = [
  {"-100k": "0,100000"},
  {"100-200k": "100000,200000"},
  {"200-400k": "200000,400000"},
  {"400-600k": "400000,600000"},
  {"600k-1m": "600000,1000000"},
  {"1m-5m": "1000000,5000000"},
  {"?": "0,5000000"},
]


const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(localStorage.getItem('departement'));
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [label, setLabel] = useState<string>();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [asChange, setAsChange] = useState(false);
  const [densityExpression, setDensityExpression] = useState<any>()

  useEffect(() => {
    if (selectedDepartmentId) {
      const pieces = localStorage.getItem('household');
      const budget = localStorage.getItem('budget');
      if (pieces && budget) {
        const budgetTab = tab2.find((el:any) => el[budget]);
        const value = budgetTab[budget];
        const piecesTab = tab.find((el:any) => el[pieces]);
        const value2 = piecesTab[pieces];
        setLoading(true)
        axios.get(`http://localhost:3000/api/dvf/price-evolution?departementCode=${selectedDepartmentId}&pieces=${value2}&budget=${value}`).then((response) => {
          setData(response.data)
          setLoading(false)
        }
      ).catch((error) => {
        console.error('Error fetching properties:', error);
      });
    }
    }
  }, [selectedDepartmentId, asChange]);

  useEffect(() => {
    if (selectedCity) {
      const pieces = localStorage.getItem('household');
      const budget = localStorage.getItem('budget');
      if (pieces && budget) {
        const budgetTab = tab2.find((el:any) => el[budget]);
        const value = budgetTab[budget];
        const piecesTab = tab.find((el:any) => el[pieces]);
        const value2 = piecesTab[pieces];
        setLoading(true)
        axios.get(`http://localhost:3000/api/dvf/price-evolution?inseeCode=${selectedCity}&pieces=${value2}&budget=${value}`).then((response) => {
          setData(response.data)
          setLoading(false)
        }
      ).catch((error) => {
        console.error('Error fetching properties:', error);
      });
    }
    }
  }, [selectedCity, asChange]);

  useEffect(() => {
    const fetchDensityExpression = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/squaremeteraverages/year/2023`);
        setDensityExpression(response.data);
      } catch (error) {
        console.error('Error fetching density expression:', error);
      }
    };

    fetchDensityExpression();
  }, []);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.2137, 46.2276],
        zoom: 5
      });

      map.on('load', () => {
        map.addSource('departements', {
          type: 'geojson',
          data: '/departements.geojson'
        });

        map.addSource('villes', {
          type: 'geojson',
          data: '/communes.geojson'
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
          maxzoom: 8
        });

        map.addLayer({
          id: 'departements-borders',
          type: 'line',
          source: 'departements',
          layout: {},
          paint: {
            'line-color': '#4D4D4D',
            'line-width': 1.5
          },
          
        });

        map.addLayer({
          id: 'departements-hover',
          type: 'fill',
          source: 'departements',
          layout: {},
          paint: {
            'fill-color': '#FF5733',
            'fill-opacity': 0.4
          },
          filter: ['==', 'code', ''],
          maxzoom: 8
        });

        map.addLayer({
          id: 'city-hover',
          type: 'fill',
          source: 'villes',
          layout: {},
          paint: {
            'fill-color': '#FF5733',
            'fill-opacity': 0.5
          },
          filter: ['==', 'code', ''],
          minzoom: 8
        });

        map.addLayer({
          id: 'city-selected',
          type: 'fill',
          source: 'villes',
          layout: {},
          paint: {
            'fill-color': '#FFC300',
            'fill-opacity': 0.5
          },
          filter: ['==', 'id', ''],
          minzoom: 8
        });

        map.on('mousemove', 'departements-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const hoveredFeature = e.features[0];
            setHovered(hoveredFeature.properties?.code as string);
            map.setFilter('departements-hover', ['==', 'code', hoveredFeature.properties?.code as string]);
          }
        });

        map.on('mousemove', 'ville-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const hoveredFeature = e.features[0];
            setHoveredCity(hoveredFeature.properties?.code as string);
            map.setFilter('city-hover', ['==', 'code', hoveredFeature.properties?.code as string]);
          }
        });

        map.addLayer({
          id: 'departements-selected',
          type: 'fill',
          source: 'departements',
          layout: {},
          paint: {
            'fill-color': '#FFC300',
            'fill-opacity': 0.5
          },
          filter: ['==', 'id', ''],
          maxzoom: 8
        });
  
        map.on('mouseleave', 'departements-layer', () => {
          setHovered(null);
          map.setFilter('departements-hover', ['==', 'code', '']);
        });

        map.on('mouseleave', 'ville-layer', () => {
          setHoveredCity(null);
          map.setFilter('city-hover', ['==', 'code', '']);
        });

        map.on('click', 'departements-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            setSelectedDepartmentId(clickedFeature.properties?.code as string);
            setLabel(clickedFeature.properties?.nom as string);
            map.setFilter('departements-selected', ['==', 'code', clickedFeature.properties?.code as string]);
          }
        });

        map.on('click', 'ville-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            setSelectedCity(clickedFeature.properties?.code as string);
            setLabel(clickedFeature.properties?.nom as string);
            map.setFilter('city-selected', ['==', 'code', clickedFeature.properties?.code as string]);
          }
        });
        map.setFilter('departements-selected', ['==', 'code', localStorage.getItem('departement')]);

      });

      return () => map.remove();
    }
  }, []);

  const getBorderColor = (code: number) => {
    if (!code) return
    if (+code < 2000) return 'border-green-500'
    else if (+code < 3000) return 'border-yellow-500'
    else if (+code < 4000) return 'border-orange-500'
    else return 'border-red-500'
  }

  const getIcon = (code: number) => {
    if (!code) return
    if (+code < 2000) return <div>
      <ThumbsUp className="text-green-500" strokeWidth={2}/>
    </div>
    else if (+code < 3000) return <div>
    <DoubleCheck className="text-yellow-400" strokeWidth={2}/>
  </div>
    else if (+code < 4000) return <div>
    <InfoCircle className="text-orange-400" strokeWidth={2}/>
  </div>
    else return <div>
    <WarningTriangle className="text-red-500" strokeWidth={2}/>
  </div>
  }

  console.log(densityExpression)
  return (
    <div>
      <div className="bg-white rounded-lg p-5 flex flex-col border-2 border-gray-200" style={{height: '95dvh'}}>
        <Header label={label} onChange={() => setAsChange(!asChange)}/>
        <div className="h-full flex gap-6 overflow-hidden">
          <div ref={mapContainerRef} className="rounded-md border-2 border-gray-200 overflow-hidden w-2/3 relative" style={{  height: '100%' }}>
            {!hoveredCity && <div className={`bg-white rounded-lg absolute bottom-3 left-3 p-4 shadow border-4 ${getBorderColor(densityExpression?.find((el:any) => el.code_departement === hovered)?.prix_moyen_m2)}`}>
              {getIcon(densityExpression?.find((el:any) => el.code_departement === hovered)?.prix_moyen_m2)}
              <p className="text-black text-xl">{densityExpression?.find((el:any) => el.code_departement === hovered)?.prix_moyen_m2} € <span className="text-sm">/m2</span></p>
            </div>}
          </div>
          <div className="w-1/3 rounded-lg flex flex-col gap-5">
            <div className="min-h-60 border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
              <p className="text-black/80 font-semibold text-sm">Price evolution on {label}</p>
              {loading ? 
                <div className="h-full flex items-center justify-center w-full text-black">
                  <Spinner />
                </div>
              :
              <Chart data={data?.priceEvolution}/>}
            </div>
            <div className="min-h-[240px] max-h-[240px] border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
              <p className="text-black/80 font-semibold text-sm">Recent sales on {label}</p>
              {loading ? 
                <div className="h-full flex items-center justify-center w-full text-black">
                  <Spinner />
                </div>
              :
              <div className="h-full pb-10">
                <RecentSales data={data?.lastSales} label={label}/>
              </div>}
            </div>
            <M2Price label={label} selectedCity={selectedCity} selectedDepartmentId={selectedDepartmentId}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Map;