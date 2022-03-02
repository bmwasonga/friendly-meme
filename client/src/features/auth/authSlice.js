import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user data where it has been stored. either cookies or localStorage

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//regisetr a user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    //console check to see if the data is getting up to here
    console.log('the user data at register is ', userData);

    try {
      const response = await authService.register(userData);
      console.log('the response at register is ', response);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login a user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    //console check to see if the data is getting up to here
    console.log('the user data at login is ', userData);

    try {
      const response = await authService.login(userData);
      console.log('the response at login is ', response);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = '';
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
