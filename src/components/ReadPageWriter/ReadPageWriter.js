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

  render() {    

    return (

      <div>
        <div id="welcome">
              <h3>
                {this.props.state.user.username }'s reading page
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
        {this.props.state.getResponse.reverse().map((story) => {
        return (
          <div>
          
            <SwiperSlide key={story.id}>
              <div className="swiperDiv" >
                <p>{story.id}</p>
                <p>{story.story}</p>
                <GoogleMapDB storyID={story.id} />
              </div>
            </SwiperSlide>  
            <button onClick={() => this.handleClickFavorite(story)}>Add Favorite</button>
          </div>
        
        )})}
        </Swiper>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPageWriter);
