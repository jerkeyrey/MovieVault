"use client";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookmarkButton({ movieId }: { movieId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBookmark = async () => {
    if (status === "loading") return;

    if (!session) {
      toast.error("Please sign in to bookmark movies");
      router.push("/api/auth/signin");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Added to bookmarks");
      router.refresh();
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to bookmark movie";
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      onClick={handleBookmark}
      disabled={status === "loading"}
      className="bg-white text-black hover:bg-white/90"
    >
      <BookmarkPlus className="mr-2 h-5 w-5" />
      {status === "loading"
        ? "Loading..."
        : session
        ? "Add to Bookmarks"
        : "Sign in to Bookmark"}
    </Button>
  );
}