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
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search for movies..."
        className="w-full h-14 pl-5 pr-16 rounded-lg bg-black/60 border-gray-600 text-lg placeholder:text-gray-400 focus:ring-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4"
        variant="secondary"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
