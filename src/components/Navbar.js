import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import Logout from './Logout';

function Navbar({ setToken, setUser, setMessage }) {
  console.log(localStorage.getItem('user'))
  const location = useLocation();
      return (
      <div>
        <nav className="nav navbar navbar-expand-lg">
          <Link id="brand" className="navbar-brand" to='/'>Weather App</Link>
          <div className='list-items'>
            <ul className="navbar-nav ml-auto">
            { localStorage.getItem('user') ? 
            <>
            <li className="list-item">
              <Logout setToken={setToken} setUser={setUser} setMessage={setMessage} />
            </li>
            <li className="list-item">
              <Link to='/Favourites'>
                <div className={location.pathname === "/Favourites" ? 'active navItem scaled' :'navItem scaled'}>
                  Favourites
                </div>
              </Link>
            </li>
            </>:
            <>
              <li className="list-item">
                <Link to='/Register'>
                    <div className={location.pathname === "/Register" ? 'active navItem scaled' :'navItem scaled'}>Register</div>
                </Link>
              </li>
              <li className="list-item">
                <Link to='/Login'>
                  <div className={location.pathname === "/Login" ? 'active navItem scaled' :'navItem scaled'}>
                    Login
                  </div>
                </Link>
              </li>
            </>
}
            </ul>
          </div>
        </nav>
      </div>
    )
  }

export default Navbar