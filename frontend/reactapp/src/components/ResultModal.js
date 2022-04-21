// https://www.digitalocean.com/community/tutorials/react-modal-component
import React from 'react';
import './ResultModal.css';
import LocationCard from './LocationCard';

const ResultModal = ({ handleClose, show, result_weather }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
        <div>
        {this.state.details.map((result_weather, id) => (
            <div className={showHideClassName}>
            <section className="modal-main">
            <LocationCard />
            <h1>{result_weather.name} </h1>
            <h2>{result_weather.main.temp}</h2>
            <button type="button" onClick={handleClose}>
                      Close
                    </button>
                  </section>
                </div>
            )
            )}
     </div>
    );
  };

  export default ResultModal