import React, { useEffect, useState } from 'react';
import WeatherTable from './components/WeatherTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from './assets/hero-image.jpg';
import { Link, Route } from "react-router-dom";
import Login from './components/Login';
import HeroImage from './components/HeroImage';
import Register from './components/Register';

function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  const checkUser = () => {
    setUser(localStorage.getItem('user'));
  }

  useEffect(() => {
    checkToken();
    checkUser();
  }, [token, user])

    return (
      <div>
        <Navbar />
        <Route path="/Login">
          <Login setToken={setToken} setUser={setUser} setMessage={setMessage} />
          {/* <Logout setToken={setToken} setUser={setUser} setMessage={setMessage}/> */}
        </Route>
        <Route path="/Register">
          <Register setToken={setToken} setUser={setUser} setMessage={setMessage} />
          {/* <Logout setToken={setToken} setUser={setUser} setMessage={setMessage}/> */}
        </Route>
          <span>{message}</span>
        {/* <Route path="/Login" element={<Login setToken={setToken} setUser={setUser} setMessage={setMessage} />} />
        {message} */}
        <Route path="/" exact component={HeroImage}/>
        {/* <img id="hero-image" alt='Sky with compass' src={hero}></img> */}
        <Route path="/" exact component={WeatherTable}/>
        {/* <WeatherTable /> */}
        <Footer />
      </div>
    );
  }

export default App;


