import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../Assets";
import BookCard from "../components/card";
import {
  fetchBookByCategory,
  fetchBookByTitle,
  fetchBooks,
} from "../redux/slices/booksSlice";
import Wrapper from "../components/wrapper";
import SelectCategory from "./select-categories";
import Loader from "../components/loader";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let dispatch = useDispatch();
  const [showSearchHistroy, setShowSearchHistory] = useState(false);
  const [searchData, setSearchData] = useState([]);

  // Memoize the books from the Redux store
  const { books, loading } = useSelector((state) => state.books);
  const searchHistoryRef = useRef(null);
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleClickOutside = (event) => {
    if (
      searchHistoryRef.current &&
      !searchHistoryRef.current.contains(event.target)
    ) {
      setShowSearchHistory(false);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setShowSearchHistory(false);
    } else {
      setShowSearchHistory(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentUser.preference !== null && searchQuery === "") {
      try {
        dispatch(fetchBookByCategory(currentUser.preference));
      } catch (err) {
        console.log(err);
      }
    } else if (searchQuery.length > 4 || currentUser.role === "admin") {
      dispatch(fetchBooks());
    }
  }, [searchQuery, dispatch]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);

    let searchItems = books.filter((book) => {
      return book.title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
    });
    setSearchData(searchItems);
  };

  const handleSearchIconClick = () => {
    try {
      dispatch(fetchBookByTitle(searchQuery)).then((res) => {
        if (fetchBookByTitle.fulfilled.match(res)) {
          setShowSearchHistory(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (name) => {
    setSearchQuery(name);
  };

  const displayedBooks =
    currentUser.preference !== null && searchQuery === ""
      ? shuffleArray(books).slice(0, 3)
      : books;

  return (
    <>
      <Wrapper>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl  font-bold">Welcome to the Library</h1>
          <p className="text-lg">Explore our collection of books.</p>

          <div
            className="bg-white flex w-full sm:w-3/4 md:w-1/2 lg:w-3/3 items-center border py-2 px-4  rounded-2xl relative"
            ref={searchHistoryRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search for more books..."
              className="w-full outline-none rounded-lg bg-transparent text-primaryGreen"
            />
            <img
              src={images.search}
              className="h-6 w-6 ml-2 cursor-pointer"
              alt="Search Icon"
              onClick={() => handleSearchIconClick()}
            />
            <div
              className={`flex absolute bg-white border-x p-4 rounded-b-2xl shadow-lg border-b w-full left-0 top-[35px] z-50  ${
                showSearchHistroy ? "block" : "hidden"
              }`}>
              <div className="flex  flex-col gap-3">
                {searchData &&
                  searchData.length > 0 &&
                  searchData.map((data) => (
                    <span
                      key={data?.id}
                      className="opacity-50 cursor-pointer"
                      onClick={() => handleTextChange(data?.title)}>
                      {data?.title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader className="w-20 h-20 text-primaryGreen" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-7 animate-fade-left animate-once animate-delay-[10ms]">
              {Array.isArray(displayedBooks) &&
                displayedBooks.length > 0 &&
                displayedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book_album={book.image?.image_data}
                    book_author={book.author}
                    book_read={book.reads}
                    book_desc={book.description}
                    recommended={
                      currentUser.role === "user" && book.recommended
                    }
                    book_name={book.title}
                    book_id={book.id}
                    link={book.file_url}
                    needed_else_where={currentUser.role === "admin"}
                    isAdmin={currentUser.role === "admin"}
                    downCount={book.downloads}
                    readCount={book.reads}
                  />
                ))}
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
