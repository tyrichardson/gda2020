import React, { Component } from "react";
import { connect } from "react-redux";

import axios from 'axios';

const mapStateToProps = (state) => ({ state });

const config = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
}

class GoogleMapDB extends Component {
  state = {
    staticMap: ''
  }

  getURL = () => {
    axios.get('/api/googleMaps/latLong', {
      params: {
        name: `${this.props.storyID}`
      }, config
    })
    .then((response) => {
      this.setState({
        staticMap: response.data
      });
    })
    .catch((error) => {
      console.log('error in get googleMapDB ', error);
    })
  }

  componentDidMount() {
    this.getURL();
  }

  render() {

    return (
      
      <img src={this.state.staticMap} alt="map" />
      
    );

  }
}

export default connect(mapStateToProps)(GoogleMapDB);
