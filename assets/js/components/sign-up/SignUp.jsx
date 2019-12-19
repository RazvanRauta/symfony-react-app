/*
 * @author: Razvan Rauta
 * Date: 19.12.2019
 * Time: 19:36
 */

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styles from './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';
import FileBase64 from 'react-file-base64';

class SignUp extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			picture: '',
			loading: false
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { cookies } = this.props;

		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			dateOfBirth,
			picture
		} = this.state;
		if (password !== confirmPassword) {
			alert("Password don't match");
			return;
		}

		this.setState({ loading: true });

		axios
			.post('/api/register', {
				email,
				password,
				firstName,
				lastName,
				dateOfBirth,
				picture
			})
			.then(response => {
				if (response.data && response.data.token) {
					cookies.set('token', response.data.token, {
						path: '/',
						sameSite: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 604800
					});
					this.setState({
						email: '',
						password: '',
						confirmPassword: '',
						firstName: '',
						lastName: '',
						dateOfBirth: '',
						loading: false
					});
					this.props.handleLogIn();
					this.props.history.push('/shop');
				}
			})
			.catch(error => {
				this.setState({ loading: false });
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					alert(error.response.data.message);
					console.error(error.response.data.message);
				} else {
					console.error(error);
				}
			});
	};

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	getFiles = file => {
		this.setState({ picture: file.base64 });
	};

	render() {
		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			dateOfBirth,
			loading
		} = this.state;
		return (
			<div className={styles.signUp}>
				<h2 className={styles.title}>I do not have a account</h2>
				<span>Sing up with your email and password</span>
				<form className={styles.signUpForm} onSubmit={this.handleSubmit}>
					<FormInput
						type={'text'}
						name="firstName"
						value={firstName}
						onChange={this.handleChange}
						label={'First Name'}
						required
					/>
					<FormInput
						type={'text'}
						name="lastName"
						value={lastName}
						onChange={this.handleChange}
						label={'Last Name'}
						required
					/>
					<FormInput
						type={'email'}
						name="email"
						value={email}
						onChange={this.handleChange}
						label={'Email'}
						required
					/>
					<FormInput
						type={'date'}
						name="dateOfBirth"
						value={dateOfBirth}
						onChange={this.handleChange}
						label={'Date Of Birth'}
						required
					/>
					<FormInput
						type={'password'}
						name="password"
						value={password}
						onChange={this.handleChange}
						label={'Password'}
						required
					/>
					<FormInput
						type={'password'}
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
						label={'Confirm Password'}
						required
					/>
					<FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
					{loading ? (
						<ProfileSpinner />
					) : (
						<CustomButton type={'submit'}>SIGN UP</CustomButton>
					)}
				</form>
			</div>
		);
	}
}

export default withCookies(withRouter(SignUp));
