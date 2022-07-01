import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import EmptyCards from './EmptyCards';
import { useState } from 'react';
import Login from './Login';

const WeatherTable = (props) => {
  const [dashSearchId, setDashSearchId] = useState(0)
  // Preset locations
  const [locations, setLocations] = useState(props.locationsData)
  // Empty Card slots
  // https://www.saltycrane.com/blog/2019/12/how-remount-react-component-when-prop-changes/#:~:text=To%20remount%20a%20component%20when,key%20attribute%20can%20be%20used.
  const searchedDashLocation = (id) => {
    console.log("searchedDashLocation")
    console.log(id)
    // const newLocation = { "name": location, "id": id }
    if (locations.findIndex(item => item.id === id)!==-1) {
      let index = locations.findIndex(item => item.id === id)
      let items = [...locations];
      let item = {...locations[index]};
      item.id = 'X'+item.id;
      items[index] = item;
      console.log(items[index])
      // setLocations([...locations, item])
      setLocations(items)
      console.log("locations")
      console.log(locations)
      console.log(items)
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
  const searchedDash = (id) => {
    console.log(id)
    setDashSearchId(id);
    setDashSearchId((state) => {
      console.log(state); // "React is awesome!"
      return state;
    });
  }

  return (
    <div className='container-fluid weather-table-container'>
      <div className='container'>
        <SearchBar onAdd = {addLocation} favouriteList={props.favouritesList} dashLocations={locations}  searchedDash = {searchedDash} searchedDashLocation = {searchedDashLocation} />
        {/* searchedDashLocation = {searchedDashLocation} */}
        <div className='row'>
          {/* Map all locations location cards */}
          <h1>Popular Locations</h1>
        {locations.map(location =>(
          <LocationCard key = {location.id} id = {location.id} location = {location.name} 
          onDelete = {deleteLocation} favourite={location.favLocation} fromSearch={false} dashSearchId = {dashSearchId} />
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