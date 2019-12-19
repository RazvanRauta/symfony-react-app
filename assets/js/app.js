import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const app = (
	<BrowserRouter>
		<CookiesProvider>
			<MainApp />
		</CookiesProvider>
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
