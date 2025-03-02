import { fetchMovies } from "@/lib/omdb";
import ClientHome from "@/components/ClientHome";

export default async function HomePage() {
  const initialMovies = await fetchMovies("rocky");
  return <ClientHome initialMovies={initialMovies} />;
}
