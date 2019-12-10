import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import { BrowserRouter } from 'react-router-dom';

const app = (
	<BrowserRouter>
		<MainApp />
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
