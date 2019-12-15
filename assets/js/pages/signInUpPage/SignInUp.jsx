/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 22:53
 */

import React from 'react';
import styles from './SignInUp.scss';
import SignIn from '../../components/sign-in/SignIn';

const SignInUp = () => (
    <div className={styles.signInOut}>
        <SignIn/>
    </div>
);

export default SignInUp;
