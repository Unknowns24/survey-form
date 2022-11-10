import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "context/userSlice";
import { userLogin } from "hooks/useAuth";
import { Toast } from "utils/prompts";
import codes from "config/codes.json";

const initialState = {
	email: "",
	password: "",
	remember: false,
};

const SignInComponent = () => {
	const [state, setState] = useState(initialState);
	const [submitted, setSubmitted] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authData = useSelector(userSelector);
	const { auth, login_error } = authData;
	const { exist, errorCode } = login_error;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.email === "" || state.password === "") {
			Toast.fire({
				icon: "error",
				title: "¡Completa los campos!",
			});
			return;
		}

		setSubmitted(true);
		dispatch(userLogin(state));
	};

	const handleInput = (e) => {
		var inputName = e.currentTarget.name;
		var value = e.currentTarget.value;

		setState((prev) => ({ ...prev, [inputName]: value }));
	};

	useEffect(() => {
		if (auth) {
			navigate("/");
			return;
		}

		if (submitted) {
			if (!auth && exist && errorCode !== "") {
				Toast.fire({
					icon: "error",
					title: codes[errorCode] ?? "An error ocurred while signin, Try again later.",
				});
			}
		}
	}, [authData, auth, exist, errorCode, navigate, submitted]);

	return (
		<div className="row">
			<div className="col-md-4 mx-auto">
				<div className="card mt-5 bg-black text-white rounded">
					<div className="card-header text-center pt-5">
						<h1 className="h4 text-white">Inicio de sesión</h1>
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="email">Email:</label>
								<input type="email" className="form-control bg-dark text-white" name="email" placeholder="Email" value={state.email} onChange={handleInput} autoFocus />
							</div>
							<div className="mb-3">
								<label htmlFor="passswore">Contraseña:</label>
								<input type="password" className="form-control bg-dark text-white" name="password" placeholder="Contraseña" value={state.password} onChange={handleInput} />
							</div>
							<button className="btn btn-success btn-block">Iniciar sesión</button>
						</form>
					</div>

					<p className="text-center">
						No tienes cuenta?{" "}
						<Link to="/signup" className="text-info">
							Registrarse
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignInComponent;
