import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "context/userSlice";

export const NoAuthRoute = ({ children }) => {
	const { auth } = useSelector(userSelector);

	return auth ? <Navigate to="/" /> : children;
};
