/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 23:00
 */

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './SignIn.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { GoogleLogin } from 'react-google-login';
import { googleClient } from '../../constants';
import {
	emailSignInStart,
	googleSignInStart
} from '../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentToken,
	selectIsTokenLoaded,
	selectIsUserLoaded,
	selectUserErrorMessage
} from '../../redux/user/user.selector';

const SignIn = props => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async event => {
		event.preventDefault();
		const { emailSignInStart, isUserLoaded, history, errorMessage } = props;

		emailSignInStart(userCredentials);

		switch (true) {
			case typeof errorMessage !== 'undefined':
				alert(errorMessage);
				history.push('/signIn');
				break;
			case isUserLoaded:
				history.push('/shop');
				break;
			default:
				return;
		}
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	const handleLoginFromGoogle = ({
		email,
		givenName,
		familyName,
		imageUrl
	}) => {
		const { isUserLoaded, googleSignInStart, history, errorMessage } = props;
		const userInfo = {
			email,
			firstName: givenName,
			lastName: familyName,
			imageUrl
		};

		googleSignInStart(userInfo);

		switch (true) {
			case typeof errorMessage !== 'undefined':
				alert(errorMessage);
				history.push('/signIn');
				break;
			case isUserLoaded:
				history.push('/shop');
				break;
			default:
				return;
		}
	};

	const responseGoogle = response => {
		if (typeof response !== 'undefined' && response.profileObj) {
			const userObject = response.profileObj;
			handleLoginFromGoogle(userObject);
		}
	};

	return (
		<div className={styles.signIn}>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					name="email"
					type="email"
					value={userCredentials.email}
					handleChange={handleChange}
					required
					label={'Email'}
				/>
				<FormInput
					name="password"
					type={'password'}
					value={userCredentials.password}
					handleChange={handleChange}
					required
					label={'Password'}
				/>
				<div className={styles.buttons}>
					<CustomButton type={'submit'}>Sign In</CustomButton>
					<GoogleLogin
						clientId={googleClient}
						render={renderProps => (
							<CustomButton
								isGoogleSigIn
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
							>
								Google Sign In
							</CustomButton>
						)}
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isTokenLoaded: selectIsTokenLoaded,
	token: selectCurrentToken,
	isUserLoaded: selectIsUserLoaded,
	errorMessage: selectUserErrorMessage
});

const mapDispatchToProps = dispatch => ({
	googleSignInStart: userInfo => dispatch(googleSignInStart(userInfo)),
	emailSignInStart: userInfo => dispatch(emailSignInStart(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
