import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import GoogleMapDB from '../GoogleMap/GoogleMapDB';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const mapStateToProps = state => ({
  state
});

class ReadPageWriter extends Component {

  componentDidMount() {
    this.props.dispatch({
      type:'GET_STORIES'
    });
  }

  handleClickFavorite = (story) => {
  // event.preventDefault();
    swal("This story has been added to your Favorites.");
    console.log('clicked favorite button', story);
    this.props.dispatch({
      type: 'ADD_FAVORITE',
      payload: story
    })
  }

  handleClickInappropriate = (story) => {
    // event.preventDefault();
      swal("This story has been marked as Inappropriate and will be reviewed by an admin for possible removal.");
      console.log('clicked Inappropriate button', story);
      this.props.dispatch({
        type: 'MARK_INAPPROPRIATE',
        payload: story
      })
    }

    handleToggleInappropriate = (story) => {
      // event.preventDefault();
        swal("This story has been UNMARKED as Inappropriate.");
        console.log('clicked Inappropriate button', story);
        this.props.dispatch({
          type: 'TOGGLE_INAPPROPRIATE',
          payload: story
        })
      }

      handleDelete = (story) => {
        console.log('clicked delete button', story);
        this.props.dispatch({
          type: 'DELETE_ARCHIVE_STORY',
          payload: story.id
        })
      }

  render() {
    
    let content = null;

    if (this.props.state.user.admin) {
      content = (
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
        {this.props.state.getResponse.reverse().map((story) => {
        return (
          <SwiperSlide key={story.id}>
            <div className="swiperDiv" >
              Boolean Value: {String (`${story.inappropriate}`) }
              <p>{story.story}</p>
              <GoogleMapDB storyID={story.id} />
              <br />
              <button onClick={() => this.handleClickFavorite(story)}>Add Favorite</button>
              <button onClick={() => this.handleToggleInappropriate(story)}>Inappropriate</button>
              <button onClick={() => this.handleDelete(story)}>Delete</button>
            </div>
          </SwiperSlide>
        )
        })}
        </Swiper>
      )
    } else {
      content = (
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
        {this.props.state.getResponse.reverse().map((story) => {
        return (
          <SwiperSlide key={story.id}>
            <div className="swiperDiv" >
              <p>{story.story}</p>
              <GoogleMapDB storyID={story.id} />
              <br />
              <button onClick={() => this.handleClickFavorite(story)}>Add Favorite</button>
              <button onClick={() => this.handleClickInappropriate(story)}>Inappropriate</button>
            </div>
          </SwiperSlide>
        )
        })}
        </Swiper>
      )
    }

    return (
      <div>
        <div id="welcome">
          <h3>
            {this.props.state.user.username }'s reading page
          </h3>
        </div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPageWriter);
