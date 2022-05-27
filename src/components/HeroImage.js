import React from 'react';
import hero from '../assets/hero-image.jpg';

class HeroImage extends React.Component {
  render() {
    return (
        <img id="hero-image" alt='Sky with compass' src={hero}></img>
    )
  }
}

export default HeroImage