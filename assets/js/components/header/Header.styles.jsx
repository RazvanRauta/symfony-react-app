/*
 * @author: Razvan Rauta
 * Date: 04.01.2020
 * Time: 12:06
 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../../../images/Logo.svg';

const OptionContainerStyles = css`
	padding: 10px 15px;
	cursor: pointer;

	@media (max-width: 420px) {
		padding: 10px 0;
	}
`;

export const HeaderContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;

	@media (max-width: 420px) {
		justify-content: space-evenly;
	}
`;

export const LogoContainer = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 15px 10px 0;

	@media (max-width: 420px) {
		padding: 10px 0;
	}
`;

export const Logo = styled(LogoImg)`
	width: 50px;
	height: 50px;
`;

export const OptionsContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@media (max-width: 420px) {
		width: 100%;
		justify-content: space-evenly;
	}
`;

export const OptionLink = styled(Link)`
	${OptionContainerStyles}
`;

export const UserProfile = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 10px 0 10px 15px;
	justify-content: space-between;

	@media (max-width: 420px) {
		padding: 10px 0;
	}
`;

export const UserInfo = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	margin-left: 5px;

	span,
	a {
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	a:hover {
		color: #22a2de;
	}
`;

export const ProfilePicture = styled.div`
	img {
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
`;
