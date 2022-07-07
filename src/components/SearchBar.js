import React from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';
import LocationCard from './LocationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// notes for improvements to adding to favourites, pull and invisible location card upon search? so adding to favourites can be handled?
// issue right now is that bookmark updating from result data is not aligned with table

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    let dashList = []
          for(var i=0; i < this.props.dashLocations.length; i++){
            dashList.push(this.props.dashLocations[i]['id'])
            console.log(this.props.dashLocations[i]['id'])
          }

          this.state = {
            city: "",
            show: false,
            details: [],
            isFav:false,
            dashLocs:dashList,
            onDash:false,
            onDashId: 0,
            dupeSearch: false,
          };
  }
    


  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";
    let data ;
    // API call which passes location and gets weather data
    axios.get(`${API_ENDPOINT}apisearchcall/`,
    { params: { name: this.state.city, } })
    .then((res) => {
      data = res.data;
      console.log(this.props.dashLocations)
      // extract dash Ids to list
      if(this.state.dashLocs.includes(data[0]['id'])){
        console.log(this.state.dashLocs)
        console.log("on dash")
        this.setState({ onDash:true })
        this.props.searchedDashLocation(data[0]['id'])
      }
      else{
        console.log(this.state.dashLocs)
        console.log("not on dash")
        this.setState({ onDash:false })
      }
      
      console.log(this.props.favouriteList)
      console.log(this.props.favouriteList.length)
      console.log(data[0]['id'])

      try{
        if(this.state.details[0]['city']===this.state.city){
          this.setState({
            details : data,
            city: "",
            show: true,
            callMade: false,
          });
        }
      }
      catch(error){
        console.log("calm down")
      }

      if(data[0]['cod']===200){
        this.setState({
          details : data,
          city: "",
          show: true,
          callMade: false,
        });
        console.log("data")
        console.log(data[0]['id'])
        // check if id in favourite list
          if(this.props.favouriteList.includes(data[0]['id'])){
              console.log("fave")
              this.setState({ isFav:true, callMade:true })
          }
            else{
              this.setState({ callMade:true })
              console.log("not fave")
            }

      }
      else{
        this.setState({
          show: false,
        });
      alert("Location not found")
      }
    })
    .catch((err) => {console.log('error');});
  };

  render() {
      return (
        <div>
          {this.state.callMade && !this.state.onDash ?
        <LocationCard key = {this.state.details[0]['id']} id = {this.state.details[0]['id']} location = {this.state.details[0]['name']} fromSearch = {true} favourite={this.state.isFav} onAdd={this.props.onAdd} onDash={this.state.onDash} />
            : <></>}
      {/* <ResultModal favourited = {this.state.isFav} infoButton="info-button" onAdd={this.props.onAdd} onClose={this.showModal} show={this.state.show} resultData = {this.state.details}  updateFave={this.setIsFav} /> */}
          <form id='SearchBar' onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" 
                                placeholder="Enter City name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.city} name="city"
                                onChange={this.handleInput} />
            <button className='btn'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {/* Modal to show once location is searched */}
        </div>
      );
  }
}

export default SearchBar