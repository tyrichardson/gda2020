//this generates the DOM display of the individual stories by logged-in user on the Archive page

import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  state
});

class ArchivePageList extends Component {

  state = {
    editing: false,
    text: this.props.story.story,
    newText: '',
  };

  handleDelete = () => {
    console.log('clicked delete button', this.props.story);
    this.props.dispatch({
      type: 'DELETE_ARCHIVE_STORY',
      payload: this.props.story
    })
  }

  handleEdit = () => {
    console.log('clicked edit button', this.props.story);
    this.setState({
      editing: !this.state.editing
    })
  }

  handleSave = () => {
    let val = this.refs.newText.value;
    this.setState({
      newText: val,
      editing: false
    },() => {
      console.log('newText val, this.state, from Edit button:', this.state);
      let newEdit = {
        story: this.state.newText, id: this.props.story.id, writer_id: this.props.story.writer_id
      };
      console.log('newEdit for PUT payload:', newEdit);
      this.props.dispatch({
        type: "EDIT_STORY_PUT",
        payload: newEdit
      });
    })
  }
  
  // Upon dispatch, payload: {preEditStory: this.props.story, edit: this.state.text }

  render() {
    if (this.state.editing) {
      return (
        <div>
          <textarea ref="newText" defaultValue={this.props.story.story}></textarea>
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleEdit}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div id="archiveStory">
          {this.props.story.story}
          <br></br>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      )
    }
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ArchivePageList);