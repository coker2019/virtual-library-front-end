import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import Input from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchBooks, uploadBook } from "../redux/slices/booksSlice";

const PostBook = ({ id, isOpen, onClose, setIsOpen }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const bookloading = useSelector((state) => state.books.loading);

  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (err) {
      console.log("category error", err);
    }
  }, [dispatch]);

  const defaultFormData = {
    title: "",
    author: "",
    description: "",
    file_url: "",
    image_file: "",
    category_id: "",
    recommended: null,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateImgSize = (event) => {
    const maxFileSizeMB = 0.2;
    const file = event.target.files[0];
    if (file && file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size should not exceed ${maxFileSizeMB}MB`);
      event.target.value = ""; // Clear the input
    } else {
      setError("");
      return true;
    }
    return false;
  };

  const handleImageChange = (e) => {
    if (validateImgSize(e)) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setFormData((formData) => ({
            ...formData,
            image_file: `${imageUrl}`, // Assuming formData is state or a variable that holds your form data
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAddNewBook = () => {
    dispatch(uploadBook(formData)).then((res) => {
      if (uploadBook.fulfilled.match(res)) {
        dispatch(fetchBooks());
        setIsOpen(false);
        setFormData(defaultFormData);
      }
    });
  };

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      loading={bookloading}
      title="Post new Book"
      btn_onClick={handleAddNewBook}
      btn_text="Post Book">
      <div className="p-2 flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Title..."
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Author..."
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Book url..."
          onChange={handleChange}
          value={formData.file_url}
          name="file_url"
        />
        <select
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
          className="py-3 px-2 bg-white border rounded-sm shadow-sm opacity-50 text-mute">
          <option>Select Category</option>
          {categories &&
            categories.length > 0 &&
            categories.map((itm) => (
              <option key={itm.id} value={itm.id}>
                {itm.name}
              </option>
            ))}
        </select>
        <Input
          type="textarea"
          onChange={handleChange}
          value={formData.description}
          name="description"
          placeholder="Description..."
          cols="41"
          rows="3"
        />
        <Input
          type="file"
          accept=".jpg, .jpeg"
          onChange={handleImageChange}
          name="image_file"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </Modal>
  );
};

export default PostBook;
