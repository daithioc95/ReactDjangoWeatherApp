import React from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout';
import { useEffect, useState } from 'react'

function Navbar({ setToken, setUser, setMessage }) {
  console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user') !==null){
      return (
      <div>
      <nav className="navbar mx-auto">
        <span className="navbar-brand mb-0 h1 mx-auto"><Link to='/'>React Weather App</Link></span>
        <Logout setToken={setToken} setUser={setUser} setMessage={setMessage} />
      </nav>
      <div>
      </div>
      </div>
    )
    }
    else{
      return (
      <div>
      <nav className="navbar mx-auto">
        <span className="navbar-brand mb-0 h1 mx-auto"><Link to='/'>React Weather App</Link></span>
        <Link to='/Login'>Login</Link>
        <Link to='/Register'>Register</Link>
      </nav>
      <div>
      </div>
      </div>
    )
    }
    
  }

export default Navbar