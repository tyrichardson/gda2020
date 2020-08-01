//this captures each item from the array that is mapped over and returns each separate array element as an item rendered on the DOM
import React from 'react';
//import { SwiperSlide } from 'swiper/react';

const ReadPageList = (props) => (

  <div key={props.story.id}>
    <p>{props.story.id}</p>
    <p>{props.story.story}</p>
  </div>
);
    
// this allows us to use <App /> in index.js
export default ReadPageList;
