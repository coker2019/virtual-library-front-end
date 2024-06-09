// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // Add other reducers here
//   },
// });

// export default store;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});

export default store;
