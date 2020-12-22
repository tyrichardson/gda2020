import React, { Component } from "react";
import { connect } from "react-redux";

import axios from 'axios';

import './GoogleMap.css';

const mapStateToProps = (state) => ({ state });

const config = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
}

class GoogleMapDB extends Component {
  state = {
    staticMap: "",
  };

  componentDidMount() {
    this.getURL();
  }

  getURL = () => {
    axios
      .get("/api/googleMaps/latLong", {
        params: {
          name: `${this.props.storyID}`,
        },
        config,
      })
      .then((response) => {
        this.setState({
          staticMap: response.data,
        });
      })
      .catch((error) => {
        console.log("error in get googleMapDB ", error);
      });
  };

  render() {
    return <img src={this.state.staticMap} alt="map" id="static-google-map" />;
  }
}

export default connect(mapStateToProps)(GoogleMapDB);
