// The ReadPage is the Public Reading View/Landing page. No auth is required. The data GET for the site is run when this componentDidMount, via getSaga.js and getResponsReducer.The data is in an array at this.props.state.getResponseReducer. This same data is mapped over for the DOM display for authenticated users in ReadPageWriter.js.

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReadPageList from './ReadPageList';

const mapStateToProps = state => ({
  state
});

class ReadPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_STORIES'
    })
  }

  render() {
    let readPageList = this.props.state.getResponse.reverse().map((story) => {
      return (<ReadPageList key={story.id} story={story}/>)
    })

    return (
      <div>
          { readPageList }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPage);
