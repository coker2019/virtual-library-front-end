import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Table from "../components/table";
import {
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "./add-category";
import {
  fetchCategories,
  removeCategory,
  updateCategory,
} from "../redux/slices/categoriesSlice";
import Input from "../components/input";
import Loader from "../components/loader";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  let [openModal, setOpenModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  let { categories, isLoading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const handleCategoryEdit = (id, name) => {
    setEditRow(id);
    setEditCategory(name);
  };

  const handleCategoryChange = (e) => {
    setEditCategory(e.target.value);
  };

  const saveEditCategory = (id) => {
    const updateCategoryData = { id, name: editCategory };
    dispatch(updateCategory(updateCategoryData)).then((res) => {
      if (updateCategory.fulfilled.match(res)) {
        dispatch(fetchCategories());
        setEditRow(null);
      }
    });
  };

  const cancelEditCategory = () => {
    setEditRow(null);
  };

  const handleOnclose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleDeleteCategory = (id) => {
    try {
      dispatch(removeCategory(id)).then((res) => {
        if (removeCategory.fulfilled.match(res)) {
          dispatch(fetchCategories());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AddCategory
        onClose={handleOnclose}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        btn_text={"Add"}
        title={"Add New Category"}
      />
      <Wrapper>
        <div className="">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold text-primaryGreen">
              Category Manager
            </h5>

            <button
              onClick={() => handleOpen()}
              className="p-3 bg-primaryGreen rounded-md text-white font-semibold shadow-lg hover:bg-customGreen hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen cursor-pointer">
              <div className="flex items-center">
                <span>Add new Category</span>{" "}
                <TagIcon className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>
          <div className="mt-5">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-20 h-20 text-primaryGreen" />
              </div>
            ) : (
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
                      {Array.isArray(categories) &&
                        categories.length > 0 &&
                        categories.map((row, index) => (
                          <tr key={row.id} className="hover:bg-gray-100">
                            <td className="px-5 py-4 itext-center border-b border-gray-200 bg-white text-sm">
                              {index + 1}
                            </td>
                            <td className="px-5  py-4 border-b border-gray-200 bg-white text-sm">
                              {editRow === row.id ? (
                                <Input
                                  value={editCategory}
                                  onChange={handleCategoryChange}
                                />
                              ) : (
                                <span className="text-sm"> {row.name}</span>
                              )}
                            </td>
                            <td className="px-5 text-center py-4 border-b border-gray-200 bg-white text-sm">
                              <div className="flex w-100 justify-between">
                                {editRow === row.id ? (
                                  <>
                                    <button
                                      onClick={() => saveEditCategory(row.id)}>
                                      Save
                                    </button>
                                    <button onClick={cancelEditCategory}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleCategoryEdit(row.id, row.name)
                                      }>
                                      <PencilSquareIcon className="w-6 h-6 text-primaryGreen" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteCategory(row.id)
                                      }>
                                      <TrashIcon className="w-6 h-6 text-red-500" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Categories;
