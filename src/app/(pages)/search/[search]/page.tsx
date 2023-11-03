"use client";
import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieSearchType } from "@/lib/Types";
import Image from "next/image";
import Dot from "@/component/Icons/Dot";
import SearchLoading from "@/component/SearchLoading";
import TrimText from "@/lib/TrimText";
import InfiniteScroll from "react-infinite-scroll-component";

interface response {
  data: {
    Response: "True" | "False";
    Search: MovieSearchType[];
    totalResults: string;
  };
}

interface pageProps {
  params: { search: string };
}
const SearchPage: FC<pageProps> = ({ params }) => {
  const searchQuery = params.search.replaceAll("-", " ");
  const [noOfPages, setNoOfPages] = useState<number>(1);

  const { isLoading, data, error, isSuccess } = useQuery<response>({
    queryKey: ["search", searchQuery],
    queryFn: () =>
      axios.get(
        `http://www.omdbapi.com/?s=${searchQuery}&page=${noOfPages}3&apikey=8aafc4f8`
      ),
  });
  if (isLoading) {
    return <SearchLoading />;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  //   if (isSuccess && !noOfPages) {
  //     setNoOfPages(
  //       Math.ceil(parseInt(data.data.totalResults) / data.data.Search.length)
  //     );
  //   }

  return (
    <main className="space-y-5">
      <div>
        <label className="font-semibold">
          Total result found:{" "}
          {data?.data.Response === "True" && data?.data.totalResults}
        </label>
      </div>
      {/* {items} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
        {/* <div className="flex flex-wrap gap-1 justify-start"> */}
        {data?.data.Response == "True" &&
          data?.data.Search.map((search: any, index: number) => {
            return <CarouselBanner Movie={search} key={index} />;
          })}
      </div>
    </main>
  );
};
export default SearchPage;

// function CarouselBanner({ Movie }: { Movie: MovieType }) {
function CarouselBanner({ Movie }: { Movie: MovieSearchType }) {
  return (
    <div className="p-5 sm:mx-auto w-fit max-w-[15rem] space-y-3 bg-cardBackground rounded-lg mx-auto">
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
