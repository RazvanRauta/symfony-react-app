import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<CookiesProvider>
				<PersistGate persistor={persistor}>
					<MainApp />
				</PersistGate>
			</CookiesProvider>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
