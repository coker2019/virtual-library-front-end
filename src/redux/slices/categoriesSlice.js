import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  categories: [],
  isLoading: false,
  error: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axiosInstance.get("categories");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("categories");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async ({ category_id, rejectWithValue }) => {
    try {
      let response = await axiosInstance.delete(`categories/${category_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ updateCategoryData, rejectWithValue }) => {
    try {
      let response = await axiosInstance.patch(
        "categories",
        updateCategoryData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.payload.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, name: action.payload.name };
          }
          state.isLoading = false;
          return item;
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
