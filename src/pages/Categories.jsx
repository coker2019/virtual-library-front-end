import Header from '../components/Header';
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
      <Header />
      <div className="flex flex-col justify-center items-center mt-44 bg-gray-200 h-[500px] w-[70%] mx-auto py-8 px-4 lg:px-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Select your category</h1>
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-4 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button
          onClick={handleCategorySelect}
          className="bg-customGreen shadow-md p-2 font-semibold rounded-full text-white w-full max-w-xs sm:max-w-md md:max-w-lg"
        >
          Select Category
        </button>
      </div>
    </div>
  );
};

export default Categories;
