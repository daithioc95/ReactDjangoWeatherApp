import React from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import ResultModal from './ResultModal';

class LocationCard extends React.Component {
	state = {
		details : [],
		city: "",
		show: false,
	}

	showModal = e => {
    console.log("clicked show");
    this.setState({
      show: !this.state.show
    });
  };
	
	componentDidMount() {
		let data ;
      axios.get("http://localhost:8000/apisearchcall/", 
				{ params: { name: this.props.location, } })
          .then((res) => {
            data = res.data;
            this.setState({
              details : data,
              image: data['base'],
              city: "",
              show: false,
            });
            })
            .catch((err) => {console.log('error');});
	}

  render() {
    return(
      <div className='col-lg-4 col-md-6 col-sm-1 locationCards'>
        {this.state.details.map((city_weather, id) => (
          <div key={id}>
            <div class="container px-1 px-md-4 py-5 mx-auto">
              <div class="">
                <div class="card">
                  <span className='text-right position-absolute Remove-Button'><FontAwesomeIcon style={{ color: 'red',
                  cursor: 'pointer' }} icon={faTimes} onClick = {() => this.props.onDelete(city_weather.id)} size="lg" /></span>
                  <h2 class="ml-auto mr-4 mt-3 mb-0">{city_weather.city}</h2>
                  <img className='weather-logo' src={'http://openweathermap.org/img/w/'+ city_weather.icon + '.png'} alt="weather icon"></img>
                  <p class="ml-auto mr-4 mb-0 med-font">{city_weather.brief}</p>
                  <h1 class="ml-auto mr-4 large-font">{city_weather.temperature}&#176;C</h1>
                  <span className='Info-Button'><FontAwesomeIcon style={{ color: '#6582BC',
                  cursor: 'pointer' }} icon={faInfoCircle} onClick = {this.showModal} size="lg" /></span>
                </div>
              </div>
            </div>
          </div>
          )
        )}
        <ResultModal infoButton="Info-Button-Loc" onClose={this.showModal} show={this.state.show} resultData = {this.state.details} />
      </div>
    );
  }
}

export default LocationCard
