import { fetchMovieDetails } from "@/lib/omdb";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookmarkX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DeleteBookmarkButton from "@/components/DeleteBookmarkButton";

export const metadata: Metadata = {
  title: "MovieVault - Bookmarks",
  icons: {
    icon: "/bookmark.ico",
  },
};

export default async function Bookmarks() {
  const session = await auth();
  console.log("Session in bookmarks:", session); // Debug log

  if (!session?.user?.id) {
    // Ensure id exists
    return redirect("/api/auth/signin?callbackUrl=/bookmarks");
  }

  const userId = session.user.id; // Use id directly
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
  });

  const movies = await Promise.all(
    bookmarks.map(async (bookmark) => {
      const movie = await fetchMovieDetails(bookmark.movieId);
      return movie;
    })
  );

  const validMovies = movies.filter((movie) => movie !== null);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="relative w-full bg-gradient-to-b from-black/60 via-black/50 to-black py-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold">Your Bookmarks</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {validMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] space-y-4">
            <BookmarkX className="h-16 w-16 text-gray-400" />
            <p className="text-xl text-gray-400">No bookmarks yet</p>
            <Link href="/">
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
              >
                Explore Movies
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {validMovies.map((movie) => (
              <div key={movie.imdbID} className="relative group">
                <DeleteBookmarkButton movieId={movie.imdbID} />
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
        )}
      </div>
    </div>
  );
}
