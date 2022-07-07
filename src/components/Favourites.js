import React from "react";
import SearchBar from "./SearchBar";
import LocationCard from "./LocationCard";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Favourites = (props) => {
    const [favourites, setFavourites] = useState([])

    const username = localStorage.getItem('user')

    const getData = async () => {
      const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";    
      const { data } = await axios.get(`${API_ENDPOINT}getuserfavs/`, 
          { params: { user: localStorage.getItem('user'),
          // added so that we can return a list only for homepage
          favoutitesPage: "true" } })
          if(data==="No Favourites"){
            setFavourites(null)
          }
          else{
            setFavourites(data)
          }
    };
    useEffect(() => {
      getData();
    }, []);
      
   
      return (
        <div className='container-fluid weather-table-container'>
        {/* <SearchBar favourite="true" /> */}
          <div className='container'>
            <div className='row'>
              <h1>{username}'s Favourites</h1>
              {/* <h1>{this.state.favourites}</h1> */}
              {favourites===null ? <h3>No favourites saved, to add favourites here, click the bookmark icon</h3> : favourites.map(favourite =>(
            <LocationCard key = {favourite.id} id = {favourite.id} favourite={true} />
            ))}
            </div>
          </div>
        </div>
      );
}

export default Favourites