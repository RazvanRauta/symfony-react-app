/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 20:20
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentUser,
	selectIsUserLoading
} from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { googleClient } from '../../constants';
import { GoogleLogout } from 'react-google-login';
import ProfileSpinner from '../profile-spinner/ProfileSpinner';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import {
	HeaderContainer,
	Logo,
	LogoContainer,
	OptionLink,
	OptionsContainer,
	ProfilePicture,
	UserInfo,
	UserProfile
} from './Header.styles';

const Header = ({ logout, loading, currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/shop">CONTACT</OptionLink>
			{currentUser ? <CartIcon /> : null}
			{currentUser && currentUser.email && !loading ? (
				<UserProfile>
					<ProfilePicture>
						<img src={currentUser.imageUrl} alt="user profile" />
					</ProfilePicture>
					<UserInfo>
						<span>{currentUser.firstName}</span>
						<span>{currentUser.lastName}</span>
						<GoogleLogout
							clientId={googleClient}
							onLogoutSuccess={logout}
							render={() => (
								<Link to={'/'} onClick={logout}>
									SIGN OUT
								</Link>
							)}
						/>
					</UserInfo>
				</UserProfile>
			) : loading ? (
				<ProfileSpinner />
			) : (
				<OptionLink to={'/signIn'}>SIGN IN</OptionLink>
			)}
		</OptionsContainer>
		{hidden ? null : <CartDropdown />}
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	loading: selectIsUserLoading,
	hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);
