//This allows logged-in user to write and post a new story to the database (good_deeds on PostgreSQL). Their new story subsequently appears as the first story on the ReadPageWriter.js view.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import GoogleMap from '../GoogleMap/GoogleMap';
import '../GoogleMap/GoogleMap.css';

const mapStateToProps = state => ({
  state
});

class WritePage extends Component {
  state = {
    newStory: '',
  }

  handleChange = (event) => {
    this.setState({
      newStory: event.target.value,
    });

  }
  handleClick = (event) => {
    event.preventDefault();
    swal("Click Read to see your story. Click Archive to edit your story.");
    ReactDOM.findDOMNode(this.refs.textarea).focus();
    console.log('click publish button:', this.state.newStory);
    this.props.dispatch({
      type: "POST_STORY",
      payload: this.state
    });
    this.setState({
      newStory: ''
    });
}

  render() {
    let content = null;

    if(this.props.state.user.username) {
      content = (
        <div className="container">

          <div id="welcome">
            <h3>
              Welcome to the Write page, {this.props.state.user.username}!
            </h3>
          </div>

          <div id="storyTextArea">
            <textarea ref="textarea" value={this.state.newStory} onChange={this.handleChange} autoFocus row="4" cols="12" placeholder="type your story here">
            </textarea>
          </div>

          <div id="publishDiv">
            <button id="publishButton" type="submit" onClick={this.handleClick}>Publish</button>
          </div>

        </div>
      );
    }

    return (
      <div>
        { content }
        <GoogleMap />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(WritePage);

