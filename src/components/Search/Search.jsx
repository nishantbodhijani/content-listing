import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // State for storing the search query

   // Function to handle search input changes
  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);  // Call onSearch function 
  };

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
