import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../Assets";
import { useDispatch } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { logoutUser, resetUserState } from "../redux/slices/authSlice";
const Header = () => {
  const [nav, setNav] = useState(false);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(storedUserData);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignout = () => {
    dispatch(logoutUser()).then((resultAction) => {
      if (logoutUser.fulfilled.match(resultAction)) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        dispatch(resetUserState());
        navigate("/login");
      }
    });
  };

  return (
    <div className=" fixed top-0 left-0 right-0 z-[100] bg-primaryGreen  flex  justify-between items-center w-full mx-auto h-16 px-4 text-sm  border-b">
      <div className="ml-3 cursor-pointer" onClick={() => navigate("/home")}>
        <img src={images.unicross} className="w-10" alt="nownow rider" />
      </div>
      <ul className="hidden md:flex">
        <div className="container gap-5 flex justify-between items-center">
          <NavLink
            to="/home"
            className="flex items-center hover:border-b-2 hover:border-customGreen">
            Home
          </NavLink>
          {currentUser.role === "admin" && (
            <>
              <NavLink
                to="/books"
                className="flex items-center hover:border-b-2 hover:border-customGreen">
                Manage Books
              </NavLink>
              <NavLink
                to="/categories"
                className="flex items-center hover:border-b-2 hover:border-customGreen">
                Manage Categories
              </NavLink>
            </>
          )}
          {currentUser.role === "user" && (
            <>
              <NavLink
                to="/reserved-books"
                className="flex items-center hover:border-b-2 hover:border-customGreen">
                Reserved Books
              </NavLink>
              <NavLink
                to="/borrowed-books"
                className="flex items-center hover:border-b-2 hover:border-customGreen">
                Downloads
              </NavLink>
            </>
          )}

          {currentUser && (
            <div className="flex items-center hover:border-b-2 hover:border-customGreen">
              <UserCircleIcon className="h-5 w-5" />
              <button onClick={() => handleSignout()}>Signout</button>
            </div>
          )}
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
        }>
        <div className="ml-4 justify-center">
          <img
            src={images.unicross}
            className="w-16 h-auto"
            alt="nownow rider"
          />
        </div>
        <ul className="p-8 w-full">
          <div className="text-sm font-bold container gap-5 flex flex-col justify-between items-center">
            <div className="container gap-5 flex flex-col">
              <NavLink
                to="/home"
                className="flex items-center hover:border-b-2 hover:border-customGreen">
                Home
              </NavLink>
              {currentUser.role === "admin" && (
                <>
                  <NavLink
                    to="/books"
                    className="flex items-center hover:border-b-2 hover:border-customGreen">
                    Manage Books
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className="flex items-center hover:border-b-2 hover:border-customGreen">
                    Manage Categories
                  </NavLink>
                </>
              )}
              {currentUser.role === "user" && (
                <>
                  <NavLink
                    to="/reserved-books"
                    className="flex items-center hover:border-b-2 hover:border-customGreen">
                    Reserved Books
                  </NavLink>
                  <NavLink
                    to="/borrowed-books"
                    className="flex items-center hover:border-b-2 hover:border-customGreen">
                    Downloaded Books
                  </NavLink>
                </>
              )}

              {currentUser && (
                <div className="flex items-center hover:border-b-2 hover:border-customGreen">
                  <UserCircleIcon className="h-5 w-5" />
                  <button onClick={() => handleSignout()}>Signout</button>
                </div>
              )}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
