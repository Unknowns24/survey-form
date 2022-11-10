import React from "react";
import { FadingDots } from "react-cssfx-loading";
import { LoadingContainer, LoadingTitle } from "elements/LoadingElements";

const Loading = () => {
	return (
		<LoadingContainer>
			<LoadingTitle style={{ color: "#fff" }}>Survey App</LoadingTitle>
			<FadingDots color="#fff" />
		</LoadingContainer>
	);
};

export default Loading;
