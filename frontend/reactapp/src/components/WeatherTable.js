import React from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';

class WeatherTable extends React.Component {
	
	render() {
      return (
          <div>
            <SearchBar />
            <LocationCard />
          </div>
      );
    }
  }

export default WeatherTable