import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import EmptyCards from './EmptyCards';
import { useState } from 'react';
import Login from './Login';

class WeatherTableClass extends React.Component {
  state = {
    locations: this.props.locationsData,
    emptyCards: [1,1,1]
	}
  
  render(){
  // Delete specified location and feed empty card slot
  const deleteLocation = (id) => {
    this.setState({locations: this.state.locations.filter((location) => location.id !== id)})
    this.setState({emptyCards: [...this.state.emptyCards, 1]})
  }
  const addLocation = (location, id) => {
    const newLocation = { "name": location, "id": id}
    if (this.state.locations.findIndex(item => item.id === newLocation.id)!==-1) {
      alert("Location already on dashboard")
    }
    else if(this.state.locations.length>=9){
      alert("Maximum number of locations on dashboard, please remove and add again")
    }
    else{
      this.setState({locations: [...this.state.locations, newLocation]})
      this.setState({emptyCards: this.state.emptyCards.pop(1)})
    }
  }
  return (
    <div className='container-fluid weather-table-container'>
      <div className='container'>
        <SearchBar onAdd = {addLocation} />
        <div className='row'>
          {/* Map all locations location cards */}
          <h1>Popular Locations</h1>
        {this.state.locations.map(location =>(
          <LocationCard key = {location.id} id = {location.id} location = {location.name} 
          onDelete = {deleteLocation} />
        ))}
        {/* Map remaning slots with empty cards */}
        {[...Array(this.state.emptyCards.length)].map(() => ( 
          <EmptyCards key={Math.random()} />
        ))}
        </div>
      </div>
      {/* <Login setToken={setToken} setUser={setUser} setMessage={setMessage} /> */}
      {/* {message} */}
    </div>
  );
}
}
export default WeatherTableClass