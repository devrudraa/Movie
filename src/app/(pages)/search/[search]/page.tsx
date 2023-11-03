"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieSearchType } from "@/lib/Types";
import Image from "next/image";
import Dot from "@/component/Icons/Dot";
import SearchLoading from "@/component/SearchLoading";
import TrimText from "@/lib/TrimText";
import { useIntersection } from "@mantine/hooks";

interface pageProps {
  params: { search: string };
}

const SearchPage: FC<pageProps> = ({ params }) => {
  const searchQuery = params.search.replaceAll("-", " ");

  const FetchData = async (page: number) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=8aafc4f8`
    );
    return response;
  };

  const {
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    data,
    error,
  } = useInfiniteQuery(
    ["movie"],
    async ({ pageParam = 1 }) => {
      const response = await FetchData(pageParam);
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
      console.log("Fetching next page");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return <SearchLoading />;
  }
  if (error) {
    return <div>Error</div>;
  }

  if (isSuccess) {
    if (data?.pages[0].data.Response === "False")
      return <div>error no result found</div>;
  }

  const totalResults = data?.pages[0].data.totalResults;
  const pages = data?.pages.flatMap((page) => page.data);

  return (
    <>
      {data?.pages[0].data.Response}
      <main className="space-y-5">
        <div>
          <label className="font-semibold">
            Total result found: {totalResults}
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
          {/* <div className="flex flex-wrap gap-1 justify-start"> */}

          {pages?.map((page) => {
            if (page?.Response === "True")
              return page.Search.map((data: MovieSearchType, i: number) => {
                if (page.Search.length === i + 1) {
                  return (
                    <div key={i} ref={ref}>
                      <CarouselBanner Movie={data} />
                    </div>
                  );
                }
                return (
                  <div key={i}>
                    <CarouselBanner Movie={data} />
                  </div>
                );
              });
          })}
        </div>

        <div className="text-center">
          {isFetchingNextPage ? "Loading..." : "Nothing to show more!"}
        </div>
      </main>
    </>
  );
};
export default SearchPage;

// function CarouselBanner({ Movie }: { Movie: MovieType }) {
function CarouselBanner({ Movie }: { Movie: MovieSearchType }) {
  return (
    <div
      // ref={ref}
      className="p-5 sm:mx-auto w-fit max-w-[15rem] space-y-3 bg-cardBackground rounded-lg mx-auto h-full"
    >
      {/* <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2"> */}
      <Image
        src={Movie.Poster != "N/A" ? Movie.Poster : "/movieThub.png"}
        width={200}
        height={200}
        alt="Movie Thumb"
        className="rounded-lg mx-auto"
        loading="lazy"
      />
      <div className="space-y-8 flex flex-col pb-10">
        <div className="space-y-2">
          <div>
            <h1 className="text-xl font-semibold">
              <TrimText text={Movie.Title} length={50} />
            </h1>
            <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
              <label>{Movie.Year}</label>
              <Dot />
              <label>{Movie.Type}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
