import React from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {

        state = {
          city: "",
          show: false,
		      test: "test data",
		      details: [],
      };

      showModal = e => {
        console.log("clicked show");
        this.setState({
          show: !this.state.show
        });
      };

      handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

      handleSubmit = (e) => {
        e.preventDefault();
		    let data ;
        axios.get("http://localhost:8000/apisearchcall/", 
				{ params: { name: this.state.city, } })
            .then((res) => {
				data = res.data;
                if(data[0]['cod']===200){
					console.log("found")
					this.setState({
						details : data,
						city: "",
						show: true
				});
					console.log(this.state.details[0]['name']);
					console.log(this.state.details.length);
                }
				else{
					this.setState({
						show: false
				});
				alert("Location not found")
				}
                
            })
            .catch((err) => {console.log('error');});
    };

    render() {
      return (
        <div>
        <form id='SearchBar' onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" 
                               placeholder="Enter City name"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.city} name="city"
                               onChange={this.handleInput} />
          <button className='btn'><FontAwesomeIcon icon={faSearch} /></button>
        </form>
        <ResultModal onAdd={this.props.onAdd} onClose={this.showModal} show={this.state.show} resultData = {this.state.details} />
        {/* <p>{this.state.test}</p> */}
        </div>
      );
    }
  }

export default SearchBar