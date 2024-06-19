import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBorrowedBooks,
  returnBook,
} from "../redux/slices/borrowedBooksSlice";
import Header from "../components/Header";
import Wrapper from "../components/wrapper";
import BookCard from "../components/card";

const BorrowedBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.borrowedBooks);

  useEffect(() => {
    dispatch(fetchBorrowedBooks());
  }, [dispatch]);

  const handleReturnBoook = (id) => {
    try {
      dispatch(returnBook(id)).then((res) => {
        if (returnBook.fulfilled.match(res)) {
          dispatch(fetchBorrowedBooks());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="">
        <h1 className="text-2xl font-bold text-primaryGreen">Borrowed Books</h1>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book_album={book?.book?.image?.image_data}
              book_author={book?.book.author}
              book_name={book?.book.title}
              book_desc={book?.book.description}
              book_id={book?.book.id}
              needed_else_where
              btn_text={"Return"}
              any_btn={() => handleReturnBoook(book.id)}
              reserved
              action={"Borrowed"}
              date={book.due_date}
              link={book?.book.file_url}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default BorrowedBooks;
