"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { Carousel as ReactCarousel } from "react-responsive-carousel";

const MovieSuggestion = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(25);

  useEffect(() => {
    // Function to calculate centerSlidePercentage based on the screen width
    const updateCenterSlidePercentage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 648) {
        setCenterSlidePercentage(100); // For small screens, 1card
      } else if (screenWidth < 750) {
        setCenterSlidePercentage(50); // For small screens, 1card
      } else if (screenWidth < 1024) {
        setCenterSlidePercentage(100 / 3); // For medium screens, 3 cards
      } else {
        setCenterSlidePercentage(25); // For larger screens, 4 cards
      }
    };

    updateCenterSlidePercentage();
    window.addEventListener("resize", updateCenterSlidePercentage);

    return () => {
      window.removeEventListener("resize", updateCenterSlidePercentage);
    };
  }, []);

  return (
    <section className="px-5 space-y-5">
      <h1 className="headingSection">Horror</h1>
      {/* <div className="flex gap-5 overflow-x-scroll mx-auto items-center"> */}
      <ReactCarousel
        showIndicators={false}
        showArrows
        showThumbs={false}
        useKeyboardArrows={true}
        showStatus={false}
        centerSlidePercentage={centerSlidePercentage}
        centerMode={true}
      >
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
      </ReactCarousel>
      {/* </div> */}
    </section>
  );
};
export default MovieSuggestion;
