/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 20:20
 */

import React from 'react';
import styles from './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../images/crown.svg';
import { googleClient } from '../../constants';
import { GoogleLogout } from 'react-google-login';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';

const Header = ({ email, lastName, firstName, imageUrl, logout, loading }) => (
	<div className={styles.header}>
		<Link className={styles.logoContainer} to="/">
			<Logo className={styles.logo} title="Home" />
		</Link>
		<div className={styles.options}>
			<Link className={styles.option} to="/shop">
				SHOP
			</Link>
			<Link className={styles.option} to="/shop">
				CONTACT
			</Link>
			{email && !loading ? (
				<div className={styles.userProfile}>
					<div key={'profilePicture_div'} className={styles.profilePicture}>
						<img src={imageUrl} alt="user profile" />
					</div>
					<div key={'userInfo_div'} className={styles.userInfo}>
						<span className={styles.name}>{firstName}</span>
						<span className={styles.name}>{lastName}</span>
						<GoogleLogout
							clientId={googleClient}
							onLogoutSuccess={logout}
							render={() => (
								<Link to={'/'} onClick={logout}>
									SIGN OUT
								</Link>
							)}
						/>
					</div>
				</div>
			) : loading ? (
				<ProfileSpinner />
			) : (
				<Link className={styles.option} to={'/signIn'}>
					SIGN IN
				</Link>
			)}
		</div>
	</div>
);

export default Header;
