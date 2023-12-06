import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./slider.scss"

const Slider = () => {
    return (
        <div className="sliderContainer">
            <Carousel infiniteLoop={true} autoPlay={true} interval={2000} showThumbs={false} >
                <div>
                    <img className="slider" src="https://source.unsplash.com/mBQIfKlvowM" alt="" id="slide1" />
                </div>
                <div>
                    <img className="slider" src="https://source.unsplash.com/YeBI31kK2_4" alt="" id="slide2" />
                </div>
                <div>
                    <img className="slider" src="https://source.unsplash.com/dSBsCzzlqTU" alt="" id="slide3" />
                </div>
            </Carousel>
        </div>
    )
}

export default Slider