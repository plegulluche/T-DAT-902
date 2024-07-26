import React, { useState } from 'react';

export interface City {
  name: string;
  insee: string;
department: string;
}

const cities = [
    { name: "Paris", insee: "75056", department: "75" },
    { name: "Marseille", insee: "13055", department: "13" },
    { name: "Lyon", insee: "69123", department: "69" },
    { name: "Toulouse", insee: "31555", department: "31" },
    { name: "Nice", insee: "06088", department: "06" },
    { name: "Nantes", insee: "44109", department: "44" },
    { name: "Strasbourg", insee: "67482", department: "67" },
    { name: "Montpellier", insee: "34172", department: "34" },
    { name: "Bordeaux", insee: "33063", department: "33" },
    { name: "Lille", insee: "59350", department: "59" },
    { name: "Rennes", insee: "35238", department: "35" },
    { name: "Reims", insee: "51454", department: "51" },
    { name: "Le Havre", insee: "76351", department: "76" },
    { name: "Saint-Étienne", insee: "42218", department: "42" },
    { name: "Toulon", insee: "83137", department: "83" },
    { name: "Angers", insee: "49007", department: "49" },
    { name: "Grenoble", insee: "38185", department: "38" },
    { name: "Dijon", insee: "21231", department: "21" },
    { name: "Nîmes", insee: "30189", department: "30" },
    { name: "Aix-en-Provence", insee: "13001", department: "13" },
    { name: "Saint-Quentin", insee: "02691", department: "02" },
    { name: "Le Mans", insee: "72181", department: "72" },
    { name: "Clermont-Ferrand", insee: "63113", department: "63" },
    { name: "Brest", insee: "29019", department: "29" },
    { name: "Limoges", insee: "87085", department: "87" },
    { name: "Tours", insee: "37261", department: "37" },
    { name: "Amiens", insee: "80021", department: "80" },
    { name: "Metz", insee: "57463", department: "57" },
    { name: "Perpignan", insee: "66136", department: "66" },
    { name: "Besançon", insee: "25056", department: "25" },
    { name: "Orléans", insee: "45234", department: "45" },
    { name: "Mulhouse", insee: "68224", department: "68" },
    { name: "Rouen", insee: "76540", department: "76" },
    { name: "Boulogne-Billancourt", insee: "92012", department: "92" },
    { name: "Caen", insee: "14118", department: "14" },
    { name: "Nancy", insee: "54395", department: "54" },
    { name: "Argenteuil", insee: "95018", department: "95" },
    { name: "Saint-Denis", insee: "93066", department: "93" },
    { name: "Montreuil", insee: "93048", department: "93" },
    { name: "Roubaix", insee: "59512", department: "59" },
    { name: "Avignon", insee: "84007", department: "84" },
    { name: "Poitiers", insee: "86194", department: "86" },
    { name: "Nanterre", insee: "92050", department: "92" },
    { name: "Courbevoie", insee: "92026", department: "92" },
    { name: "Créteil", insee: "94028", department: "94" },
    { name: "Pau", insee: "64445", department: "64" },
    { name: "Cannes", insee: "06029", department: "06" },
    { name: "Antibes", insee: "06004", department: "06" },
    { name: "Saint-Maur-des-Fossés", insee: "94068", department: "94" },
    { name: "Colmar", insee: "68066", department: "68" }
  ];
  


export default function SearchSelect(props: {
    setSelectedCity: (city: City | null) => void;
    selectedCity: City | null;
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    props.setSelectedCity(null);
  };

  const handleSelect = (city: City) => {
    props.setSelectedCity(city);
    setSearchTerm(city.name);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='relative'>
      <input
        type="text"
        className='bg-white w-60 border border-black h-10 rounded text-black px-2'
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher une ville..."
      />
      {!props.selectedCity && searchTerm.length && <div className='absolute w-60'>
        <ul className='bg-white text-black border max-h-80 overflow-y-auto p-2 rounded-b shadow'>
            {filteredCities.map(city => (
                <li className='hover:cursor-pointer py-0.5' key={city.insee} onClick={() => handleSelect(city)}>
                {city.name}
            </li>
            ))}
        </ul>
        </div>}
    </div>
  );
};
