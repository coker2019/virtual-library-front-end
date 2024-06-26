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
import { ArrowDownIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { updateBook } from "../redux/slices/booksSlice";
import axios from "axios";

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
  readCount,
  downCount,
  book_read,
  date,
  isAdmin,
  link,
}) => {
  let dispatch = useDispatch();

  // const handleBorrow = (id) => {
  //   try {
  //     dispatch(borrowBook(id)).then((res) => {
  //       if (borrowBook.fulfilled.match(res)) {
  //         showSuccessToast({ icon: "success", title: res.payload.message });
  //         dispatch(fetchBorrowedBooks());
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleNavigate = () => {
    if (link) {
      dispatch(
        updateBook({
          id: book_id,
          reads: (book_read += 1),
        })
      ).then((res) => {
        if (updateBook.fulfilled.match(res)) {
          window.open(link, "_blank");
        } else {
          console.log("failed to read book");
        }
      });
    }
  };

  const handleDownload = async () => {
    const proxyUrl = "https://node-server-proxy.onrender.com/proxy?url=";
    const targetUrl = encodeURIComponent(link);

    try {
      const response = await fetch(proxyUrl + targetUrl, {
        method: "GET",
        headers: {},
      });

      if (!response.ok) {
        throw new Error("Network response was not ok or the file is not a PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = book_name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      dispatch(
        updateBook({
          id: book_id,
          downloads: (downCount += 1),
        })
      );
      showSuccessToast({ icon: "success", title: "Download successful" });
    } catch (error) {
      console.error("Download failed:", error);
      showSuccessToast({
        icon: "error",
        title: "You are not permitted to download this book, just read",
      });
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
      <div className="cursor-pointer" onClick={() => handleNavigate()}>
        <img
          className="rounded-t-lg h-[200px] w-full"
          src={book_album && book_album}
          alt={`${book_name && book_name} album`}
        />
      </div>
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
            <button className="btn" onClick={() => handleDownload()}>
              Download
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

      {isAdmin && (
        <div className="flex absolute bottom-1 right-2 gap-4 p-3">
          <div className="flex gap-1 items-center justify-center w-9 h-9  border-2 p-1  border-white border-dotted bg-primaryGreen rounded-full text-white">
            <BookOpenIcon className="w-10 h-10" />
            <span className="text-sm">{readCount}</span>
          </div>
          <div className="flex items-center justify-center p-1 bg-primaryGreen w-9 h-9 rounded-full text-white border-2 border-dotted border-white">
            <ArrowDownIcon className="w-10 h-10" />
            <span className="text-[12px]">{downCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
