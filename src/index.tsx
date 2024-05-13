/* eslint-disable prettier/prettier */
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
// const root = ReactDOMClient.createRoot(container!);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const root = createRoot(container);
root.render(
  // <Provider store={store} children={undefined}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	// </Provider>
);