import React from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import { useState } from 'react';

// Callbacks

const WeatherTable = () => {
const [locations, setLocations] = useState([{"name":"Paris", "id": 2988507}, 
                    {"name":"New York", "id": 5128581}, 
                    {"name":"London", "id": 2643743},
                    {"name":"Sydney", "id": 2147714}])

const deleteLocation = (id) => {
  setLocations(locations.filter((location) => location.id !== id))
}

const addLocation = (location, id) => {
  const newLocation = { "name": location, "id": id}
  if (locations.findIndex(item => item.id === newLocation.id)!==-1) {
    alert("Location already on dashboard")
  }
  else if(locations.length>=6){
    alert("Maximum number of locations on dashboard, please remove and add again")
  }
  else{
    setLocations([...locations, newLocation])
  }
}

      return (
          <div className='container'>
            <SearchBar onAdd = {addLocation} />
            {locations.map(location =>(
            <LocationCard key = {location.id} location = {location.name} 
              onDelete = {deleteLocation} />
            ))}
          </div>
      );
    
  }
export default WeatherTable