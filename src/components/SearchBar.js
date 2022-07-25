import React from 'react';
import axios from 'axios';
import LocationCard from './LocationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// notes for improvements to adding to favourites, pull and invisible location card upon search? so adding to favourites can be handled?
// issue right now is that bookmark updating from result data is not aligned with table

class SearchBar extends React.Component {
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dashLocations !== prevProps.dashLocations) {
      console.log(this.props.dashLocations)
      let dashList = []
      for(var i=0; i < this.props.dashLocations.length; i++){
            
        let dashLocId = this.props.dashLocations[i]['id'];
        dashList.push(dashLocId)
        console.log(this.props.dashLocations)
        this.setState({
          dashLocs: dashList
        });
      }
    }
  }
  constructor(props){
    super(props)
    let dashList = []
          for(var i=0; i < this.props.dashLocations.length; i++){
            
            let dashLocId = this.props.dashLocations[i]['id'];
            dashList.push(dashLocId)
            console.log(this.props.dashLocations)
          }

          this.state = {
            city: "",
            show: false,
            details: [],
            isFav:false,
            dashLocs:dashList,
            onDash:false,
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
      data[0]['keyRef']=data[0]['id']
      // check if dupe
      try{
        if(this.state.details[0]['city'].toLowerCase()===this.state.city.toLowerCase()){
            console.log("duped search")
            data[0]['keyRef'] = this.state.details[0]['keyRef']+'Y';
            console.log(data[0]['keyRef'])
          }
      }
      catch(error){
        console.log("Non dupe")
      }
      
      // extract dash Ids to list
      let dashLocId = data[0]['id'];
      if(this.state.dashLocs.includes(dashLocId)){
        console.log("on dash")
        this.setState({ onDash:true })
            console.log("initial searchedDashLocation call")
            this.props.searchedDashLocation(data[0]['id'])
        }
      else{
        // console.log(this.state.dashLocs)
        console.log("not on dash")
        this.setState({ onDash:false })
      }
    
      if(data[0]['cod']===200){
        this.setState({
          details : data,
          city: "",
          show: true,
          callMade: false,
        });
        console.log(data)
        
        // check if id in favourite list
          if(this.props.favouriteList.includes(data[0]['id'])){
              this.setState({ isFav:true, callMade:true })
          }
            else{
              this.setState({ isFav:false, callMade:true })
              // console.log("not fave")
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
        // <div className='SearchDiv'>
        //   {this.state.callMade && !this.state.onDash ?
        // <LocationCard key = {this.state.details[0]['keyRef']} id = {this.state.details[0]['id']} fromSearch = {true} favourite={this.state.isFav} onAdd={this.props.onAdd} />
        //     : <></>}
        //   <form id='SearchBar' onSubmit={this.handleSubmit}>
        //     <input type="text" className="form-control" 
        //                         placeholder="Enter City name"
        //                         aria-label="Username"
        //                         aria-describedby="basic-addon1"
        //                         value={this.state.city} name="city"
        //                         onChange={this.handleInput} />
        //     <button className='btn'>
        //       <FontAwesomeIcon icon={faSearch} />
        //     </button>
        //   </form>
        //   {/* Modal to show once location is searched */}
        // </div>
        <div className='SearchDiv'>
          <form id='SearchBar' onSubmit={this.handleSubmit}>
          <input className='search-input' type="search" required placeholder="Enter City name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.city} name="city"
                                onChange={this.handleInput}/>
          {/* <i class="fa fa-search"></i> */}
          <div class="cloud"></div>
          <button className='btn'>
            <FontAwesomeIcon className="search-icon" icon={faSearch} onClick />
          </button>
          {/* <Link to="javascript:void(0)" id="clear-btn">Clear</Link> */}
        </form>
      </div>
      );
  }
}

export default SearchBar