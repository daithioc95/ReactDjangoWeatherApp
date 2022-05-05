import React from 'react';
import axios from 'axios';

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
				console.log(this.state.details[0]['message']);
				console.log(this.state.details.length);
        if (this.state.details[0]['message']){
            console.log('not found')
        }
        else{
          console.log('found')
        }
            })
            .catch((err) => {console.log('error');});
	}
	onDelete() {
		console.log('Click happened');
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
				{/* <button  onClick = {() => onDelete(this.props.id)}
          					> Remove </button> */}
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
