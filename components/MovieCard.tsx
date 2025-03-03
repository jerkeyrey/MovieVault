"use client";
import Image from "next/image";

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
          <div className="relative w-full h-full">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No Poster</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-sm truncate">{movie.Title}</h3>
        <p className="text-gray-400 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
}
