import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reservedBooksAPI } from '../../axiosConfig';

export const fetchReservedBooks = createAsyncThunk(
  'reservedBooks/fetchReservedBooks',
  async () => {
    const response = await reservedBooksAPI.fetchReservedBooks();
    return response.data;
  }
);

const reservedBooksSlice = createSlice({
  name: 'reservedBooks',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchReservedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservedBooksSlice.reducer;
