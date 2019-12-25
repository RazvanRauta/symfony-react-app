/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 20:20
 */

import React from 'react';
import styles from './Header.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import Logo from '../../../images/crown.svg';
import {googleClient} from '../../constants';
import {GoogleLogout} from 'react-google-login';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';

const Header = ({ logout, loading, currentUser, hidden }) => (
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
			{currentUser ? <CartIcon /> : null}
			{currentUser && currentUser.email && !loading ? (
				<div className={styles.userProfile}>
					<div key={'profilePicture_div'} className={styles.profilePicture}>
						<img src={currentUser.imageUrl} alt="user profile" />
					</div>
					<div key={'userInfo_div'} className={styles.userInfo}>
						<span className={styles.name}>{currentUser.firstName}</span>
						<span className={styles.name}>{currentUser.lastName}</span>
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
		{hidden ? null : <CartDropdown />}
	</div>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);
