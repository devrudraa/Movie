"use client";
import React, { useEffect, useState } from "react";
import MovieSuggestion from "./MovieSuggestion";
import { useQuery } from "@tanstack/react-query";
import { GenreList } from "@/lib/Constant";
import MovieCardLoading from "../MovieCardLoading";
import Carousel from "./Carousel";
import { MovieSearchType } from "@/lib/Types";
import { searchMovies } from "@/lib/ApiRequest";

interface getMovieGenreReturn {
  data: { Search: MovieSearchType[]; Response: "True" | "False" };
}

async function getMovieGenre(): Promise<getMovieGenreReturn[]> {
  const genreRequests = GenreList.map(async (genre) => {
    return await searchMovies({ query: genre });
  });
  // @ts-ignore
  return await Promise.all(genreRequests);
}

const RandomMovies = () => {
  const [topMovies, setTopMovies] = useState<MovieSearchType[]>([]);
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["randomMovies"],
    queryFn: getMovieGenre,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      const topMov: MovieSearchType[] = data.map((_data) => {
        // (0, _data.data.Search.length) * ;
        // const randomIndex = Math.floor(
        //   Math.random() * _data.data.Search.length - 1
        // );
        const max = _data.data.Search.length - 1;
        const randomIndex = Math.floor(
          Math.floor(Math.random() * (max - 1 + 1)) + 1
        );

        return _data.data.Search[randomIndex];
      });

      setTopMovies(topMov);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <div className="w-fit mx-auto">
        <MovieCardLoading length={10} />
      </div>
    );
  }

  return (
    <>
      <h1 className="px-5 font-bold text-3xl tracking-wider text-primary">
        What to watch
      </h1>
      <Carousel movie={topMovies} />
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
