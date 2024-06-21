import React from "react";
import {
  borrowBook,
  fetchBorrowedBooks,
} from "../redux/slices/borrowedBooksSlice";
import {
  fetchReservedBooks,
  reserveBook,
} from "../redux/slices/reservedBooksSlice";
import { useDispatch } from "react-redux";
import showSuccessToast from "./toast";

const BookCard = ({
  book_album,
  book_name,
  book_desc,
  recommended,
  book_id,
  book_author,
  needed_else_where,
  reserved,
  any_btn,
  btn_text,
  action,
  date,
  link,
}) => {
  let dispatch = useDispatch();

  const handleBorrow = (id) => {
    try {
      dispatch(borrowBook(id)).then((res) => {
        if (borrowBook.fulfilled.match(res)) {
          showSuccessToast({ icon: "success", title: res.payload.message });
          dispatch(fetchBorrowedBooks());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReserve = (id) => {
    try {
      dispatch(reserveBook(id)).then((res) => {
        if (reserveBook.fulfilled.match(res)) {
          showSuccessToast({ icon: "success", title: res.payload.message });
          dispatch(fetchReservedBooks());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#BCCF99] dark:border-gray-700 cursor-pointer relative">
      <a href={link && link} target="_blank">
        <img
          className="rounded-t-lg h-[200px] w-full"
          src={book_album && book_album}
          alt={`${book_name && book_name} album`}
        />
      </a>
      <div className="p-3 h-[140px]">
        <h5 className=" text-lg font-bold tracking-tight text-gray-900 white:text-dark">
          {book_name && book_name}
        </h5>
        <h5 className="text-gray-800">{book_author && book_author}</h5>
        <p className="text-[12px] text-gray-700 dark:text-gray-500  h-[50px] overflow-x-auto">
          {book_desc && book_desc}
        </p>
      </div>

      <div className="flex justify-between p-3">
        {needed_else_where ? (
          any_btn && (
            <button className="btn" onClick={any_btn}>
              {btn_text}
            </button>
          )
        ) : (
          <>
            <button className="btn" onClick={() => handleReserve(book_id)}>
              Reserve
            </button>
            <button className="btn" onClick={() => handleBorrow(book_id)}>
              Borrow
            </button>
          </>
        )}
      </div>
      {recommended && (
        <div className="absolute top-0 right-3">
          <span className="bg-blue text-[10px] text-white p-1  rounded-sm">
            Recommended
          </span>
        </div>
      )}

      {reserved && (
        <p className="absolute top-0 right-3 text-[12px]">
          {action} till{" "}
          <span className="text-primaryGreen font-bold">{date}</span>
        </p>
      )}
    </div>
  );
};

export default BookCard;
