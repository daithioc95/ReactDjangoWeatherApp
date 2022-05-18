import React from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import EmptyCards from './EmptyCards';
import { useState } from 'react';

// Callbacks

const WeatherTable = () => {
const [locations, setLocations] = useState([{"name":"Paris", "id": 2988507}, 
                    {"name":"New York", "id": 5128581}, 
                    {"name":"London", "id": 2643743},
                    {"name":"Sydney", "id": 2147714},
                    {"name":"Berlin", "id": 2950159},
                    {"name":"Beijing", "id": 1816670},])
const [emptyCards, setEmptyCards] = useState([1,1,1])
const deleteLocation = (id) => {
  console.log(id)
  setLocations(locations.filter((location) => location.id !== id))
  setEmptyCards([...emptyCards, 1])
  console.log('emptyCards')
  console.log(emptyCards)
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
    console.log('emptyCards')
    console.log(emptyCards)
  }
}

      return (
        <div className='container'>
          
            <SearchBar onAdd = {addLocation} />
            <div className='row'>
            {locations.map(location =>(
              <LocationCard key = {location.id} location = {location.name} 
              onDelete = {deleteLocation} />
              ))
            }
            
        {[...Array(emptyCards.length)].map((elementInArray, index) => ( 
          <EmptyCards />
    ) 
)}


          </div>
          </div>
      );
      
    }
export default WeatherTable