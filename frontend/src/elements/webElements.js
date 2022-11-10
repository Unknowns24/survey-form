import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const fadeTransition = css`
	animation: fadeOut 1s;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		100% {
			opacity: 1;
		}
		0% {
			opacity: 0;
		}
	}
`;

export const HeaderContainer = styled.div`
	height: 30px;
	display: block;
	color: #777;
	width: auto;
	padding: 0 15px 0 15px;

	/*container center*/
	max-width: 1170px;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: 768px) {
		max-width: 760px;
	}

	@media (min-width: 992px) {
		max-width: 970px;
	}

	@media (min-width: 1200px) {
		max-width: 1170px;
	}
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 5px;
`;

export const HeaderSocial = styled.div``;

export const HeaderInfo = styled.div``;

export const Nav = styled.nav`
	background: linear-gradient(to right, #0058ff 0%, #7db9e8 100%);
	height: 75px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	position: sticky;
	width: 100%;
	top: -1px;
	z-index: 10;

	@media screen and (max-width: 960px) {
		transition: 0.8s all ease;
	}
`;

export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 100%;
	z-index: 1;
	width: 100%;
	max-width: 1170px;

	border-bottom: 1px solid rgba(255, 255, 255, 0.5);

	transition: all 0.2s ease-in-out;

	padding: 0 15px 0 15px;

	/*container center*/
	max-width: 1170px;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: 768px) {
		max-width: 760px;
	}

	@media (min-width: 992px) {
		max-width: 970px;
	}

	@media (min-width: 1200px) {
		max-width: 1170px;
	}
`;

export const NavLogo = styled(Link)`
	color: #fff;
	justify-self: flex-start;
	cursor: pointer;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	margin-left: 5px;
	font-weight: bold;
	text-decoration: none;
`;

export const MobileIcon = styled.div`
	transition: all 0.2s ease-in-out;
	display: none;

	${fadeTransition}

	@media screen and (max-width: 805px) {
		display: block;
		animation: fadeIn 1s;
		position: absolute;
		top: 0;
		right: 0;

		transition: all 0.2s ease-in-out;
		transform: translate(-100%, 40%);
		font-size: 1.8rem;
		cursor: pointer;
		color: #fff;
	}
`;

export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	text-align: center;

	${fadeTransition}

	@media screen and (max-width: 805px) {
		animation: fadeOut 1s;
		display: ${({ displaing }) => (displaing ? "flex;" : "none")};
		z-index: 2;
		position: absolute;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		background: linear-gradient(to right, #0058ff 0%, #7db9e8 100%);
		width: 100%;
		overflow: auto;
		top: 74px;
		left: 0px;
		flex-direction: column;
	}
`;

export const NavItem = styled.li`
	height: 75px;
	border-bottom: ${({ active }) => (active ? "5px solid #fff;" : "")};
`;

export const NavLinks = styled(Link)`
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	cursor: pointer;
	height: 100%;

	&:hover {
		color: #ddd;
	}
`;

export const NavButton = styled.nav`
	display: flex;
	align-items: center;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled(Link)`
	background: #fff;
	white-space: nowrap;
	padding: 10px 25px;
	color: #010606;
	font-size: 14px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-left: 20px;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: linear-gradient(to right, #0073ff 0%, #01a7ff 100%);
		color: #ddd;
	}
`;

export const Logo = styled.img`
	width: 100px;
	height: 100px;
	margin-right: 5rem;
`;
