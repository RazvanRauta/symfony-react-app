/**
 * @author Razvan Rauta
 * 05.01.2020
 * 14:52
 */

import axios from 'axios';

export const fetchCollections_API = token =>
	axios.get('/api/products', {
		headers: {
			Authorization: 'bearer ' + token
		}
	});

export const fetchCollectionById_API = action => {
	const { token, collectionId } = action;
	return axios.get(`/api/products/${collectionId}`, {
		headers: {
			Authorization: 'bearer ' + token
		}
	});
};

export const fetchCurrentUser_API = token =>
	axios.get('/api/userInfo', {
		headers: {
			Authorization: 'bearer ' + token
		}
	});

export const emailLogin_API = userInfo => {
	const { email, password } = userInfo;
	return axios.post('/api/login', {
		email,
		password
	});
};

export const googleLogin_API = ({ email, firstName, lastName, imageUrl }) => {
	return axios.post('/api/getToken', {
		email,
		firstName,
		lastName,
		imageUrl
	});
};

export const registerUser_API = ({
	email,
	password,
	firstName,
	lastName,
	dateOfBirth,
	picture
}) => {
	return axios.post('/api/register', {
		email,
		password,
		firstName,
		lastName,
		dateOfBirth,
		picture
	});
};
