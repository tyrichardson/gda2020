import React, { Component, createRef } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ state });

class GoogleMap extends Component {

  googleMapRef = createRef();

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAwSQzeRvW2Tyl6G-p6yWedTWs372rd_F0&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
    });
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    });

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: this.googleMap,
    });

  render() {

    return (
      <div>
      <div
        ref={this.googleMapRef}
        id="google-map">
      </div>
      <pre>{JSON.stringify(this.props.state)}</pre>
      </div>
    );

  }
}

export default connect(mapStateToProps)(GoogleMap);
