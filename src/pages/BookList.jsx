import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/wrapper";
import {
  BookOpenIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../components/modal";
import PostBook from "./post-book";
import { deleteBook, fetchBooks, updateBook } from "../redux/slices/booksSlice";
import Input from "../components/input";
import Loader from "../components/loader";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [editRow, setEditRow] = useState(null);
  const [editRecommended, setEditRecommended] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const tableHeads = [
    { name: "S/N" },
    { name: "Book Detail" },
    { name: "Category" },
    { name: "Recommended" },
    { name: "Action" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id)).then((res) => {
      if (deleteBook.fulfilled.match(res)) {
        dispatch(fetchBooks());
      }
    });
  };

  const handleEditBook = (id, recommended, name) => {
    setEditRow(id);
    setEditRecommended(recommended);
    setEditName(name);
  };

  const handleRecommendedChange = (e) => {
    setEditRecommended(e.target.value === "true");
  };

  const handleEditName = (e) => {
    setEditName(e.target.value);
  };

  const saveEditBook = (id) => {
    const updatedBook = { id, recommended: editRecommended, title: editName };
    dispatch(updateBook(updatedBook)).then((res) => {
      if (updateBook.fulfilled.match(res)) {
        dispatch(fetchBooks());
        setEditRow(null);
      }
    });
  };

  const cancelEditBook = () => {
    setEditRow(null);
  };

  return (
    <>
      <PostBook
        id={"bookmodal"}
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsOpen={setIsModalOpen}
      />

      <Wrapper>
        <div className="">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold text-primaryGreen">
              Book Manager
            </h5>

            <button
              type="button"
              onClick={openModal}
              className="p-3 bg-primaryGreen rounded-md text-white font-semibold shadow-lg hover:bg-customGreen hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen cursor-pointer"
              data-hs-overlay={"bookmodal"}
              data-modal-backdrop="static">
              <div className="flex items-center">
                <span>Post new Book</span>{" "}
                <BookOpenIcon className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>
          <div className="mt-5">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-20 h-20 " />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="min-w-full overflow-hidden rounded-lg shadow-md">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        {tableHeads.map((column, index) => (
                          <th
                            key={index}
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            {column.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {books &&
                        books.length > 0 &&
                        books.map((row, index) => (
                          <tr key={row.id} className="hover:bg-gray-100">
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              {index + 1}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white">
                              <div className="flex justify-between">
                                {editRow === row.id ? (
                                  <Input
                                    value={editName}
                                    onChange={handleEditName}
                                  />
                                ) : (
                                  <span className="text-sm">{row.title}</span>
                                )}
                                <img
                                  src={row.image?.image_data}
                                  className="w-10 h-10"
                                  alt={row.name}
                                />
                              </div>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white">
                              {row.category?.name}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white">
                              {editRow === row.id ? (
                                <select
                                  value={editRecommended}
                                  onChange={handleRecommendedChange}
                                  className="form-select">
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                              ) : row.recommended ? (
                                "True"
                              ) : (
                                "False"
                              )}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white">
                              <div className="flex justify-between">
                                {editRow === row.id ? (
                                  <>
                                    <button
                                      onClick={() => saveEditBook(row.id)}>
                                      Save
                                    </button>
                                    <button onClick={cancelEditBook}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleEditBook(
                                          row.id,
                                          row.recommended,
                                          row.title
                                        )
                                      }>
                                      <PencilSquareIcon className="w-6 h-6 text-primaryGreen" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBook(row.id)}>
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

export default BookList;
