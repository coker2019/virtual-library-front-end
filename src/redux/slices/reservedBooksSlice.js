import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { reservedBooksAPI } from "../../axiosConfig";
import axiosInstance from "../../utils/axios";

export const fetchReservedBooks = createAsyncThunk(
  "reservations/fetchReservedBooks",
  async () => {
    const response = await axiosInstance.get("reservations");
    return response.data;
  }
);

export const reserveBook = createAsyncThunk(
  "reservations/reserveBook",
  async (bookId) => {
    const response = await axiosInstance.post("reservations", {
      book_id: bookId,
    });
    return response.data;
  }
);

export const cancelReservation = createAsyncThunk(
  "reservations/cancelReservation",
  async (reservationId) => {
    const response = await axiosInstance.delete(
      `reservations/${reservationId}`
    );
    return response.data;
  }
);

const reservedBooksSlice = createSlice({
  name: "reservedBooks",
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
      })
      .addCase(reserveBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(reserveBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(reserveBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        );
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservedBooksSlice.reducer;
