import React, {Component} from 'react';
import './App.scss';
import HomePage from './pages/homePage/HomePage';
import {Route, Switch, withRouter} from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';
import SignInUp from './pages/signInUpPage/SignInUp';
import {instanceOf} from 'prop-types';
import {Cookies, withCookies} from 'react-cookie';
import axios from 'axios';

class MainApp extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			firstNAme: null,
			lastName: null,
			imageUrl: null
		};
	}

	componentDidMount() {
		const {cookies} = this.props;
		const token = cookies.get('token');
		if (typeof token !== 'undefined' && token.length) {
			axios
				.get('/api/userInfo', {
					headers: {
						Authorization: 'bearer ' + token
					}
				})
				.then(response => {
					if (response && response.data) {
						this.setState({...response.data});
					}
				})
				.catch(error => console.log(error));
		}
	}

	render() {
		return (
			<div id="main-container">
				<Header {...this.state} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signIn" component={SignInUp}/>
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

export default withCookies(withRouter(MainApp));
