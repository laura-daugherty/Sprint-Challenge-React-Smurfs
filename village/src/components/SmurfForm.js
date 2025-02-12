import React, { Component } from 'react';
import axios from "axios"

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = (event) => {
    const newSmurf = {
      name: this.state.name, 
      age: this.state.age,
      height: this.state.height
    }
    event.preventDefault();
    axios 
      .post('http://localhost:3333/smurfs', newSmurf)
      .then (res => {
        this.props.updateSmurfs(res.data)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err.response)
      })
    // add code to create the smurf using the api
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfFormCont">
        <h2>Build-a-Smurf</h2>
        <form className="smurfForm" onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button className="submitButton" type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
