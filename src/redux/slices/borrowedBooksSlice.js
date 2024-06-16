import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { borrowedBooksAPI } from "../../axiosConfig";
import axiosInstance from "../../utils/axios";

export const fetchBorrowedBooks = createAsyncThunk(
  "borrows/fetchBorrowedBooks",
  async () => {
    try {
      const response = await axiosInstance.get("borrows");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const borrowBook = createAsyncThunk(
  "borrows/borrowBook",
  async (bookId) => {
    try {
      const response = await axiosInstance.post("borrows", {
        book_id: bookId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const returnBook = createAsyncThunk(
  "borrows/returnBook",
  async (borrowId) => {
    try {
      const response = await axiosInstance.delete(`borrows/${borrowId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const borrowedBooksSlice = createSlice({
  name: "borrowedBooks",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        );
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default borrowedBooksSlice.reducer;
