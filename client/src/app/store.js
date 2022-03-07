import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import pagesReducer from '../features/pages/users';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		pagination: pagesReducer,
	},
});
