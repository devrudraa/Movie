export interface MovieType {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  //   Language: string;
  //   Country: string;
  //   Awards: string;
  Poster: string;
  //   Ratings: {
  //     Source: string;
  //     Value: string;
  //   }[];
  //   Metascore: string;
  imdbRating: string;
  //   imdbVotes: string;
  imdbID: string;
  //   Type: string;
  //   DVD: string;
  //   BoxOffice: string;
  //   Production: string;
  //   Website: string;
  Response: "True" | "False";
}

export interface MovieSearchType {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
