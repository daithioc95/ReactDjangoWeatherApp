import React from 'react';
import footerImage from '../assets/wave.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <img alt="footer-waves" src={footerImage}/>
        <p className="copyright">Designed by&nbsp;
          <a href="https://daithioc95.github.io/MS1/" target="_blank" rel="noreferrer">
            CodeDoc
          </a>
        </p>
      </footer>
    )
  }
}

export default Footer