import React from "react";

const BookCard = ({
  book_album,
  book_name,
  book_desc,
  recommended,
  book_id,
  book_author,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#BCCF99] dark:border-gray-700 cursor-pointer relative">
      <img
        className="rounded-t-lg h-[200px] w-full"
        src={book_album && book_album}
        alt={`${book_name && book_name} album`}
      />
      <div className="p-3">
        <h5 className=" text-lg font-bold tracking-tight text-gray-900 white:text-dark">
          {book_name && book_name}
        </h5>
        <h5 className="text-gray-800">{book_author && book_author}</h5>
        <p className="text-[12px] text-gray-700 dark:text-gray-500  h-[50px] overflow-x-auto">
          {book_desc && book_desc}
        </p>
      </div>

      <div className="flex justify-between p-3">
        <button className="btn">Reserve</button>
        <button className="btn">Borrow</button>
      </div>
      {recommended && recommended && (
        <div className="absolute top-0 right-3">
          <span className="bg-blue text-[10px] text-white p-1  rounded-sm">
            Recommended
          </span>
        </div>
      )}
    </div>
  );
};

export default BookCard;
