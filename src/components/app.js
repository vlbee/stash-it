import React, { Component } from 'react';
import Mapview from './mapview'
import Button from './button/button'
// import { fetchRequest } from '../utils/fetch/fetch'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: {
        centre_lat: null,
        centre_lon: null,
        nearby_radius: 30,
        by_distance: "desc",
        // open_late: false,
        // twentyfour_seven: false
      },
      stashpoints: null
      //TODO: add error message feedback to user if geolocation or data fetching fails
      // errorMsg: null
    };
  }

  getLocation = () => {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  }

  checkFetchResponse = res => {
    if (res.status === 200) {
      let result = res.json();
      return result;
    } else {
      console.error(
        `Error with fetch request. Response: ${res.status}`
      );
    }
  };

  fetchRequest = (params = {}) => {
    const url = new URL(`https://api-staging.stasher.com/v1/stashpoints`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url.search)
    return fetch(url.toString(), {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(this.checkFetchResponse)
      .catch(err => {
        throw new Error(`Fetch request failed: ${err}`);
      });
  };

  componentDidMount() {
    this.getLocation().then(position => {
      this.getLocation = null;
      if (position.coords) {
        this.setState(prevState => {
          return {
            query: {
              centre_lat: position.coords.latitude,
              centre_lon: position.coords.longitude,
              nearby_radius: prevState.query.nearby_radius,
              by_distance: prevState.query.by_distance,
              // open_late: prevState.query.open_late,
              // twentyfour_seven: prevState.query.twentyfour_seven
            },
            stashpoints: prevState.stashpoints
          }
        })
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }).then(() => {
      // TODO - REFACTOR
      this.fetchRequest(this.state.query).then(data => {
        this.setState({ stashpoints: data });
        // console.log(this.state) 
      })
    }).catch(error => {
      console.log(error)
    })
  }

  componentWillUnmount() {
    if (this.getLocation) {
      this.getLocation = null;
    }
  }

  handle247 = event => {
    this.setState(prevState => {
      if (prevState.query.twentyfour_seven) {
        return {
          query: {
            centre_lat: prevState.query.centre_lat,
            centre_lon: prevState.query.centre_lon,
            nearby_radius: prevState.query.nearby_radius,
            by_distance: prevState.query.by_distance,
          },
          stashpoints: null
        }
      } else {
        return {
          query: {
            centre_lat: prevState.query.centre_lat,
            centre_lon: prevState.query.centre_lon,
            nearby_radius: prevState.query.nearby_radius,
            by_distance: prevState.query.by_distance,
            twentyfour_seven: true
          },
          stashpoints: null
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updated")
    const query = this.state.query;
    const prevQuery = prevState.query
    console.log(Object.keys(query).length)
    // Typical usage (don't forget to compare props):
    if (Object.keys(query).length !== Object.keys(prevQuery).length) {
      this.fetchRequest(this.state.query).then(data => {
        this.setState({ stashpoints: data });
        console.log(this.state)
      })
    }
  }

  render() {
    return (
      <div className="app" >
        <nav>
          <h1>Find It, Stash It</h1>
          <div>
            <Button text="Open 24/7" handle247={this.handle247} />
          </div>
        </nav>
        {(this.state.stashpoints === null) ? (<div className="loader" />) :
          (<Mapview stashpoints={this.state.stashpoints} lat={this.state.query.centre_lat} long={this.state.query.centre_lon}></Mapview>)}
      </div>
    )
  }
}

export default App;