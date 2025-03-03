import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { movieId } = await req.json();
    
    // Check for existing bookmark
    const existing = await prisma.bookmark.findFirst({
      where: {
        userId: 'default-user',
        movieId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Movie is already bookmarked' },
        { status: 400 }
      );
    }

    await prisma.bookmark.create({
      data: {
        userId: 'default-user',
        movieId,
      },
    });

    return NextResponse.json({ message: 'Bookmark added successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to add bookmark' },
      { status: 500 }
    );
  }
}
