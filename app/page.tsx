import { fetchMovies } from "@/lib/omdb";
import ClientHome from "@/components/ClientHome";

export default async function HomePage() {
  // Fetch first 3 pages of movies (30 movies total)
  const [page1, page2, page3] = await Promise.all([
    fetchMovies("star wars", 1),
    fetchMovies("star wars", 2),
    fetchMovies("star wars", 3),
  ]);

  const initialMovies = [...page1, ...page2, ...page3];
  return <ClientHome initialMovies={initialMovies} />;
}
