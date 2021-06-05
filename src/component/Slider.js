import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();


const Slider = ({imgArr}) => {
  const items = imgArr.map(img=> <div className="img-wrapper" ><img src={img} onDragStart={handleDragStart} /></div>);
  return (
    <AliceCarousel mouseTracking items={items} autoWidth={true} autoHeight={true} onResized={()=>true}/>
  );
}
export default Slider;