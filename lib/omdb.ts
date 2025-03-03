export async function fetchMovies(searchTerm: string, pageNum: number = 1) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(
      searchTerm
    )}&page=${pageNum}&apikey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.Response === "True" ? data.Search : [];
}

export async function fetchMovieDetails(imdbID: string) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
  );
  if (!response.ok) throw new Error("Failed to fetch movie details");
  const data = await response.json();
  console.log("OMDB Response (Details):", data);
  return data.Response === "True" ? data : null;
}
