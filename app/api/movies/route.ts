import { NextRequest, NextResponse } from "next/server";
import { fetchMovies } from "@/lib/omdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("s") || "2023"; // Match the default search term
  try {
    const movies = await fetchMovies(search);
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
