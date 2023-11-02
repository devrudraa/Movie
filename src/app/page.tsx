import MovieCard from "@/component/MovieCard";
import Carousel from "@/component/Pages/Carousel";
import Hero from "@/component/Pages/Hero";
import MovieSuggestion from "@/component/Pages/MovieSuggestion";
import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="space-y-5">
      <Hero />
      <Carousel />
      <MovieSuggestion />
      <MovieSuggestion />
      <MovieSuggestion />
    </main>
  );
}
