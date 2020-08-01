import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper-bundle.css';
import '../ReadPage/ReadPage.css';

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
  swal("To see your Favorites, click Archive");
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
          <SwiperSlide key={story.id}>
            <div className="readPageSlideDiv" >
              <p>{story.id}</p>
              <p>{story.story}</p>
              <button onClick={() => this.handleClickFavorite(story)}>Favorite</button>
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
export default connect(mapStateToProps)(ReadPageWriter);
