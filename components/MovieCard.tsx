"use client";
import { Card } from "@/components/ui/card";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="group relative bg-gray-900/50 rounded-lg overflow-hidden">
      <div className="aspect-[2/3] relative">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No Poster</span>
          </div>
        )}
      </div>
      <div className="p-2">
        {" "}
        {/* Reduced from p-4 to p-2 */}
        <h3 className="font-semibold text-sm truncate">{movie.Title}</h3>
        <p className="text-gray-400 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
}
