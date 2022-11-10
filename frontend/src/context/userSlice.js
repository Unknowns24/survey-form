import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",

	initialState: {
		auth: false,
		loading: true,
		login_error: {
			exist: false,
			errorCode: "",
		},
		userData: {},
	},

	reducers: {
		setUserLoading: (state, action) => {
			state.auth = false;
			state.loading = action.payload;
			state.userData = {};
			state.login_error = { exist: false, errorCode: "" };
		},

		setUserData: (state, action) => {
			state.auth = true;
			state.loading = false;
			state.userData = action.payload.userData;
			state.login_error = { exist: false, errorCode: "" };
		},

		setUserError: (state, action) => {
			state.auth = false;
			state.loading = false;
			state.userData = {};
			state.login_error = action.payload;
		},
	},
});

export default userSlice.reducer;
export const userSelector = (state) => state.user;
export const { setUserLoading, setUserData, setUserError } = userSlice.actions;
