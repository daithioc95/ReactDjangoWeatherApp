// https://www.digitalocean.com/community/tutorials/react-modal-component
// https://blog.bitsrc.io/build-a-simple-modal-component-with-react-1b174c3f5301
import React from 'react';
import './ResultModal.css';
import LocationCard from './LocationCard';

class ResultModal extends React.Component {
  onClose = e => {
    console.log("clicked Closed");
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if(!this.props.show){
      return null;
  }
    return <div className='modal'>{this.props.children} Modal
    <button  onClick={e => {
              this.onClose();
              }}
          > Close </button>
          </div>;
  }
}

  export default ResultModal