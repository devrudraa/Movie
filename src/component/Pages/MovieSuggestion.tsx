"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieSuggestion = () => {
  const [slidesToShow, setCenterSlidePercentage] = useState(0);

  useEffect(() => {
    const updateCenterSlidePercentage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 648) {
        setCenterSlidePercentage(1); // For small screens, 1card
      } else if (screenWidth < 750) {
        setCenterSlidePercentage(2); // For small screens, 1card
      } else if (screenWidth < 1024) {
        setCenterSlidePercentage(3); // For medium screens, 3 cards
      } else {
        setCenterSlidePercentage(4); // For larger screens, 4 cards
      }
    };

    updateCenterSlidePercentage();
    window.addEventListener("resize", updateCenterSlidePercentage);

    return () => {
      window.removeEventListener("resize", updateCenterSlidePercentage);
    };
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
    autoplay: false, // Enable auto-play
  };

  return (
    <section className="space-y-5 mx-10">
      <h1 className="headingSection">Horror</h1>
      <Slider {...settings}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Slider>
    </section>
  );
};
export default MovieSuggestion;
