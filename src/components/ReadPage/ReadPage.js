// The ReadPage is the Public Reading View.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './ReadPage.css';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const mapStateToProps = state => ({
  state
});

class ReadPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_STORIES'
    })
  }

  render() {
  
    return (

      <div>
        <div id="welcome">
              <h3>
                The public reading page
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
export default connect(mapStateToProps)(ReadPage);
