import React from "react";
import WeatherTable from "./WeatherTable";
import Favourites from "./Favourites";
import axios from "axios";

class CardTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Dashboard Location data on startup
			WeatherLocations: [
				{ id: 2988507, keyRef: 2988507 },
				{ id: 5128581, keyRef: 5128581 },
				{ id: 2643743, keyRef: 2643743 },
				{ id: 2147714, keyRef: 2147714 },
				{ id: 2950159, keyRef: 2950159 },
				{ id: 1816670, keyRef: 1816670 },
			],
			favourites: [],
			callMade: null,
		};
	}

	componentDidMount() {
		// Gather saved favourites data if user logged in
		if (localStorage.getItem("user")) {
			const API_ENDPOINT =
				process.env.REACT_APP_API_ENDPOINT ||
				"https://react-django-weather-app.herokuapp.com/";
			this.interval = setTimeout(() => {
				axios
					.get(`${API_ENDPOINT}getuserfavs/`, {
						params: {
							user: localStorage.getItem("user"),
							favoutitesPage: "false",
						},
					})
					.then((res) => {
						if (res.data === "No Favourites") {
							this.setState({ callMade: true });
						} else {
							const favouritesData = res.data;
							this.setState(
								{ favourites: favouritesData },
								() => {
									for (
										var i = 0;
										i < this.state.WeatherLocations.length;
										i++
									) {
										let newWeatherLocations =
											this.state.WeatherLocations;
										// Identify Loacation as previously saved by user
										if (
											this.state.favourites.includes(
												newWeatherLocations[i].id
											)
										) {
											newWeatherLocations[
												i
											].favLocation = true;
											this.setState({
												WeatherLocations:
													newWeatherLocations,
												callMade: true,
											});
										} else {
											this.setState({ callMade: true });
										}
									}
								}
							);
						}
					});
			}, 0.1);
		}
		// If user logged out just update state
		else {
			this.setState({ callMade: true });
		}
	}

	componentWillUnmount() {
		clearTimeout(this.interval);
	}
	// Function to trigger when when location assed to favourites
	updateFavouriteList = (id) => {
		const tempFaves = this.state.favourites;
		if (tempFaves.includes(id)) {
			tempFaves.pop(id);
		} else {
			tempFaves.push(id);
		}
		this.setState({ favourites: tempFaves });
	};
	render() {
		// render component depending on props type
		if (this.state.callMade === null) {
			return null;
		}
		if (this.props.type === "WeatherTable")
			return (
				<WeatherTable
					updateFavouriteList={this.updateFavouriteList}
					locationsData={this.state.WeatherLocations}
					favouritesList={this.state.favourites}
				/>
			);
		if (this.props.type === "Favourites") return <Favourites />;
	}
}

export default CardTable;
