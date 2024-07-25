import axios from 'axios';

const BASE_URL = 'https://test.create.diagnal.com/data/';

// Function to fetch data
export const fetchPageData = (page) => {
  return axios.get(`${BASE_URL}page${page}.json`);
};
