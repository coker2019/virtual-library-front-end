import React, { useState } from "react";
import { images } from "../Assets";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className=' border-2 h-auto border-x-gray-300 rounded-xl w-[400px] flex items-center bg-[#F5FEF1]'>
      <div>
        <input
          id='books'
          className='bg-transparent px-1 outline-none'
          value={search}
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={images.search} className='h-6 w-6' />
      </div>
    </div>
  );
};

export default Search;
