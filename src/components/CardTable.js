import React from 'react';
import WeatherTable from './WeatherTable'
import WeatherTableClass from './WeatherTableClass'
import Favourites from './Favourites'
import axios from 'axios';

class CardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            WeatherLocations: [{"id": 2988507}, 
            {"id": 5128581}, 
            {"id": 2643743},
            {"id": 2147714},
            {"id": 2950159},
            {"id": 1816670},]}
        }
        
        render() {
        if(this.props.type==="WeatherTable")
            return <WeatherTable locationsData={this.state.WeatherLocations} />;
        if(this.props.type==="Favourites")
            return <Favourites />;
  }};

export default CardTable

