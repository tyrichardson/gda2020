import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import GoogleMap from '../GoogleMap/GoogleMap';
import '../GoogleMap/GoogleMap.css';
import './WritePage.css';

const mapStateToProps = state => ({
  state
});

class WritePage extends Component {
  state = {
    newStory: '',
    zipcode: '',
  }

  handleChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    swal("Published stories appear in Read and Public. Click Archive to edit your stories.");
    ReactDOM.findDOMNode(this.refs.textarea).focus();
    console.log('click publish button:', this.state.newStory, this.state.zipcode);
    this.props.dispatch({
      type: "POST_STORY",
      payload: this.state
    });
    this.setState({
      newStory: '',
      zipcode: '',
    });
}

  render() {
    let content = null;

    if(this.props.state.user.username) {
      content = (
        <div className="container">

          <div id="welcome">
            <h3>
              {this.props.state.user.username}'s writing page
            </h3>
          </div>

          <div id="zipcodeInputDiv">
            <input id="zipcodeInput"
              type="text"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleChangeFor('zipcode')}
              autoFocus
              placeholder="The story's ZIP code?"
            ></input>
          </div>

          <div id="storyTextAreaDiv">
            <textarea id="storyTextArea" 
              ref="textarea" 
              value={this.state.newStory} 
              onChange={this.handleChangeFor('newStory')} 
              row="4" 
              cols="12" 
              placeholder="The story of your good deed?">
            </textarea>
          </div>

          <div id="publishDiv">
            <button id="publishButton" type="button" onClick={this.handleClick}>Publish your story</button>
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

