import React from 'react';
import axios from 'axios';
import './style.css';

class LocationCard extends React.Component {

	state = {
		details : [],
		city: "",
	}	
	
	componentDidMount() {
		let data ;
        axios.get("http://localhost:8000/apisearchcall/", 
				{ params: { name: this.props.location, } })
            .then((res) => {
                data = res.data;
				this.setState({
					details : data,
					city: ""
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
		<div >
			<div>
				<h1>{city_weather.name} </h1>
				<h2>{city_weather.main.temp}</h2>
				<button  onClick = {() => this.props.onDelete(city_weather.id)}
          					> Remove </button>
				<button> Sunset Spots </button>
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
