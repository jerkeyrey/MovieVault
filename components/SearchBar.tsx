"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (movies: any[], searchTerm: string) => void;
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

  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search movies..."
        className="pr-12 rounded-lg border border-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        onClick={handleSearch}
        className="absolute right-0 top-0 h-full px-3 rounded-l-none"
        variant="ghost"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
