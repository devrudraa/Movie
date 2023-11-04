import { Skeleton } from "@nextui-org/react";
import React from "react";

const MovieDetailsSkeleton = () => {
  return (
    <section className="w-fit flex flex-col gap-5 md:flex-row mx-auto">
      <Skeleton className="w-96 h-96 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="w-52 h-5 rounded-md" />
        <Skeleton className="w-52 h-5 rounded-md" />
        <Skeleton className="w-52 h-5 rounded-md" />
        <Skeleton className="w-52 h-5 rounded-md" />
        <Skeleton className="w-52 h-5 rounded-md" />
      </div>
    </section>
  );
};
export default MovieDetailsSkeleton;
