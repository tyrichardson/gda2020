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
var markerIcon = `https://lh3.googleusercontent.com/bsqoF2qeA81gGdClubjd5UlQOtgabyfRBzyhMi4E8BRs9zehvO20pqU2uYORaDZfzhAV-IK44h2a9zM70wErRhDnnNjjDSe4Dyp_nuQyMAT9j-ohYfGc9o4CCF88hdFvRKz0R-Xdb2lQL_52ttKrofpOKhFLrnXptx7MhIBL9gx3cZ6O5ambEiFTmc0RAr0uMrIVPTQ7mpJ2AuWpBdVxiJQHMhaJ4ew2ZElZWnVJDHUOZRWCUWdIymFhavFymVDBvyUFqFCqgUJqBwSZLXyqYjnS3J0s7vp9bG1RlqzXGYsqy0EdqAOqnDopJWJdlupEwoHyljV1pdOVHU9uDR5y1DvUsY1_80pOfa2X7dE9aA7MyfcX6wlut63TVbqK9FSXr6NdtiYjHZebvgttl70JQzeQ8qA-3xnDQ5I3KHD5QBZbaVIULTjXjI2STxD3WPtAUYslohv79LdVm4xkG6FQsXXRQk43RDNAW_wjteYX9-MO2_D52KBQ95ZP5H98kUG4xL36NRaRXzeF91sFlDNvOhCrbc890ESGmgJ_3ZIhY3cF8d58676PgQ0Cp1fYvnB58vSGByqFE9FmhtQ7f4a3JTR8GkiXpuM9Erty8Dyo8-KV4gzIqgcIn5i-I3quEzukfzuMNVWlcT2z-MCXCZfTPa04vmAE46ddNFBEiT7QlIRSDJVkOUW_t8eEO4Fy5w=s32-no?authuser=0`;

class GoogleMap extends Component {

  getURL = () => {
    axios.get('/api/googleMaps', config)
    .then((response) => {
      url = response.data.url;
      locations = response.data.result;
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
        position: location, location,
        icon: markerIcon,
        });
      })
    }

  createMarkerCluster = (map) =>
  {
    if (window.google.maps.MarkerClusterer) {
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
