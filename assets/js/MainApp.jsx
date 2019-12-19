import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/homePage/HomePage';
import { Route, Switch, withRouter } from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';
import SignInUp from './pages/signInUpPage/SignInUp';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import axios from 'axios';

class MainApp extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			firstName: null,
			lastName: null,
			imageUrl: null,
			loading: false
		};
	}

	componentDidMount() {
		this.handleLogIn().catch(error => console.log(error));
	}

	handleLogIn = async () => {
		const { cookies } = this.props;
		const token = cookies.get('token');
		if (typeof token !== 'undefined' && token.length && !this.state.email) {
			this.setState({ loading: true });
			axios
				.get('/api/userInfo', {
					headers: {
						Authorization: 'bearer ' + token
					}
				})
				.then(response => {
					if (response && response.data) {
						this.setState({ ...response.data }, () =>
							this.setState({ loading: false })
						);
					}
				})
				.catch(error => {
					this.handleLogOut();
					console.log(error);
				});
		}
	};

	handleLogOut = () => {
		const { cookies } = this.props;
		cookies.remove('token');
		this.setState({
			email: null,
			firstName: null,
			lastName: null,
			imageUrl: null,
			loading: false
		});
	};

	render() {
		return (
			<div id="main-container">
				<Header logout={this.handleLogOut} {...this.state} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						path="/shop"
						render={() => <ShopPage handleLogIn={this.handleLogIn} />}
					/>
					<Route
						path="/signIn"
						render={() => <SignInUp handleLogIn={this.handleLogIn} />}
					/>
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

export default withCookies(withRouter(MainApp));
