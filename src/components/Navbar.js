import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Login from './Login';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar mx-auto">
        <span className="navbar-brand mb-0 h1 mx-auto">React Weather App</span>
        <Link to='/Login'>Login</Link>
      </nav>
    )
  }
}

export default Navbar