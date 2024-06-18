import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../Assets";
import BookCard from "../components/card";
import {
  fetchBookByCategory,
  fetchBookByTitle,
  fetchBooks,
} from "../redux/slices/booksSlice";
import Wrapper from "../components/wrapper";
import Modal from "../components/modal";
import SelectCategory from "./select-categories";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let dispatch = useDispatch();
  const [showSearchHistroy, setShowSearchHistory] = useState(false);
  const [searchData, setSearchData] = useState([]);
  let selectCategory = useSelector((state) => state.auth.selected_category);

  // Memoize the books from the Redux store
  const { books, loading, error } = useSelector((state) => state.books);
  // const memoizedBooks = useMemo(() => books, [books]);
  const searchHistoryRef = useRef(null);
  let userData = JSON.parse(localStorage.getItem("currentUser"));
  let gen_category_id = useSelector((state) => state.categories.cat_id);
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleClickOutside = (event) => {
    if (
      searchHistoryRef.current &&
      !searchHistoryRef.current.contains(event.target)
    ) {
      setShowSearchHistory(false);
    }
  };

  // console.log("data", searchData);
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
    if (searchQuery === "") {
      if (currentUser.role === "user") {
        dispatch(fetchBookByCategory(gen_category_id));
      } else {
        dispatch(fetchBooks());
      }
    }
  }, [searchQuery]);

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

  const [open, setOpen] = useState(true);

  return (
    <>
      {userData.role === "user" && !selectCategory && (
        <SelectCategory isOpen={open} setIsOpen={setOpen} />
      )}
      <Wrapper>
        <div className="flex flex-col justify-center items-center p-5 mt-6 gap-4">
          <h1 className="text-3xl  font-bold">Welcome to the Library</h1>
          <p className="text-lg">Explore our collection of books.</p>

          <div
            className="bg-white flex w-full sm:w-3/4 md:w-1/2 lg:w-3/3 items-center border py-2 px-4  rounded-2xl relative"
            ref={searchHistoryRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search for books..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-7">
            {books &&
              books.length > 0 &&
              books.map((book) => (
                <BookCard
                  key={book.id}
                  book_album={book.image.image_data}
                  book_author={book.author}
                  book_desc={book.description}
                  recommended={book.recommended}
                  book_name={book.title}
                  book_id={book.id}
                  link={book.file_url}
                />
              ))}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
