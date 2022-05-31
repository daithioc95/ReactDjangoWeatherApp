import React from "react";
import SearchBar from "./SearchBar";
import LocationCard from "./LocationCard";
import { useState } from "react";

const Favourites = () => {
    const [locations, setLocations] = useState([{"name":"Paris", "id": 2988507}])

    const username = localStorage.getItem('user')

    const addFavourite = (location, id) => {
        const newFavourite = { "name": location, "id": id}
        console.log(newFavourite)
        //   setFavourites([...Favourites, newFavourite])
        }
      
    return (
        <div className='container-fluid weather-table-container'>
        <SearchBar favourite="true" />
          <div className='container'>
            <div className='row'>
              <h1>{username}'s Favourites</h1>
              {locations.map(location =>(
            <LocationCard key = {location.id} location = {location.name} favourite="true" />
            ))}
            </div>
          </div>
        </div>
      );
}

export default Favourites