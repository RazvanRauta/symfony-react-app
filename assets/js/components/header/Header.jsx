/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 20:20
 */

import React from 'react';
import styles from './Header.scss';
import {Link} from 'react-router-dom';
import Logo from '../../../images/crown.svg';

const Header = ({email, lastName, firstName, imageUrl}) => (
	<div className={styles.header}>
		<Link className={styles.logoContainer} to="/">
			<Logo className={styles.logo} title="Home"/>
		</Link>
		<div className={styles.options}>
			<Link className={styles.option} to="/shop">
				SHOP
			</Link>
			<Link className={styles.option} to="/shop">
				CONTACT
			</Link>
			{email ? (
				<div className={styles.userProfile}>
					<div className={styles.userInfo}>
						<span className={styles.name}>{firstName}</span>
						<span className={styles.name}>{lastName}</span>
					</div>
					<div className={styles.profilePicture}>
						<img src={imageUrl} alt="user profile"/>
					</div>
				</div>
			) : null}
		</div>
	</div>
);

export default Header;
