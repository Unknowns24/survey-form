import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "context/store";
import App from "./App";
import "app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
