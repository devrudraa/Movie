import Image from "next/image";
import React from "react";
import AddFav from "./AddFav";
import { MovieSearchType } from "@/lib/Types";
import Dot from "./Icons/Dot";
import TrimText from "@/lib/TrimText";
import Link from "next/link";

interface MovieCardProps {
  Movie: MovieSearchType;
}

const MovieCard = ({ Movie }: MovieCardProps) => {
  return (
    <div className="max-w-[15rem] space-y-4 bg-cardBackground rounded-lg mx-auto h-full flex flex-col justify-between">
      <Link href={`/movie/${Movie.imdbID}`} className="w-full h-72 relative">
        <Image
          src={Movie.Poster != "N/A" ? Movie.Poster : "/noImage.png"}
          fill
          alt="Movie Thumb"
          className="rounded-lg"
        />
      </Link>

      <div className="px-2 pb-5 space-y-3">
        <div className="flex gap-3 items-center text-xs text-gray-300">
          <label htmlFor="">{Movie.Type}</label>
          <Dot />
          <label htmlFor="">{Movie.Year}</label>
        </div>
        <Link className="text-lg font-semibold" href={`/movie/${Movie.imdbID}`}>
          {TrimText({ text: Movie.Title })}
        </Link>
        {/* <h1 className="text-lg font-semibold ">
        </h1> */}
        <AddFav
          movieId={Movie.imdbID}
          imageUrl={Movie.Poster}
          title={Movie.Title}
        />
      </div>
    </div>
  );
};
export default MovieCard;
