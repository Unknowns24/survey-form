import React from "react";
import Navbar from "./Navbar";

const Main = ({ children }) => {
	return (
		<>
			<Navbar />

			<main className="container p-5">{children}</main>
		</>
	);
};

export default Main;
