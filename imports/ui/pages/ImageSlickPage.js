import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper';


class ImageSlickPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const params = {
      slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30
    }
    return (
      <div >
      <Swiper {...params} >
        <div className="myidswiper">slider1</div>
        <div className="myidswiper">slider2</div>
        <div className="myidswiper">slider3</div>
        <div className="myidswiper">slider4</div>
        <div className="myidswiper">slider5</div>
      </Swiper>
      </div>
    );
  }

}

export default ImageSlickPage;
