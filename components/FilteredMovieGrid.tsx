"use client";

import { useState } from "react";
import MovieFilters from "./MovieFilters";
import MovieCard from "./MovieCard";
import Link from "next/link";
import DeleteBookmarkButton from "./DeleteBookmarkButton";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface Props {
  movies: Movie[];
  showDelete?: boolean;
  className?: string;
}

export default function FilteredMovieGrid({
  movies,
  showDelete = true,
  className,
}: Props) {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  return (
    <div className={`space-y-6 ${className}`}>
      <MovieFilters movies={movies} onSort={setFilteredMovies} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2">
        {filteredMovies.map((movie) => (
          <div key={movie.imdbID} className="relative group">
            {showDelete && <DeleteBookmarkButton movieId={movie.imdbID} />}
            <Link
              href={`/movies/${movie.imdbID}`}
              className="block transition-transform duration-200 hover:scale-105"
            >
              <div className="relative">
                <MovieCard movie={movie} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
