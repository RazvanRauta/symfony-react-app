/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 23:00
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './SignIn.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { GoogleLogin } from 'react-google-login';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { googleClient } from '../../constants';

class SignIn extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { cookies } = this.props;
		axios
			.post('/api/login', {
				email: event.target.email.value,
				password: event.target.password.value
			})
			.then(response => {
				if (response.data && response.data.token) {
					cookies.set('token', response.data.token, {
						path: '/',
						sameSite: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 604800
					});
					this.props.handleLogIn();
					this.props.history.push('/shop');
				}
			})
			.catch(error => console.error(error));
	};

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	handleLoginFromGoogle = async ({
		email,
		givenName,
		familyName,
		imageUrl
	}) => {
		const { cookies } = this.props;
		axios
			.post('/api/getToken', {
				email,
				firstName: givenName,
				lastName: familyName,
				imageUrl
			})
			.then(response => {
				if (response.data && response.data.token) {
					cookies.set('token', response.data.token, {
						path: '/',
						sameSite: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 604800
					});
					this.props.handleLogIn();
					this.props.history.push('/shop');
				}
			})
			.catch(error => console.error(error));
	};

	responseGoogle = response => {
		if (typeof response !== 'undefined' && response.profileObj) {
			const userObject = response.profileObj;
			this.handleLoginFromGoogle(userObject).catch(error =>
				console.error(error)
			);
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

export default withCookies(withRouter(SignIn));
