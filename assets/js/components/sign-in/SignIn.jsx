/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 23:00
 */

import React, { Component } from 'react';
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

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const {
			emailSignInStart,
			isUserLoaded,
			history,
			errorMessage
		} = this.props;
		const userInfo = {
			email: event.target.email.value,
			password: event.target.password.value
		};

		emailSignInStart(userInfo);

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

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	handleLoginFromGoogle = ({ email, givenName, familyName, imageUrl }) => {
		const {
			isUserLoaded,
			googleSignInStart,
			history,
			errorMessage
		} = this.props;
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

	responseGoogle = response => {
		if (typeof response !== 'undefined' && response.profileObj) {
			const userObject = response.profileObj;
			this.handleLoginFromGoogle(userObject);
		}
	};

	render() {
		return (
			<div className={styles.signIn}>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						handleChange={this.handleChange}
						required
						label={'Email'}
					/>
					<FormInput
						name="password"
						type={'password'}
						value={this.state.password}
						handleChange={this.handleChange}
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
							onSuccess={this.responseGoogle}
							onFailure={this.responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</form>
			</div>
		);
	}
}

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
