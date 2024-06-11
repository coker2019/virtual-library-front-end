
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';
import borrowedBooksReducer from './slices/borrowedBooksSlice';
import reservedBooksReducer from './slices/reservedBooksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    borrowedBooks: borrowedBooksReducer,
    reservedBooks: reservedBooksReducer,
  },
});

export default store;
