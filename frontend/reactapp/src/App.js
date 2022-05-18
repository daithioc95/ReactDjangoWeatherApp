// https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
import React from 'react';
import WeatherTable from './components/WeatherTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
    <div>
      <Navbar />
      <img id="hero-image" alt='Sky with compass' src='assets\hero-image.jpg'></img>
      <WeatherTable />
      <Footer />
    </div>
    );
  }
}

export default App;


