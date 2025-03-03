import { NextRequest, NextResponse } from "next/server";
import { fetchMovies } from "@/lib/omdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("s");

  if (!search) {
    return NextResponse.json({ Search: [] });
  }

  try {
    const pageNum = parseInt(searchParams.get("page") || "1");
    const startPage = pageNum === 1 ? 1 : pageNum * 2 - 1;

    // Fetch two consecutive pages based on the requested page number
    const [page1, page2] = await Promise.all([
      fetchMovies(search, startPage),
      fetchMovies(search, startPage + 1),
    ]);

    const combinedResults = [...page1, ...page2].slice(0, 18);
    return NextResponse.json({ Search: combinedResults });
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return NextResponse.json({ Search: [] }, { status: 500 });
  }
}
