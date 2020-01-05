/*
 * @author: Razvan Rauta
 * Date: 19.12.2019
 * Time: 19:36
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';
import {
	selectIsTokenLoading,
	selectIsUserLoaded
} from '../../redux/user/user.selector';
import { registerUserStart } from '../../redux/user/user.actions';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			picture: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { history, registerUser, isUserLoaded } = this.props;

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

		const userData = {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			dateOfBirth,
			picture
		};

		registerUser(userData);
		if (isUserLoaded) {
			this.setState({
				email: '',
				password: '',
				confirmPassword: '',
				firstName: '',
				lastName: '',
				dateOfBirth: '',
				loading: false
			});
			history.push('/shop');
		}
	};

	handleChange = event => {
		const { value, name } = event.target;
		if (name !== 'picture') {
			this.setState({ [name]: value });
		} else {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				console.log(file);
				const fileToBase64 = reader.result;
				this.setState({
					picture: fileToBase64,
					file: file.name
				});
			};
		}
	};

	render() {
		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			dateOfBirth
		} = this.state;
		const { isTokenLoading } = this.props;
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
					<FormInput
						type={'file'}
						name="picture"
						onChange={this.handleChange}
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
	}
}

const mapStateToProps = createStructuredSelector({
	isTokenLoading: selectIsTokenLoading,
	isUserLoaded: selectIsUserLoaded
});

const mapDispatchToProps = dispatch => ({
	registerUser: userData => dispatch(registerUserStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
