import React, { useEffect } from "react";
import Modal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookByCategory } from "../redux/slices/booksSlice";
import {
  fetchCategories,
  setCategoryId,
} from "../redux/slices/categoriesSlice";
import { selectedCategory } from "../redux/slices/authSlice";

function SelectCategory({ isOpen, setIsOpen }) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  let { categories, loading } = useSelector((state) => state.categories);
  const handleSelectCategory = (id) => {
    try {
      dispatch(fetchBookByCategory(id)).then((res) => {
        if (fetchBookByCategory.fulfilled.match(res)) {
          dispatch(selectedCategory(true));
          dispatch(setCategoryId(id));
          setIsOpen(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} title={"Choose a Category to continue"}>
      <div className="grid grid-cols-6 gap-y-10 w-full border border-primaryGreen p-3">
        {loading && <span>Loading...</span>}
        {categories.length > 0 &&
          categories.map((category) => (
            <span
              onClick={() => handleSelectCategory(category.id)}
              className="text-[14px] cursor-pointer font-roboto text-primaryGreen hover:text-black "
              key={category.id}>
              {category.name}
            </span>
          ))}
      </div>
    </Modal>
  );
}

export default SelectCategory;
