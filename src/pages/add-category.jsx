import React, { useState } from "react";
import Modal from "../components/modal";
import Input from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCategory,
  fetchCategories,
} from "../redux/slices/categoriesSlice";

const AddCategory = ({ id, isOpen, onClose, setIsOpen }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.categories);
  let [category, setCategory] = useState("");

  const handleAddCategory = () => {
    try {
      dispatch(addNewCategory(category)).then((res) => {
        if (addNewCategory.fulfilled.match(res)) {
          dispatch(fetchCategories());
          setCategory("");
          setIsOpen(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      loading={loading}
      btn_onClick={handleAddCategory}
      title="Add New Category"
      btn_text="Add">
      <div className="p-2 flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Name..."
          name="name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddCategory;
