// import React from 'react';



// export default class App extends React.Component {
//   render() {
//     return (<div className="app">
//       <h1 className="app__title">Hello World!</h1>

//     </div>)
//   }
// }

import React, { Component } from 'react';
import Mapview from './map/mapview'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
const position = [51.505, -0.09]
class App extends Component {

  render() {

    return (

      <div className="app">
        <h1>Find It, Stash It</h1>
        {/* <Mapview /> */}
        <Map ref="map" center={[51.505, -0.09]} zoom={13} className="map">
          <TileLayer
            url="https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoidmxiZWUiLCJhIjoiY2pqY3psbW91M3ZydzN2cWdsM202OWVuMSJ9.POAfk9YduZ5FIIMMjKC4pQ"
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
          />
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>
      </div>

    )

  }

}

export default App;