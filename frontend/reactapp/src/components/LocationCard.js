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
		// infoButton: "Info-Button-Loc"
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
				console.log(this.state.details[0]);
				console.log(this.state.details.length);
            })
            .catch((err) => {console.log('error');});
	}

render() {
	return(
	<div className='locationCards'>
		{this.state.details.map((city_weather, id) => (
		<div key={id}>
			<div class="container-fluid px-1 px-md-4 py-5 mx-auto">
				<div class="row d-flex justify-content-center px-3">
					<div class="card">
						<span className='text-right position-absolute Remove-Button'><FontAwesomeIcon style={{ color: 'red',
						cursor: 'pointer' }} icon={faTimes} onClick = {() => this.props.onDelete(city_weather.id)} /></span>
						<h2 class="ml-auto mr-4 mt-3 mb-0">{city_weather.name}</h2>
						<img className='weather-logo' src={'http://openweathermap.org/img/w/'+ city_weather.weather[0].icon + '.png'} alt="weather icon"></img>
						<p class="ml-auto mr-4 mb-0 med-font">{city_weather.weather[0].main}</p>
						<h1 class="ml-auto mr-4 large-font">{city_weather.main.temp}&#176;</h1>
						<span className='Info-Button'><FontAwesomeIcon style={{ color: 'blue',
						cursor: 'pointer' }} icon={faInfoCircle} onClick = {this.showModal} /></span>
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
