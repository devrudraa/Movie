"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieSearchType } from "@/lib/Types";
import Link from "next/link";
import Arrow from "../Icons/Arrow";

interface MovieSuggestionProps {
  Movie: { data: { Search: MovieSearchType[] } };
  genre: string;
}

const MovieSuggestion = ({ Movie, genre }: MovieSuggestionProps) => {
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
      <Link href={"/search/" + genre}>
        <div className="flex gap-3 items-center group w-fit ">
          <h1 className="headingSection first-letter:capitalize group-hover:text-primary">
            {genre}
          </h1>
          <span className="group-hover:translate-x-3 transition-all">
            <Arrow />
          </span>
        </div>
      </Link>
      <Slider {...settings}>
        {Movie.data.Search.map((_movie) => {
          return <MovieCard key={_movie.imdbID} Movie={_movie} />;
        })}
      </Slider>
    </section>
  );
};
export default MovieSuggestion;
