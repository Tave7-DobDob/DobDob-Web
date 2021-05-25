import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100vh;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;
const SliderContainer = styled.div`
  width: 100vh;
  display: flex;
`;
const Slide=({ img })=>{
    return (
      <div className="centerContainer img-wrapper">
        <img src={img} />
      </div>
        
    );
  }
const Slider=({imgArr})=>{
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
    const TOTAL_SLIDES = imgArr.length-1; 
    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      };
      const prevSlide = () => {
        if (currentSlide === 0) {
          setCurrentSlide(TOTAL_SLIDES);
        } else {
          setCurrentSlide(currentSlide - 1);
        }
      };
    useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
      }, [currentSlide]);
    return (
      <div className="slider-container">
      
      <button id="left" onClick={prevSlide}><FontAwesomeIcon icon={faChevronLeft}/></button>
        <Container className="centerContainer">
          <SliderContainer ref={slideRef}>
              {imgArr.map(img=><Slide img={img} />)}
          </SliderContainer>
          <span id="count">{currentSlide+1}/{TOTAL_SLIDES+1}</span>
        </Container>
          <button id="right" onClick={nextSlide}><FontAwesomeIcon icon={faChevronRight}/></button>

               </div>
      );
    }

export default Slider;