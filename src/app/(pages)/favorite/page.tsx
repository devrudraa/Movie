"use client";
import Dot from "@/component/Icons/Dot";
import Star from "@/component/Icons/Star";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Bin from "@/component/Icons/Bin";
import { GetMyRatingReview, RemoveFromFavorite } from "@/lib/UpdateFavList";
import { useQuery } from "@tanstack/react-query";
import TrimText from "@/lib/TrimText";
import NothingToShow from "@/component/NothingToShow";
import MovieCardLoading from "@/component/MovieCardLoading";
import Link from "next/link";
import { getMovieDetails } from "@/lib/ApiRequest";

const Page = () => {
  const [movieData, setMovieData] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    function checkFavMovies() {
      let favData = localStorage.getItem("favMovies");
      if (favData) {
        let { _movieIds } = JSON.parse(favData);
        setMovieData(_movieIds);
      }
    }
    checkFavMovies();
  }, [refresh]);

  return (
    <main className="space-y-5 min-h-screen">
      <h1 className="headingSection">Your Favorite</h1>
      {movieData.length != 0 ? (
        <>
          <div className="w-full bg-gray-800/90 p-3 rounded-lg flex justify-between md:items-center flex-col md:flex-row">
            <h3 className="headingSectionSecondary">
              {movieData?.length} Titles
            </h3>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
            {movieData?.map((data, index) => {
              return (
                <MovieCardFav
                  key={index}
                  MovieId={data}
                  refetchData={setRefresh}
                />
              );
            })}
          </section>
        </>
      ) : (
        <NothingToShow />
      )}
    </main>
  );
};
export default Page;

const MovieCardFav = ({
  MovieId,
  refetchData,
}: {
  MovieId: string;
  refetchData: (value: any) => void;
}) => {
  const { isLoading, data } = useQuery({
    queryKey: [MovieId],
    queryFn: async () => {
      return await getMovieDetails({ movieId: MovieId });
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <MovieCardLoading length={1} />;
  }

  const { rating: myRating, review: myReview } = GetMyRatingReview({
    movieId: MovieId,
  });

  return (
    <div className="max-w-[17rem] space-y-4 bg-cardBackground rounded-lg mx-auto h-full flex flex-col justify-between">
      <Link href={`/movie/${MovieId}`} className="w-full h-72 relative">
        <Image
          // @ts-ignore
          src={data?.Poster != "N/A" ? data?.Poster : "/noImage.png"}
          fill
          alt="Movie Thumb"
          className="rounded-lg"
        />
      </Link>

      <div className="space-y-8 flex flex-col pb-10 px-3">
        <div className="space-y-2">
          <div>
            <Link href={`/movie/${MovieId}`}>
              <h1 className="text-xl font-semibold">
                {TrimText({ text: data?.Title })}
              </h1>
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Star size={15} />
            <label htmlFor="rating" className="text-xs">
              {data?.imdbRating} / 10
            </label>
            <Dot />
            <Star color="#507adc" size={18} />
            <label htmlFor="rating" className="text-xs">
              {myRating} / 5
            </label>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="headingSectionSecondary">Your review</h1>
          <p className="flex-1">
            {myReview && myReview != ""
              ? TrimText({ text: myReview, length: 150 })
              : "You haven't reviewed this movie yet!"}
          </p>
        </div>
        <Button
          onClick={() => {
            RemoveFromFavorite({ movieId: MovieId });
            // @ts-ignore
            refetchData((prev) => !prev);
          }}
          color="danger"
          className="w-full"
        >
          <Bin />
          Remove
        </Button>
      </div>
    </div>
  );
};
