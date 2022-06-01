import React from "react";
import SearchBar from "./SearchBar";
import LocationCard from "./LocationCard";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Favourites = () => {
    const [favourites, setFavourites] = useState([])

    const username = localStorage.getItem('user')

    useEffect(() => {
      getFaves()},
       // eslint-disable-next-line react-hooks/exhaustive-deps
       []);

       
       function getFaves(){
         if(localStorage.getItem('user')){
           const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";    
           // API call which passes location and gets weather data
           axios.get(`${API_ENDPOINT}getuserfavs/`, 
           { params: { user: localStorage.getItem('user') } })
           .then((res) => {
             const idList = res.data
             setFavourites(idList)
              console.log(favourites)
                })
                .catch((err) => {console.log(err);});
              }
            }
            
            // const addFavourite = (location, id) => {
              //     const newFavourite = { "name": location, "id": id}
    //     console.log(newFavourite)
    //     //   setFavourites([...Favourites, newFavourite])
    //     }
      
    return (
        <div className='container-fluid weather-table-container'>
        <SearchBar favourite="true" />
          <div className='container'>
            <div className='row'>
              <h1>{username}'s Favourites</h1>
              {/* {favourites.map(favourite =>(
            <LocationCard key = {favourite.id} location = {favourite.name} favourite="true" />
            ))} */}
            </div>
          </div>
        </div>
      );
}

export default Favourites