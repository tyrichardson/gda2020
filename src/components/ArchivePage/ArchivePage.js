import React, { Component } from 'react';
import { connect } from 'react-redux';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import GoogleMapDB from '../GoogleMap/GoogleMapDB';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const mapStateToProps = state => ({
  state
});

class ArchivePage extends Component {

  state = {
    editing: false,
    text: this.props.state.getResponse.story,
    newText: '',
  };
  
  componentDidMount() {
    this.props.dispatch({
      type:'GET_WRITER_STORIES_SAGA'
    });
  }

  handleDelete = (story) => {
    console.log('clicked delete button', story);
    this.props.dispatch({
      type: 'DELETE_ARCHIVE_STORY',
      payload: story.id
    })
  }

  handleEdit = () => {
    console.log('clicked edit button');
    this.setState({
      editing: !this.state.editing
    })
  }

  handleSave = (story) => {
    let val = this.refs.newText.value;
    this.setState({
      newText: val,
      editing: false
    },() => {
      console.log('newText val, this.state, from Edit button:', this.state);
      let newEdit = {
        story: this.state.newText, id: story.id, writer_id: story.writer_id
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
      <div id="welcome">
        <h3>
          {this.props.state.user.username }'s archive page in editing mode
        </h3>
      </div>
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          loop
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
        {this.props.state.getWriterStories.reverse().map((story) => {
        return (
          <SwiperSlide key={story.id}>
            <div className="swiperDiv" >
              <textarea ref="newText" defaultValue={story.story}></textarea>
              <button onClick={() => this.handleSave(story)}>Save</button>
              <button onClick={() => this.handleEdit()}>Cancel</button>
            </div>
          </SwiperSlide>
          )
          })}
        </Swiper>
        </div>
      </div>
    )
  } else {
      return (
        <div>
        <div id="welcome">
          <h3>
            {this.props.state.user.username }'s archive page
          </h3>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          loop
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
        {this.props.state.getWriterStories.reverse().map((story) => {
        return (
          <SwiperSlide key={story.id}>
            <div className="swiperDiv" >
              <p>{story.id}</p>
              <p>{story.story}</p>
              <GoogleMapDB storyID={story.id} />
              <button onClick={() => this.handleDelete(story)}>Delete</button>
              <button onClick={() => this.handleEdit()}>Edit</button>
            </div>
          </SwiperSlide>
          )
          })}
        </Swiper>
        </div>
      );
    }
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ArchivePage);

