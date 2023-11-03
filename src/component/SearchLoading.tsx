import { Skeleton, card } from "@nextui-org/react";
import React from "react";

const SearchLoading = () => {
  const cards = Array(10).fill("");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
      {cards.map((_, index) => {
        return (
          <main
            key={index}
            className="space-y-3 bg-cardBackground p-3 rounded-lg"
          >
            <Skeleton className="rounded-lg w-full h-64" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <div className="flex gap2">
              <Skeleton className="w-full h-5 rounded-lg" />
              <Skeleton className="w-full h-5 rounded-lg" />
            </div>
          </main>
        );
      })}
    </div>
  );
};
export default SearchLoading;
