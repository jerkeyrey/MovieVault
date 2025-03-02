export async function fetchMovies(searchTerm: string) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.Response === "True" ? data.Search : [];
}