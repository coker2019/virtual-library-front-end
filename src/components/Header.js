import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { images } from "../Assets";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 z-50 bg-gray-200 text-grey-500 flex justify-between items-center w-full mx-auto h-24 px-4 text-l">
    <div className="ml-3">
    <img
                src={images.unicross}
                className='w-16 h-auto'
                alt='nownow rider'
              />
    </div>
      <ul className="hidden md:flex">
        <div className="text-lg font-bold container gap-5 flex justify-between items-center">
          <Link to="/book-list" className="flex items-center hover:border-b-2 hover:border-customGreen">
            List of Books
          </Link>
          <Link to="/" className="flex items-center hover:border-b-2 hover:border-customGreen">
            Reserved Books
          </Link>
          <Link to="/" className="flex items-center hover:border-b-2 hover:border-customGreen">
            Borrowed Books
          </Link>
          <Link to="/profile" className="flex items-center mr-4">
            <FaUserCircle size={30} className="rounded-full text-gray-400 border border-gray-900" />
          </Link>
        </div>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "text-gray-300 fixed h-full left-0 top-0 w-[50%] border-r border-r-gray-900 bg-[#202121]  duration-500  ease-in-out"
            : "fixed left-[-100%] top-0  h-full ease-in-out duration-500"
        }
      >
   <div className="ml-4 justify-center">
    <img
                src={images.unicross}
                className='w-16 h-auto'
                alt='nownow rider'
              />
    </div>
        <ul className="p-8 text-2xl">
          <div className="text-lg font-bold container gap-5 flex flex-col justify-between items-center">
            <Link to="/book-list" className="flex items-center">
              List of Books
            </Link>
            <Link to="/" className="flex items-center">
            Reserved Books
            </Link>
            <Link to="/" className="flex items-center">
            Borrowed Books
            </Link>
            <Link to="/profile" className="flex items-center ml-5">
            <FaUserCircle size={30} className="rounded-full" />
          </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
