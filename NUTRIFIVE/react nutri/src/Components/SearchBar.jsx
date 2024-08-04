import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBar = ({ parentCallback }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async () => {
    try {
      if(query.length==0){
        setSearchResults([]);
        return;
      } 
      const res=await fetch(import.meta.env.VITE_API_KEY+`api/v1/food/search/${query}`,{
        method:"GET",
        credentials: 'include', 
        headers:{ "Content-Type": "application/json" },
      });
      if(res.ok){
        const data = await res.json();
        setSearchResults(data.data);
        console.log(data.data);
      }
      else{
        const errorData= await res.json();
        alert(errorData.message || 'Incorrect information')
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <ul>
            {searchResults.map((food, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <span>{food.name}</span>
                <button
                  onClick={() => {parentCallback(food); setSearchResults([])}}
                  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
