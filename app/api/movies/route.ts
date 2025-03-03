import { NextRequest, NextResponse } from "next/server";
import { fetchMovies } from "@/lib/omdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("s");
  const page = parseInt(searchParams.get("page") || "1");

  if (!search) {
    return NextResponse.json({ Search: [] });
  }

  try {
    // Fetch two pages of results
    const [page1, page2] = await Promise.all([
      fetchMovies(search, 1),
      fetchMovies(search, 2),
    ]);

    // Combine results and take first 18 items
    const combinedResults = [...page1, ...page2].slice(0, 18);
    return NextResponse.json({ Search: combinedResults });
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return NextResponse.json({ Search: [] }, { status: 500 });
  }
}
