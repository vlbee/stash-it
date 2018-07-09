import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ErrorBoundary from './errorBoundary'
import { token } from '../token'

// Source of map tiles
const mapboxURL = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=${token}`
const mapboxAttribution = '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'

// Fix for react-leaflet 404 error rendering Leaflet's default market icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;



class Mapview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const stashpoints = [...this.props.stashpoints];
    console.log(stashpoints)
    return (
      <div>
        <Map ref="map" center={[this.props.lat, this.props.long]} zoom={13} className="map">
          <TileLayer
            url={mapboxURL}
            attribution={mapboxAttribution}
          />
          {stashpoints.map((location) => {
            return (<Marker key={location.id} position={[location.latitude, location.longitude]}>
              <Popup>{location.name}<br />{location.address}</Popup>
            </Marker>)
          })}


          {/* <Marker position={[this.props.lat, this.props.long]}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker> */}
        </Map>
      </div>
    )
  }

}

export default ErrorBoundary(Mapview);