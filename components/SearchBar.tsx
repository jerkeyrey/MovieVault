"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";

const SearchBar = ({
  onSearch,
  onReset,
}: {
  onSearch: (movies: any[], searchTerm: string) => void;
  onReset: () => void;
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `/api/movies?s=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      if (data.Search && Array.isArray(data.Search)) {
        onSearch(data.Search, search); // Pass search term here
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      onSearch([], search);
    }
  };

  const handleReset = () => {
    setSearch("");
    onReset();
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search for movies..."
        className="w-full h-14 pl-5 pr-24 rounded-lg bg-black/60 border-gray-600 text-lg placeholder:text-gray-400 focus:ring-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
