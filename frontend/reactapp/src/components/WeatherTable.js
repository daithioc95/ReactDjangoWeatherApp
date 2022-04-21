import React from 'react';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import ResultModal from './ResultModal';

// Callbacks

class WeatherTable extends React.Component {
    state = {
      show: false
    };
    showModal = e => {
      console.log("clicked show");
      this.setState({
        show: !this.state.show
      });
    };
    
  
	render() {
      return (
          <div>
            <SearchBar />
            <LocationCard />
            <ResultModal onClose={this.showModal} show={this.state.show} />
            <button  onClick={e => {
              this.showModal();
              }}
          > show Modal </button>
          </div>
      );
    }
  }
export default WeatherTable