import React from 'react';
import WeatherTable from './components/WeatherTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from './assets/hero-image.jpg';

class App extends React.Component {


  render() {
    return (
      <div>
        <Navbar />
        <img id="hero-image" alt='Sky with compass' src={hero}></img>
        <WeatherTable />
        <Footer />
      </div>
    );
  }
}

export default App;


