import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import EmptyCards from './EmptyCards';
import { useState } from 'react';

const WeatherTable = (props) => {
  // Preset locations
  const [locations, setLocations] = useState(props.locationsData)
 const searchedDashLocation = (id) => {
    if (locations.findIndex(item => item.id === id)!==-1) {
      let items = [...locations];
      let index = locations.findIndex(item => item.id === id)
      let item = {...locations[index]};
      item.onDash=true;
      item.keyRef = 'X'+item.keyRef;
      items[index] = item;
      setLocations(items)
    }
  }

  const [emptyCards, setEmptyCards] = useState([1,1,1])
  // Delete specified location and feed empty card slot
  const deleteLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id))
    setEmptyCards([...emptyCards, 1])
  }
  const addLocation = (location, id) => {
    const newLocation = { "name": location, "id": id }
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
        <SearchBar onAdd = {addLocation} favouriteList={props.favouritesList} dashLocations={locations} searchedDashLocation = {searchedDashLocation} />
        <div className='row'>
          {/* Map all locations location cards */}
          <h1>Popular Locations</h1>
        {locations.map(location =>(
          <LocationCard key = {location.keyRef} id = {location.id} 
          onDelete = {deleteLocation} favourite={location.favLocation} fromSearch={false} onDash={location.onDash} />
        ))}
        {/* Map remaning slots with empty cards */}
        {[...Array(emptyCards.length)].map(() => ( 
          <EmptyCards key={Math.random()} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherTable