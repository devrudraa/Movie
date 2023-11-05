"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieSearchType } from "@/lib/Types";
import MovieCardLoading from "@/component/MovieCardLoading";
import { useIntersection } from "@mantine/hooks";
import MovieCard from "@/component/MovieCard";
import NothingToShow from "@/component/NothingToShow";
import LoadingIcon from "@/component/Icons/LoadingIcon";
import { searchMovies } from "@/lib/ApiRequest";
import axios from "axios";

interface pageProps {
  params: { search: string };
}

const SearchPage: FC<pageProps> = ({ params }) => {
  const searchQuery = params.search.replaceAll("-", " ");

  const {
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    data,
    error,
  } = useInfiniteQuery(
    [searchMovies],
    async ({ pageParam = 1 }): Promise<any> => {
      const response = await searchMovies({
        query: searchQuery,
        page: pageParam,
      });
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return <MovieCardLoading />;
  }
  if (error) {
    return <div>Error</div>;
  }

  if (isSuccess) {
    if (data?.pages[0].data.Response === "False") return <NothingToShow />;
  }

  const totalResults = data?.pages[0].data.totalResults;
  const pages = data?.pages.flatMap((page) => page.data);

  return (
    <>
      <main className="space-y-5">
        <div>
          <label className="font-semibold">
            Total result found: {totalResults}
          </label>
        </div>
        {/* <NothingToShow /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
          {pages?.map((page) => {
            if (page?.Response === "True")
              return page.Search.map((data: MovieSearchType, i: number) => {
                return (
                  <div className="h-full" key={i} ref={ref}>
                    <MovieCard Movie={data} />
                  </div>
                );
              });
          })}
        </div>

        <div className="text-center">
          {isFetchingNextPage ? <LoadingIcon /> : "You have reached the end!"}
        </div>
      </main>
    </>
  );
};
export default SearchPage;
