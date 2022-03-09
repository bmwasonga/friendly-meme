import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
	tasks: [],
	pageNumber: 1,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllTasks = createAsyncThunk(
	'task/getalltasks',
	async (thunkAPI) => {
		try {
			return await taskService.getAllTasks();
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

const getAllTasksSlice = createSlice({
	name: 'task',
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
			.addCase(getAllTasks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(getAllTasks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.users = [];
			});
	},
});

export const { reset } = getAllTasksSlice.actions;
export default getAllTasksSlice.reducer;
