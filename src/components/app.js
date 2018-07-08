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
      twentyfour_seven: false
    };
  }

  // getLocation = () = {

  // }

  // componentDidMount() {
  //   fetchRequest().then(res => {
  //     console.log(res[0])
  //   })
  // }


  render() {
    return (
      <div className="app">
        <h1>Find It, Stash It</h1>
        <Mapview></Mapview>
      </div>
    )
  }
}

export default App;