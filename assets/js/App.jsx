import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

const HatsPage = () => (
	<div>
		<h1>Hats Page</h1>
	</div>
);

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="main-container">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop/hats" component={HatsPage} />
					<Route component={ErrorPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
