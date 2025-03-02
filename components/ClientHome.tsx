"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

export default function ClientHome({
  initialMovies,
}: {
  initialMovies: any[];
}) {
  const [movies, setMovies] = useState(initialMovies);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  );
}
