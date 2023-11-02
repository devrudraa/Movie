import Image from "next/image";
import React from "react";
import Star, { StarOutline } from "./Icons/Star";
import { Button } from "@nextui-org/react";

const MovieCard = () => {
  return (
    <div className="max-w-[15rem] space-y-4 bg-cardBackground rounded-lg">
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
        <Button className="gap-4 w-full bg-white bg-opacity-[0.08] text-[#5799ef] px-4 py-2 rounded-lg hover:bg-[#5799ef2e]">
          <StarOutline color="#5799ef" />
          Add to favorite.
        </Button>
      </div>
    </div>
  );
};
export default MovieCard;
