import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "context/userSlice";
import Loading from "components/loading/Loading";

export const PrivateRoute = ({ children }) => {
	const navigation = useNavigate();
	const userData = useSelector(userSelector);

	useEffect(() => {
		if (!userData.loading) {
			if (!userData.auth) {
				navigation("/signin");
			}
		}
	}, [userData]);

	return userData.auth ? children : <Loading />;
};
