import React from "react";
import axios from "axios";
import LocationCard from "./LocationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends React.Component {
	componentDidUpdate(prevProps) {
		// Ensure most updated version on dashlocations is fed to components
		if (this.props.dashLocations !== prevProps.dashLocations) {
			let dashList = [];
			for (var i = 0; i < this.props.dashLocations.length; i++) {
				let dashLocId = this.props.dashLocations[i]["id"];
				dashList.push(dashLocId);
				this.setState({
					dashLocs: dashList,
				});
			}
		}
		// Ensure most updated version on userfaves is fed to components
		if (this.props.favouriteList !== prevProps.favouriteList) {
			this.fetchData(this.props.favouriteList);
		}
	}
	constructor(props) {
		super(props);
		let dashList = [];
		// Extract ids from dashlocations for easier formatting when comparing once searched
		for (var i = 0; i < this.props.dashLocations.length; i++) {
			let dashLocId = this.props.dashLocations[i]["id"];
			dashList.push(dashLocId);
		}

		this.state = {
			city: "",
			show: false,
			details: [],
			isFav: false,
			dashLocs: dashList,
			onDash: false,
		};
	}

	showModal = (e) => {
		this.setState({
			show: !this.state.show,
		});
	};

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	refreshFavs = (id) => {
		this.props.refreshFavs(id);
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const API_ENDPOINT =
			process.env.REACT_APP_API_ENDPOINT ||
			"https://react-django-weather-app.herokuapp.com/";
		let data;
		// API call which passes location and gets weather data
		axios
			.get(`${API_ENDPOINT}apisearchcall/`, {
				params: { name: this.state.city },
			})
			.then((res) => {
				data = res.data;
				data[0]["keyRef"] = data[0]["id"];
				// In order to handle consecutive searches so the cards can rerender
				try {
					if (
						this.state.details[0]["city"].toLowerCase() ===
						this.state.city.toLowerCase()
					) {
						data[0]["keyRef"] =
							this.state.details[0]["keyRef"] + "Y";
					}
				} catch (error) {
					console.log("Non consecutive");
				}

				// check is location on dashboard and update state
				let dashLocId = data[0]["id"];
				if (this.state.dashLocs.includes(dashLocId)) {
					this.setState({ onDash: true });
					this.props.searchedDashLocation(data[0]["id"]);
				} else {
					this.setState({ onDash: false });
				}

				if (data[0]["cod"] === 200) {
					this.setState({
						details: data,
						city: "",
						show: true,
						callMade: false,
					});

					// check if location in users favourite list and update state
					if (this.props.favouriteList.includes(data[0]["id"])) {
						this.setState({ isFav: true, callMade: true });
					} else {
						this.setState({ isFav: false, callMade: true });
					}
				} else {
					this.setState({
						show: false,
					});
					alert("Location not found");
				}
			})
			.catch((err) => {
				console.log("error");
			});
	};

	render() {
		return (
			<div className="SearchDiv">
				{this.state.callMade && !this.state.onDash ? (
					<LocationCard
						key={this.state.details[0]["keyRef"]}
						id={this.state.details[0]["id"]}
						fromSearch={true}
						favourite={this.state.isFav}
						onAdd={this.props.onAdd}
						refreshFavs={this.refreshFavs}
					/>
				) : (
					<></>
				)}
				<form id="SearchBar" onSubmit={this.handleSubmit}>
					<input
						className="search-input"
						type="search"
						required
						placeholder="Enter City name"
						aria-label="Username"
						aria-describedby="basic-addon1"
						value={this.state.city}
						name="city"
						onChange={this.handleInput}
					/>
					<div className="cloud"></div>
					<button className="btn">
						<FontAwesomeIcon
							className="search-icon"
							icon={faSearch}
						/>
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
