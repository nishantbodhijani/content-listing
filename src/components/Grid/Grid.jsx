import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Search from '../Search/Search';
import './Grid.css';

// Grid component for displaying content in a grid layout with infinite scrolling
const Grid = () => {
  const [data, setData] = useState([]); // State for storing the data
  const [filteredData, setFilteredData] = useState([]); // State for storing the filtered data
  const [page, setPage] = useState(1); // State for keeping track of the current page
  const [showSearch, setShowSearch] = useState(false); // State for toggling search field visibility

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchMoreData();
  }, []);

  // Function to fetch more data from the API
  const fetchMoreData = () => {
    axios.get(`https://test.create.diagnal.com/data/page${page}.json`)
      .then(res => {
        const newData = res.data.page['content-items'].content;
        setData(prevData => [...prevData, ...newData]);
        setFilteredData(prevData => [...prevData, ...newData]);
        setPage(page + 1);
      })
      .catch(err => console.error("Failed to fetch data: ", err));
  };

  // Function to handle the search functionality
  const handleSearch = (query) => {
    if (query) {
      const filtered = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // Function to toggle the search field visibility
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Function to clear the search field
  const clearSearch = () => {
    setShowSearch(false);
    handleSearch('');
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <img
          src="https://test.create.diagnal.com/images/Back.png"
          alt="Back"
          className="nav-icon"
          onClick={clearSearch}
        />
        <span className="nav-title">Romantic Comedy</span>
        <img
          src="https://test.create.diagnal.com/images/search.png"
          alt="Search"
          className="nav-icon"
          onClick={toggleSearch}
        />
      </div>
      {/* Search component to filter the grid items */}
      {showSearch && <Search onSearch={handleSearch} />}
      {/* Infinite scroll component to load more data as the user scrolls */}
      <InfiniteScroll
        dataLength={filteredData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid-container">
          {/* Render grid items */}
          {filteredData.map((item, index) => (
            <div key={index} className="grid-item">
              <img
                src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
                alt={item.name}
                onError={(e) => { e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'; }} // handle edge cases
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Grid;
