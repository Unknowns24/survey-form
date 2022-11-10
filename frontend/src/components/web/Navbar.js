import React, { useState } from "react";
import { userSelector } from "context/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "hooks/useAuth";

function Navbar() {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const { auth } = useSelector(userSelector);

	const toggleMenu = () => {
		setShow((prev) => !prev);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark p-2 bg-black">
			<div className="container">
				<a className="navbar-brand" href="/">
					Survey Forms
				</a>
				<ul className="navbar-nav ms-auto">
					{auth ? (
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" onClick={toggleMenu} id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								encuestas
							</a>
							<ul className={`dropdown-menu ${show ? "show" : ""}`} aria-labelledby="navbarDropdownMenuLink">
								<Link className="dropdown-item" to="/">
									Mis encuestas
								</Link>
								<Link className="dropdown-item" to="/survey/create">
									Crear encuesta
								</Link>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#" onClick={handleLogout}>
									Cerrar sesión
								</a>
							</ul>
						</li>
					) : (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/signin">
									Iniciar sesión
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signup">
									Registrarse
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
