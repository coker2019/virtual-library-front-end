import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelReservation,
  fetchReservedBooks,
} from "../redux/slices/reservedBooksSlice";
import Wrapper from "../components/wrapper";
import BookCard from "../components/card";
import Loader from "../components/loader";

const ReservedBooks = () => {
  const dispatch = useDispatch();

  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let day = String(currentDate.getDate()).padStart(2, "0");
  let formattedDate = `${year}-${month}-${day}`;

  const { books, loading, error } = useSelector((state) => state.reservedBooks);
  console.log("books", books);
  useEffect(() => {
    dispatch(fetchReservedBooks());
  }, [dispatch]);

  const handleReturnReserve = (id) => {
    try {
      dispatch(cancelReservation(id)).then((res) => {
        dispatch(fetchReservedBooks());
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="">
        <h1 className="text-2xl font-bold text-primaryGreen">Reserved Books</h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader className="w-20 h-20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {books.length > 0 &&
              books?.map((book) => (
                <BookCard
                  key={book?._id}
                  book_album={book?.book.coverImage.url}
                  book_author={book?.book.author}
                  book_name={book?.book.title}
                  book_desc={book?.book.description}
                  book_id={book?.book._id}
                  needed_else_where
                  btn_text={"Remove"}
                  any_btn={() => handleReturnReserve(book._id)}
                  reserved
                  action={"Reserved"}
                  date={book.end_reservation_date}
                  link={book.book.src}
                />
              ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ReservedBooks;
