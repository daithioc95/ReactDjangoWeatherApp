import React from 'react';
import WeatherTable from './components/WeatherTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from './assets/hero-image.jpg';
import { Link, Route } from "react-router-dom";
import Login from './components/Login';

class App extends React.Component {


  render() {
    return (
      <div>
        <Navbar />
        <Route path="/Login" exact component={Login}/>
        <img id="hero-image" alt='Sky with compass' src={hero}></img>
        <Route path="/" exact component={WeatherTable}/>
        {/* <WeatherTable /> */}
        <Footer />
      </div>
    );
  }
}

export default App;


