import React from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout';

function Navbar({ setToken, setUser, setMessage }) {
  console.log(localStorage.getItem('user'))
      return (
      <div>
        <nav className="navbar mx-auto">
          <span className="navbar-brand mb-0 h1 mx-auto"><Link to='/'>Weather App</Link></span>
          { localStorage.getItem('user') ? 
            <>
            <Logout setToken={setToken} setUser={setUser} setMessage={setMessage} />
            <Link to='/Favourites'>Favourites</Link>
            </>
          : 
          <><Link to='/Login'>Login</Link>
          <Link to='/Register'>Register</Link></> }
          
        </nav>
      </div>
    )
  }

export default Navbar