import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ErrorBoundary from './errorBoundary'


const position = [51.505, -0.09]

class Mapview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Map ref="map" center={[51.505, -0.09]} zoom={3} className="map">
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

export default ErrorBoundary(Mapview);