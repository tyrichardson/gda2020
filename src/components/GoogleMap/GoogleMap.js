import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import axios from 'axios';

const mapStateToProps = (state) => ({ state });

const config = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
}

var url = '';
var locations = [];
var markerArray = [];

class GoogleMap extends Component {

  getURL = () => {
    axios.get('/api/googleMaps', config)
    .then((response) => {
      url = response.data.url;
      locations = response.data.result;
      console.log('get googleMap response.data ', url, locations, typeof locations[0].lat);
      const googleMapScript = document.createElement("script");
      googleMapScript.src = url;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        this.googleMap = this.createGoogleMap();
        this.createMarker(this.googleMap);
        this.markerCluster = this.createMarkerCluster(this.googleMap);
    });
    })
    .catch((error) => {
      console.log('error in get googleMaps ', error);
    })
  }

  googleMapRef = createRef();
 
  componentDidMount() {
      this.getURL();
  }

  center = { lat: 37.0902, lng: -95.7129 }
    
  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 4,
      center: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      mapTypeId: "terrain",
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    });
  
  createMarker = (map) =>
    {
      markerArray = locations.map(location => {
      return new window.google.maps.Marker({
        map: map,
        position: location, location
        });
      })
    }

  createMarkerCluster = (map) =>
  {
    if (window.google.maps.MarkerClusterer) {
    console.log('markerArray ', markerArray);
    return new window.google.maps.MarkerClusterer(map, markerArray, {imagePath: map});
    }
  }
  
  render() {

    return (
      <div
        ref={this.googleMapRef}
        id="google-map">
      </div>
    );

  }
}

export default connect(mapStateToProps)(GoogleMap);
