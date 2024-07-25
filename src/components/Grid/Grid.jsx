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
      });
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

  return (
    <>
      <Search onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={filteredData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid-container">
          {filteredData.map((item, index) => (
            <div key={index} className="grid-item">
              <img src={`https://test.create.diagnal.com/images/${item['poster-image']}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Grid;
