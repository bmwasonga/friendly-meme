import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
	users: [],
	pageNumber: 1,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllUsers = createAsyncThunk(
	'user/getallusers',
	async (thunkAPI) => {
		try {
			return await userService.getAllUsers();
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

const getAllUsersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.users = [];
			});
	},
});

export const { reset } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer;
