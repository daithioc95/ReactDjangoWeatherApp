import React from 'react';
import axios from 'axios';

class LocationCard extends React.Component {

	state = {
		details : [],
	}

	componentDidMount() {

		let data ;

		axios.get('http://localhost:8000/apicall/')
		.then(res => {
			data = res.data;
			this.setState({
				details : data	
			});
			console.log(this.state.details)
		})
		.catch(err => {})
	}

render() {
	return(
	<div>
		{this.state.details.map((city_weather, id) => (
		<div key={id}>
		<div >
			<div >
				<h1>{city_weather.name} </h1>
				<h2>{city_weather.main.temp}</h2>
			</div>
		</div>
		</div>
			)
		)}
	</div>
	);
}
}

export default LocationCard
