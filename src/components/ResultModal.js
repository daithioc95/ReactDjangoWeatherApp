// https://www.digitalocean.com/community/tutorials/react-modal-component
// https://blog.bitsrc.io/build-a-simple-modal-component-with-react-1b174c3f5301
import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BsFillBookmarkStarFill } from "react-icons/bs";
// import Rainy from '../assets/RainyCloud.png';

class ResultModal extends React.Component {
  state = {
    isFav: this.props.favourited,
	}
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  HighlightBookmark = () => {
    this.props.updateFave()
    this.setState({
      isFav: !this.state.isFav
    });
  }

  render() {
    if(!this.props.show){
      return null;
    }
    if(this.props.resultData===null){
      return null;
    }
    // Return below when modal to be shown
    if(this.props.resultData!==null){
      return <div className='modal' onClick = {() => {this.onClose();}}>
          {/* Map from resultData passed down */}
          {this.props.resultData.map((city_weather, id) => (
            <div key={id}>
              <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
                <div className="row d-flex justify-content-center px-3">
                  <div id='modal-card' className="card" onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                  }}>
                    <BsFillBookmarkStarFill onClick = {this.HighlightBookmark} locationid={city_weather.id} size={45} className={this.state.isFav ? 'fav-item-icon bookmark-icon' : 'bookmark-icon'} />
                    <span className='text-right position-absolute remove-button'>
                      <FontAwesomeIcon style={{ color: 'red',
                      cursor: 'pointer' }} icon={faTimes} onClick={e => { this.onClose(); }} size="lg" />
                    </span>
                    <h2 className="ml-auto mr-4 mt-3 mb-0">{city_weather.city}</h2>
                    <h2 className="ml-auto mr-4 mt-3 mb-0">{city_weather.country}</h2>
                    <img className='modal-weather-logo' src={process.env.PUBLIC_URL + '/images/' + city_weather.icon} alt="weather icon"></img>
                    {/* <img className='modal-weather-logo' src={'http://openweathermap.org/img/w/'+ city_weather.icon + '.png'} alt="weather icon"></img> */}
                    {/* <img className='modal-weather-logo' src={Rainy} alt="weather icon"></img> */}
                    <div className='row'>
                      <div className='col-6'>
                        <p className="ml-auto mr-4 mb-0 med-font">{city_weather.description}</p>
                        <h1 className="ml-auto mr-4 large-font">{city_weather.temperature}&#176;C</h1>
                      </div>
                      <div className='col-6'>
                        <h5 className="ml-auto mr-4"><b>Pressure:</b> {city_weather.pressure}Pa</h5>
                        <h5 className="ml-auto mr-4"><b>Humidity:</b> {city_weather.humidity}%</h5>
                        <h5 className="ml-auto mr-4"><b>Wind:</b> {city_weather.windspeed}kn</h5>
                      </div>
                    </div>
                    {/* Reversed if else below - updating to dashAdd to differentiate from favourites */}
                    { this.props.dashAdd ?  <span className={this.props.infoButton}>
                      {/* Add location to dashboard icon */}
                      <FontAwesomeIcon style={{ color: '#476985',
                      cursor: 'pointer' }} icon={faPlusCircle} onClick = {() => {this.onClose(); 
                      this.props.onAdd(city_weather.city, city_weather.id);}} size="lg" />
                    </span>: 
                    <></>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
          )}
      </div>;
    }
  }
}

  export default ResultModal