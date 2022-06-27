import React from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// notes for improvements to adding to favourites, pull and invisible location card upon search? so adding to favourites can be handled?
// issue right now is that bookmark updating from result data is not aligned with table

class SearchBar extends React.Component {
  state = {
    city: "",
    show: false,
    details: [],
    isFav:false,
  };

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
      console.log(this.props.favouriteList)
      console.log(this.props.favouriteList.length)
      console.log(data[0]['id'])
      if(data[0]['cod']===200){
        this.setState({
          details : data,
          city: "",
          show: true,
          callMade: false,
        });
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

  setIsFav = () => {
    this.setState({
      isFav: !this.state.isFav
    });
    if(localStorage.getItem('user')){
      const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";    
      this.interval = setTimeout(() => {
          // API call which passes location and gets weather data
          axios.post(`${API_ENDPOINT}getuserfavs/`, 
          { params: { id: this.state.details[0]['id'], add: this.state.isFav, user: localStorage.getItem('user') } })
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
    if(this.state.callMade){
      return (
        <div>
      <ResultModal favourited = {this.state.isFav} infoButton="info-button" onAdd={this.props.onAdd} onClose={this.showModal} show={this.state.show} resultData = {this.state.details}  updateFave={this.setIsFav} />
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
    else{
      return (
        <div>
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
}

export default SearchBar