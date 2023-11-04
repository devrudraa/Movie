import MovieDetailsSkeleton from "@/component/MovieDetailsSkeleton";
import Carousel from "@/component/Pages/Carousel";
import Hero from "@/component/Pages/Hero";
import MovieSuggestion from "@/component/Pages/MovieSuggestion";
import RandomMovies from "@/component/Pages/RandomMovies";

export default function Home() {
  return (
    <main className="space-y-5">
      <Hero />
      <RandomMovies />
    </main>
  );
}
