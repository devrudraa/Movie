"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Dot from "../Icons/Dot";
import Star from "../Icons/Star";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true, // Enable auto-play
    customPaging: function (i: any) {
      if (currentSlider === i) {
        console.log(i);
      }
      return (
        <button className="text-red-50">
          <svg width="5" height="5" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="2.5"
              cy="2.5"
              r="2.5"
              fill={currentSlider === i ? "white" : "gray"}
            />
          </svg>
        </button>
      );
    },
    afterChange: (currentSlide: number) => {
      setCurrentSlider(currentSlide);
    },
  };
  return (
    <section className="px-8 space-y-5">
      <h1 className="headingSection">Explore Movies</h1>
      <Slider {...settings}>
        <CarouselBanner />
        <CarouselBanner />
        <CarouselBanner />
      </Slider>
    </section>
  );
};
export default Carousel;

function CarouselBanner() {
  return (
    <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2">
      <Image
        src={"/movieThub.png"}
        width={250}
        height={250}
        alt="Movie Thumb"
        className="rounded-lg"
      />
      <div className="space-y-8 flex flex-col pb-10">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-semibold">
              Mid-Season Trailer - Season 2
            </h1>
            <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
              <label>2013</label>
              <Dot />
              <label>R</label>
              <Dot />
              <label>2hr 1min</label>
            </div>
          </div>
          <div className="flex gap-3">
            <Star />
            7.6 / 10
          </div>
        </div>
        <p className="flex-1">
          The mercurial villain Loki resumes his role as the God of Mischief in
          a new series that takes place after the events of &quot;Avengers:
          Endgame.&quot;
        </p>
        <div className="flex gap-3 ">
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Action
          </div>
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Drama
          </div>
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Horror
          </div>
        </div>
      </div>
    </div>
  );
}
