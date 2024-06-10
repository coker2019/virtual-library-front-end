import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { borrowedBooksAPI } from '../../axiosConfig';

export const fetchBorrowedBooks = createAsyncThunk(
  'borrowedBooks/fetchBorrowedBooks',
  async () => {
    const response = await borrowedBooksAPI.fetchBorrowedBooks();
    return response.data;
  }
);

const borrowedBooksSlice = createSlice({
  name: 'borrowedBooks',
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
      });
  },
});

export default borrowedBooksSlice.reducer;
