import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// if current path is /redirect.html send post message
if (window.location.pathname === '/redirect.html') {
	window.onload = function () {
		window.opener.postMessage(window.location.href, `${window.location.protocol}//${window.location.host}`);
	}
}

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('react-root')
);