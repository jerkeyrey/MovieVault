"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${search}`
      );

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default SearchBar;
