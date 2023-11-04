"use client";
import React from "react";
import MovieSuggestion from "./MovieSuggestion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GenreList } from "@/lib/Constant";
import SearchLoading from "../SearchLoading";

async function getMovieGenre() {
  const genreRequests = GenreList.map(async (genre) => {
    return await axios.get(
      `http://www.omdbapi.com/?s=${genre}&apikey=8aafc4f8`
    );
  });
  return await Promise.all(genreRequests);
}

const RandomMovies = () => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["randomMovies"],
    queryFn: getMovieGenre,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-fit mx-auto">
        <SearchLoading length={10} />
      </div>
    );
  }

  return (
    <>
      <h1 className="px-5 font-bold text-3xl tracking-wider text-primary">
        What to watch
      </h1>
      {/* <Carousel /> */}
      {isSuccess &&
        data?.map((_data, index) => {
          if (_data.data.Response === "True")
            return (
              <MovieSuggestion
                key={index}
                Movie={_data}
                genre={GenreList[index]}
              />
            );

          console.error(
            "Can't find any movies in this genre list",
            GenreList[index]
          );
        })}
    </>
  );
};
export default RandomMovies;
