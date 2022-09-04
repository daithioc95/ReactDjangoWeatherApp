import SearchBar from "./SearchBar";
import LocationCard from "./LocationCard";
import EmptyCards from "./EmptyCards";
import { useState } from "react";

const WeatherTable = (props) => {
	// Set preset locations as defined by CardTable
	const [locations, setLocations] = useState(props.locationsData);
	// Triggered when a dashboard location is triggered to label and result mosal is opened from the location card
	const searchedDashLocation = (id) => {
		if (locations.findIndex((item) => item.id === id) !== -1) {
			let items = [...locations];
			let index = locations.findIndex((item) => item.id === id);
			let item = { ...locations[index] };
			item.onDash = true;
			item.keyRef = "X" + item.keyRef;
			items[index] = item;
			setLocations(items);
		}
	};
	// Set empty cards depending on the number of cards on the dashboard
	const [emptyCards, setEmptyCards] = useState([1, 1, 1]);
	// Delete specified location and feed empty card slot
	const deleteLocation = (id) => {
		setLocations(locations.filter((location) => location.id !== id));
		setEmptyCards([...emptyCards, 1]);
	};
	// Triggered so card can be added to the dashboard
	const addLocation = (location, id) => {
		const newLocation = { name: location, id: id };
		if (locations.findIndex((item) => item.id === newLocation.id) !== -1) {
			alert("Location already on dashboard");
		} else if (locations.length >= 9) {
			alert(
				"Maximum number of locations on dashboard, please remove and add again"
			);
		} else {
			setLocations([...locations, newLocation]);
			emptyCards.pop(1);
		}
	};
	// This is triggered when an item is added to the users favourites so the location cards data can be updated
	const refreshFavs = (id) => {
		props.updateFavouriteList(id);
		// from new favourite list assign favLocation if id is in list
		if (locations.findIndex((item) => item.id === id) !== -1) {
			let items = [...locations];
			let index = locations.findIndex((item) => item.id === id);
			let item = { ...locations[index] };
			if (item.favLocation === true) {
				item.favLocation = false;
			} else {
				item.favLocation = true;
			}
			items[index] = item;
			setLocations(items);
		}
	};

	return (
		<div className="container-fluid weather-table-container">
			<div className="container">
				<SearchBar
					refreshFavs={refreshFavs}
					onAdd={addLocation}
					favouriteList={props.favouritesList}
					dashLocations={locations}
					searchedDashLocation={searchedDashLocation}
				/>
				<div className="row">
					{/* Map all locations location cards */}
					<h1>Popular Locations</h1>
					{locations.map((location) => (
						<LocationCard
							refreshFavs={refreshFavs}
							key={location.keyRef}
							id={location.id}
							onDelete={deleteLocation}
							favourite={location.favLocation}
							fromSearch={false}
							onDash={location.onDash}
						/>
					))}
					{/* Map remaning slots with empty cards */}
					{[...Array(emptyCards.length)].map(() => (
						<EmptyCards key={Math.random()} />
					))}
				</div>
			</div>
		</div>
	);
};

export default WeatherTable;
