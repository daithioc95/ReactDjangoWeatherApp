import React from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import ResultModal from './ResultModal';
import { BsFillBookmarkStarFill } from "react-icons/bs";
// import Rainy from '../assets/RainDay.png';
// https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks

class LocationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      details : [],
      city: "",
      show: this.props.fromSearch,
      isFav: this.props.favourite,
    }
  }
  
	showModal = e => {
    console.log("triggered")
    this.setState({
      show: !this.state.show
    });
  };
	
  componentDidMount() {
    if(this.props.onDash){
      this.showModal()
    }
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";
    this.interval = setTimeout(() => {
      let data ;
      // API call which passes location and gets weather data
      axios.get(`${API_ENDPOINT}apisearchcall/`, 
				{ params: { id: this.props.id, } })
          .then((res) => {
            data = res.data;
            this.setState({
              details : data,
              image: data['base'],
              city: "",
            });
            })
            .catch((err) => {console.log('error');});
    }, .1);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  setIsFav = () => {
    let CardId = this.props.id
    this.setState({
      isFav: !this.state.isFav
    });
    this.props.refreshFavs(CardId)
    if(localStorage.getItem('user')){
      const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";    
      this.interval = setTimeout(() => {
          // API call which passes location and gets weather data
          axios.post(`${API_ENDPOINT}getuserfavs/`, 
          { params: { id: CardId, add: this.state.isFav, user: localStorage.getItem('user') } })
              .then((res) => {
                console.log(res)
                })
                .catch((err) => {console.log('error');});
        }, .1);
    }
    else{
      alert("Please Login or register to save a favourite")
    }
  }


  render() {
    // if from search and not on dash we need the modal only
    if(this.props.fromSearch && !this.props.onDash){
      return(
        <ResultModal infoButton={this.props.onDash ? "info-button-loc" : "info-button"} onClose={this.showModal} show={this.state.show} resultData = {this.state.details} favourited = {this.state.isFav} updateFave={this.setIsFav} dashAdd={true} onAdd={this.props.onAdd} />
      )
    }
    else{
      return(
        <div className='col-lg-4 col-md-6 col-sm-1 locationCards'>
          {this.state.details.map((city_weather, id) => (
            <div key={id}>
              <div className="container px-1 px-md-4 py-5 mx-auto">
                <div className="">
                  <div className="card">
                      <BsFillBookmarkStarFill onClick = {() => this.setIsFav()} locationid={city_weather.id} size={45} className={this.state.isFav ? 'fav-item-icon bookmark-icon' : 'bookmark-icon'} />
                    
                      {/* Delete location icon */}
                      {/* { this.props.favourite==="true" ? <></>
            : 
            <span className='text-right position-absolute remove-button'><FontAwesomeIcon className='remove-icon fa-lg' icon={faTimes} onClick = {() => this.props.onDelete(city_weather.id)} />
                    </span> } */}
                    <span className='text-right position-absolute remove-button'><FontAwesomeIcon className='remove-icon fa-lg' icon={faTimes} onClick = {() => this.props.onDelete(city_weather.id)} />
                    </span>
                      
                    <h2 className="ml-auto mr-4 mt-3 mb-0">{city_weather.city}</h2>
                    <img className='weather-logo' src={process.env.PUBLIC_URL + '/images/' + city_weather.icon} alt="weather icon"></img>
                    {/* <img className='weather-logo' src={sunny} alt="weather icon"></img> */}
                    {/* <img className='weather-logo' src={Rainy} alt="weather icon"></img> */}
                    <p className="ml-auto mr-4 mb-0 med-font">{city_weather.brief}</p>
                    <h1 className="ml-auto mr-4 large-font">{city_weather.temperature}&#176;C</h1>
                    <span className='info-button'>
                      {/* More info mosal icon */}
                      <FontAwesomeIcon className='info-icon' icon={faInfoCircle} onClick = {this.showModal} size="lg" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            )
          )}
          {/* Mosal to show when more info selected */}
          <ResultModal infoButton="info-button-loc" onClose={this.showModal} show={this.state.show} resultData = {this.state.details} favourited = {this.state.isFav} updateFave={this.setIsFav} />
          {/* updateFave={this.setIsFav(this.props.id)} */} 
        </div>
      );
    }
  }
}

export default LocationCard
