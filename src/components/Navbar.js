import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Login from './Login';
import Logout from './Logout';
import { useEffect, useState } from 'react'

function Navbar() {

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
      <nav className="navbar mx-auto">
        <span className="navbar-brand mb-0 h1 mx-auto"><Link to='/'>React Weather App</Link></span>
        <Link to='/Login'>Login</Link>
        <Link to='/Register'>Register</Link>
        <Logout setToken={setToken} setUser={setUser} setMessage={setMessage} />
      </nav>
      <div>
        <p>{message}</p>
      </div>
      </div>
    )
  }

export default Navbar