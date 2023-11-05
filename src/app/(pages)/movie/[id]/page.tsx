"use client";
import AddFav from "@/component/AddFav";
import Dot from "@/component/Icons/Dot";
import Star from "@/component/Icons/Star";
import MovieDetailsSkeleton from "@/component/MovieDetailsSkeleton";
import { getMovieDetails } from "@/lib/ApiRequest";
import formatDuration from "@/lib/FormatDuration";
import TrimText from "@/lib/TrimText";
import { MovieType } from "@/lib/Types";
import { GetMyRatingReview } from "@/lib/UpdateFavList";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";
interface MovieDetailsProps {
  params: { id: string };
}

const MovieDetails: FC<MovieDetailsProps> = ({ params }) => {
  const { data, isLoading, isError } = useQuery<MovieType>({
    queryKey: ["movie", params.id],
    queryFn: async (): Promise<MovieType> => {
      return await getMovieDetails({ movieId: params.id });
    },
  });

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const { rating: myRating } = GetMyRatingReview({ movieId: params.id });

  return (
    <section className="flex p-3 sm:p-5 max-w-6xl gap-10 flex-col md:flex-row  ">
      <Image
        src={data.Poster != "N/A" ? data.Poster : "/noImage.png"}
        width={400}
        height={400}
        alt="Movie Thumb"
        className="rounded-lg flex-1 max-w-full md:max-w-md mx-auto md:mx-0"
      />

      <div className="space-y-8 flex flex-col pb-10 max-w-md">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-semibold">{data.Title}</h1>
            <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
              <label>{data.Year}</label>
              <Dot />
              <label>{data.Rated}</label>
              <Dot />
              <label>{formatDuration(data.Runtime)}</label>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <h1>IMDb Rating</h1>
              <div className="flex gap-3">
                <Star />
                {data.imdbRating} / 10
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-500 rounded-md" />
            <div>
              <h1>Your Rating</h1>
              <div className="flex gap-3">
                <Star color="#5799ef" />
                {myRating} / 5
              </div>
            </div>
          </div>
        </div>
        <p className="flex-1">
          {TrimText({
            text: data.Plot,
            length: 200,
          })}
        </p>

        <div className="space-y-3">
          <h1 className="headingSectionSecondary">Credits</h1>
          <div>
            <span className="font-bold text-lg mr-3">Directors:</span>
            <span>{data.Director}</span>
          </div>
          <div>
            <span className="font-bold text-lg mr-3">Actors:</span>
            <span>{data.Actors}</span>
          </div>
          <div>
            <span className="font-bold text-lg mr-3">Writer:</span>
            <span>{data.Writer}</span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {data.Genre.split(",").map((genre, index) => {
            return (
              <div
                key={index}
                className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer"
              >
                {genre}
              </div>
            );
          })}
        </div>
        <AddFav imageUrl={data.Poster} title={data.Title} movieId={params.id} />
      </div>
    </section>
  );
};
export default MovieDetails;
