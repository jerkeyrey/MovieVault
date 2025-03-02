"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";

const SearchBar = ({ onSearch }: { onSearch: (movies: any[]) => void }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getData = async () => {
    try {
      const response = await fetch(`/api/movies?s=${search}`);
      const data = await response.json();
      onSearch(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="search-container">
      <Input
        type="text"
        placeholder="Search.."
        className="search-input"
        value={search}
        onChange={handleSearch}
      />
      <Button className="search-button" onClick={getData}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
