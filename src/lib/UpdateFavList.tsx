interface UpdateFavListProps {
  movieId: string;
  rating?: number;
  review?: string;
}

export default async function UpdateFavList({
  movieId,
  rating,
  review,
}: UpdateFavListProps) {
  const movieIds = localStorage.getItem("favMovies");
  if (movieIds) {
    const data = await JSON.parse(movieIds);

    const _movieIds = data._movieIds;
    _movieIds.push(movieId);
    const setData = {
      ...data,
      _movieIds,
      [movieId]: {
        movieId,
        rating,
        review,
      },
    };

    localStorage.setItem("favMovies", JSON.stringify(setData));
  } else {
    const setData = {
      _movieIds: [movieId],
      [movieId]: {
        movieId,
        rating,
        review,
      },
    };
    localStorage.setItem("favMovies", JSON.stringify(setData));
  }
}

export async function RemoveFromFavorite({ movieId }: { movieId: string }) {
  const movieIds = localStorage.getItem("favMovies");
  if (movieIds) {
    const data = await JSON.parse(movieIds);

    const _movieIds = data._movieIds;
    const indexToRemove = _movieIds.indexOf(movieId);

    const new_moviesIds: any = _movieIds.filter(
      // @ts-ignore
      (_, index) => index !== indexToRemove
    );

    delete data[movieId];

    const setData = {
      ...data,
      _movieIds: new_moviesIds,
    };

    localStorage.setItem("favMovies", JSON.stringify(setData));
  }
}

export async function GetAllFavMovies() {
  const movieIds = localStorage.getItem("favMovies");
  if (movieIds) {
    const data = await JSON.parse(movieIds);
    return data;
  } else {
    return false;
  }
}

interface returnType {
  review: string;
  rating: number;
}

export function GetMyRatingReview({
  movieId,
}: {
  movieId: string;
}): returnType {
  const movieIds = localStorage.getItem("favMovies");

  const returnData: returnType = {
    rating: 0,
    review: "",
  };
  if (movieIds) {
    const data = JSON.parse(movieIds);

    if (data[movieId]) {
      returnData["review"] = data[movieId]?.review;
      returnData["rating"] = data[movieId]?.rating;
      return returnData;
    }
  }
  return returnData;
}
