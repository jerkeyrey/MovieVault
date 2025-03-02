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
    const movies = await fetchMovies(search, page);
    return NextResponse.json({ Search: movies });
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return NextResponse.json({ Search: [] }, { status: 500 });
  }
}
