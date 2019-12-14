import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/homePage/HomePage';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';

class MainApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="main-container">
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

export default MainApp;
