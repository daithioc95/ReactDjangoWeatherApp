import React from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';
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
            
        let strippedID = this.props.dashLocations[i]['id'];
        dashList.push(strippedID)
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
            
            let strippedID = this.props.dashLocations[i]['id'];
            // if(strippedID[0]==="X"){
            //   strippedID = strippedID.replace(/X/g, "");
            // }
            dashList.push(strippedID)
            console.log(this.props.dashLocations)
          }

          this.state = {
            city: "",
            show: false,
            details: [],
            isFav:false,
            dashLocs:dashList,
            onDash:false,
            onDashId: 0,
            dupeSearch: 0,
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

  removeIdModifiers = e => {
    console.log("SearchBar removeIdModifiers")
  //   if(this.state.details[0]['id'][0]==="X"){
    //     cleanedDeatils = this.state.details[0]
    //     this.state.details[0]['id'] = Number(this.state.details[0]['id'].replace(/X/g, ""));
    
    //     this.setState({
  //   })
  // }
  //   else if(this.state.details[0]['id'][locations[i].id.length-1]==="Y"){
  //     this.state.details[0]['id'] = Number(this.state.details[0]['id'].replace(/Y/g, ""));
  //   }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // rerendering dupe searches
    
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";
    let data ;
    // API call which passes location and gets weather data
    axios.get(`${API_ENDPOINT}apisearchcall/`,
    { params: { name: this.state.city, } })
    .then((res) => {
      data = res.data;
      data[0]['keyRef']=data[0]['id']
      try{
        if(this.state.details[0]['city'].toLowerCase()===this.state.city.toLowerCase()){
            console.log("duped search")
            data[0]['keyRef'] = this.state.details[0]['keyRef']+'Y';
            // if(this.state.dupeSearch>0){
            //   data[0]['id'] = data[0]['id']+"Y".repeat(this.state.dupeSearch);
            // }
            console.log(data[0]['keyRef'])
          }
      }
      catch(error){
        console.log("Non dupe")
        // console.log(error)
        // this.setState({
        //   dupeSearch: 0
        // });
      }
      
      console.log(this.props.dashLocations)
      // extract dash Ids to list
      let strippedID = data[0]['id'];
      // if(strippedID[0]==="X"){
      //   strippedID = strippedID.replace(/X/g, "");
      // }
      if(this.state.dashLocs.includes(strippedID)){
        // console.log(this.state.dashLocs)
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
      
      
      // console.log(this.props.favouriteList)
      // console.log(this.props.favouriteList.length)
      // console.log(data[0]['id'])
      

      if(data[0]['cod']===200){
        this.setState({
          details : data,
          city: "",
          show: true,
          callMade: false,
        });
        console.log(data)
        // console.log("data")
        // console.log(data[0]['id'])
        // check if id in favourite list
          if(this.props.favouriteList.includes(data[0]['id'])){
              // console.log("fave")
              console.log(this.props.favouriteList)
              console.log(data[0]['id'])
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
        <div>
          {this.state.callMade && !this.state.onDash ?
        <LocationCard removeIdModifiers={this.removeIdModifiers} key = {this.state.details[0]['keyRef']} id = {this.state.details[0]['id']} location = {this.state.details[0]['name']} fromSearch = {true} favourite={this.state.isFav} onAdd={this.props.onAdd} />
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