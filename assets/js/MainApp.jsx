import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/homePage/HomePage';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorPage from './pages/errorPage/ErrorPage';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';
import SignInUp from './pages/signInUpPage/SignInUp';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import axios from 'axios';
import { setCurrentUser } from './redux/user/user.actions';

class MainApp extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	componentDidMount() {
		this.handleLogIn().catch(error => console.log(error));
	}

	handleLogIn = async () => {
		const { cookies, setCurrentUser } = this.props;
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
						setCurrentUser({ ...response.data });
						this.setState({ loading: false });
					}
				})
				.catch(error => {
					this.handleLogOut();
					console.log(error);
				});
		}
	};

	handleLogOut = () => {
		const { cookies, setCurrentUser } = this.props;
		cookies.remove('token');
		this.setState({
			loading: false
		});
		setCurrentUser(null);
	};

	render() {
		return (
			<div id="main-container">
				<Header logout={this.handleLogOut} loading={this.state.loading} />
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

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
	null,
	mapDispatchToProps
)(withCookies(withRouter(MainApp)));
