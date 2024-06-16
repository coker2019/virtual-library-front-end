import Header from "../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Table from "../components/table";
import {
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategorySelect = () => {
    navigate("/home", { state: { category: selectedCategory } });
  };

  let tableHeads = [
    {
      name: "S/N",
    },
    {
      name: "Name of Category",
    },

    {
      name: "Action",
    },
  ];

  let categories = useSelector((state) => state.categories.categories);
  return (
    <Wrapper>
      <div className="">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl font-bold text-primaryGreen">
            Category Manager
          </h5>

          <button className="p-3 bg-primaryGreen rounded-md text-white font-semibold shadow-lg hover:bg-customGreen hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen cursor-pointer">
            <div className="flex items-center">
              <span>Add new Category</span> <TagIcon className="w-5 h-5 ml-2" />
            </div>
          </button>
        </div>
        <div className="mt-5">
          <div className="w-full overflow-x-auto">
            <div className="min-w-full overflow-hidden rounded-lg shadow-md">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeads.map((column) => (
                      <th
                        key={column.index}
                        className="px-5 py-3   border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((row, index) => (
                      <tr key={row.id} className="hover:bg-gray-100">
                        <td className="px-5 py-4 itext-center border-b border-gray-200 bg-white text-sm">
                          {index + 1}
                        </td>
                        <td className="px-5  py-4 border-b border-gray-200 bg-white text-sm">
                          {row.name}
                        </td>
                        <td className="px-5 text-center py-4 border-b border-gray-200 bg-white text-sm">
                          <div className="flex w-100 justify-between">
                            <button>
                              <PencilSquareIcon className="w-6 h-6 text-primaryGreen" />
                            </button>
                            <button>
                              <TrashIcon className="w-6 h-6 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Categories;
