import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ebook-library-taol.onrender.com/users";

const initialState = {
  isAuthenticated: null,
  user: [],
  loading: false,
  selected_category: false,
  error: null,
  registrationStatus: null,
  loginStatus: null,
  status: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(BASE_URL, { user: userData });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/sign_in`, {
        user: credentials,
      });

      if (response.status === 200) {
        const authToken = response.headers.authorization;
        localStorage.setItem("token", authToken);
        const currentUserData = JSON.stringify(response.data.status.data);
        localStorage.setItem("currentUser", currentUserData);
      }
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const authToken = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${BASE_URL}/sign_out`, {
      headers: { Authorization: authToken },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRegistrationStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateLoginStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetUserState: (state) => {
      state.isAuthenticated = false;
      state.user = [];
    },
    selectedCategory: (state, action) => {
      state.selected_category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.status.data;
        state.selected_category = false;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.status.data;
        state.loading = false;
        state.selected_category = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateRegistrationStatus,
  updateLoginStatus,
  resetUserState,
  selectedCategory,
} = authSlice.actions;
export default authSlice.reducer;
