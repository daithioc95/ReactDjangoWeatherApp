import React from 'react';
import WeatherTable from './WeatherTable'
import Favourites from './Favourites'
import axios from 'axios';

class CardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            WeatherLocations: [{"id": 2988507, "keyRef": 2988507}, 
            {"id": 5128581, "keyRef": 5128581}, 
            {"id": 2643743, "keyRef": 2643743},
            {"id": 2147714, "keyRef": 2147714},
            {"id": 2950159, "keyRef": 2950159},
            {"id": 1816670, "keyRef": 1816670},],
            favourites: [],
            callMade: null}
        }

        componentDidMount(){
            if(localStorage.getItem('user')){
                const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";    
                this.interval = setTimeout(() => {
                        axios.get(`${API_ENDPOINT}getuserfavs/`, 
                            { params: { user: localStorage.getItem('user'),
                            // added so that we can return a list only for homepage
                            favoutitesPage: "false" } })
                            .then(res => {
                            if(res.data==="No Favourites"){
                                this.setState({ callMade:true })
                            }
                            else{
                                const favouritesData = res.data;
                                
                                this.setState({ favourites: favouritesData }, () => {
                                    console.log(this.state);
                                    for(var i=0; i < this.state.WeatherLocations.length; i++){
                                        let newWeatherLocations = this.state.WeatherLocations
                                        console.log(this.state.favourites)
                                        if(this.state.favourites.includes(newWeatherLocations[i].id)){
                                            newWeatherLocations[i].favLocation=true;
                                            this.setState({ WeatherLocations: newWeatherLocations, callMade:true })
                                        }
                                    }
                                  }); 
    
                            }
                            }
                            )
                        }, .1);
            }
            else{
                this.setState({ callMade:true })
            }
        }

        componentWillUnmount() {
            clearTimeout(this.interval);
          }
        
        render() {
            if(this.state.callMade === null){
                return null; //Or some other replacement component or markup
             }
        if(this.props.type==="WeatherTable")
            return <WeatherTable locationsData={this.state.WeatherLocations} favouritesList={this.state.favourites} />;
        if(this.props.type==="Favourites")
            return <Favourites />;
  }};

export default CardTable

