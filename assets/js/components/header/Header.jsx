/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 20:20
 */

import React from 'react';
import styles from './Header.scss?module';
import { Link } from 'react-router-dom';
import Logo from '../../../images/crown.svg';

const Header = () => (
	<div className={styles.header}>
		<Link className={styles.logoContainer} to="/">
			<Logo className={styles.logo} />
		</Link>
		<div className={styles.options}>
			<Link className={styles.option} to="/shop">
				SHOP
			</Link>
			<Link className={styles.option} to="/shop">
				CONTACTS
			</Link>
		</div>
	</div>
);

export default Header;
