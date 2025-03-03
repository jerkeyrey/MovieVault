"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import type { Movie } from "@/types/movie";

interface SearchBarProps {
  onSearch: (movies: Movie[], searchTerm: string) => void;
  onReset: () => void;
}

const SearchBar = ({ onSearch, onReset }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      onReset();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/movies?s=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      if (data.Search && Array.isArray(data.Search)) {
        onSearch(data.Search, search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      onSearch([], search);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      handleReset();
    }
  };

  const handleReset = () => {
    setSearch("");
    setIsLoading(false);
    onReset();
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search for movies..."
        className="w-full h-14 pl-5 pr-24 rounded-lg bg-black/60 border-gray-600 text-lg placeholder:text-gray-400 focus:ring-white"
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
        {search && (
          <Button
            onClick={handleReset}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        <Button
          onClick={handleSearch}
          className="h-10 px-4"
          variant="secondary"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
