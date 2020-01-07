/*
 * @author: Razvan Rauta
 * Date: 19.12.2019
 * Time: 19:36
 */

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';
import {
	selectIsTokenLoading,
	selectIsUserLoaded,
	selectUserErrorMessage
} from '../../redux/user/user.selector';
import { registerUserStart } from '../../redux/user/user.actions';

const SignUp = ({
	history,
	registerUser,
	isUserLoaded,
	errorMessage,
	isTokenLoading
}) => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		picture: ''
	});

	const {
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		dateOfBirth
	} = userData;

	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Password don't match");
			return;
		}

		registerUser(userData);

		switch (true) {
			case typeof errorMessage !== 'undefined':
				setUserData({
					email: '',
					password: '',
					confirmPassword: '',
					firstName: '',
					lastName: '',
					dateOfBirth: ''
				});
				alert(errorMessage);
				history.push('/signIn');
				break;
			case isUserLoaded:
				setUserData({
					email: '',
					password: '',
					confirmPassword: '',
					firstName: '',
					lastName: '',
					dateOfBirth: ''
				});
				history.push('/shop');
				break;
			default:
				setUserData({
					email: '',
					password: '',
					confirmPassword: '',
					firstName: '',
					lastName: '',
					dateOfBirth: ''
				});
				return;
		}
	};

	const handleChange = event => {
		const { value, name } = event.target;
		if (name !== 'picture') {
			setUserData({ ...userData, [name]: value });
		} else {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				console.log(file);
				const fileToBase64 = reader.result;
				setUserData({ ...userData, picture: fileToBase64, file: file.name });
			};
		}
	};

	return (
		<div className={styles.signUp}>
			<h2 className={styles.title}>I do not have a account</h2>
			<span>Sing up with your email and password</span>
			<form className={styles.signUpForm} onSubmit={handleSubmit}>
				<FormInput
					type={'text'}
					name="firstName"
					value={firstName}
					onChange={handleChange}
					label={'First Name'}
					required
				/>
				<FormInput
					type={'text'}
					name="lastName"
					value={lastName}
					onChange={handleChange}
					label={'Last Name'}
					required
				/>
				<FormInput
					type={'email'}
					name="email"
					value={email}
					onChange={handleChange}
					label={'Email'}
					required
				/>
				<FormInput
					type={'date'}
					name="dateOfBirth"
					value={dateOfBirth}
					onChange={handleChange}
					required
				/>
				<FormInput
					type={'password'}
					name="password"
					value={password}
					onChange={handleChange}
					label={'Password'}
					required
				/>
				<FormInput
					type={'password'}
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label={'Confirm Password'}
					required
				/>
				<FormInput
					type={'file'}
					name="picture"
					onChange={handleChange}
					required
				/>

				{isTokenLoading ? (
					<ProfileSpinner />
				) : (
					<CustomButton type={'submit'}>SIGN UP</CustomButton>
				)}
			</form>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isTokenLoading: selectIsTokenLoading,
	isUserLoaded: selectIsUserLoaded,
	errorMessage: selectUserErrorMessage
});

const mapDispatchToProps = dispatch => ({
	registerUser: userData => dispatch(registerUserStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
