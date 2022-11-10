import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/errors/404";
import { NoAuthRoute } from "validations/NoAuthRoute";
import { PrivateRoute } from "validations/privateRoute";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import HomePage from "pages/Index";
import CreateSurvey from "pages/CreateSurvey";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				exact
				element={
					<PrivateRoute>
						<HomePage />{" "}
					</PrivateRoute>
				}
			/>

			<Route
				path="/survey/create"
				exact
				element={
					<PrivateRoute>
						<CreateSurvey />
					</PrivateRoute>
				}
			/>

			<Route
				path="/signin"
				exact
				element={
					<NoAuthRoute>
						<SignIn />
					</NoAuthRoute>
				}
			/>

			<Route
				path="/signup"
				exact
				element={
					<NoAuthRoute>
						<SignUp />
					</NoAuthRoute>
				}
			/>

			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default AppRoutes;
