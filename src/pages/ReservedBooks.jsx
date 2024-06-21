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

  useEffect(() => {}, []);
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
            {books.map((book) => (
              <BookCard
                key={book.id}
                book_album={book?.book.image.image_data}
                book_author={book?.book.author}
                book_name={book?.book.title}
                book_desc={book?.book.description}
                book_id={book?.book.id}
                needed_else_where
                btn_text={"Return"}
                any_btn={() => handleReturnReserve(book.id)}
                reserved
                action={"Reserved"}
                date={book.reserved_until}
                link={book.book.file_url}
              />
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ReservedBooks;
