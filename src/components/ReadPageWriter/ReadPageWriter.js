//The ReadPageWriter is the reading page for a logged-in user. It uses the data from getSaga and getResponseReducer.

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReadPageWriterList from './ReadPageWriterList';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class ReadPageWriter extends Component {
  componentDidMount() {
    this.props.dispatch({
      type:'GET_STORIES'
  });
}

  render() {

    const readPageWriterList = this.props.state.getResponse.reverse().map((story) => {
      return (<ReadPageWriterList key={story.id} story={story}/>)
    })

    let content = null;

    if (this.props.state.user.username) {
      content = (
        <div>

          <div id="welcome">
            <h3>
              Welcome to the Read page, {this.props.state.user.username }!
            </h3>
          </div>

          <div>
            { readPageWriterList }
          </div>
        </div>
      );
    } 

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPageWriter);
