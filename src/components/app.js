import React, { Component } from 'react';
import Mapview from './mapview'
import fetchRequest from '../utils/fetch/fetch'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      long: '',
      by_distance: false,
      open_late: false,
      twentyfour_seven: false,
      stashpoints: ''
    };
  }


  getLocation = () => {
    const success = position => {
      console.log(position)
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    }
    const unsuccessful = error => console.error(`ERROR(${error.code}): ${error.message}`)
    navigator.geolocation.getCurrentPosition(success, unsuccessful, { timeout: 5000 })
  }

  componentDidMount() {
    this.getLocation()
    //   // fetchRequest().then(res => {
    //   //   this.setState({
    //   //     stashpoints: res
    //   //   })
    //   // })
  }


  render() {
    return (
      <div className="app">
        <h1>Find It, Stash It</h1>
        <Mapview lat={this.state.lat} long={this.state.long}></Mapview>
      </div>
    )
  }
}

export default App;