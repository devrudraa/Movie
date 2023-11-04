"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieSearchType } from "@/lib/Types";
import { GenreList } from "@/lib/Constant";
import Link from "next/link";

interface CarouselProps {
  movie: MovieSearchType[];
}
const Carousel = ({ movie }: CarouselProps) => {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  console.log(movie);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true, // Enable auto-play
    customPaging: function (i: any) {
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
      {movie.length > 0 && movie && (
        <Slider {...settings}>
          {movie.map((_movie, index) => {
            return (
              <CarouselBanner
                key={index}
                movie={_movie}
                genre={GenreList[index]}
              />
            );
          })}
        </Slider>
      )}
    </section>
  );
};
export default Carousel;

function CarouselBanner({
  movie,
  genre,
}: {
  movie: MovieSearchType;
  genre: string;
}) {
  return (
    <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2">
      <Link href={"/movie/" + movie.imdbID}>
        <Image
          src={movie.Poster != "N/A" ? movie.Poster : "/noImage.png"}
          width={250}
          height={250}
          alt="Movie Thumb"
          className="rounded-lg"
        />
      </Link>
      <div className="space-y-8 flex flex-col pb-10">
        <div className="space-y-2 flex-1">
          <div>
            <Link href={"/movie/" + movie.imdbID}>
              <h1 className="text-3xl font-semibold">{movie.Title}</h1>
            </Link>
            <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
              <label>{movie.Year}</label>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="first-letter:capitalize px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            {genre}
          </div>
          <div className="first-letter:capitalize px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            {movie.Type}
          </div>
        </div>
      </div>
    </div>
  );
}
