// https://www.digitalocean.com/community/tutorials/react-modal-component
// https://blog.bitsrc.io/build-a-simple-modal-component-with-react-1b174c3f5301
import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

class ResultModal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    // const resultData = this.props.resultData
    if(!this.props.show){
      return null;
  }

  if(this.props.resultData===null){
    return null;
}

if(this.props.resultData!==null){
    return <div className='modal'>
      {/* const city_weather = this.props.resultData */}
      {this.props.resultData.map((city_weather, id) => (
        <div key={id}>
          <div class="container-fluid px-1 px-md-4 py-5 mx-auto">
              <div class="row d-flex justify-content-center px-3">
                <div id='modal-card' class="card">
                  <span className='text-right position-absolute Remove-Button'><FontAwesomeIcon style={{ color: 'red',
                  cursor: 'pointer' }} icon={faTimes} onClick={e => { this.onClose(); }} size="lg" /></span>
                  <h2 class="ml-auto mr-4 mt-3 mb-0">{city_weather.city}</h2>
                  <h2 class="ml-auto mr-4 mt-3 mb-0">{city_weather.country}</h2>
                  <img className='modal-weather-logo' src={'http://openweathermap.org/img/w/'+ city_weather.icon + '.png'} alt="weather icon"></img>
                  <div className='row'>
                    <div className='col-6'>
                      <p class="ml-auto mr-4 mb-0 med-font">{city_weather.description}</p>
                      <h1 class="ml-auto mr-4 large-font">{city_weather.temperature}&#176;C</h1>
                    </div>
                    <div className='col-6'>
                      <h5 class="ml-auto mr-4">Pressure: {city_weather.pressure}Pa</h5>
                      <h5 class="ml-auto mr-4">Humidity: {city_weather.humidity}%</h5>
                      <h5 class="ml-auto mr-4">Wind: {city_weather.windspeed}kn</h5>
                    </div>
                  </div>
                  <span className={this.props.infoButton}><FontAwesomeIcon style={{ color: 'blue',
                  cursor: 'pointer' }} icon={faPlusCircle} onClick = {() => {this.onClose(); 
                    this.props.onAdd(city_weather.city, city_weather.id);}} size="lg" /></span>
                </div>
              </div>
            </div>
        </div>
			)
		)}
          </div>;
  }
  
}}

  export default ResultModal