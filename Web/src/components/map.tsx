import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = 'VOTRE_CLE_API_MAPBOX';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11', // style de la carte
        center: [2.2137, 46.2276], // coordonnées centrales pour la France
        zoom: 5 // niveau de zoom initial
      });

      return () => map.remove();
    }
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default Map;