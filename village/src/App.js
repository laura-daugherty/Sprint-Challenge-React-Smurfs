import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  updateSmurfs = (smurfs) => {
    this.setState({
      smurfs: smurfs
    })
  }


  deleteSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${smurf.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // XXXadd any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">

        <nav className="navBar">
          <NavLink className="navLink" to="/smurf-form">Add a Smurf</NavLink>
          <NavLink className="navLink" exact to="/">Back to Smurf Village</NavLink>
        </nav>

        <Route 
          path='/smurf-form'
          render={props =>
            <SmurfForm 
              {...props}
              updateSmurfs={this.updateSmurfs}
            />
          }
        />

        <Route
          exact path='/'
          render={props =>
            <Smurfs 
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          }
        />
      </div>
    );
  }
}

export default App;
