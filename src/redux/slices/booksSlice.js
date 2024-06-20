import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axiosInstance.get("books");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookByTitle = createAsyncThunk(
  "books/fetchBookByTItle",
  async (title, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/books/fetch_by_title?title=${title}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookByCategory = createAsyncThunk(
  "books/fetchBookByCategory",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `books/fetch_by_category?category_id=${category_id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadBook = createAsyncThunk("books/uploadBook", async (book) => {
  try {
    const response = await axiosInstance.post("books", {
      book,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `books/${bookData.id}`,
        bookData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(fetchBookByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookByTitle.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(uploadBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchBookByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBookByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
