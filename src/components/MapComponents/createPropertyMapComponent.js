import React, { Component } from 'react';
import * as maptilersdk from "@maptiler/sdk";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "@maptiler/geocoding-control/style.css";



class MapTilerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
    this.map = null; 
  }

  componentDidMount() {
    maptilersdk.config.apiKey = 'uEMGFcQ7SCaZtHPbUkji';

    this.map = new maptilersdk.Map({
      container: 'map',
      style: maptilersdk.MapStyle.STREETS,
      geolocate: maptilersdk.GeolocationType.POINT,
    });

    const gc = new GeocodingControl();
    this.map.addControl(gc, 'top-right');

    this.map.on('click', async (e) => {
      const { lng, lat } = e.lngLat;
      this.setState({ lat, lng });
      this.reverseGeocoding(lng, lat);
    });

    this.map.on('load', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({ lat, lng });
      this.reverseGeocoding(lng, lat);
    });
  }

  handleSearchClick = () => {
    const lng = parseFloat(this.state.lng);
    const lat = parseFloat(this.state.lat);
    this.reverseGeocoding(lng, lat);
  };

  reverseGeocoding = (lng, lat) => {
    const coordinates = { lng, lat };
    localStorage.removeItem('markerCoordinates');
    if (this.marker) {
      this.marker.setLngLat([lng, lat]);
    } else {
      this.marker = new maptilersdk.Marker().setLngLat([lng, lat]).addTo(this.map);
      
      
    }
    localStorage.setItem('markerCoordinates', JSON.stringify(coordinates));
    this.map.flyTo({
      center: [lng, lat],
      essential: true,
    });
   
  };
  
  render() {
    return (
      <div>
        <div id="map"></div>
        <div className="coordinates">
          <div className="mb-1">
            <input
              type="text"
              className="form-control"
              id="lat"
              placeholder="Latitude"
              aria-label="Latitude"
              value={this.state.lat}
              onChange={(e) => this.setState({ lat: e.target.value })}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="form-control"
              id="lng"
              placeholder="Longitude"
              aria-label="Longitude"
              value={this.state.lng}
              onChange={(e) => this.setState({ lng: e.target.value })}
            />
          </div>
          <div>
            <button
              type="button"
              id="btn-search-reverse"
              className="btn btn-primary"
              onClick={this.handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>
        <div id="results"></div>
      </div>
    );
  }
}

export default MapTilerComponent;
