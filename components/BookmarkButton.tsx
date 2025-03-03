'use client';
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import { toast } from 'sonner';

export default function BookmarkButton({ movieId }: { movieId: string }) {
  const handleBookmark = async () => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success('Added to bookmarks');
    } catch (error: any) {
      toast.error(error.message || 'Already in bookmarks');
    }
  };

  return (
    <Button onClick={handleBookmark} className="bg-white text-black hover:bg-white/90">
      <BookmarkPlus className="mr-2 h-5 w-5" />
      Add to Bookmarks
    </Button>
  );
}
