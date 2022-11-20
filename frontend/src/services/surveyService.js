import axios from "axios";
import config from "config/config.json";

import utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";

export const createSurvey = ({ title, description, options, questions }) => {
	var json = JSON.stringify({
		title: title,
		description: description,
		options: options,
		questions: questions,
	});

	console.log(json);

	return axios({
		url: `${config.apiAdress}survey/create`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
		data: JSON.stringify({ data: Base64.stringify(utf8.parse(json)) }),
	}).then((res) => res);
};

export const loadSurveys = () => {
	return axios({
		url: `${config.apiAdress}my-surveys`,
		method: "GET",
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	}).then((res) => res);
};
