import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import surveyReducer from "./surveySlice";

export default configureStore({
	reducer: {
		user: userReducer,
		survey: surveyReducer,
	},
});
