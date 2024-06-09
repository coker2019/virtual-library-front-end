// 

// src/components/Categories.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategorySelect = () => {
    navigate('/home', { state: { category: selectedCategory } });
  };

  return (
    <div>
      <h1>Categories</h1>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-4 p-2 border border-gray-300 rounded-lg"
      >
        <option value="">All Categories</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Physics">Physics</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        {/* Add more categories as needed */}
      </select>
      <button onClick={handleCategorySelect} className="bg-customGreen shadow-md p-2 border font-semibold mt-5 rounded-full w-full-500 text-white w-full">
        Select Category
      </button>
    </div>
  );
};

export default Categories;
