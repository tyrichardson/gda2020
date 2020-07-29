import React, { Component, createRef } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ state });

class GoogleMap extends Component {

  googleMapRef = createRef();

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAwSQzeRvW2Tyl6G-p6yWedTWs372rd_F0`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
    });
  }

  // TODO: get zip from user; get lat and lng from url (Write Page)

    city = {
      center: { lat: 37.683392, lng: -97.1706 }
    }

    zip = 67230;

    url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${this.zip}&lang=United+States`;

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 6,
      center: {
        lat: this.city.center.lat,
        lng: this.city.center.lng,
      },
      mapTypeId: "terrain",
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    });

  
  createMarker = () =>
    {
       new window.google.maps.Circle({
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "red",
        fillOpacity: 0.35,
        map: this.googleMap,
        center: this.city.center,
        radius: 20000
    });
    console.log(this.url, this.value);
  }
  

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
