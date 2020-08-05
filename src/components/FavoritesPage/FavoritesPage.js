import React, { Component } from 'react';
import { connect } from 'react-redux';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const mapStateToProps = state => ({
  state
});

class FavoritesPage extends Component {
  
  componentDidMount() {
    this.props.dispatch({
      type:'GET_WRITER_STORIES_SAGA'
    });
    this.props.dispatch({
      type:'GET_FAVORITES'
    })
  }

  handleClickUpdate = (story) => {
    console.log('clicked remove favorite button', story);
    this.props.dispatch({
      type: 'DELETE_FAVORITE',
      payload: story
    })
  }

  render() {

    return (
      <div>
        <div id="welcome">
          <h3>
            {this.props.state.user.username }'s favorites page
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
        {this.props.state.getFavorites.reverse().map((story) => {
        return (
          <SwiperSlide key={story.id}>
            <div className="swiperDiv" >
              <p>{story.id}</p>
              <p>{story.story}</p>
              <button onClick={() => this.handleClickUpdate(story)}>Remove Favorite</button>
            </div>
          </SwiperSlide>
          )
          })}
        </Swiper>
        </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FavoritesPage);

