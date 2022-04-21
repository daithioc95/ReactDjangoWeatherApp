import React from 'react';
import axios from 'axios';

class SearchBar extends React.Component {
        state = {
          city: "",
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
				this.setState({
					details : data,
					city: ""
				});
				console.log(data);
            })
            .catch((err) => {});
    };

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" 
                               placeholder="Enter City name"
                               aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.city} name="city"
                               onChange={this.handleInput} />
          <button className='btn' onClick={this.showModal}>Submit</button>
        </form>
      );
    }
  }

export default SearchBar