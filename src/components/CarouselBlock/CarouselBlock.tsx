import React from "react";
import { Carousel } from "antd";

import freeGif from "./../../assets/gif/freeGif.gif";
import thumbGif from "./../../assets/gif/thumbGif.gif";
import resumeImg from "./../../assets/standart.png";
import navImg from "./../../assets/nav.png";

import "./carouselBlock.scss";

export const CarouselBlock: React.FC = () => {
  return (
    <Carousel autoplay>
      <div>
        <div className="carousel">
          <img className="carousel__gif" src={freeGif} />
          <div className="carousel__title">
            <p>Создай резюме</p>
            <p className="carousel__title--small">
              абсолютно бесплатно без всяких смс:)
            </p>
          </div>

          <img className="carousel__img" src={resumeImg} />
        </div>
      </div>

      <div>
        <div className="carousel2">
          <div className="carousel2__block">
            <p className="carousel2__block-title">Удобная навигация</p>
            <p className="carousel2__block-subtitle">
              поможет быстро создать резюме
            </p>
            <img className="carousel2__block-img" src={navImg} alt="image" />
          </div>

          <img className="carousel2__gif" src={thumbGif} />
        </div>
      </div>
    </Carousel>
  );
};
