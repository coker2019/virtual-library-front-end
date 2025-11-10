import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { reservedBooksAPI } from "../../axiosConfig";
import axiosInstance from "../../utils/axios";
import showSuccessToast from "../../components/toast";

export const fetchReservedBooks = createAsyncThunk(
  "reservations/fetchReservedBooks",
  async () => {
    const response = await axiosInstance.get("reservation/my-reservations");
    return response.data;
  }
);

export const reserveBook = createAsyncThunk(
  "reservations/reserveBook",
  async (bookId) => {
    try {
      const response = await axiosInstance.post("reservation", {
        bookId: bookId,
      });
      console.log("response", response);
      showSuccessToast({
        icon: "success",
        title: response.data.message,
      });
      return response.data;
    } catch (error) {
      showSuccessToast({
        icon: "error",
        title: error.response.data.message,
      });
      return error.response.data;
    }
  }
);

export const cancelReservation = createAsyncThunk(
  "reservations/cancelReservation",
  async (reservationId) => {
    const response = await axiosInstance.delete(`reservation/${reservationId}`);
    console.log("response", response);
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
      });
    builder
      .addCase(reserveBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(reserveBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(reserveBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      });
    builder
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
