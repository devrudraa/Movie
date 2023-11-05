import { Skeleton } from "@nextui-org/react";
import React from "react";

const MovieCardLoading = ({ length = 10 }: { length?: number }) => {
  const cards = Array(length).fill("");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map((_, index) => {
        return (
          <main
            key={index}
            className="space-y-3 bg-cardBackground p-3 rounded-lg min-w-[13rem]"
          >
            <Skeleton className="rounded-lg w-full h-64" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="w-full h-5 rounded-lg" />
              <Skeleton className="w-full h-5 rounded-lg" />
            </div>
          </main>
        );
      })}
    </div>
  );
};
export default MovieCardLoading;
