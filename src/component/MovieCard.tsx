import Image from "next/image";
import React from "react";
import Star, { StarOutline } from "./Icons/Star";
import { Button } from "@nextui-org/react";
import AddFav from "./AddFav";

const MovieCard = () => {
  return (
    <div className="max-w-[15rem] space-y-4 bg-cardBackground rounded-lg mx-auto">
      <Image
        src={"/movieThub.png"}
        width={250}
        height={250}
        alt="Movie Thumb"
        className="rounded-lg"
      />
      <div className="px-2 pb-5 space-y-3">
        <div className="flex gap-3 items-center">
          <Star />
          <span className="text-sm">7.6 / 10</span>
        </div>
        <h1 className="text-lg font-semibold">Mid-Season Trailer - Season 2</h1>
        <AddFav />
      </div>
    </div>
  );
};
export default MovieCard;
