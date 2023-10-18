import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { LenraApp } from '@lenra/client';

// If current path is /redirect.html send message to opener window
if (window.location.pathname === '/redirect.html') {
	window.onload = function () {
		window.opener.postMessage(window.location.href, `${window.location.protocol}//${window.location.host}`);
	};
}
else {
	// Initialize React and Lenra apps
	window.lenraApp = new LenraApp({
		clientId: "XXX-XXX-XXX",
	});

	ReactDom.render(
		<App />,
		document.getElementById('react-root')
	);
}