import React from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout';

function Navbar({ setToken, setUser, setMessage }) {
  console.log(localStorage.getItem('user'))
      return (
      <div>
        {/* <nav className="navbar mx-auto">
          <span className="navbar-brand mb-0 h1 mx-auto"><Link to='/'>Weather App</Link></span>
          { localStorage.getItem('user') ? 
            <>
            <Logout setToken={setToken} setUser={setUser} setMessage={setMessage} />
            <Link to='/Favourites'>Favourites</Link>
            </>
          : 
          <>
          <Link to='/Login'>
            <div className='navItem scaled'>
              Login
            </div>
          </Link>
          <Link to='/Register'>
            <div className='navItem scaled'>
            Register
            </div>
          </Link>
          </> 
          }
          
        </nav> */}
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
                <div className="navItem scaled">
                  Favourites
                </div>
              </Link>
            </li>
            </>:
            <>
              <li className="list-item">
                <Link to='/Register'>
                    <div className="navItem scaled">Register</div>
                </Link>
              </li>
              <li className="list-item">
                <Link to='/Login'>
                  <div className='navItem scaled'>
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