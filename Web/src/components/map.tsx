import { Coins, Group, MapPin } from "iconoir-react";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import RecentSales from "./recentSales";
import Chart from "./chart";
// import axios from "axios";

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlldWJsYWlzIiwiYSI6ImNrZjZneDRmdDB3bG4yeHA5ZHN5NDNsYm0ifQ.0-ZZSb86hkNjwGqMJEiF2Q';

function Header() {
  const department = localStorage.getItem('departement');
  const budget = localStorage.getItem('budget');
  const household = localStorage.getItem('household');

  return (
    <div className="h-10 mb-4 flex items-center gap-10">
        <p className="text-black font-semibold text-xl">Interactiv Map</p>
        <div className="text-black/50 flex gap-5 items-center">
          <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center">
            <Group width={16} height={16} strokeWidth={2} />
            <p className="text-sm">{household}</p>
          </div>

          <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center">
            <Coins width={16} height={16} strokeWidth={2} />
            <p className="text-sm">{budget}</p>
          </div>

          <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center">
            <MapPin width={16} height={16} strokeWidth={2} />
            <p className="text-sm">{department}</p>
          </div>
        </div>
    </div>
  )
}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    // axios.get('http://localhost:3000/api/users/id').then((response) => {
    //   console.log(response.data);
    // }
    // ).catch((error) => {
    //   console.error('Error fetching properties:', error);
    //   alert((error as Error).message);
    // });
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
          
        });

       /* map.addLayer({
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
        });*/

        map.addLayer({
          id: 'departements-hover',
          type: 'fill',
          source: 'departements',
          layout: {},
          paint: {
            'fill-color': '#FF5733',
            'fill-opacity': 0.5
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
          filter: ['==', 'id', ''],
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
            setHoveredDepartment(hoveredFeature.properties?.code as string);
            map.setFilter('departements-hover', ['==', 'code', hoveredFeature.properties?.code as string]);
          }
        });

        map.on('mousemove', 'ville-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const hoveredFeature = e.features[0];
            setHoveredCity(hoveredFeature.properties?.com_code as string);
            map.setFilter('city-hover', ['==', 'com_siren_code', hoveredFeature.properties?.com_siren_code as string]);
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
          setHoveredDepartment(null);
          map.setFilter('departements-hover', ['==', 'code', '']);
        });

        map.on('mouseleave', 'ville-layer', () => {
          setHoveredCity(null);
          map.setFilter('city-hover', ['==', 'com_siren_code', '']);
        });

        map.on('click', 'departements-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            setSelectedDepartmentId(clickedFeature.properties?.code as string);
            map.setFilter('departements-selected', ['==', 'code', clickedFeature.properties?.code as string]);
          }
        });

        map.on('click', 'ville-layer', (e) => {
          if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            setSelectedCity(clickedFeature.properties?.com_code as string);
            map.setFilter('city-selected', ['==', 'com_siren_code', clickedFeature.properties?.com_siren_code as string]);
          }
        });

      });

      return () => map.remove();
    }
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg p-5 flex flex-col border-2 border-gray-200" style={{height: '95dvh'}}>
        <Header />
        <div className="h-full flex gap-6 overflow-hidden">
          <div ref={mapContainerRef} className="rounded-md border-2 border-gray-200 overflow-hidden w-2/3" style={{  height: '100%' }}/>
          <div className="w-1/3 rounded-lg flex flex-col gap-5">
            <div className="h-60 border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
              <p className="text-black/80 font-semibold text-sm">Price evolution</p>
              <Chart />
            </div>
            <div className="h-84 border-2 border-gray-200 rounded-md overflow-hidden w-full p-3">
            <p className="text-black/80 font-semibold text-sm">Recent sales</p>
              <RecentSales />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Map;