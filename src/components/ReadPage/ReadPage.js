// The ReadPage is the Public Reading View.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';

import GoogleMapDB from '../GoogleMap/GoogleMapDB';

import 'swiper/swiper-bundle.css';
import Sharing from '../Sharing/Sharing';
import '../App/App.css';

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
       <div className="swiperDiv" >
        <p>{story.story}</p>
        <GoogleMapDB storyID={story.id} />
       </div>
      </SwiperSlide>
      )
      })}
      </Swiper>
      <p style={{padding: '0 0 0 1rem', margin: '0 0 0 0'}}>
      <a href="https://www.google.com/search?q=the+ripple+effects+of+good+deeds&rlz=1C5CHFA_enUS910US911&oq=the+ripple&aqs=chrome.1.69i57j35i39j46j0j46j0l3.3558j0j15&sourceid=chrome&ie=UTF-8"
      target="_blank" rel="noopener noreferrer">
      <img src={require("../../images/water-ring-icon.png")} alt="water ripple icon" style={{width:'64px', height:'64px', margin: '1rem 0 0 0'}} />
      </a> ...for information about the ripple effects of good deeds. 
      </p>
      <br />
        <Sharing />
    </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ReadPage);
