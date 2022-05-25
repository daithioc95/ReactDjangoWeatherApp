import React from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import ResultModal from './ResultModal';
// https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks

class LocationCard extends React.Component {
	state = {
		details : [],
		city: "",
		show: false,
	}
  
	showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
	
  componentDidMount() {
    this.interval = setTimeout(() => {
      let data ;
      // API call which passes location and gets weather data
      axios.get(`https://react-django-weather-app.herokuapp.com/apisearchcall/`, 
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
    }, .1);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {
    return(
      <div className='col-lg-4 col-md-6 col-sm-1 locationCards'>
        {this.state.details.map((city_weather, id) => (
          <div key={id}>
            <div className="container px-1 px-md-4 py-5 mx-auto">
              <div className="">
                <div className="card">
                  <span className='text-right position-absolute remove-button'>
                    {/* Delete location icon */}
                    <FontAwesomeIcon style={{ color: 'red',
                    cursor: 'pointer' }} icon={faTimes} onClick = {() => this.props.onDelete(city_weather.id)} size="lg" />
                  </span>
                  <h2 className="ml-auto mr-4 mt-3 mb-0">{city_weather.city}</h2>
                  <img className='weather-logo' src={'http://openweathermap.org/img/w/'+ city_weather.icon + '.png'} alt="weather icon"></img>
                  <p className="ml-auto mr-4 mb-0 med-font">{city_weather.brief}</p>
                  <h1 className="ml-auto mr-4 large-font">{city_weather.temperature}&#176;C</h1>
                  <span className='info-button'>
                    {/* More info mosal icon */}
                    <FontAwesomeIcon style={{ color: '#6582BC',
                    cursor: 'pointer' }} icon={faInfoCircle} onClick = {this.showModal} size="lg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          )
        )}
        {/* Mosal to show when more info selected */}
        <ResultModal infoButton="info-button-loc" onClose={this.showModal} show={this.state.show} resultData = {this.state.details} />
      </div>
    );
  }
}

export default LocationCard
