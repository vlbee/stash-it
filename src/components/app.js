import React, { Component } from 'react';
import Mapview from './mapview'
// import { fetchRequest } from '../utils/fetch/fetch'
// import { getLocation } from '../utils/getLocation/getLocation'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
      nearby_radius: 5,
      by_distance: "asc",
      open_late: false,
      twentyfour_seven: false,
      stashpoints: [],
      //TODO: add error message feedback to user if geolocation or data fetching fails
      errorMsg: null
    };
  }

  getLocation = () => {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  }

  componentDidMount() {
    this.getLocation().then(position => {
      this.getLocation = null;
      if (position.coords) {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
        console.log(this.state)
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }).catch(error => {
      console.log(error)
    })
  }

  componentWillUnmount() {
    if (this.getLocation) {
      this.getLocation.cancel();
    }
  }



  render() {
    return (
      <div className="app" >
        <h1>Find It, Stash It</h1>
        {(this.state.lat === null) ? (<h2>Fetching Location data</h2>) :
          (<Mapview stashpoints={this.state.stashpoints} lat={this.state.lat} long={this.state.long}></Mapview>)}
      </div>
    )
  }
}

export default App;