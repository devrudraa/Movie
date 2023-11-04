import axios, { AxiosResponse } from "axios";
import { MovieSearchType, MovieType } from "./Types";

interface getMovieDetailsProps {
  movieId: string;
}
export async function getMovieDetails({
  movieId,
}: getMovieDetailsProps): Promise<MovieType> {
  const data = await axios.get(
    `http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
  );
  return data.data;
}

interface searchMoviesProps {
  query: string;
  page?: number;
}
interface searchMoviesReturn {
  data: { Search: MovieSearchType };
}
export async function searchMovies({
  query,
  page = 1,
}: searchMoviesProps): Promise<searchMoviesReturn> {
  const data = await axios.get(
    `http://www.omdbapi.com/?s=${query}&page=${page}}&apikey=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
  );
  return data;
}
