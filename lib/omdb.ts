export async function fetchMovies(searchTerm: string, page: number = 1) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log("OMDB Response (Search):", data);
  return data.Response === "True" ? data.Search : [];
}

export async function fetchMovieDetails(imdbID: string) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  const data = await response.json();
  console.log("OMDB Response (Details):", data);
  return data.Response === "True" ? data : null;
}