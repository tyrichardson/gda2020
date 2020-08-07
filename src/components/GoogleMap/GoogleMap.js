import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import axios from 'axios';

const mapStateToProps = (state) => ({ state });

const config = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
}

var url;

class GoogleMap extends Component {


  getURL = () => {
    axios.get('/api/googleMaps', config)
    .then((response) => {
      url = response.data;
      const googleMapScript = document.createElement("script");
      googleMapScript.src = url;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        this.googleMap = this.createGoogleMap();
      //  this.marker = this.createMarker();
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

    /*
  createMarker = () =>
    {
       new window.google.maps.Circle({
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "red",
        fillOpacity: 0.35,
        map: this.googleMap,
        center: this.center,
        radius: 20000
    });
    console.log(this.url, this.value);
  }
  */

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
