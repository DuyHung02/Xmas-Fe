import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  return (
    <Carousel className="my-custom-carousel mt-3">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/564x/93/66/aa/9366aa85149388c2e1f09bbf9d79b60e.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/564x/c8/62/97/c8629774af80c0761883dd5097ac6a3c.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/564x/12/6f/e9/126fe9e1d8f13ab4f126d2b9a4ed83fe.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
