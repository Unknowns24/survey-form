import { load, login, logout } from "services/authService";
import { setUserData, setUserError, setUserLoading } from "context/userSlice";
import { loadSurveys } from "services/surveyService";
import { setSurveyList } from "context/surveySlice";

export const userLogin = (credentials) => async (dispatch) => {
	dispatch(setUserLoading(true)); // Set user loading

	const { data } = await login(credentials).catch((err) => {
		return dispatch(setUserError({ exist: true, errorCode: err.toString() }));
	});

	if (data.message !== undefined && !data.message.includes("SUCN")) {
		return dispatch(setUserError({ exist: true, errorCode: data.message }));
	}

	return dispatch(loadUser());
};

export const loadUser = () => async (dispatch) => {
	dispatch(setUserLoading(true)); // Set user loading

	// Load user data
	const { data } = await load().catch((err) => {
		return dispatch(setUserError({ exist: true, errorCode: err.response.data.message }));
	});

	if (data === undefined) return;

	if (data.message !== undefined && !data.message.includes("SUCN")) {
		if (data.message === "ERRN500") {
			// return nothing if not logged
			return dispatch(setUserError({ exist: true, errorCode: "" }));
		}

		return dispatch(setUserError({ exist: true, errorCode: data.message }));
	}

	// Load user Surveys
	const surveys = await loadSurveys().catch(() => {
		return dispatch(setSurveyList({}));
	});

	if (surveys.data.message !== undefined) {
		return dispatch(setSurveyList({}));
	}

	dispatch(setSurveyList(surveys.data));
	dispatch(setUserData({ userData: data }));
};

export const logoutUser = () => async (dispatch) => {
	await logout().catch((err) => {
		return dispatch(setUserError({ exist: true, errorCode: err }));
	});

	return dispatch(setUserError({ exist: true, errorCode: "" }));
};
