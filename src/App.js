import React, { useEffect, useState } from 'react';
import WeatherTable from './components/WeatherTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from "react-router-dom";
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
    console.log(localStorage.getItem('user'))
  }

  // const checkStatus = () => {
  //   setStatus(localStorage.getItem('status'));
  // }

  useEffect(() => {
    checkToken();
    checkUser();
    // setStatus();
  }, [token, user])

    return (
      <div>
        <Navbar setToken={setToken} setUser={setUser} setMessage={setMessage} />
        <Route path="/Login">
          <Login setToken={setToken} setUser={setUser} setMessage={setMessage} />
        </Route>
        <Route path="/Register">
          <Register setToken={setToken} setUser={setUser} setMessage={setMessage} />
        </Route>
        {message}
        <Route path="/" exact component={HeroImage}/>
        <Route path="/" exact component={WeatherTable}/>
        <Footer />
      </div>
    );
  }

export default App;


