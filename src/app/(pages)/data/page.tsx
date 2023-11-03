"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Dot from "@/component/Icons/Dot";
import Star from "@/component/Icons/Star";
import { MovieType } from "@/lib/Types";
import formatDuration from "@/lib/FormatDuration";
import TrimText from "@/lib/TrimText";

interface pageProps {}
const Page: FC<pageProps> = ({}) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=8aafc4f8"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error</div>;
  }

  if (isSuccess) {
    console.log(data?.data);
  }

  return (
    <div>
      <CarouselBanner Movie={data?.data} />
    </div>
  );
};
export default Page;

function CarouselBanner({ Movie }: { Movie: MovieType }) {
  console.log(Movie.Response);

  return (
    Movie.Response === "True" && (
      <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2">
        <Image
          src={Movie.Poster}
          width={250}
          height={250}
          alt="Movie Thumb"
          className="rounded-lg"
          loading="lazy"
        />
        <div className="space-y-8 flex flex-col pb-10">
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-semibold">{Movie.Title}</h1>
              <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
                <label>{Movie.Year}</label>
                <Dot />
                <label>{Movie.Rated}</label>
                <Dot />
                <label>{formatDuration(Movie.Runtime)}</label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Star size={20} />
              {Movie.imdbRating} / 10
            </div>
          </div>
          <p className="flex-1">
            <TrimText text={Movie.Plot} length={200} />
          </p>
          <div className="flex gap-3 ">
            {Movie.Genre.split(",").map((genre, index) => (
              <div
                key={index}
                className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer"
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
