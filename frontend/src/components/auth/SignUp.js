import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from "config/config.json";
import codes from "config/codes.json";
import MD5 from "crypto-js/md5";
import utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import { Toast } from "utils/prompts";

const initialState = {
	name: "",
	email: "",
	password: "",
	password_confirm: "",
};

const SignUpComponent = () => {
	const [state, setState] = useState(initialState);
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const navigate = useNavigate();

	const handleInput = (e) => {
		var inputName = e.currentTarget.name;
		var value = e.currentTarget.value;

		setState((prev) => ({ ...prev, [inputName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.email === "" || state.password === "" || state.password_confirm === "" || state.first_name === "" || state.last_name === "") {
			Toast.fire({
				icon: "error",
				title: "¡Por favor complete todos los campos!",
			});
			return;
		}

		if (state.password !== state.password_confirm) {
			Toast.fire({
				icon: "error",
				title: "¡Las contraseñas no coinciden!",
			});
			return;
		}

		if (state.password.length < 8) {
			Toast.fire({
				icon: "error",
				title: "¡La contraseña es muy corta!",
			});
			return;
		}

		setSubmitDisabled(true);
		try {
			var json = JSON.stringify({
				name: state.name,
				password: MD5(state.password).toString(),
				email: state.email,
			});

			const res = await fetch(config.apiAdress + "register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: Base64.stringify(utf8.parse(json)) }),
			});

			if (res.status === 429) {
				Toast.fire({
					icon: "error",
					title: "Error inesperado, intente nuevamente mas tarde.",
				});
				setSubmitDisabled(false);
				return;
			}

			res.json().then(function (code) {
				if (code.message.includes("ERRN")) {
					Toast.fire({
						icon: "error",
						title: codes[code.message] ?? "Error inesperado, intente nuevamente mas tarde.",
					});
					return;
				}

				setSubmitDisabled(false);
				navigate("/signin");
			});
		} catch (err) {
			Toast.fire({
				icon: "error",
				title: "Error inesperado, intente nuevamente mas tarde.",
			});
			setSubmitDisabled(false);
		}
	};

	return (
		<div className="row">
			<div className="col-md-4 mx-auto">
				<div className="card bg-black text-white">
					<div className="card-header pt-5">
						<h4 className="text-center">Crea tu cuenta</h4>
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="name">Nombre:</label>
								<input type="text" className="form-control bg-dark text-white" name="name" placeholder="Nombre" value={state.name} onChange={handleInput} />
							</div>
							<div className="mb-3">
								<label htmlFor="email">Email:</label>
								<input type="email" className="form-control bg-dark text-white" name="email" placeholder="Email" value={state.email} onChange={handleInput} />
							</div>
							<div className="mb-3">
								<label htmlFor="password">Contraseña</label>
								<input type="password" className="form-control bg-dark text-white" name="password" placeholder="Contraseña" value={state.password} onChange={handleInput} />
							</div>
							<div className="mb-3">
								<label htmlFor="confirm_password">Confirmar Contraseña:</label>
								<input type="password" className="form-control bg-dark text-white" name="password_confirm" placeholder="Confirmar contraseña" value={state.password_confirm} onChange={handleInput} />
							</div>
							<button className="btn btn-success btn-block" disabled={submitDisabled}>
								Registrarse
							</button>
						</form>
					</div>
					<p className="text-center">
						Ya tienes cuenta?{" "}
						<Link to="/signin" className="text-info">
							Iniciar sesión
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUpComponent;
