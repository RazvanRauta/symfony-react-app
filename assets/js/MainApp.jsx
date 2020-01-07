import React, { useEffect } from 'react';
import './App.scss';
import HomePage from './pages/homePage/HomePage';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentToken,
	selectIsTokenLoaded,
	selectIsUserLoaded
} from './redux/user/user.selector';
import ErrorPage from './pages/errorPage/ErrorPage';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';
import SignInUp from './pages/signInUpPage/SignInUp';
import { fetchCurrentUserStart } from './redux/user/user.actions';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';

const MainApp = ({ fetchCurrentUser, token, isUserLoaded, isTokenLoaded }) => {
	useEffect(() => {
		if (!isUserLoaded && isTokenLoaded) {
			fetchCurrentUser(token);
		}
	}, [fetchCurrentUser]);

	return (
		<div id="main-container">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/shop" component={ShopPage} />
				<Route
					exact
					path="/signIn"
					render={() => (isUserLoaded ? <Redirect to="/shop" /> : <SignInUp />)}
				/>
				<Route exact path="/checkout" component={CheckoutPage} />
				<Route component={ErrorPage} />
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isUserLoaded: selectIsUserLoaded,
	isTokenLoaded: selectIsTokenLoaded,
	token: selectCurrentToken
});

const mapDispatchToProps = dispatch => ({
	fetchCurrentUser: token => dispatch(fetchCurrentUserStart(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(MainApp));
