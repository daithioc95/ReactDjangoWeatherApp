import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import EmptyCards from './EmptyCards';
import { useState } from 'react';
import Login from './Login';

const WeatherTable = () => {

  // Preset locations
  const [locations, setLocations] = useState([{"name":"Paris", "id": 2988507}, 
                      {"name":"New York", "id": 5128581}, 
                      {"name":"London", "id": 2643743},
                      {"name":"Sydney", "id": 2147714},
                      {"name":"Berlin", "id": 2950159},
                      {"name":"Beijing", "id": 1816670},])
  // Empty Card slots
  const [emptyCards, setEmptyCards] = useState([1,1,1])
  // Delete specified location and feed empty card slot
  const deleteLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id))
    setEmptyCards([...emptyCards, 1])
  }
  const addLocation = (location, id) => {
    const newLocation = { "name": location, "id": id}
    if (locations.findIndex(item => item.id === newLocation.id)!==-1) {
      alert("Location already on dashboard")
    }
    else if(locations.length>=9){
      alert("Maximum number of locations on dashboard, please remove and add again")
    }
    else{
      setLocations([...locations, newLocation])
      emptyCards.pop(1)
    }
  }

  return (
    <div className='container-fluid weather-table-container'>
      <div className='container'>
        <SearchBar onAdd = {addLocation} />
        <div className='row'>
          {/* Map all locations location cards */}
          <h1>Locations</h1>
        {locations.map(location =>(
          <LocationCard key = {location.id} location = {location.name} 
          onDelete = {deleteLocation} />
        ))}
        {/* Map remaning slots with empty cards */}
        {[...Array(emptyCards.length)].map(() => ( 
          <EmptyCards key={Math.random()} />
        ))}
        </div>
      </div>
      {/* <Login setToken={setToken} setUser={setUser} setMessage={setMessage} /> */}
      {/* {message} */}
    </div>
  );
}

export default WeatherTable