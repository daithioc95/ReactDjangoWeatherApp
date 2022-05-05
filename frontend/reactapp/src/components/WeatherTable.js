import React from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import { useState } from 'react';

// Callbacks

const WeatherTable = () => {
const [locations, setLocations] = useState([{"name":"Paris", "id": "1"}, 
                    {"name":"New York", "id": "2"}, 
                    {"name":"London", "id": "3"},
                    {"name":"Sydney", "id": "4"}])

const deleteLocation = (id) => {
  setLocations(locations.filter((location) => location.id !== id))
}

	
      return (
          <div>
            <SearchBar />
            {locations.map(location =>(
            <LocationCard key = {location.id} location = {location.name} 
              onDelete={deleteLocation} />
            ))}
          </div>
      );
    
  }
export default WeatherTable