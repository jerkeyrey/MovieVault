"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function ClientHome({
  initialMovies,
}: {
  initialMovies: Movie[];
}) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newMovies: Movie[], searchTerm: string) => {
    setMovies(newMovies);
    setCurrentSearch(searchTerm); // Save search term
    setCurrentPage(1);
  };

  const loadMore = async () => {
    if (!currentSearch || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `/api/movies?s=${currentSearch}&page=${nextPage}`
      );
      const data = await response.json();

      if (data.Search && Array.isArray(data.Search)) {
        setMovies((prev) => [...prev, ...data.Search]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-center mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          {currentSearch && movies.length >= 10 && (
            <div className="flex justify-center mt-8 mb-6">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                variant="secondary"
                size="lg"
                className="px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Movies"
                )}
              </Button>
            </div>
          )}
        </>
      ) : currentSearch ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-3xl font-bold mb-4">No Movies Found</h2>
          <p className="text-gray-400">Try searching for something else</p>
        </div>
      ) : null}
    </main>
  );
}
