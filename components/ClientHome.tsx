"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import MovieFilters from "./MovieFilters";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
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
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>(movies);

  const handleSearch = (newMovies: Movie[], searchTerm: string) => {
    setMovies(newMovies);
    setDisplayedMovies(newMovies);
    setCurrentSearch(searchTerm); // Save search term
    setCurrentPage(1);
  };

  const handleReset = () => {
    setMovies(initialMovies);
    setDisplayedMovies(initialMovies);
    setCurrentSearch("");
    setCurrentPage(1);
  };

  const loadMore = async () => {
    if (!currentSearch || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `/api/movies?s=${encodeURIComponent(currentSearch)}&page=${nextPage}`
      );
      const data = await response.json();

      if (data.Search && Array.isArray(data.Search)) {
        const newMovies = [...movies, ...data.Search];
        setMovies(newMovies);
        setDisplayedMovies(newMovies); // Update displayed movies as well
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full bg-gradient-to-b from-black/60 via-black/50 to-black flex items-center justify-center pt-16">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto -mt-20">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Welcome to MovieVault
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Discover and explore your favorite movies. Search from thousands of
            titles.
          </p>
          <SearchBar onSearch={handleSearch} onReset={handleReset} />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {movies.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {currentSearch
                  ? `Search Results for "${currentSearch}"`
                  : "Popular Movies"}
              </h2>
              <MovieFilters movies={movies} onSort={setDisplayedMovies} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {displayedMovies.map((movie) => (
                <Link key={movie.imdbID} href={`/movies/${movie.imdbID}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
            {currentSearch && movies.length >= 10 && (
              <div className="flex justify-center mt-12 mb-8">
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
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-3xl font-bold mb-4">No Movies Found</h2>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
