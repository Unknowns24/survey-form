import { loadUser } from "hooks/useAuth";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";

const Wrapper = ({ children }) => {
	const location = useLocation();
	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0);
	}, [location.pathname]);
	return children;
};

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<Router>
			<Wrapper>
				<AppRoutes />
			</Wrapper>
		</Router>
	);
}

export default App;
