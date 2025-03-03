"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface Props {
  movies: Movie[];
  onSort: (sortedMovies: Movie[] | ((prev: Movie[]) => Movie[])) => void;
}

export default function MovieFilters({ movies, onSort }: Props) {
  const [sortBy, setSortBy] = useState("");

  const applySort = (value: string) => {
    setSortBy(value);
    const sorted = [...movies].sort((a, b) => {
      switch (value) {
        case "title-asc":
          return a.Title.localeCompare(b.Title);
        case "title-desc":
          return b.Title.localeCompare(a.Title);
        case "year-desc":
          return b.Year.localeCompare(a.Year);
        case "year-asc":
          return a.Year.localeCompare(b.Year);
        default:
          return 0;
      }
    });
    onSort(sorted);
  };

  const handleReset = () => {
    setSortBy("");
    onSort(movies);
  };

  return (
    <div className="flex items-center justify-end gap-3 p-3">
      <Select value={sortBy} onValueChange={applySort}>
        <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border-gray-800">
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          <SelectItem value="year-desc">Newest First</SelectItem>
          <SelectItem value="year-asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>

      {sortBy && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-10 w-10 rounded-full bg-gray-900/50 text-gray-400 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
