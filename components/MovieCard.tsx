"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card className="group relative bg-gray-800 text-white border-none overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No Poster</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-lg font-bold line-clamp-2 mb-1">
              {movie.Title}
            </h3>
            <p className="text-sm text-gray-300">{movie.Year}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
