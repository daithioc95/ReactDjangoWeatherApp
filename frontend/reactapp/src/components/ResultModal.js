// https://www.digitalocean.com/community/tutorials/react-modal-component
// https://blog.bitsrc.io/build-a-simple-modal-component-with-react-1b174c3f5301
import React from 'react';
import './ResultModal.css';

class ResultModal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    // const resultData = this.props.resultData
    if(!this.props.show){
      return null;
  }

if(this.props.resultData){
    return <div className='modal'>


      {/* const city_weather = this.props.resultData */}
      {this.props.resultData.map((city_weather, id) => (
		<div key={id}>
		<div >
			<div >
				{/* <h1>{city_weather.message} </h1> */}
				<h1>{city_weather.name} </h1>
				{/* <h1>{city_weather.name} </h1> */}
				<h2>{city_weather.main.temp}</h2>
			</div>
		</div>
		</div>
			)
		)} 
    {/* {this.props.resultData} */}
    <button  onClick={e => {
              this.onClose();
              }}
          > Close </button>
          </div>;
  }
  
}}

  export default ResultModal