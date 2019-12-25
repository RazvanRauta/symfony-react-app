/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 22:53
 */

import React from 'react';
import styles from './SignInUp.styles.scss';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

const SignInUp = props => (
	<div className={styles.signInOut}>
		<SignIn {...props} />
		<SignUp {...props} />
	</div>
);

export default SignInUp;
