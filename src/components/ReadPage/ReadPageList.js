//this captures each item from the array that is mapped over and returns each separate array element as an item rendered on the DOM
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';


const mapStateToProps = state => ({
  state
});

class ReadPageList extends Component {

  render() {

    return (
      <div id="readStory">
          <div>{this.props.story.story}</div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPageList);
