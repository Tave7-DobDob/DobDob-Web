import React from "react";
import Slider from "react-slick";

const SliderSlick = ({ imgArr }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    adaptiveHeight: true,
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {imgArr.map((img) => (
          <div className="img-wrapper">
            <img src={img.url} alt="img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSlick;
