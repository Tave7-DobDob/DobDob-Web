import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SliderSlick from "./SliderSlick";
const Grid = ({ imgArr }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="grid-wrapper" onClick={onToggleClick}>
        {imgArr.length === 1 && (
          <div className="single-grid-container">
            <img width="100%" src={imgArr[0].url} alt="img-1" />
          </div>
        )}
        {imgArr.length === 2 ||
          (imgArr.length === 4 && (
            <div className="grid-container">
              {imgArr.map((it) => (
                <div key={it.url}>
                  <img height="100%" src={it.url} alt="img" />
                </div>
              ))}
            </div>
          ))}
        {imgArr.length === 3 && (
          <div className="grid-container">
            {imgArr.map((it, index) => {
              if (index === 0)
                return (
                  <div className="item1" key={it.url}>
                    <img height="100%" src={it.url} alt="img" />
                  </div>
                );
              else
                return (
                  <div key={it.url}>
                    <img height="100%" src={it.url} alt="img" />
                  </div>
                );
            })}
          </div>
        )}
        {imgArr.length === 5 && (
          <div className="grid-container">
            {imgArr.map((it, index) => {
              if (index === 3)
                return (
                  <div key={it.url}>
                    <span>+ 1</span>
                    <img
                      className="plus-img"
                      height="100%"
                      src={it.url}
                      alt="img"
                    />
                  </div>
                );
              else if (index === 4) return;
              else
                return (
                  <div key={it.url}>
                    <img height="100%" src={it.url} alt="img" />
                  </div>
                );
            })}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="wrapper">
          <div className="centerContainer slider-wrapper">
            <button id="close-btn" onClick={onToggleClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="centerContainer slider-wrapper2">
              <SliderSlick imgArr={imgArr} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Grid;
