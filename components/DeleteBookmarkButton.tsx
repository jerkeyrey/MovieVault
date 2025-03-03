"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteBookmarkButton({ movieId }: { movieId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/bookmarks?movieId=${movieId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Bookmark removed");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      size="icon"
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
