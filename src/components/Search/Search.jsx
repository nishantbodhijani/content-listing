import React, { useState, useEffect } from 'react';
import './Search.css';

// Search component to filter grid items based on user input
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // State for storing the search query

  // Function to handle search input changes
  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch function passed as a prop
  };

  // Clear the search field when the search component is hidden
  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search..."
      className="search-input"
    />
  );
};

export default Search;
