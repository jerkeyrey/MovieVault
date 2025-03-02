export async function fetchMovies(searchTerm: string, page: number = 1) {
  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`
  );

  const data = await response.json();
  console.log("OMDB Response:", data); // Debug log

  return data.Response === "True" ? data.Search : [];
}
