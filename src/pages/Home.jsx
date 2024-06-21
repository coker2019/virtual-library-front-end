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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let dispatch = useDispatch();
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchData, setSearchData] = useState([]);

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
    if (
      currentUser.preference !== null &&
      currentUser.role === "user" &&
      searchQuery === ""
    ) {
      dispatch(fetchBookByCategory(currentUser.preference));
    } else if (searchQuery.length > 4 || currentUser.role === "admin") {
      dispatch(fetchBooks());
    }
  }, [dispatch, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);

    let searchItems = books.filter((book) => {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getRandomBooks = (booksArray, count) => {
    const shuffled = booksArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filterAndLimitRecommendedBooks = (books) => {
    const recommendedBooks = books.filter((book) => book.recommended);
    const limitedRecommendedBooks = getRandomBooks(recommendedBooks, 3);
    const nonRecommendedBooks = books.filter((book) => !book.recommended);
    return [...limitedRecommendedBooks, ...nonRecommendedBooks];
  };

  const filteredBooks = filterAndLimitRecommendedBooks(books);

  return (
    <>
      <Wrapper>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-bold">Welcome to the Library</h1>
          <p className="text-lg">Explore our collection of books.</p>

          <div
            className="bg-white flex w-full sm:w-3/4 md:w-1/2 lg:w-3/3 items-center border py-2 px-4 rounded-2xl relative"
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
              className={`flex absolute bg-white border-x p-4 rounded-b-2xl shadow-lg border-b w-full left-0 top-[35px] z-50 ${
                showSearchHistory ? "block" : "hidden"
              }`}>
              <div className="flex flex-col gap-3">
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
              {Array.isArray(filteredBooks) &&
                filteredBooks.length > 0 &&
                filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book_album={book.image?.image_data}
                    book_author={book.author}
                    book_desc={book.description}
                    recommended={
                      currentUser.role !== "admin" && book.recommended
                    }
                    needed_else_where={currentUser.role === "admin"}
                    book_name={book.title}
                    book_id={book.id}
                    link={book.file_url}
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
