import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:3000/users";

const initialState = {
  isAuthenticated: null,
  user: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, userData);
      const token = response.header.authorization;
      localStorage.setItem("token", token);
      const currentUserData = JSON.stringify(response.data.status.data);
      localStorage.setItem("currentUser", currentUserData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/sign_in`, credentials);

      if (response.status === 200) {
        const authToken = response.headers.authorization;
        localStorage.setItem("token", authToken);
        const currentUserData = JSON.stringify(response.data.status.data);
        localStorage.setItem("currentUser", currentUserData);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ rejectWithValue }) => {
    const authToken = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${BASE_URL}/sign_out`, {
        headers: {
          Authorization: authToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const { updateRegistrationStatus, updateLoginStatus, resetUserState } =
  authSlice.actions;
export default authSlice.reducer;
