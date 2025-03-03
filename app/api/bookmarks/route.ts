import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized - Please log in" },
      { status: 401 }
    );
  }

  try {
    const { movieId } = await req.json();
    const userId = session.user.id;

    if (!movieId) {
      return NextResponse.json({ message: "Missing movieId" }, { status: 400 });
    }

    const existing = await prisma.bookmark.findFirst({
      where: { userId, movieId },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Movie is already bookmarked" },
        { status: 400 }
      );
    }

    await prisma.bookmark.create({
      data: { userId, movieId },
    });

    return NextResponse.json({ message: "Bookmark added successfully" });
  } catch (err) {
    console.error("Bookmark creation failed:", err);
    return NextResponse.json(
      { message: "Failed to add bookmark" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized - Please log in" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
  });
  return NextResponse.json(bookmarks);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json({ message: "Movie ID required" }, { status: 400 });
  }

  try {
    await prisma.bookmark.delete({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId,
        },
      },
    });

    return NextResponse.json({ message: "Bookmark deleted" });
  } catch (err) {
    console.error("Bookmark deletion failed:", err);
    return NextResponse.json(
      { message: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}
