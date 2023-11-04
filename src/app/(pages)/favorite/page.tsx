"use client";
import Dot from "@/component/Icons/Dot";
import Star from "@/component/Icons/Star";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Sort } from "@/lib/Constant";
import Bin from "@/component/Icons/Bin";
import { GetMyRatingReview, RemoveFromFavorite } from "@/lib/UpdateFavList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TrimText from "@/lib/TrimText";
import Nothing from "@/component/Nothing";
import SearchLoading from "@/component/SearchLoading";
import Link from "next/link";

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
            {/* <Select label="Sort" className="max-w-xs w-full" size="sm">
              {Sort.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </Select> */}
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
        <Nothing />
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
      return await axios.get(
        `http://www.omdbapi.com/?i=${MovieId}&apikey=8aafc4f8`
      );
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <SearchLoading length={1} />;
  }

  const { rating: myRating, review: myReview } = GetMyRatingReview({
    movieId: MovieId,
  });

  return (
    <div className="max-w-[17rem] space-y-4 bg-cardBackground rounded-lg mx-auto h-full flex flex-col justify-between">
      <Link href={`/movie/${MovieId}`} className="w-full h-72 relative">
        <Image
          src={data?.data.Poster != "N/A" ? data?.data.Poster : "/noImage.png"}
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
                {TrimText({ text: data?.data.Title })}
              </h1>
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Star size={15} />
            <label htmlFor="rating" className="text-xs">
              {data?.data.imdbRating} / 10
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
              ? myReview
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
