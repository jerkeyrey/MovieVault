import { fetchMovieDetails } from "@/lib/omdb";
import BookmarkButton from "@/components/BookmarkButton";
import { Suspense } from "react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ imdbID: string }>;
}

export default async function MovieDetails({ params }: PageProps) {
  // Wait for params to resolve
  const resolvedParams = await params;
  const movie = await fetchMovieDetails(resolvedParams.imdbID);

  if (!movie) return <div>Movie not found</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              {movie.Poster !== "N/A" ? (
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-lg shadow-2xl object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Poster Available</span>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                <span>{movie.Year}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{movie.Rated}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{movie.Runtime}</span>
              </div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {movie.Plot}
              </p>
              <div className="flex gap-4 mb-8">
                <BookmarkButton movieId={movie.imdbID} />
                <div className="flex items-center bg-gray-900 px-4 py-2 rounded">
                  <span className="text-yellow-500 font-semibold mr-2">
                    IMDb
                  </span>
                  <span className="font-bold">{movie.imdbRating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-gray-400 mb-2">Director</h3>
                  <p className="text-lg">{movie.Director}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Genre</h3>
                  <p className="text-lg">{movie.Genre}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-400 mb-2">Cast</h3>
                  <p className="text-lg">{movie.Actors}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Awards</h3>
                  <p className="text-lg">{movie.Awards}</p>
                </div>
                {movie.BoxOffice && (
                  <div>
                    <h3 className="text-gray-400 mb-2">Box Office</h3>
                    <p className="text-lg">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
