export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Genre?: string;
  Runtime?: string;
  Rated?: string;
  imdbRating?: string;
}

export type MovieSearchResponse = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};
