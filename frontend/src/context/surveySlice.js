import { createSlice } from "@reduxjs/toolkit";

export const surveySlice = createSlice({
	name: "survey",

	initialState: {
		surveyList: {},
	},

	reducers: {
		setSurveyList: (state, action) => {
			state.surveyList = action.payload;
		},
	},
});

export default surveySlice.reducer;
export const surveySelector = (state) => state.survey;
export const { setSurveyList } = surveySlice.actions;
