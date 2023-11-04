import Hero from "@/component/Pages/Hero";
import RandomMovies from "@/component/Pages/RandomMovies";

export default function Home() {
  return (
    <main className="space-y-5">
      <Hero />
      <RandomMovies />
    </main>
  );
}
