import axios from "axios";
import config from "config/config.json";

import MD5 from "crypto-js/md5";
import utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";

export const login = ({ email, password, remember }) => {
	var json = JSON.stringify({
		password: MD5(password).toString(),
		email: email,
		keeplogin: remember.toString(),
	});

	return axios({
		url: `${config.apiAdress}login`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
		data: JSON.stringify({ data: Base64.stringify(utf8.parse(json)) }),
	}).then((res) => res);
};

export const load = () => {
	return axios({
		url: `${config.apiAdress}user`,
		method: "GET",
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	}).then((res) => res);
};

export const logout = () => {
	return axios({
		url: `${config.apiAdress}logout`,
		method: "POST",
		withCredentials: true,
	}).then((res) => res);
};
